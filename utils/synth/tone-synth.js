import { Frequency, Synth, start, Volume  } from "tone";
import createPolySynth from "./create-poly-synth";

const clamp = (min, val, max) => Math.max(min, Math.min(val, max));

export default createPolySynth(6, {
    createSynth() {
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
        return synth;
    },
    async onStrisoTouch(synth, e) {
        switch (e.message) {
            case "noteOn":
                await start();
                synth.note = e.note;
                synth.triggerAttack(e.note);
                break;
            case "noteOff":
                synth.triggerRelease();
                break;
            case "move":
                const freq = clamp(0, Frequency(synth.note).toFrequency() + e.bend * 20, 20000);
                synth.setNote(freq);
                synth.effect.volume.value = -24 * Math.abs(e.tilt);
                break;
        }
    }
})