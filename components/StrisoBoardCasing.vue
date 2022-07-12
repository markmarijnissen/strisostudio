<template>
    <div class="striso-board" :style="strisoBoardStyle  ">
        <slot></slot>
    </div>
</template>
<style scoped>
.striso-board {
    position: relative;
    background: beige;
    width: 192mm;
    height: 174mm;
    border-radius: 2%;
    border: 1px solid black;
}
.striso-board .dcompose-layout {
    margin: 0;
    position: absolute;
    top: 2%;
    left: 12%;
    width: 88% !important;
    height: 96% !important;
}
</style>
<script>
export default {
    computed: {
        strisoBoardStyle(){
            if(728 > window.innerWidth || 660 > window.innerHeight) {
                const h = Math.round(Math.min(window.innerHeight, window.innerWidth * 174/192));
                const w = Math.round(h / 174 * 192);
                return {
                    width: `${w}px`,
                    height: `${h}px`
                }
            } 
            return {    }
        }
    }
}
</script>