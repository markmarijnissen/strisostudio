<template>
    <div>
        <p>My ID: {{id}}</p>
        <ul>
            <li v-for="(msg,i) in messages" :key="i">{{msg}}</li>
        </ul>
        
        <p>Target ID: <input class="border p-1" v-model="targetID" type="text" /></p>
        <p><button class="border p-1" @click="connect">Connect</button> {{ hasConn ? "✅" : "❌" }}</p>
        <p>Input: <input type="text" class="border p-1" v-model="text" /></p>
        <p><button @click="send" class="border p-1">Send</button></p>
    </div>
</template>
<script>
import { Peer } from "peerjs";
export default {
    mounted(){
        this.peer = new Peer();
        this.peer.on('open', (id) => {
            this.id = id;
        })
        this.peer.on('connection', conn => {
            this.conn = conn;
            this.conn.on('data', this.onData);
        })
    },
    computed: {
        hasConn() {
        return !!this.conn;
        }
    },
    data() {
        return {
            id: "",
            targetID: "",
            text: "",
            messages: [],
            peer: null,
            conn: null
        }
    },
    methods: {
        send() {
            this.conn.send(this.text);
        },
        connect(){
            this.conn = this.peer.connect(this.targetID);
            this.conn.on('data', this.onData);
        },
        onData(msg) {
            this.messages.push(msg);
        }
    }
}
</script>