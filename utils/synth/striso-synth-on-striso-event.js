import { STRISO_ON, STRISO_OFF, STRISO_MOVE, STRISO_MOTION } from "../constants";
import { Frequency } from "tone";

const clamp = (min, x, max) => Math.max(min, Math.min(x, max));
const scale = (x, scale) => x / scale;

export default async function (synth, e, i) {
    if (!synth) return; // synth not ready (yet)
    switch (e[0]) {
        case STRISO_ON:
            synth.setParamValue(`/strisy/v${i}/note`, Frequency(e[1]).toMidi());
            synth.setParamValue(`/strisy/v${i}/pres`, e[4]);
            synth.setParamValue(`/strisy/v${i}/but_y`, 0);
            synth.setParamValue(`/strisy/v${i}/vpres`, 0);
            break;

        case STRISO_OFF:
            synth.setParamValue(`/strisy/v${i}/pres`, 0);
            synth.setParamValue(`/strisy/v${i}/but_y`, 0);
            synth.setParamValue(`/strisy/v${i}/vpres`, 0);
            break;

        case STRISO_MOVE:
            synth.setParamValue(`/strisy/v${i}/but_y`, e[2]);
            synth.setParamValue(`/strisy/v${i}/vpres`, e[3]);
            synth.setParamValue(`/strisy/v${i}/pres`, e[4]);
            break;

        case STRISO_MOTION:
            const rps = 2; // rotations per second
            synth.setParamValue("/strisy/gyroscope/rot_x", clamp(-1, scale(e[4], 360 * rps), 1)); // -1 ... 1
            synth.setParamValue("/strisy/gyroscope/rot_y", clamp(-1, scale(e[5], 360 * rps), 1));
            synth.setParamValue("/strisy/gyroscope/rot_z", clamp(-1, scale(e[6], 360 * rps), 1));

            const acc_abs = Math.sqrt(e[1] * e[1] + e[2] * e[2] + e[3] * e[3]);
            synth.setParamValue("/strisy/accelerometer/acc_abs", clamp(0, acc_abs, 4)); // 0 .. 4
            break;
    }
}
