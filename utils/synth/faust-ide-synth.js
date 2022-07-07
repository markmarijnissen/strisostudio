import cloneVoices from "./clone-voices";
import onStrisoEvent from "./striso-synth-on-striso-event";

export default cloneVoices({
    count: 6,
    getSynth() {
        return window.faustEnv && window.faustEnv.audioEnv && window.faustEnv.audioEnv.dsp || null;
    },
    onStrisoEvent   
});