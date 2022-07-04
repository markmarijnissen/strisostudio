<template>
    <div>
        <div v-if="!url"><input type="file" @change="onSelectFile" /></div>
        <button v-if="!isPlaying" @click.prevent="play">▶️</button>
        <button v-else @click.prevent="pause">⏸︎</button>
        <button @click.prevent="stop">⏹️</button>
        <input type="range" :min="0" :max="duration" v-model="time" @change="setTime" @focus="pause" />
    </div>
</template>
<style scoped>
    button {
        font-family: "Segoe UI Symbol";
        font-size: 22px;
        margin: 0;
        padding: 0;
        background: transparent;
        border: none;
    }
</style>
<script>
import events from "../utils/events";
import { midi2striso } from "../utils/convert-striso-event";
import JZZ from "jzz";
import SMF from "jzz-midi-smf";
SMF(JZZ);

export default {
    props: {
        output: {
            type: String,
            default: "striso-input"
        },
        url: String
    },
    data(){
        return {
            isPlaying: false,
            time: 0,
            duration: 1000
        }
    },
    async created(){
        if(this.url) {
            const res = await fetch(this.url);
            const blob = await res.blob();
            const buffer = await blob.arrayBuffer();
            this.loadMidiData(buffer);
        }
    },
    methods: {
        play(){
            if(this.player) {
                this.player.resume();
                this.isPlaying = true;
            }
        },
        pause(){
            if(this.player) {
                this.player.pause();
                this.isPlaying = false;
            }
        },
        stop(){
            if(this.player) {
                this.player.stop();
                this.isPlaying = false;
            }
        },
        setTime() {
            if(this.player) {
                this.player.jump(Math.round(this.time));
            }
        },
        onSelectFile(e) {
            const reader = new FileReader();
            const file = e.target.files[0];
            if(file) {
                reader.onload = (e) => {
                    this.loadMidiData(e.target.result);
                    this.play();
                }
                reader.readAsArrayBuffer(file);
            }
        },
        loadMidiData(data) {
            if(this.player) this.player.stop();
            this.player = JZZ.MIDI.SMF(data).player();
            this.player.connect(this.onMessage);
            this.player.onEnd = () => this.isPlaying = false;
            this.duration = this.player.duration();
        },
        
        onMessage(msg) {
            const e = midi2striso(msg);
            if(this.output && e) events.emit(this.output, e);
            if(this.isPlaying) {
                this.time = Math.round(this.player.position());
            }
        }
    }
}
</script>