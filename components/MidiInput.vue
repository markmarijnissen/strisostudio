<template>
    <div>
        <select v-model="name">
            <option :value="null"></option>
            <option v-for="d in devices" :value="d.id" :key="d.id">{{d.name}}</option>
        </select>
    </div>
</template>
<script>
import midi2striso from "../utils/midi2striso";
import events from "../utils/events";
import { getInputs, getInput } from "../utils/midi";

export default {
    props: {
        output: {
            type: String,
            default: "midi-input"
        }
    },
    async created() {
        this.devices = await getInputs();
        this.name = JSON.parse(localStorage[this.id] || "null") || this.name;
    },
    computed: {
        id(){
            return `${this.output}@midi-input`;
        }
    },
    data() {
        return { name: null, input: null, devices: [] };
    },
    methods: {
        async onName(name) { 
            if(this.input) {
                this.input.disconnect(this.onMessage);
            }
            this.input = await getInput(this.id, name);
            if(this.input) {
                this.input.connect(this.onMessage);
            }
            localStorage[this.id] = JSON.stringify(name);
        },
        onMessage(msg) {
            const e = midi2striso(msg);
            events.emit(this.output, e);
        }
    },
    watch: {
       "name": "onName"
    }
    
}
</script>