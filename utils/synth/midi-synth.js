import JZZ from "jzz";
import { STRISO_ON, STRISO_OFF, STRISO_MOVE, STRISO_MOTION } from "../constants";

import createPolySynth from "./create-poly-synth";

export default async name => {
    const midiOut = await JZZ().openMidiOut(name);
    midiOut.connect(msg => console.log(msg.toString()));

    return createPolySynth(6, {
        createSynth() {
            return midiOut;
        },
        destroy() {
            midiOut.destroy();
        },
        async onStrisoTouch(midiOut, e, i) {
            const tilt = 0.5 * (1 + e[3]);
            const tilts = JZZ.MIDI.modF(i+1, tilt)
            switch (e[0]) {
                case STRISO_ON:
                    midiOut.send(JZZ.MIDI.pitchBendF(i+1, e[2]));
                    midiOut.send(tilts[0]);
                    midiOut.send(tilts[1]);
                    midiOut.send(JZZ.MIDI.noteOn(i+1, e[1], Math.ceil(e[4] * 127)));
                    break;

                case STRISO_OFF:
                    midiOut.send(JZZ.MIDI.pitchBendF(i+1, e[2]));
                    midiOut.send(tilts[0]);
                    midiOut.send(tilts[1]);
                    midiOut.send(JZZ.MIDI.noteOff(i+1, e[1], e[4]));
                    break;

                case STRISO_MOVE:
                    midiOut.send(JZZ.MIDI.pitchBendF(i+1, e[2]));
                    midiOut.send(tilts[0]);
                    midiOut.send(tilts[1]);

                    break;

                case STRISO_MOTION:
                    break;
            }
        }
    });
}