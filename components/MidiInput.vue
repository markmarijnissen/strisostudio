<template>
    <div>
        <select v-model="name" @click.prevent="refresh">
            <option v-for="d in devices" :value="d.id" :key="d.id">{{d.name}}</option>
        </select>
    </div>
</template>
<script>
import JZZ from "jzz";
import events from "../utils/events";

export default {
    props: {
        output: {
            type: String,
            default: "midi-input"
        }
    },
    created() {
        JZZ().refresh().onChange().connect(this.onDeviceChange);
         this.onDeviceChange();
    },
    destroyed(){
        JZZ().onChange().disconnect(this.onDeviceChange);
    },
    data() {
        return { name: null, input: null, devices: [] };
    },
    methods: {
        refresh(){
            JZZ().refresh();
            console.log('refresh')
        },
        async onDeviceChange() {
            this.devices = await JZZ().info().inputs;
        },
        async onName(name) {
            if(this.input) {
                this.input.disconnect();
            }
            if(name) {
                this.input = await JZZ().openMidiIn(name);
                this.input.connect(this.onMessage);
            }
        },
        onMessage(msg) {
            events.emit(this.output, msg);
        }
    },
    watch: {
       "name": "onName"
    }
    
}
</script>