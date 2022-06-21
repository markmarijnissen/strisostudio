<template>
  <div class="striso-board" :style="`--size: ${size}px; height: ${size * 11}px;`">
    <StrisoButton :config="btn" v-for="(btn,i) in buttons" 
      :key="i" 
      :size="size"
      @noteOn="$event => noteOn(btn, $event)"
      @noteOff="$event => noteOff(btn, $event)"
      @move="$event => move(btn, $event)"
      @wheel.passive="disableZoom"
      />
  </div>
</template>
<style scoped>
.striso-board {
  position: relative;
  user-select: none;
  width: 100%;
  /* border-radius: 3%;git */
  background-color: beige;
  border: 1px solid #747457;
}

</style>
<script>
import dcompose from "../utils/dcompose";
import synth from "../utils/striso-synth";

let strisoBoardMounted = 0;
document.oncontextmenu = function() {
  return strisoBoardMounted === 0;
}

export default {
  data() {
    return {
      size:  Math.min(window.innerHeight, window.innerWidth) / 11,
      buttons: dcompose,
    }
  },
  mounted() {
    console.log("Striso Studio Build: ", new Date(process.env.build));
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
    noteOn(btn, e) {
      synth.noteOn(btn, e);
    },
    noteOff(btn, e) {
      synth.noteOff(btn, e);
    },
    move(btn, e) {
      synth.move(btn, e);
    },
    disableZoom(e) {
      if (e.ctrlKey) {
          e.preventDefault();
          return
      }
    }
    
  }
}
</script>