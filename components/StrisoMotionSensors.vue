<template>
    <div v-if="ui === 'text'">
            <div v-for="(label,i) in labels" :key="label">
                <div class="value">{{label}}</div>
                <div class="value">{{Number(event[i+1]).toFixed(1)}}</div>
                <div class="bar-container"><span class="bar" :style="`width: ${Math.min(100, Math.round(event[i+1] / scale[i+1] * 100))}%;`">&nbsp;</span></div>
            </div>
    </div>
</template>
<style scoped>
table {
    border-spacing: 0 !important;
    padding: 0 !important;
}
.bar-container {
    display: inline-block;
    width: 100px;
    position: relative;
    background-color: black;
    margin: 0;
}
.value {
    width: 50px;
    display: inline-block;
}
.bar {
    background-color: red;
    display: inline-block;
}

</style>
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
            event: [STRISO_MOTION, 0,0,0,0,0,0],
            labels: ["acc_x", "acc_y","acc_z","rot_x","rot_y","rot_z"],
            scale: [ 10, 10, 10, 180, 180, 180 ]
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