<template>
  <striso-board-casing>
    <d-compose
      :octave="octave"
      :input="input"
      :output="output"
      :initial-velocity="initialVelocity"
       v-show="!showOptions"
    />
    <striso-controls 
        :output="input"
        @options="showOptions = true"  
        v-show="!showOptions" 
    />
    <striso-motion-sensors :output="output + '-motion'" />
    <striso-synth :input="output + '-synth'" />
    <peer-send :input="output + '-peer'" :as="input" />
    <slot></slot>
    <div v-show="showOptions">
      <slot name="options">
        <div class="options-panel">
          <h2>vStriso Options</h2>
          <div class="pure-g">
            <div class="pure-u-1-2">
              <h3>Input</h3>
              <p>
                <event-gate :input="output + '-motion'" :output="output"
                  >Enable Motion Sensors</event-gate
                >
              </p>
            </div>
            <div class="pure-u-1-2">
              <h3>Output</h3>
              <p>
                <event-gate :input="output" :output="output + '-synth'"
                  >Enable Synth</event-gate
                >
              </p>
            </div>
          </div>
          <div class="pure-g">
            <div class="pure-u-1-2">
              <p>
                Receive from remote device.<br/>
                My Device ID: <strong><peer-id /></strong>
              </p>
            </div>
            <div class="pure-u-1-2">
              <p>
                <event-gate
                  :input="output"
                  :output="output + '-peer'"
                  :value="false"
                  >Send to remote device</event-gate
                >
                <peer-connection />
              </p>
            </div>
          </div>
          <div class="pure-g">
            <div class="pure-u-1-2">
              <p>
                Midi Input<br />
                <midi-input :output="input" />
              </p>
            </div>
            <div class="pure-u-1-2">
              <p>
                Midi Output<br />
                <midi-output :input="output" />
              </p>
            </div>
          </div>
          <div class="pure-g">
            <div class="pure-u-1-2">
                <p>Velocity<br/><striso-velocity-slider :output="input" /></p>
            </div>
          </div>
          <div class="pure-g">
            <div class="pure-u-1-2">
                <button @click.prevent="showOptions = false">Back to vStriso</button>
            </div>
          </div>
        </div>
      </slot>
      <a href="#" class="close" @click.prevent="showOptions = false">&times;</a>
    </div>
  </striso-board-casing>
</template>
<style scoped>
.close {
  position: absolute;
  top: 0px;
  right: 5px;
  color: black;
  font-size: 40px;
  line-height: 40px;
  text-decoration: none;
}
.options-panel {
    padding-left: 20px;
}
</style>
<script>
import EventGate from './EventGate.vue'
// StrisoBoard = Casing + DCompose Layout + Synth + Motion Sensors + Controls
export default {
  components: { EventGate },
  props: {
    input: {
      type: String,
      default: 'striso-input',
    },
    output: {
      type: String,
      default: 'striso-output',
    },
    initialVelocity: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      octave: 2,
      showOptions: false,
    }
  },
}
</script>