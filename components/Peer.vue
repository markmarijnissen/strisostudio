<template></template>
<script>
import { createPeerConnection, destroyPeerConnection } from "../utils/peer";

export default {
    props: {
        id: {
            type: String
        },
        send: {
            type: String
        },
        receive: {
            type: String
        }
    },
    data() {
        return {
            instanceId: Math.round(Math.random() * 1e8)
        }
    },
    created(){
        this.connect();
    },
    destroyed(){
        destroyPeerConnection({
            instanceId: this.instanceId
        })
    },
    methods: {
        connect(){
            createPeerConnection({
                id: this.id,
                send: this.send,
                receive: this.receive,
                instanceId: this.instanceId
            });
        }
    },
    watch: {
        id: "connect",
        send:"connect",
        receive:"connect"
    }
}
</script>