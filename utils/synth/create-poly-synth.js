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
        onStrisoTouch(e) {
            let voice = null;
            for (let i = 0; i < count; i++) {
                if (voices[i].note === e.note) {
                    voice = voices[i];
                    break;
                }
            } 
            switch (e.message) {
                case "noteOn":
                    for (let i = 0; i < count; i++) {
                        if (voices[i].note === null) {
                            voice = voices[i];
                            break;
                        } else if (voice === null || voice.time > voices[i].time) {
                            voice = voices[i];
                        }
                    }
                    implementation.onStrisoTouch(voice.synth, e, voices.indexOf(voice));
                    voice.note = e.note;
                    voice.time = Date.now();
                    break;
                case "noteOff":
                    if (voice) {
                        implementation.onStrisoTouch(voice.synth, e, voices.indexOf(voice));
                        voice.note = null;
                        voice.time = null;
                    }
                    break;
                case "move":
                    if (voice) {
                        implementation.onStrisoTouch(voice.synth, e, voices.indexOf(voice));
                    }
            }
        }
    }
}

export default createPolySynth