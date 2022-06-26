<template>
  <div class="dcompose-layout" :style="`--size: ${size}px; height: ${height}; width: ${width};`">
    <StrisoButton :config="btn" v-for="(btn,i) in buttons" 
      :key="i" 
      :size="size"
      :input="input"
      :output="output"
      :disabled="disabled"
      @wheel.passive="disableZoom"
      />
  </div>
</template>
<style scoped>
.dcompose-layout {
  min-height: 200px;
  position: relative;
  user-select: none;
}
</style>
<script>
import { STRISO_UP, STRISO_DOWN } from '../utils/constants';
import dcomposeLayout from "../utils/dcompose";
import events from "../utils/events";

// disable right-click when there is a dcompose board mounted
let strisoBoardMounted = 0;
document.oncontextmenu = function() {
  return strisoBoardMounted === 0;
}

export default {
  props: {
      octave: {
          type: Number,
          default: 2
      },
      input: {
          type: String,
          default: "striso-input"
      },
      output: {
          type: String,
          default: "striso-output"
      },
      width: {
        type: String,
        default: "100%"
      },
      height: {
        type: String, 
        default: "100%"
      },
      disabled: {
        type: Boolean,
        default: false
      }
  },
  computed: {
    buttons() {
      return dcomposeLayout(this.actualOctave)
    }
  },
  data() {
    return {
      size:  30,
      actualOctave: this.octave
    }
  },
  mounted() {
    window.addEventListener('resize', this.setSize);
    events.on(this.input, this.onInput);
    this.setSize();
    strisoBoardMounted++;
  },
  unmounted() {
    window.removeEventListener('resize', this.setSize);
    events.off(this.input, this.onInput);
    strisoBoardMounted--;
  },
  methods: {
    onInput(e) {
      if(e[0] === STRISO_UP || e[0] === STRISO_DOWN) {
        this.actualOctave = e[1];
      }
    },
    setSize() {
      this.size =  Math.min(this.$el.clientHeight, this.$el.clientWidth) / 11;
    },
    disableZoom(e) {
      if (e.ctrlKey) {
          e.preventDefault();
          return
      }
    }
  },
  watch: {
    width: "setSize",
    height: "setSize",
  }
}
</script>