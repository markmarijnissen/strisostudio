import Peer from "peerjs";
import events from "./events";

const connections = {};

export const PEER_ID_PREFIX = `striso-studio-`;
export const withoutPeerIdPrefix = str => str.replaceAll(PEER_ID_PREFIX, "");
export const withPeerIdPrefix = str => PEER_ID_PREFIX + str.replaceAll(PEER_ID_PREFIX, "");
export const PEER_ID = `${PEER_ID_PREFIX}${Math.round(Math.random() * 1e6)}`;
export const PEER_SEND_EVENT = "peer-send";
export const PEER_CONNECTION_EVENT = "peer-connection";

const peer = new Peer(PEER_ID);
console.log("Available on peer connections on " + PEER_ID);

export const connect = (instanceId, peerId) => {
    console.log("connect", peerId);
    disconnect(instanceId);
    const conn = peer.connect(withPeerIdPrefix(peerId));
    conn.instanceId = instanceId;
    return onConnectionCreated(conn);
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
peer.on("connection", onConnectionCreated);