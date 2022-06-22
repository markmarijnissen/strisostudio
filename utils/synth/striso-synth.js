// import { synth as WorkletSynth } from "./faust-worklet-synth";
import { synth as Synth } from "./faust";
import createPolySynth from "./create-poly-synth";
import { getContext, Frequency } from "tone";

const clamp = (min, x, max) => Math.max(min, Math.min(x, max));
const scale = (x, scale) => x / scale;

const context = getContext().rawContext._nativeAudioContext;
//   (new WorkletSynth(context, ".")).load() 
let  waitForSynth = Synth.createDSP(context, 1024);
waitForSynth = waitForSynth.then(async synth => {
    synth.connect(context.destination);
    window.addEventListener("devicemotion", e => {
        const r = e.rotationRate;
        const rps = 2; // rotations per second
        synth.setParamValue("/strisy/gyroscope/rot_x", clamp(-1, scale(r.alpha, 360 * rps), 1)); // -1 ... 1
        synth.setParamValue("/strisy/gyroscope/rot_y", clamp(-1, scale(r.beta, 360 * rps), 1));
        synth.setParamValue("/strisy/gyroscope/rot_z", clamp(-1, scale(r.gamma, 360 * rps), 1));

        const a = e.acceleration;
        const acc_abs = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
        synth.setParamValue("/strisy/accelerometer/acc_abs", clamp(0, acc_abs, 4)); // 0 .. 4
    });
    window.synth = synth;
    return synth;
});

export default createPolySynth(6, {
    async onStrisoTouch(_, e, i) {
        const synth = await waitForSynth;
        switch (e.message) {
            case "noteOn":
                synth.setParamValue(`/strisy/v${i}/note`, Frequency(e.note).toMidi());
                synth.setParamValue(`/strisy/v${i}/pres`, 0.8);
                synth.setParamValue(`/strisy/v${i}/but_y`, 0);
                synth.setParamValue(`/strisy/v${i}/vpres`, 0);
                break;
            
            case "noteOff":
                synth.setParamValue(`/strisy/v${i}/pres`, 0);
                synth.setParamValue(`/strisy/v${i}/but_y`, 0);
                synth.setParamValue(`/strisy/v${i}/vpres`, 0);
                break;

            case "move":
                synth.setParamValue(`/strisy/v${i}/but_y`, e.tilt);
                synth.setParamValue(`/strisy/v${i}/vpres`, e.bend);
                break;
        }
    }
});