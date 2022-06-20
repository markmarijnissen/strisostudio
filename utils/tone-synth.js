import { Frequency, Synth, Phaser, start, AutoWah, Volume  } from "tone";
import createPolySynth from "./polysynth";

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
        // const effect = new Phaser({
        //     frequency: 20,
        //     octaves: 2,
        //     baseFrequency: 440
        // })
        const effect = new Volume(-12);
        synth.connect(effect);
        synth.effect = effect;
        effect.toDestination();
        return synth;
    },
    async noteOn(synth, btn, e) {
        await start();
        synth.note = btn.note;
        synth.triggerAttack(btn.note);
    },
    noteOff(synth, btn, e) {
        synth.triggerRelease();
    },
    move(synth, btn, e) {
        const freq = clamp(0, Frequency(synth.note).toFrequency() + e.bend * 20, 20000);
        synth.setNote(freq);
        console.log(Math.abs(e.tilt));
        synth.effect.volume.value = -24 * Math.abs(e.tilt);
    }
})