# Striso Web Components

For advanced users, it is possible to create your own Striso Web Apps using custom web-components.

To get started, include the striso web-components javascript to your page as follows.

```html
<script src="https://strisostudio.web.app/lib/striso/striso.modern.js" />
```

This will make custom web compoments available. For example, you can render a DCompose note layout that sends output to a synth:

```html
<d-compose output="striso-out" />
<striso-synth input="striso-out" />
``` 

Under the hood, these web compoments communicate using a global event bus:

```javascript
// DCompose emits events
StrisoEvents.emit('striso', [ STRISO_ON, "D4", 0, 0, 127 ]);
// Synth listens to them
StrisoEvents.on('striso', function(event) { });
```

By connecting web component with eachother using their `input`s and `output`s, you can create a custom application.

## Going beyond the default striso web components

If you have modern web-development skills, you can go one step further and extend, edit and create new web components. Striso Studio is created as [Nuxt](https://nuxtjs.org/) web application that uses the [Vue](https://vuejs.org/) framework, and available as [open source on Github](https://github.com/markmarijnissen/strisostudio). Pull Requests are welcome!

## List of components

- [StrisoBoard](/components/StrisoBoard) to add the entire board, consisting of these components:
  - [DCompose](/components/DCompose) to render the DCompose note layout
  - [StrisoBoardCasing](/components/StrisoBoardCasing) to display the striso board casing
  - [StrisoControls](/components/StrisoControls) to add buttons to the casing
  - [StrisoMotionSensors](/components/StrisoMotionSensors) to use accelerometer and gyroscope
  - [StrisoNote](/components/StrisoNote) to visualize or play notes
  - [StrisoSynth](/components/StrisoSynth) to add the onboard synth
  - [StrisoVelocitySlide](/components/StrisoVelocitySlider) to manually set velocity of the virtual striso board
- [PeerConnection](/components/PeerConnection) to create a peer-to-peer connection between two devices
  - [PeerId](/components/PeerId) to show your device ID
  - [PeerSend](/components/PeerSend) to send certain events to another device
- Midi utilities:
  - [MidiInput](/components/MidiInput) to translate Midi input to Striso events
  - [MidiOutput](/components/MidiOutput) to send Striso Events as midi output
  - [MidiPlayer](/components/MidiPlayer) to play midi files on a striso board
- UI utilities
  - [EventButton](/components/EventButton) to trigger an event (e.g. play a midi file)
  - [EventGate](/components/EventGate) to connect/disconnect elements in the app, for example you can use this to turn on/off output to MIDI or the synth.

