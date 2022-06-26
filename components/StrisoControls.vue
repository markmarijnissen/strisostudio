<template>
    <div class="striso-controls" :style="`--button-size: ${buttonSize}`">
        <div class="title">vStriso</div>
        <div :class="{ led: true, active: glissando }"></div>
        <button :class="{ glissando: true, active: glissando }" @click.prevent="onGlissando"></button>
        <div class="octave">
            <!-- <div :class="{ 'octave-led'  : true, active: octave >= 5 }"></div> -->
            <div :class="{ 'octave-led'  : true, active: octave >= 4 }"></div>
            <div :class="{ 'octave-led'  : true, active: octave >= 3 }"></div>
            <button class="octave up" @click.prevent="onUp">▲</button>
            <button class="octave down" @click.prevent="onDown">▼</button>
            <div :class="{ 'octave-led'  : true, active: octave <= 1 }"></div>
            <div :class="{ 'octave-led'  : true, active: octave <= 0 }"></div>
        </div>
        <button class="options" @click.prevent="onOptions"></button>
    </div>
</template>
<style scoped>
    .title {
        transform: rotate(-21deg) skewX(-21deg);
        font-size: calc(var(--button-size) * 0.5);
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;
        padding-left: calc(var(--button-size) * 0.2);
    }
    .striso-controls{
        display: flex;
        align-items: center;
        flex-direction: column;
        align-content: space-around;
        width: 12%;
        height: 100%;
        justify-content: space-around;
        --button-size: 50px;
    }
    .octave {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .up, .down {
        margin-bottom:5px;
    }
    .up {
        margin-top: 2px;
    }
    .octave-led {
        background-color: transparent;
        width: 100%;
        height: 5px;
        margin: 2px 0;
        border: 1px solid transparent;
    }
    .octave-led.active {
        background-color: red;
        border-color: black;
    }
    .striso-controls .led {
        width: calc(var(--button-size) * 0.5);
        height: calc(var(--button-size) * 0.5);
        border-radius: 50%;
        background-color: black;
        border: 1px solid black;
    }
    .striso-controls .led.active {  
        background-color: greenyellow;
    }
    .striso-controls button {
        background: white;
        border: 1px solid black;
        width: var(--button-size);
        height: var(--button-size);
        line-height: var(--button-size);
        font-size: calc(var(--button-size) * 0.8);
        /* box-shadow: 3px 3px black; */
    }
    .striso-controls button:hover {
        background: #eee;
    }
    .striso-controls button:active, .striso-controls button.active {
        box-shadow: none;
        position: relative;
        /* top: 3px; */
        /* left: 3px; */
    }
    .striso-controls .glissando {
        border-radius: 50%;
    }
</style>
<script>
import { STRISO_DOWN, STRISO_GLISSANDO, STRISO_OPTIONS, STRISO_UP } from '../utils/constants';
import events from "../utils/events";
export default {
    props: {
        output: {
            type: String,
            default: "striso-input"
        }
    },
    mounted() {
        this.setSize();
    }, 
    data() {
        return {
            glissando: false,
            octave: 2,
            buttonSize: '30px'
        }
    },
    methods: {
        setSize(){
            this.buttonSize = `${this.$el.clientWidth * 0.5}px`;
        },
        onUp(){
            this.octave = Math.min(4, this.octave + 1);
            events.emit(this.output, [ STRISO_UP, this.octave ]);
            this.$emit("up", this.octave);
        },
        onDown(){
            this.octave = Math.max(0, this.octave - 1);
            events.emit(this.output, [ STRISO_DOWN, this.octave  ]);
            this.$emit("down", this.octave);
        },
        onOptions(){
            events.emit(this.output, [ STRISO_OPTIONS ]);
            this.$emit("options");            
        },
        onGlissando(){
            this.glissando = !this.glissando;
            events.emit(this.output, [ STRISO_GLISSANDO, this.glissando ]);
            this.$emit("glissando", this.glissando);
        }
    }
}
</script>