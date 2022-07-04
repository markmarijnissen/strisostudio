<template>
    <div>
        <select v-model="name">
            <option :value="null"></option>
            <option v-for="d in devices" :value="d.id" :key="d.id">{{d.name}}</option>
        </select>
    </div>
</template>
<script>
import JZZ from "jzz";
import { getOutputs } from "../utils/midi";
import midiSynth from "../utils/synth/midi-synth";
import events from "../utils/events";
window.JZZ = JZZ;

export default {
    props: {
        input: {
            type: String,
            default: "midi-output"
        }
    },
    async created() {
        this.devices = await getOutputs();
        events.on(this.input, this.onInput);
        this.name = JSON.parse(localStorage[this.id] || "null") || this.name;
    },
    destroyed(){
        events.off(this.input, this.onInput);
    },
    computed: {
        id(){
            return `${this.input}@midi-output`;
        }
    },
    data() {
        return { name: null, midiSynth: null, devices: [] };
    },
    methods: {
        async onName(name) {
            if(this.midiSynth) {
                this.midiSynth.destroy();
            }
            if(name) {
                this.midiSynth = await midiSynth(this.instanceId, name);
            }
            localStorage[this.id] = JSON.stringify(name);
        },
        onInput(e) {
            if(this.midiSynth) {
                this.midiSynth.onStrisoEvent(e);
            }
        }
    },
    watch: {
       "name": "onName"
    }
    
}
</script>