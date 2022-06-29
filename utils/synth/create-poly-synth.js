import { STRISO_ON, STRISO_OFF, STRISO_MOVE } from "../constants";
// This will 'clone' a single synth up to 'count' voices.
//
// You must provide an implementation with the following functions
// {
//     createSynth(){ return synth },
//     noteOn({ note, tilt, bent, velocity, message: "noteOn" }) { },
//     noteOff({ note, tilt, bent, velocity, message: "noteOff" }) { },
//     move({ note, tilt, bent, velocity, message: "move" }) { },
// }
const createPolySynth = (count, implementation) => {
    const voices = [];
    for (let i = 0; i < count; i++) {
        voices.push({
            synth: typeof implementation.createSynth === "function" ? implementation.createSynth() : null,
            note: null,
            time: null
        });
    }

    return {
        destroy() {
            if (typeof implementation.destroy === "function") {
                implementation.destroy();
            }
        },
        onStrisoTouch(e) {
            let voice = null;
            for (let i = 0; i < count; i++) {
                if (voices[i].note === e[1]) {
                    voice = voices[i];
                    break;
                }
            } 
            switch (e[0]) {
                case STRISO_ON:
                    for (let i = 0; i < count; i++) {
                        if (voices[i].note === null) {
                            voice = voices[i];
                            break;
                        } else if (voice === null || voice.time > voices[i].time) {
                            voice = voices[i];
                        }
                    }
                    implementation.onStrisoTouch(voice.synth, e, voices.indexOf(voice));
                    voice.note = e[1];
                    voice.time = Date.now();
                    console.log(voices.map(v => v.note).join(","), voices.indexOf(voice));
                    break;
                case STRISO_OFF:
                    if (voice) {
                        implementation.onStrisoTouch(voice.synth, e, voices.indexOf(voice));
                        voice.note = null;
                        voice.time = null;
                    }
                    break;
                default:
                    if (voice) {
                        implementation.onStrisoTouch(voice.synth, e, voices.indexOf(voice));
                    } else {
                        implementation.onStrisoTouch(null, e, -1);
                    }
            }
        }
    }
}

export default createPolySynth