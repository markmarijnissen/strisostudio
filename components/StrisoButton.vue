<template>
    <div 
        @mousedown="down" @touchstart="down"
        @mousemove="move" @touchmove="move"
        @mouseleave="up" @mouseup="up" @mouseout="up"
        @touchend="up" @touchleave="up" @touchcancel="up"
        :class="{ button: true, black: config.black, hidden: !config.note }"
        :style="buttonStyle">
            <!-- {{config.note}} -->
            <div class="dot" :style="dotStyle" v-show="isPressed">&nbsp;</div>
    </div>
</template>
<style scoped>
.dot {
    background-color: #FF000033;
    position: absolute;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    pointer-events: none;
}
.button {
  position: absolute;
  display: inline-block;
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
const clamp = (min, val, max) => Math.max(min, Math.min(val, max));
const scale = (val, scale) => val/scale;

export default {
    props: {
        config: {
            type: Object
        },
        size: {
            type: Number,
            default: Math.min(window.innerHeight, window.innerHeight) / 11,
        }
    },
    data() {
        return {
            initialpos: [0,0],
            dpos: [0,0],
            isPressed: false
        }
    },
    computed: {
        buttonStyle() {
            return {
                left: `${Math.round(this.config.x * this.size * 0.6)}px`,
                top:  `${Math.round(this.config.y * this.size * 0.6)}px`,
            }
        },
        dotStyle() {
            return {            
                left: `${this.dpos[0]}px`,
                top: `${this.dpos[1]}px`,
            }
        }
    },
    methods: {
        up(){
            this.isPressed = false;
            this.$emit("noteOff", {
                tilt: 0,
                bend: 0,
                velocity: 0
            });
            this.dpos = [0, 0];
        },
        down(e){
            this.isPressed = true;
            if(!isNaN(e.clientX)) {
                this.initialpos = [ e.clientX, e.clientY ];
            } else {   
                this.initialpos = [ e.targetTouches[0].clientX, e.targetTouches[0].clientY ];
            }
            this.$emit("noteOn", {
                tilt: 0,
                bend: 0,
                velocity: 1.0
            });
        },
        move(e) {
            if(this.isPressed) {
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
                this.$emit("move", {
                    // tilt: Math.min(this.size * 0.5, this.dpos[1] / (this.size * 0.5)), //y
                    // bend: Math.min(this.size * 0.5, this.dpos[0] / (this.size * 0.5)), //x,
                   tilt: clamp(-1, scale(this.dpos[1], this.size * 0.5), 1),
                   bend: clamp(-1, scale(this.dpos[0], this.size * 0.5), 1),
                   velocity: 1.0 // not supported
                });
            }
        }
    }
}
</script>