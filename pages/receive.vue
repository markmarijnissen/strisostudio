<template>
    <div>
        <h1>Receiver - Visualizer &amp; Synth</h1>
        <button @click="enableSound" v-if="!enabled">Enable Sound</button>
        <p>Enter the ID of the sending device:</p>
        <peer-connection />
        <peer-connection-list />
        <striso-synth input="peer-input" />
        <d-compose input="peer-input" />
    </div>
</template>
<script>
import { start } from "tone";

export default {
    data(){
        return {
            enabled: false
        }
    },
    methods: {
        async enableSound(){
            await start();
            this.enabled = true;
        }
    }
}
</script>