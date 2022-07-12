<template>
    <div>
        <div class="io">
            <midi-input output="launchpad-input"  :striso="false" />
            <midi-output input="launchpad-output" :striso="false" />
        </div>
        <div class="launchpad">
            <button 
                v-for="b in buttons" :key="b.note" 
                :style="`background-color: #${Number(b.color).toString(16).padStart(6, '0')}`"
                @click.prevent="onClick(b)"
                >
            </button>
        </div>
        Led Input
        <striso-event-log class="sm" input="launchpad-input" />
        Button Output
        <striso-event-log class="sm" input="launchpad-output" />
    </div>
</template>
<style scoped>
.launchpad {
    display: grid;
    grid-template: repeat(8, 1fr) / repeat(8, 1fr);
    width: calc(100vw - 20px)
}
button {
    width: calc((100vw - 20px) / 8);
    height: calc((100vw - 20px) / 8);
    color: white;
    border-radius: 0;
    border: 1px solid white;
}
button:hover {
    opacity: 0.85;
}
button:active {
    opacity: 0.75;
}
</style>
<script>
import events from "../utils/events";
import { getOutput, getInput } from "../utils/midi";
import JZZ from "jzz";
import MidiInput from './MidiInput.vue';

export default {
    async created() {
        // this.midiIn = await getInput("launchpad","loopMIDI Port");
        // this.midiIn.connect(this.onMidiMessage);
        // this.midiOut = await getOutput("launchpad", "Playtime");
        events.on("launchpad-input", this.onMidiMessage);
    },
    destroyed(){
        events.off("launchpad-input", this.onMidiMessage);
        // if(this.midiIn) {
        //     this.midiIn.disconnect();
        // }
    },
    data(){
        const buttons = [];
        const grid = {};
        for(let y = 0; y < 8; y++) {
            for(let x = 0; x < 8; x++) {
                const btn = {
                    x,
                    y,
                    note: (16 * y) + x,  // mini
                    // note: (10 * (y+1)) + (x+1), MK
                    color: 0x000000
                };
                buttons.push(btn);
                grid[btn.note] = btn;
            }
        }
        return {
            buttons,
            grid
        }
    },
    methods: {
        onClick(button) {
            // this.midiOut.send(JZZ.MIDI.noteOn(0, button.note, 127));
            // this.midiOut.send(JZZ.MIDI.noteOn(0, button.note, 0));
            events.emit("launchpad-output", JZZ.MIDI.noteOn(0, button.note, 127));
            events.emit("launchpad-output", JZZ.MIDI.noteOn(0, button.note, 0));
        },
        onMidiMessage(msg) {
            if(msg.isNoteOff()) {
                const note = msg.getNote();
                if(this.grid[note]) {
                    this.grid[note].color = 0x000000;
                }
            } else if(msg.isNoteOn()) {
                const note = msg.getNote();
                if(this.grid[note]) {
                    const g = ((0b110000 & msg[2]) >> 4) / 0b11 * 0xFF;
                    const r = (0b000011 & msg[2]) / 0b11 * 0xFF;
                    const b = 0;
                    this.grid[note].color = r << 16 | g << 8 | b
                }
            }
        }
    }
}
</script>