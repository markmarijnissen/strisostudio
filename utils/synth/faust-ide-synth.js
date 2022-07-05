import cloneVoices from "./clone-voices";
import onStrisoEvent from "./striso-synth-on-striso-event";

export default cloneVoices(6, {
    async createSynth() {
        return async function getSynth() {
            return window.faustEnv && window.faustEnv.audioEnv && window.faustEnv.audioEnv.dsp || null;
        }
    },
    onStrisoEvent   
});