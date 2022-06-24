<template>
     <ul>
        <li v-for="peerId in connections" :key="peerId">{{withoutPeerIdPrefix(peerId)}}</li>
    </ul>  
</template>
<script>
import { PEER_CONNECTION_EVENT, withoutPeerIdPrefix } from "../utils/peer";
import events from "../utils/events";

export default {
    created() {
        events.on(PEER_CONNECTION_EVENT, this.onPeerConnection);
    },
    destroyed() {
        events.off(PEER_CONNECTION_EVENT, this.onPeerConnection);
    },
    data() {
        return {
            connections: []
        }
    },
    methods: {
        withoutPeerIdPrefix,
        onPeerConnection(connections) {
            this.connections = connections;
        }
    }
}
</script>