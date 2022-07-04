<template>
    <div v-if="ui === 'simple'">
        <input type="text" placeholder="Remote Device ID" v-model="peerId" /><button @click.prevent="connect(peerId)">Connect</button>{{ connected ? "✅" : "❌"}}
    </div>
    <peer-id  v-else-if="ui === 'id'" />
</template>
<script>
import { connect as peerConnect, disconnect as peerDisconnect, withoutPeerIdPrefix, PEER_CONNECTION_EVENT } from "../utils/peer";
import events from "../utils/events";

export default {
    props: {
        id: {
            type: String,
            default: ""
        },
        ui: {
            type: String,
            default: "simple" // or select none
        }
    },
    computed: {
        connected() {
            return this.connections
                .map(peerId => withoutPeerIdPrefix(peerId))
                .indexOf(withoutPeerIdPrefix(this.peerId)) >= 0;
        }
    },
    data() {
        return {
            peerId: localStorage["PeerConnection"] || "",
            instanceId: Math.round(Math.random() * 1e8),
            connections: []
        }
    },
    created() {
        this.connect(this.id);
        events.on(PEER_CONNECTION_EVENT, this.onPeerConnection);
    },
    destroyed() {
        this.disconnect();
        events.off(PEER_CONNECTION_EVENT, this.onPeerConnection);
    },
    methods: {
        withoutPeerIdPrefix,
        connect(id) {
            if(id) {
                this.peerId = id;
                localStorage['PeerConnection'] = id;
                peerConnect(this.instanceId, this.peerId);
            }
        },
        disconnect() {
            peerDisconnect(this.instanceId);
        },
        onPeerConnection(connections) {
            this.connections = connections;
            if(connections.length > 0) {
                localStorage['PeerConnection'] = withoutPeerIdPrefix(connections[0]);
                this.peerId = withoutPeerIdPrefix(connections[0]);
            }
        }
    },
    watch: {
        id: "connect"
    }
}
</script>