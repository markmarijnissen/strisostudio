<template>
    <div>
        <striso-board-casing v-show="!showOptions">
            <d-compose :octave="octave" :input="input" :output="output" :initial-velocity="initialVelocity"/>
            <striso-controls @options="showOptions = true"/>
            <striso-motion-sensors :output="output + '-motion'" />
            <striso-synth :input="output + '-synth'" />
            <peer-send :input="output + '-peer'" :as="input" />
            <slot></slot>
        </striso-board-casing>
        <div v-show="showOptions">
            <slot name="options">
                <striso-options :input="input" :output="output" @close="showOptions = false"/>
            </slot>
            <a href="#" class="close" @click.prevent="showOptions = false">&times;</a>
        </div>
    </div>
</template>
<style scoped>
.close {
    position: absolute;
    top: 0px;
    right: 5px;
    color: #ccc;
    font-size: 40px;
    line-height: 40px;
    text-decoration: none;
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
            default: "striso-input"
        },
        output: {
            type: String,
            default: "striso-output"
        },
        initialVelocity: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            octave: 2,
            showOptions: false
        }
    }
}
</script>