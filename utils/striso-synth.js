const USE_WORKLET = false;
import { getContext } from "tone";
// import { synth as WorkletSynth } from "./faust-worklet-synth";
import { synth } from "./faust-synth";
import createPolySynth from "./polysynth";
import { Frequency, start } from "tone";

const clamp = (min, x, max) => Math.max(min, Math.min(x, max));
const scale = (x, scale) => x / scale;

const initMotion = synth => {    
    window.addEventListener("devicemotion", e => {
        const r = e.rotationRate;
        const rps = 2; // rotations per second
        synth.setParamValue("/strisy/gyroscope/rot_x", clamp(-1, scale(r.alpha, 360*rps), 1)); // -1 ... 1
        synth.setParamValue("/strisy/gyroscope/rot_y", clamp(-1, scale(r.beta, 360*rps), 1));
        synth.setParamValue("/strisy/gyroscope/rot_z", clamp(-1, scale(r.gamma, 360*rps), 1));

        const a = e.acceleration;
        const acc_abs = Math.sqrt(a.x*a.x + a.y*a.y + a.z*a.z);
        synth.setParamValue("/strisy/accelerometer/acc_abs", clamp(0, acc_abs ,4)); // 0 .. 4
        // console.log(
        //     'motion',
        //     synth.getParamValue("/strisy/gyroscope/rot_x"),
        //     synth.getParamValue("/strisy/gyroscope/rot_y"),
        //     synth.getParamValue("/strisy/gyroscope/rot_z"),
        //     synth.getParamValue("/strisy/accelerometer/acc_abs")
        // );
    });
}

const context = getContext().rawContext._nativeAudioContext;
let waitForSynth;
if(USE_WORKLET) {
    waitForSynth = (new WorkletSynth(context, ".")).load()
} else {
    waitForSynth = synth.createDSP(context, 1024)
}
console.log(USE_WORKLET ? "worklet":"scriptprocessor");
waitForSynth = waitForSynth.then(dsp => {
    dsp.connect(context.destination);
    window.synth = dsp;
    initMotion(dsp);
    return dsp;
});


export default createPolySynth(6, {
    createSynth() {
        return null;
    },
    async noteOn(_, btn, e, i) {
        await start();
        const synth = await waitForSynth;
        // synth[`setStrisyV${i}Note`](Frequency(btn.note).toMidi());
        // synth[`setStrisyV${i}Pres`](0.8);
        // synth[`setStrisyV${i}But_y`](0);
        // synth[`setStrisyV${i}Vpres`](0);
        synth.setParamValue(`/strisy/v${i}/note`, Frequency(btn.note).toMidi());
        synth.setParamValue(`/strisy/v${i}/pres`, 0.8);
        synth.setParamValue(`/strisy/v${i}/but_y`, 0);
        synth.setParamValue(`/strisy/v${i}/vpres`, 0);

    },
    async noteOff(_, btn, e, i) {
        const synth = await waitForSynth;
        // synth[`setStrisyV${i}Pres`](0);
        // synth[`setStrisyV${i}But_y`](0);
        // synth[`setStrisyV${i}Vpres`](0);
        synth.setParamValue(`/strisy/v${i}/pres`, 0);
        synth.setParamValue(`/strisy/v${i}/but_y`, 0);
        synth.setParamValue(`/strisy/v${i}/vpres`, 0);
    },
    async move(_, btn, e, i) {
        const synth = await waitForSynth;
        // synth[`setStrisyV${i}But_y`](e.tilt);
        // synth[`setStrisyV${i}Vpres`](e.bend);
        synth.setParamValue(`/strisy/v${i}/but_y`, e.tilt);
        synth.setParamValue(`/strisy/v${i}/vpres`, e.bend);
    }
});