<template>
    <label><input type="checkbox" v-model="inputValue"> <slot></slot></label>
</template>
<script>
import events from "../utils/events";
export default {
    props: {
        input: {
            type: String
        },
        output: {
            type: String
        },
        value: {
            type: Boolean,
            default: true
        }
    },
    created(){
        events.on(this.input, this.forward);
    },
    mounted(){
        this.inputValue = this.value;
    },
    destroyed(){
        events.off(this.input, this.forward);
    },
    data() {
        return {
            inputValue: this.value
        }
    },
    methods: {
        forward(...args) {
            if(this.inputValue) {
                events.emit(this.output, ...args);
            }
        }
    },
    watch: {
        value(value) {
            this.inputValue = value;
        }
    }
}
</script>