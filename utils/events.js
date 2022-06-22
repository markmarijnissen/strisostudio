import EventEmitter from "eventemitter3";
if (!global.StrisoEvents) {
    global.StrisoEvents = new EventEmitter();
}
export default global.StrisoEvents;