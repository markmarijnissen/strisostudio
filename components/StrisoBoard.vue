<template>
    <striso-board-casing>
        <d-compose :octave="octave" :input="input" :output="output"/>
        <!-- <striso-controls /> -->
        <striso-motion-sensors :output="output" />
        <striso-synth :input="output" />
        <slot></slot>
    </striso-board-casing>
</template>
<script>
// StrisoBoard = Casing + DCompose Layout + Synth + Motion Sensors + Controls
export default {
    props: {
        input: {
            type: String,
            default: "striso-input"
        },
        output: {
            type: String,
            default: "striso-output"
        }
    },
    data() {
        return {
            octave: 2
        }
    }
}
</script>