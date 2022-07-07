import { getOutput } from "../midi";

import cloneVoices from "./clone-voices";
import { striso2midi }  from "../convert-striso-event";

export default async (id, name, voices = 6) => {
    if (!name) return null;
    return cloneVoices({
        count: voices,
        async getSynth() {
            if (!this.midiOut) {
                this.midiOut = await getOutput(id, name);
            }
            return this.midiOut;
        },
        destroy() {
            midiOut.disconnect();
        },
        async onStrisoEvent(midiOut, e, i) {
            striso2midi(e, i).forEach(msg => midiOut.send(msg));
        }
    });
}