<template>
    <div v-if="ui === 'simple'">
        <input type="text" placeholder="device id (6 digits)" v-model="peerId" /><button @click.prevent="connect(peerId)">Connect</button><br/>
    </div>
    <peer-id  v-else-if="ui === 'id'" />
    <div v-else-if="ui === 'connect'">
        <input type="text" v-model="peerId" /><button @click.prevent="connect(peerId)">Connect</button>
    </div>
</template>
<script>
import { PEER_ID, connect as peerConnect, disconnect as peerDisconnect, withoutPeerIdPrefix } from "../utils/peer";
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
        myPeerId(){
            return PEER_ID
        }
    },
    data() {
        return {
            peerId: "",
            instanceId: Math.round(Math.random() * 1e8),
            connections: []
        }
    },
    created() {
        this.connect(this.id);
    },
    destroyed() {
        this.disconnect();
    },
    methods: {
        withoutPeerIdPrefix,
        connect(id) {
            if(id) {
                this.peerId = id;
                peerConnect(this.instanceId, this.peerId);
            }
        },
        disconnect() {
            peerDisconnect(this.instanceId);
        },
    },
    watch: {
        id: "connect"
    }
}
</script>