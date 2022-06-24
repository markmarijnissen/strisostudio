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
    top: 5mm;
    left: 25mm;
    bottom: 15mm;
    height: 164mm;
    width: 164mm;
}
</style>
<script>
export default {
    computed: {
        strisoBoardStyle(){
            if(728 > window.innerWidth || 660 > window.innerHeight) {
                const h = Math.round(Math.min(window.innerHeight, window.innerWidth * 174/192));
                const w = Math.round(h / 174 * 192);
                console.log(w,h);
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