<template>
  <div>
    <d-compose output="striso-out" />
    <input v-model="text" type="text" /><button @click="connect(id)">connect</button>
    <!-- <striso-synth input="striso-out" /> -->
    <peer send="striso-out" :id="id" />
  </div>
</template>
<script>
import StrisoSynth from '../components/StrisoSynth.vue';
export default {
  components: { StrisoSynth },
    data() {
        return {
            id: "",
            text: "",
        }
    },
    methods: {
        connect(id) {
            this.id = this.text;
        }
    }
}
</script>