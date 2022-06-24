<template>
    <button @click="trigger"><slot>Click</slot></button>
</template>
<script>
import events from "../utils/events";
export default {
    props: {
        output: {
            type: String,
            default: "event-button"
        },
        event: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        trigger(){
            events.emit(this.output, this.event);
        }
    }
}
</script>