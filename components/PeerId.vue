<template>
    <span v-if="myPeerId">{{myPeerId}}</span>
    <button v-else @click.prevent="initPeer">
        <slot>Enable</slot></button>
</template>
<script>
import events from "../utils/events";
import { getPeerIdWhenInitialized, withoutPeerIdPrefix, initPeer, PEER_INIT } from "../utils/peer";
export default {
    created(){
        events.on(PEER_INIT, this.onPeerInit);
    },
    destroyed(){
        events.off(PEER_INIT, this.onPeerInit);
    },
    data(){
        return {
            myPeerId: withoutPeerIdPrefix(getPeerIdWhenInitialized())
        }
    },
    methods: {
        initPeer,
        onPeerInit(peerId) {
            this.myPeerId = withoutPeerIdPrefix(peerId);
        }
    }
}
</script>