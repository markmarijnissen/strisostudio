<template>
  <div>
    <d-compose output="striso-out" />
    <striso-synth input="striso-out" />
  </div>
</template>
<script>
console.log("Striso Studio Build: ", new Date(process.env.build)); 
export default {
  
}
</script>