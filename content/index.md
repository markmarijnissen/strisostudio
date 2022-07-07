## [Virtual Striso](./board/)

- Tilt, bend, accelerometer and gyroscope input.
- Original onboad synthesizer.
- Octave switch buttons.
- Visualize note on, note off, tilt, bend and velocity.
- Connect to remote devices.
- MIDI input to visualize notes (from the hardware striso board, or a piano, etc)
- MIDI output 
- MIDI player - play and visualize MIDI files on the d-compose note layout

Compared to the hardware striso, the Virtual Striso lacks velocity, pressure and haptic feedback.

Not supported (yet):
- Glissando

## [Striso Web Components](/components/)

Create your own striso web application by connecting the Striso Board to Midi Players, Synths or other devices using a peer to peer (WebRTC) connection.

- [MIDI input logger](/components/MidiInput)
- [Visualize a MIDI file on a Striso board](/components/MidiPlayer)
- [Display the DCompose note layout with some notes](/components/StrisoNote)


## [Synth Editor](/faust/)

**Highly unstable and experimental**

Connect a (virtual) Striso the the Faust IDE, which allows you to live-edit the onboard synthesizer code! Ideally, you can immediately compile the new synthesizer into a firmware update for your striso, and update your striso.
