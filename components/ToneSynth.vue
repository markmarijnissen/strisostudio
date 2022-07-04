<template></template>
<script>
import events from "../utils/events";
import synth from "../utils/synth/tone-synth";

export default {
    props: {
        input: {
            type: String,
            default: "striso-output"
        }
    },
    created(){
        events.on(this.input,synth.onStrisoEvent);
    },
    destroyed(){
        events.off(this.input,synth.onStrisoEvent);
    },
}
</script>