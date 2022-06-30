
import { STRISO_ON, STRISO_OFF, STRISO_MOVE } from './constants';
import { Frequency } from "tone";

const midi2striso = (msg) => {
    if (msg.isNoteOn()) {
        return [STRISO_ON, Frequency(msg.getNote(), "midi").toNote(), 0, 0, msg[2] / 128];
    }
    else if (msg.isNoteOff()) {
        return [STRISO_OFF, Frequency(msg.getNote(), "midi").toNote(), 0, 0, msg[2] / 128];
    }
    return null;
}

export default midi2striso;