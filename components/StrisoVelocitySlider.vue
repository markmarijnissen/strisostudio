<template>
    <input type="range" :min="0" :max="1000" v-model="velocity" @change="setVelocity" />
</template>
<script>
import { STRISO_CONFIGURE_VELOCITY } from '../utils/constants'
import events from "../utils/events";
export default {
    props: {
        output: {
            type: String,
            default: "striso-input"
        }
    },
    data(){
        return {
            velocity: 1000 // rescale [0 ... 1] to [0 ... 1000] for UI
        }
    },
    methods: {
        setVelocity() {
            events.emit(this.output, [STRISO_CONFIGURE_VELOCITY, this.velocity / 1000 ]);
        }
    }
}
</script>