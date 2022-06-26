<template>
    <div 
        @mousedown="down" @touchstart="down"
        @mousemove="move" @touchmove="move"
        @mouseleave="up" @mouseup="up" @mouseout="up"
        @touchend="up" @touchleave="up" @touchcancel="up"
        :class="{ button: true, [config.color]: true }"
        :style="buttonStyle">
            <!-- {{config.note}} -->
            <div class="circle" :style="circleStyle" v-show="isPressed"><div class="dot" /></div>
    </div>
</template>
<style scoped>
.circle {
    position: relative;
    background-color: #FF000033;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 50%;
    pointer-events: none;
}
.dot {
    background-color: red;
    width: 5px;
    height: 5px;
    border-radius: 50%;
}
.button {
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;

  border-radius: 50%;
  border: 1px solid black;
  width: var(--size);
  height: var(--size);
  line-height: calc(var(--size) * 0.5);
  font-size: calc(var(--size) * 0.25);
  text-align: center;
  margin: 2px;
  background: #FFFFFF88;
}
.button.black {
  background: #33333388;
}
.button.hidden {
  background: #99999933;
  visibility: hidden;
}
</style>
<script>
import { STRISO_OFF, STRISO_ON, STRISO_MOVE, STRISO_SET_VELOCITY } from "../utils/constants";
import { start } from "tone";
import events from "../utils/events";
const clamp = (min, val, max) => Math.max(min, Math.min(val, max));
const scale = (val, scale) => val/scale;

export default {
    props: {
        config: {
            type: Object,
            default: {"note":"D4","noteLetter":"D","octave":4,"x":8,"y":8.3159,"color":"white"}
        },
        size: {
            type: Number,
            default: Math.min(window.innerHeight, window.innerHeight) / 11,
        },
        input: {
            type: String,
            default: "striso-input"
        },
        output: {
            type: String,
            default: "striso-output"
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            initialpos: [0,0],
            dpos: [0,0],
            isPressed: false,
            velocity: 1.0
        }
    },
    created() {
        events.on(this.input, this.onInput);
    },
    destroyed() {
        events.off(this.input, this.onInput);
    },
    computed: {
        buttonStyle() {
            return {
                left: `${Math.round(this.config.x * this.size * 0.6)}px`,
                top:  `${Math.round(this.config.y * this.size * 0.6)}px`,
            }
        },
        circleStyle() {
            const minRadius = 5;
            const radius = Math.round(minRadius + ((this.size - minRadius) * this.velocity));
            return {            
                left: `${this.dpos[0]}px`,
                top: `${this.dpos[1]}px`,
                width: `${radius}px`,
                height: `${radius}px`
            }
        }
    },
    methods: {
        onInput(e) {
            if(e[1] === this.config.note) {
                switch(e[0]){
                    case STRISO_ON:
                        this.down({ clientX: 0, clientY: 0 })
                        break;
                    case STRISO_OFF:
                        this.up();
                        break;
                    case STRISO_MOVE:
                        this.move({
                            clientX: e[2] * this.size * 0.5, 
                            clientY: e[3] * this.size * 0.5
                        });
                        break;
                }
            }
            if(e[0] === STRISO_SET_VELOCITY) {
                this.velocity = e[1];
            }
        },
        up(e){
            if(e && e.target && this.disabled) return;
            if(this.isPressed === true) {
                this.isPressed = false;
                events.emit(this.output, [ STRISO_OFF, this.config.note, 0, 0, 0]);
                this.dpos = [0, 0];
            }
        },
       async down(e){
            if(e && e.target && this.disabled) return;
            if(this.isPressed === false) {
                if(e.target) await start(); // on a real click, not simulated, unlock audio
                this.isPressed = true;
                if(!isNaN(e.clientX)) {
                    this.initialpos = [ e.clientX, e.clientY ];
                } else {   
                    this.initialpos = [ e.targetTouches[0].clientX, e.targetTouches[0].clientY ];
                }
                this.dpos = [0, 0];
                events.emit(this.output, [ STRISO_ON, this.config.note, 0,0, this.velocity ]);
            }
        },
        move(e) {
            if(e && e.target && this.disabled) return;
            if(this.isPressed === true) {
                let x = 0, y = 0;
                if(!isNaN(e.clientX)) {
                    x = e.clientX;
                    y = e.clientY;
                } else {
                    x = e.targetTouches[0].clientX;
                    y = e.targetTouches[0].clientY;
                }
                this.dpos = [ x - this.initialpos[0], y - this.initialpos[1] ];
                if(Math.abs(this.dpos[0] > 0.5 * this.size || Math.abs(this.dpos[1] > 0.5 * this.size))) {
                    this.up(e);
                    return;
                }
                events.emit(this.output, [ 
                    STRISO_MOVE, 
                    this.config.note, 
                    clamp(-1, scale(this.dpos[0], this.size * 0.5), 1), 
                    clamp(-1, scale(this.dpos[1], this.size * 0.5), 1), 
                    this.velocity
                ]);
            }
        }
    }
}
</script>