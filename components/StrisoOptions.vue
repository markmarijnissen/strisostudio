<template>
    <div class="options-panel">
        <div class="pure-g">
            <div class="pure-u-1-2">
                <h3>Input</h3>
                <p><event-gate :input="output + '-motion'" :output="output">Enable Motion Sensors</event-gate></p>
            </div>
            <div class="pure-u-1-2">
               <h3>Output</h3>
                <p><event-gate :input="output" :output="output + '-synth'">Enable Synth</event-gate></p>
            </div>
        </div>
        <div class="pure-g">
            <div class="pure-u-1-2">
                <p>My Device ID: <strong><peer-id /></strong></p>
            </div>
            <div class="pure-u-1-2">
                <p><event-gate :input="output" :output="output+'-peer'" :value="false">Send to remote device</event-gate>
                    <peer-connection />
                </p>
            </div>
        </div>
        <div class="pure-g">
            <div class="pure-u-1-2">
                <p>Midi: (todo)</p>
            </div>
            <div class="pure-u-1-2">
                <p>Midi Output<br/>
                    <midi-output :input="output" /></p>
            </div>
        </div>
        <h3>Other options</h3>
        <p>Velocity: <striso-velocity-slider :output="input" /></p>

        <button @click.prevent="$emit('close')">Close</button>
    </div>
</template>
<style scoped>
.options-panel {
    margin: 10px;
}
</style>
<script>
import EventGate from './EventGate.vue'
import PeerConnectionList from './PeerConnectionList.vue'
export default {
  components: { PeerConnectionList, EventGate },
    props: {
        input: {
            type: String,
            default: "striso-input"
        },
        output: {
            type: String,
            default: "striso-output"
        }
    }
}
</script>