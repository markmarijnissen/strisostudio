<template>
  <div>
    <striso-board  />
    <midi-player class="midi-player" />
  </div>
</template>
<style>
.midi-player {
  padding: 5px;
  margin-top: 5px;
}
</style>
<script>
import MidiOutput from '../components/MidiOutput.vue';
import PeerConnection from '../components/PeerConnection.vue';
import StrisoBoard from '../components/StrisoBoard.vue';
console.log("Striso Studio Build: ", new Date(process.env.build)); 
export default {
  components: { StrisoBoard, PeerConnection, MidiOutput },
  
}
</script>