<template>
    <div>
        <h1>Receive</h1>
        <p>{{peerId}}</p>
        <button @click="enableSound">SOUND</button>
        <peer receive="striso-out" />
        <striso-synth input="striso-out" />
    </div>
</template>
<script>
import { peerId } from "../utils/peer";
import { start } from "tone";

export default {
    computed: {
        peerId() { return peerId.slice(13) }
    },
    methods: {
        async enableSound(){
            await start();
        }
    }
}
</script>