<template>
    <span>{{myPeerId}}</span>
</template>
<script>
import { PEER_ID, withoutPeerIdPrefix } from "../utils/peer";
export default {
    computed: {
        myPeerId() { return withoutPeerIdPrefix(PEER_ID) }
    }
}
</script>