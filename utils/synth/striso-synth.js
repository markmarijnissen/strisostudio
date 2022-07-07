// import { synth as WorkletSynth } from "./faust-worklet-synth";
import { synth as Synth } from "./faust";
import cloneVoices from "./clone-voices";
import onStrisoEvent from "./striso-synth-on-striso-event";
import { getContext, start } from "tone";

export default cloneVoices({
    count: 6,
    getSynth() {
        if (!this.synth) {
            this.synth = start()
                .then(() => {
                    const context = getContext().rawContext._nativeAudioContext;
                    return Synth.createDSP(context, 1024);
                })
                .then(async synth => {
                    const context = getContext().rawContext._nativeAudioContext;
                    synth.connect(context.destination);
                    window.synth = synth;
                    return synth;
                });
        }
        return this.synth;
    },
    onStrisoEvent
});