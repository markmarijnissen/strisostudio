<template>
    <div class="pure-menu pure-menu-horizontal">
        <nuxt-link to="/" class="pure-menu-heading pure-menu-link">Striso Studio</nuxt-link>
         <ul class="pure-menu-list">
        <li class="pure-menu-item">
            <nuxt-link to="/board/" class="pure-menu-link">vStriso</nuxt-link>
        </li>
        <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
            <a href="#" class="pure-menu-link">Web Components</a>
            <ul class="pure-menu-children">
                <li class="pure-menu-item" v-for="c in components" :key="c.link">
                    <nuxt-link :to="c.path" class="pure-menu-link">{{c.slug}}</nuxt-link>
                </li>
            </ul>
        </li>
    </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            components: [
                { path: "/components/", slug: "Getting Started" },
                { path: "/components/StrisoBoard", slug: "StrisoBoard" },
                { path: "/components/StrisoBoardCasing", slug: "StrisoBoardCasing" },
                { path: "/components/DCompose", slug: "DCompose" },
                { path: "/components/StrisoSynth", slug: "StrisoSynth" },
                { path: "/components/StrisoMotionSensors", slug: "StrisoMotionSensors" },
                { path: "/components/StrisoNote", slug: "StrisoNote" },
                { path: "/components/StrisoVelocitySlider", slug: "StrisoVelocitySlider" },
                { path: "/components/StrisoEventLog", slug: "StrisoEventLog" },
                { path: "/components/MidiInput", slug: "MidiInput" },
                { path: "/components/MidiOutput", slug: "MidiOutput" },
                { path: "/components/MidiPlayer", slug: "MidiPlayer" },
                { path: "/components/PeerConnection", slug: "PeerConnection" },
                { path: "/components/PeerId", slug: "PeerId" },
                { path: "/components/PeerSend", slug: "PeerSend" },
                { path: "/components/EventButton", slug: "EventButton" },
                { path: "/components/EventGate", slug: "EventGate" },
            ]
        }
    }
}
</script>