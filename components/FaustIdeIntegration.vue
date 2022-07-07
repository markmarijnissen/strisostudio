<template></template>
<script>
import faustIdeSynth from '../utils/synth/faust-ide-synth'
import { initPeer } from '../utils/peer'
import events from '../utils/events'

if(document.getElementById('input-ui')) {
  // accept peer connections, which will send 'striso-output' events as 'striso-input'
  initPeer('faust-ide')

  const peerConnection = document.createElement('peer-connection')
  const originalAudioInput = document.getElementById('input-ui')
  // originalAudioInput.replaceWith(peerConnection)
  originalAudioInput.remove();

  // replace the Faust IDE Midi Input with a Striso Midi Input element
  // const midiInput = document.createElement('midi-input')
  // midiInput.setAttribute('output', 'striso-input')
  // midiInput.classList.add('form-control', 'form-control-sm')

  const originalMidiInput = document.getElementById('select-midi-input')
  // originalMidiInput.replaceWith(midiInput)
  originalMidiInput.replaceWith(peerConnection);

  // Update text
  document.querySelector('label[for=midi-ui]').innerText = "Striso Input"

  // add a Striso Board tab to visualize the input and/or send events
  // TODO

  // listen to striso-input events, and control the DSP that the Faust IDE creates
  events.on('striso-input', faustIdeSynth.onStrisoEvent)
}
// This is an empty proponent. Just makes exporting easier from Nuxt. Using the Custom Web Component module.
export default {}
</script>