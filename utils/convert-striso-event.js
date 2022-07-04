
import JZZ from "jzz";
import { midi2note } from "./dcompose";
import { ll, mm, kk, scale } from "./midi";
import { STRISO_ON,
    STRISO_OFF,
    STRISO_MOVE,
    STRISO_MOTION,
    MIDI_STRISO_ACC_X,
    MIDI_STRISO_ACC_Y,
    MIDI_STRISO_ACC_Z,
    MIDI_STRISO_ACC_ABS,
    MIDI_STRISO_ROT_X,
    MIDI_STRISO_ROT_Y,
    MIDI_STRISO_ROT_Z,
    MIDI_CONTROL_CHANGE,
    MIDI_C_LSB,
    MIDI_STRISO_BEND,
    MIDI_STRISO_TILT,
    MIDI_STRISO_PRESSURE,
    MIDI_PITCH_BEND
} from "./constants";

const isMidiControlChange = msg => msg[0] >> 4 === MIDI_CONTROL_CHANGE >> 4;
const isBend = msg => isMidiControlChange(msg) && msg[1] === MIDI_STRISO_BEND;
const isTilt = msg => isMidiControlChange(msg) && msg[1] === MIDI_STRISO_TILT;
const isMidiPressure = msg => msg[0] >> 4 === MIDI_STRISO_PRESSURE >> 4;
const isPitchBend = msg => msg[0] >> 4 === MIDI_PITCH_BEND >> 4;

// convert midi messages to striso touch events
//
// we need to keep track of state (e.g. tilt,bent,acc, etc)
// and we need to merge multiple messages (e.g. MSB+LSB = 14bit value)
// so this is a factory function
export const createMidi2Striso = () => {
    const channels = [  // map channels to notes, so we know which note we need to apply effects to 
        null, null, null, null,
        null, null, null, null,
        null, null, null, null,
        null, null, null, null
    ];
    const buttons = {}; // keep track of button state [ x, y, z ]
    const notes = [];
    
    // motion are 14 bit values, keep track of latest ones
    const motion = [0, 0, 0, 0, 0, 0];
    // 14bit consists of a MSB + LSB, keep track of them
    // when we have received both, we merge them to a 14bit value.
    const motion_lsb = [null, null, null, null, null, null];
    const motion_msb = [null, null, null, null, null, null];

    const channel2note = c => channels[c];

    return (msg) => {
        const c = msg.getChannel();

        if (msg.isNoteOn()) {
            const n = midi2note(msg.getNote(), notes);
            const vel = msg[2] / 127;
            buttons[n] = [0, 0, vel];
            channels[c] = n;
            return [STRISO_ON, n].concat(buttons[n]);
        }
        else if (msg.isNoteOff()) {
            const n = midi2note(msg.getNote(), notes);
            const vel = msg[2] / 127;
            buttons[n] = [0, 0, vel];
            channels[c] = null;
            return [STRISO_OFF, n].concat(buttons[n]);;
        }
        else if (isMidiControlChange(msg)) {
            const n = channel2note(c);
            const value = ((msg[2] / 127) * 2) - 1;
            let i = -1;
            if (isBend(msg)) i = 0;
            else if (isTilt(msg)) i = 1;
            if (i >= 0) {
                if (!n) {
                    console.warn(`tilt/bend without note`, n, c, channels, buttons, msg);
                    return null;
                }
                if (!buttons[n]) buttons[n] = [0, 0, 0];
                buttons[n][i] = value;
                return [STRISO_MOVE, n].concat(buttons[n]);
            }
        }
        else if (isPitchBend(msg)) { 
            const n = channel2note(c);
            if (!n) {
                console.warn("pressure without note", n, c, channels, buttons, msg);
                return null;
            }
            const value = scale(kk(msg[1], msg[2]), 0, 16384, -1, 1);
            buttons[n][1] = value;
            return [STRISO_MOVE, n].concat(buttons[n]);
        }
        else if (isMidiPressure(msg)) {
            const n = channel2note(c);
            const value = msg[1] / 127;
            if (!n) {
                console.warn("pressure without note", n, c, channels, buttons, msg);
                return null;
            }
            if (!buttons[n]) buttons[n] = [0, 0, 0];
            buttons[n][2] = value;
            return [STRISO_MOVE, n].concat(buttons[n]);
        }

        const sendMotion = [
            MIDI_STRISO_ACC_X,
            MIDI_STRISO_ACC_Y,
            MIDI_STRISO_ACC_Z,
            MIDI_STRISO_ROT_X,
            MIDI_STRISO_ROT_Y,
            MIDI_STRISO_ROT_Z,
        ].filter((key, i) => {
            if (msg[1] === key) {
                motion_msb[i] = msg[2];
            } else if (msg[1] === key | MIDI_C_LSB) {
                motion_lsb[i] = msg[2];
            }
            if (motion_lsb[i] !== null && motion_msb[i] !== null) {
                motion[i] = kk(motion_msb[i], motion_lsb[i]);
                motion_lsb[i] = null;
                motion_msb[i] = null;
                return true;
            }
            return false;
        }).length > 0;

        if (sendMotion) {
            return [STRISO_MOTION].concat(motion);
        }
        return null;
    }
}

export const midi2striso = createMidi2Striso();

// convert striso touch events to midi messages
export const striso2midi = (e, channel) => {
    const bend = JZZ.MIDI.pitchBendF(channel, e[2]);
    // const tilt = JZZ.MIDI.mod(channel, Math.round(scale(e[3], -1, 1, 0, 16384)));
    // const bend = JZZ.MIDI([MIDI_CONTROL_CHANGE | channel, MIDI_STRISO_BEND, scale(e[2], -1, 1, 0, 127)]);
    const tilt = JZZ.MIDI([MIDI_CONTROL_CHANGE | channel, MIDI_STRISO_TILT, Math.round(scale(e[3], -1, 1, 0, 127))]);

    switch (e[0]) {
        case STRISO_ON:
            return [
                bend,
                // tilt[0],
                // tilt[1],
                tilt,
                JZZ.MIDI.noteOn(channel, e[1], scale(e[4],0,1,0,127))
            ]

        case STRISO_OFF:
            return [
                bend,
                // tilt[0],
                // tilt[1],
                tilt,
                JZZ.MIDI.noteOff(channel, e[1], scale(e[4],0,1,0,127)),
            ];

        case STRISO_MOVE:
            return [
                bend,
                // tilt[0],
                // tilt[1],
                tilt,
            ];

        case STRISO_MOTION:

            // get LSB and MSB
            const lsb = val => ll(scale(val, -2, 2, 0, 16384));
            const msb = val => mm(scale(val, -2, 2, 0, 16384)); 

            const acc_abs = Math.sqrt(e[1] * e[1] + e[2] * e[2] + e[3] * e[3]);
            return [
                JZZ.MIDI([MIDI_CONTROL_CHANGE, MIDI_STRISO_ACC_X | MIDI_C_LSB, lsb(e[1])]),
                JZZ.MIDI([MIDI_CONTROL_CHANGE, MIDI_STRISO_ACC_X, msb(e[1])]),
                JZZ.MIDI([MIDI_CONTROL_CHANGE, MIDI_STRISO_ACC_Y | MIDI_C_LSB, lsb(e[2])]),
                JZZ.MIDI([MIDI_CONTROL_CHANGE, MIDI_STRISO_ACC_Y, msb(e[2])]),
                JZZ.MIDI([MIDI_CONTROL_CHANGE, MIDI_STRISO_ACC_Z | MIDI_C_LSB, lsb(e[3])]),
                JZZ.MIDI([MIDI_CONTROL_CHANGE, MIDI_STRISO_ACC_Z, msb(e[3])]),
                JZZ.MIDI([MIDI_CONTROL_CHANGE, MIDI_STRISO_ACC_ABS | MIDI_C_LSB, lsb(acc_abs)]),
                JZZ.MIDI([MIDI_CONTROL_CHANGE, MIDI_STRISO_ACC_ABS, msb(acc_abs)]),
                JZZ.MIDI([MIDI_CONTROL_CHANGE, MIDI_STRISO_ROT_X | MIDI_C_LSB, lsb(e[4])]),
                JZZ.MIDI([MIDI_CONTROL_CHANGE, MIDI_STRISO_ROT_X, msb(e[4])]),
                JZZ.MIDI([MIDI_CONTROL_CHANGE, MIDI_STRISO_ROT_Y | MIDI_C_LSB, lsb(e[5])]),
                JZZ.MIDI([MIDI_CONTROL_CHANGE, MIDI_STRISO_ROT_Y, msb(e[5])]),
                JZZ.MIDI([MIDI_CONTROL_CHANGE, MIDI_STRISO_ROT_Z | MIDI_C_LSB, lsb(e[6])]),
                JZZ.MIDI([MIDI_CONTROL_CHANGE, MIDI_STRISO_ROT_Z, msb(e[6])]),

            ];
    }
    return [];
}