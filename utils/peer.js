import Peer from "peerjs";
import events from "./events";

const connections = {};

export const PEER_ID_PREFIX = `striso-studio-`;
export const withoutPeerIdPrefix = str => (str || "").replaceAll(PEER_ID_PREFIX, "");
export const withPeerIdPrefix = str => PEER_ID_PREFIX + str.replaceAll(PEER_ID_PREFIX, "");

export const PEER_SEND_EVENT = "peer-send";
export const PEER_CONNECTION_EVENT = "peer-connection";
export const PEER_INIT = "peer-init";

let PEER_ID = null
let peer = null;
export const initPeer = (deviceName = 'striso-studio') => {
    if (peer === null) {
        const key = `STRISO_PEER_ID[${deviceName}]`;
        PEER_ID = localStorage[key] || `${PEER_ID_PREFIX}${1e5 + Math.round(Math.random() * 1e6)}`;
        if (!localStorage[key]) localStorage[key] = PEER_ID;
        
        peer = new Peer(PEER_ID);
        peer.on("connection", onConnectionCreated);
        console.log("Available on peer connections on " + PEER_ID);
        events.emit(PEER_INIT, PEER_ID);
    }
    return peer;
}

export const getPeerIdWhenInitialized = () => peer !== null ? PEER_ID : null;

export const connect = (instanceId, peerId) => {
    disconnect(instanceId);
    const conn = initPeer().connect(withPeerIdPrefix(peerId));
    console.log("connect", peerId, conn);
    if (conn) {
        conn.instanceId = instanceId;
        return onConnectionCreated(conn);
    }
    throw new Error("No Peer Connection");
}

export const disconnect = (instanceId) => {
    Object.values(connections)
        .filter(conn => conn.instanceId === instanceId)
        .forEach(conn => {
            conn.close();
            delete connections[conn.peer];
        });
}

export const send = (src, dest) => {
    events.on(src, data => {
        events.emit(PEER_SEND_EVENT, [dest || src, data])
    });
}

const onConnectionCreated = conn => new Promise((resolve, reject) => {
    conn.on("open", () => {
        console.log("connected to peer:" + conn.peer);
        connections[conn.peer] = conn;
        events.emit(PEER_CONNECTION_EVENT, Object.values(connections).map(conn => conn.peer), conn);

        // incoming peer data is forwarded to the local events
        conn.on('data', ([channel, data]) => {
            events.emit(channel, data);
        });

        // everything send to local "PEER_SEND_EVENT" events is forwarded to peers
        const sendPeerData = ([channel, data]) => {
            conn.send([channel, data]);
        }
        events.on(PEER_SEND_EVENT, sendPeerData);

        // Clean up
        conn.on('close', () => {
            console.log("disconnected from: " + conn.peer);
            events.off(PEER_SEND_EVENT, sendPeerData);
            delete connections[conn.peer];
            events.emit(PEER_CONNECTION_EVENT, Object.values(connections).map(conn => conn.peer), conn);
        });

        resolve(conn);
    });
    conn.on("error", reject);
});