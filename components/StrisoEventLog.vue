<template>
    <div class="log">
        <div class="entry" v-for="(event,i) in log" :key="i"><span class="time">{{event[0]}}</span>{{event[1]}}</div>
    </div>
</template>
<style scoped>
.log {
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    padding: 10px;
    color: white;
    background-color: #333;
    max-height: 100vh;
    overflow-y: auto;
}
.time {
    display: inline-block;
    width: 100px;
    color: #bbb;
}
.log.sm {
    max-height: 100px;
    height: 100px;
}
.log.md {
    max-height: 200px;
    height: 200px;
}
.log.lg {
    max-height: 400px;
    height: 400px;
}
</style>
<script>
const lz = x => String(x).padStart(2, "0");
const lz3 = x => String(x).padStart(3, "0");

import events from "../utils/events";
export default {
    props: {
        input: String,
        limit: {
            type: Number,
            default: 1000
        }
    },
    created(){
        events.on(this.input, this.onEvent);
    },
    destroyed(){
        events.off(this.input, this.onEvent)
    },
    data() {
        return {
            log: []
        }
    },
    methods: {
        onEvent(event){
            const now = new Date();
            const current = lz(now.getHours()) + ':' + lz(now.getMinutes()) + ":" + lz(now.getSeconds()) + "." + lz3(now.getMilliseconds());
            this.log.push([current, event]);
            this.$nextTick(() => {
                this.$el.scrollTop = this.$el.scrollHeight;
            });
        }
    }
}
</script>