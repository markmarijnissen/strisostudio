<template>
    <div>
        <select v-model="name" @click.prevent="refresh">
            <option v-for="d in devices" :value="d.id" :key="d.id">{{d.name}}</option>
        </select>
    </div>
</template>
<script>
import JZZ from "jzz";
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
    created() {
        JZZ().onChange().connect(this.onDeviceChange).refresh();
        this.onDeviceChange();
        events.on(this.input, this.onInput);
    },
    destroyed(){
        JZZ().onChange().disconnect(this.onDeviceChange);
        events.off(this.input, this.onInput);
    },
    data() {
        return { name: null, midiSynth: null, devices: [] };
    },
    methods: {
        refresh(){
            JZZ().refresh();
            this.onDeviceChange();
        },
        async onDeviceChange() {
            this.devices = await JZZ().info().outputs;
        },
        async onName(name) {
            if(this.midiSynth) {
                this.midiSynth.destroy();
            }
            if(name) {
                this.midiSynth = await midiSynth(name)
            }
        },
        onInput(e) {
            if(this.midiSynth) {
                this.midiSynth.onStrisoTouch(e);
            }
        }
    },
    watch: {
       "name": "onName"
    }
    
}
</script>