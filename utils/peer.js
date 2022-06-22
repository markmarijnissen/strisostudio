import Peer from "peerjs";
import events from "./events";
import EventEmitter from "eventemitter3";

const log = (...args) => console.log(...args);
const debug  = (...args) => console.debug(...args);
// const log = () => {}
// const debug = () => {}

export const peerId = `striso-board-${Math.round(Math.random() * 1e6)}`;
const peerEvents = new EventEmitter();
const peer = new Peer(peerId);

const createConnection = conn => {
    conn.on("open", () => {
        log("connected to peer:" + conn.peer);
        
        // incoming peer data is forwarded to the Peer Event Bus.
        conn.on('data', ([channel, data]) => {
            peerEvents.emit(channel, data);
        });

        // outgoing peer data is sent to all connections. (TODO choose one connection?)
        const sendPeerData = ([channel, data]) => {
            conn.send([channel, data]);
        }
        peerEvents.on("send", sendPeerData);

        // when connection is closed, unsubscribe
        conn.on('close', () => {
            log("disconnected from: "+ conn.peer);
            peerEvents.off("send", sendPeerData);
        });
    })

    return conn;
}

const destructors = {};

// When OTHER connects, store connection.
peer.on("connection", createConnection)

export const createPeerConnection = async ({ id, instanceId, send, receive }) => {
    if (!instanceId) throw new Error('instanceId is a required argument');

    destroyPeerConnection(instanceId);
    const onSend = data => {
        peerEvents.emit("send", [send, data]);
    }
    const onReceive = data => {
        events.emit(receive, data);
    }
    let conn = null;
    if (send) {
        events.on(send, onSend);
    }
    if (receive) {
        peerEvents.on(receive, onReceive);
    }
    if (id) {
        id = `striso-board-${id}`;
        conn  = createConnection(peer.connect(id));
    }
    // create destructor
    destructors[instanceId] = () => {
        log(`destroying ${instanceId} (${id}, ${send}, ${receive})`);
        if (send) {
            events.off(send, onSend);
        }
        if (receive) {
            peerEvents.off(receive, onReceive);
        }
        if (conn) {
            conn.close();
        }
    }
}

export const destroyPeerConnection = instanceId => {
    if (destructors[instanceId]) destructors[instanceId]();
}