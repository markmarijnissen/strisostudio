<template></template>
<script>
import events from "../utils/events";
import synth from "../utils/synth/striso-synth";

export default {
    props: {
        input: {
            type: String,
            default: "striso-output"
        }
    },
    created(){
        events.on(this.input,synth.onStrisoTouch);
    },
    destroyed(){
        events.off(this.input,synth.onStrisoTouch);
    },
}
</script>