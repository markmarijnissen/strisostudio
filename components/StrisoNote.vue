<template></template>
<script>
import { STRISO_ON, STRISO_OFF, STRISO_MOVE } from '../utils/constants'
import events from '../utils/events'
export default {
  props: {
    input: {
      type: String,
      default: '',
    },
    output: {
      type: String,
      default: 'striso-input',
    },
    t: {
      type: Number,
      default: 0,
    },
    on: {
      type: Boolean,
      default: false,
    },
    move: {
      type: Boolean,
      default: false,
    },
    off: {
      type: Boolean,
      default: false,
    },
    note: {
      type: String,
      default: 'D4',
    },
    tilt: {
      type: Number,
      default: 0,
    },
    bend: {
      type: Number,
      default: 0,
    },
    velocity: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    if(this.input.length === 0) {
        this.trigger();
    }
  },
  created(){
    if(this.input.length > 0) {
      events.on(this.input, this.trigger);
    }
  },
  destroyed(){
    if(this.input.length > 0){
      events.off(this.input, this.trigger);
    }
  },
  methods: {
    trigger() {
      setTimeout(() => {
        let msg = STRISO_ON
        if (this.off) msg = STRISO_OFF
        if (this.move) msg = STRISO_MOVE
        this.note.split(',').forEach((note) => {
          events.emit(this.output, [
            msg,
            note,
            this.velocity,
            this.bend,
            this.tilt,
          ])
        })
      }, this.t * 1000)
    },
  },
}
</script>