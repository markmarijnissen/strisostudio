<template>
    <button v-if="ui && !soundEnabled" @click.prevent="start">Enable sound</button>
</template>
<script>
import events from "../utils/events";
import synth from "../utils/synth/striso-synth";
import { start } from "tone";

export default {
    props: {
        input: {
            type: String,
            default: "striso-output"
        },
        ui: {
            type: String,
            default: ""
        }
    },
    created(){
        events.on(this.input,synth.onStrisoEvent);
    },
    destroyed(){
        events.off(this.input,synth.onStrisoEvent);
    },
    created(){
        start().then(() => {
            this.soundEnabled = true;
        })
    },
    data() {
        return {
            soundEnabled: false
        }
    },
    methods: {
        start
    }
}
</script>