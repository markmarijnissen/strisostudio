import { STRISO_ON, STRISO_OFF, STRISO_MOVE } from "../constants";
// This will 'clone' a single synth up to 'count' voices.
//
// You must provide an implementation with the following functions
// {
//     getSynth(voiceIndex){ return synth },
//     onStrisoEvent(event) { }
//     destroy() { }
// }
const cloneVoices = (implementation) => {
    const count = implementation.count || 6;
    const voices = [];
    for (let i = 0; i < count; i++) {
        voices.push({
            note: null,
            time: null
        });
    }
    if (!implementation.getSynth) implementation.getSynth = () => null;

    return {
        destroy() {
            if (typeof implementation.destroy === "function") {
                implementation.destroy();
            }
        },
        async onStrisoEvent(e) {
            if (!e) {
                console.error("Empty onStrisoEvent", e);
                return;
            }
            let synth = null;
            let voice = null;
            let voiceIndex = -1;
            if (e[1]) {
                for (let i = 0; i < count; i++) {
                    if (voices[i].note === e[1]) {
                        voice = voices[i];
                        voiceIndex = i;
                        break;
                    }
                }
            }
            switch (e[0]) {
                case STRISO_ON:
                    for (let i = 0; i < count; i++) {
                        if (voices[i].note === null) {
                            voice = voices[i];
                            voiceIndex = i;
                            break;
                        } else if (voice === null || voice.time > voices[i].time) {
                            voice = voices[i];
                            voiceIndex = i;
                        }
                    }
                    synth = await implementation.getSynth.call(implementation, voiceIndex);
                    implementation.onStrisoEvent(synth, e, voiceIndex);
                    voice.note = e[1];
                    voice.time = Date.now();
                    break;
                case STRISO_OFF:
                    if (voice) {
                        synth = await implementation.getSynth.call(implementation, voiceIndex);
                        implementation.onStrisoEvent(synth, e, voiceIndex);
                        voice.note = null;
                        voice.time = null;
                    }
                    break;
                default:
                    synth = await implementation.getSynth.call(implementation, voiceIndex);
                    implementation.onStrisoEvent(synth, e, voiceIndex);
            }
        }
    }
}

export default cloneVoices