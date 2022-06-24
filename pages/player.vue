<template>
  <div>
    <striso-board>
      <striso-note input="play" note="C4" />
      <striso-note input="play" note="E4" :t="3" />
      <striso-note input="play" note="G4" :t="6" />
      <striso-note input="play" off note="C4,E4,G4" :t="10" />
    </striso-board>

    <event-button output="play">Play</event-button>
  </div>
</template>
<script>
import StrisoBoard from '../components/StrisoBoard.vue';
console.log("Striso Studio Build: ", new Date(process.env.build)); 
export default {
  components: { StrisoBoard },
  
}
</script>