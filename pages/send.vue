<template>
  <div>
    <d-compose  width="100vw" height="80vh" />
    <striso-motion-sensors/>
    Device ID for receiver: <peer-id />
    <peer-send input="striso-output" as="peer-input" />
  </div>
</template>