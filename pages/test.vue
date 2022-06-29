<template>
    <div>
        <midi-input :output="this.input" />
        <ol>
            <li v-for="(msg,i) in log" :key="i">{{msg}}</li>
        </ol>
    </div>
</template>
<script>
import events from "../utils/events";
export default {
    props: {
        input: {
            type: String,
            default: "midi-input"
        }  
    },
    created(){
        events.on(this.input, this.onMessage);
    },
    destroyed(){
        events.off(this.input, this.onMessage);
    },
    data(){
        return {
            log: [],
        }
    },
    methods: {
        onMessage(msg) {
            this.log.push(msg.toString());
        }
    }
}
</script>