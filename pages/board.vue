<template>
  <div>
    <d-compose width="100vw" height="80vh" />
    <!-- <striso-controls /> -->
    <striso-motion-sensors/>
    <striso-synth />
  </div>
</template>
<script>
import PeerConnection from '../components/PeerConnection.vue';
import StrisoBoard from '../components/StrisoBoard.vue';
console.log("Striso Studio Build: ", new Date(process.env.build)); 
export default {
  components: { StrisoBoard, PeerConnection },
  
}
</script>