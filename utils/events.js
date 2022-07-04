import * as constants from "./constants";
import EventEmitter from "eventemitter3";
if (!global.StrisoEvents) {
    global.StrisoEvents = new EventEmitter();
}
Object.assign(global, constants);
export default global.StrisoEvents;