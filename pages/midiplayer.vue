<template>
    <div>
        <midi-player output="midi-out" url="/test.mid" />
        <striso-board input="midi-out" />
    </div>
</template>