<template>
    <div v-if="ui === 'text'">
        <p>{{event}}</p>
    </div>
</template>
<script>
import { STRISO_MOTION } from "../utils/constants";
import events from "../utils/events";
export default {
    props: {
        ui: {
            type: String,
            default: "none"
        },
        output: {
            type: String,
            default: "striso-output"
        }
    },
    created(){
        window.addEventListener("devicemotion", this.onMotion);
    },
    destroyed(){
        window.removeEventListener("devicemotion", this.onMotion);
    },
    data(){
        return {
            event: [STRISO_MOTION, 0,0,0,0,0,0]
        }
    },
    methods: {
        onMotion(e) {
            const a = e.acceleration;
            const r = e.rotationRate;
            this.event = [STRISO_MOTION, a.x, a.y, a.z, r.alpha, r.beta, r.gamma];
            events.emit(this.output, this.event);
        }
    }
}
</script>