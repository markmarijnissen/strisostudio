<template></template>
<script>
import { send } from "../utils/peer";
export default {
    props: {
        input: String,
        as: String
    },
    created(){
        send(this.input, this.as || this.input);
    }
}
</script>