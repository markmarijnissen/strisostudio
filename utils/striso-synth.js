import { getContext } from "tone";
import { synth, synth as Synth } from "./faust-synth";
import createPolySynth from "./polysynth";
import { Frequency, start } from "tone";

const context = getContext().rawContext._nativeAudioContext;
let plugin = new Synth(context, ".");
const waitForSynth = plugin.load()
    // .then(() => start())
    .then(synth_dsp => {
        // Print path to be used with 'setParamValue'
        console.log(synth_dsp.getParams().join("\n"));
        // Connect it to output as a regular WebAudio node
        synth_dsp.connect(context.destination);
        window.synth = synth_dsp;
        return synth_dsp;
    });

export default createPolySynth(6, {
    createSynth() {
        return null;
    },
    async noteOn(_, btn, e, i) {
        await start();
        const synth = await waitForSynth;
        synth[`setStrisyV${i}Note`](Frequency(btn.note).toMidi());
        synth[`setStrisyV${i}Pres`](0.8);
        synth[`setStrisyV${i}But_y`](0);
        synth[`setStrisyV${i}Vpres`](0);

    },
    async noteOff(_, btn, e, i) {
        const synth = await waitForSynth;
        synth[`setStrisyV${i}Pres`](0);
        synth[`setStrisyV${i}But_y`](0);
        synth[`setStrisyV${i}Vpres`](0);
    },
    async move(_, btn, e, i) {
        const synth = await waitForSynth;
        synth[`setStrisyV${i}But_y`](e.tilt);
        synth[`setStrisyV${i}Vpres`](e.bend);
    }
});