import { STRISO_ON, STRISO_OFF, STRISO_MOVE } from "../constants";
import { Frequency, Synth, start, Volume } from "tone";
import cloneVoices from "./clone-voices";

const clamp = (min, val, max) => Math.max(min, Math.min(val, max));

export default cloneVoices({
    count: 6,
    getSynth(i) {
        if (!this.synths[i]) {
            let synth = new Synth({
                envelope: {
                    attack: 0.0,
                    decay: 0.2,
                    sustain: 0.8,
                    release: 0.3
                }
            });
            const effect = new Volume(-12);
            synth.connect(effect);
            synth.effect = effect;
            effect.toDestination();
            this.synths[i] = synth;
        }
        return this.synths[i];
    },
    async onStrisoEvent(synth, e) {
        switch (e[0]) {
            case STRISO_ON:
                await start();
                synth.note = e[1];
                synth.triggerAttack(e[1]);
                break;
            case STRISO_OFF:
                synth.triggerRelease();
                break;
            case STRISO_MOVE:
                const freq = clamp(0, Frequency(synth.note).toFrequency() + e[2] * 20, 20000);
                synth.setNote(freq);
                synth.effect.volume.value = -24 * Math.abs(e[3]);
                break;
        }
    }
})