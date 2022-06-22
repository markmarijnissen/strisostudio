<template>
  <div class="dcompose-layout" :style="`--size: ${size}px; height: ${size * 11}px;`">
    <StrisoButton :config="btn" v-for="(btn,i) in buttons" 
      :key="i" 
      :size="size"
      :input="input"
      :output="output"
      @wheel.passive="disableZoom"
      />
  </div>
</template>
<style scoped>
.dcompose-layout {
  position: relative;
  user-select: none;
}
</style>
<script>
import dcomposeLayout from "../utils/dcompose";

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
      }
  },
  computed: {
    buttons() {
      return dcomposeLayout(this.octave)
    }
  },
  data() {
    return {
      size:  Math.min(window.innerHeight, window.innerWidth) / 11
    }
  },
  mounted() {
    window.addEventListener('resize', this.setSize);
    strisoBoardMounted++;
  },
  unmounted() {
    window.removeEventListener('resize', this.setSize);
    strisoBoardMounted--;
  },
  methods: {
    setSize() {
      this.size =  Math.min(window.innerHeight, window.innerWidth) / 11;
    },
    disableZoom(e) {
      if (e.ctrlKey) {
          e.preventDefault();
          return
      }
    }
  },
}
</script>