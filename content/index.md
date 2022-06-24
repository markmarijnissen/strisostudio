# Striso Studio

## Apps:

- [Striso Board](./board/)

## Experiments:

- Use a tablet as input device to [send notes](./send/).
- Use a desktop to [receive notes](./receive/) and play a synth.
- A simple way to [display and play notes](./player/) on a Striso Board, useful for teaching.

## Striso Web Elements:

Build your own virtual striso app with StrisoBoard, DCompose, StrisoMotionSensors, PeerConnection, PeerSend, EventButton, StrisoNote and more custom elements.

Use cases:

- Synth Editor (integrate with Faust IDE)
- Visualize, record and playback Striso Input
- Virtual Striso to MIDI, to test MPE VST's
- Striso Academy: explain striso and d-compose note layout with interactive elements.
- Virtual MIDI cable: send MIDI from one device to another using WebRTC, which uses SCTP, which is similar to the low-latency and high-performance UDP protocol that OSC (Open Sound Control) uses.

## To Do:

- Create a `event-checkbox` element to toggle connections.
- MIDI output on the virtual striso
- Virtual MIDI cables between tablet and desktop.
- Striso Board control buttons (octave, options, glissando)
- Write documentation