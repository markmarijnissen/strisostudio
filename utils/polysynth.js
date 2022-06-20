const createPolySynth = (count, implementation) => {
    const voices = [];
    for (let i = 0; i < count; i++) {
        voices.push({
            synth: implementation.createSynth(),
            note: null,
            time: null
        });
    }

    const getVoice = note => {
        for (let i = 0; i < count; i++) {
            if (voices[i].note === note) return voices[i];
        }
    }

    return {
        noteOn(btn, e) {
            let voice = null, i = 0;
            for (let i = 0; i < count; i++) {
                if (voices[i].note === null) {
                    voice = voices[i];
                    break;
                } else if (voice === null || voice.time > voices[i].time) {
                    voice = voices[i];
                }
            }
            implementation.noteOn(voice.synth, btn, e, voices.indexOf(voice));
            voice.note = btn.note;
            voice.time = Date.now();
            
        },
        noteOff(btn, e) {
            let voice = getVoice(btn.note);
            if(voice) {
                implementation.noteOff(voice.synth, btn, e, voices.indexOf(voice));
                voice.note = null;
                voice.time = null;
            }
        },
        move(btn, e) {
            let voice = getVoice(btn.note);
            if (voice) {
                implementation.move(voice.synth, btn, e, voices.indexOf(voice));
            }
        }
    }
}

export default createPolySynth