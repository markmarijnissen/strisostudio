# StrisoBoard

Renders a virtual Striso Board:

- [StrisoBoardCasing](/components/StrisoBoardCasing)
- [DCompose](/components/DCompose), the note layout
- [StrisoControls](/components/StrisoControls), the glissando, up, down and options buttons and leds.
- [StrisoMotionSensors](/components/StrisoMotionSensors), accelerometer and gyroscope sensors
- [StrisoSynth](/components/StrisoSynth), the onboard synth.
- [PeerSend](/components/PeerSend), sends the striso touch events to another device using a peer-to-peer connection similar to OSC (WebRTC).
- [MidiInput](/components/MidiInput), receive MIDI input to visualize notes.
- [MidiOutput](/components/MidiOutput), send MIDI to a DAW.

## Input Events

```javascript
[ STRISO_ON, note, bend, tilt, velocity ]
[ STRISO_OFF, note, bend, tilt, velocity ]
[ STRISO_MOVE, note, bend, tilt, velocity ]
[ STRISO_UP, octave ]
[ STRISO_DOWN, octave ]
[ STRISO_CONFIGURE_VELOCITY, velocity ]
```

Can also read these from MIDI or a remote device that is connected peer-to-peer (if configured in the options).

## Output Events

```javascript
[ STRISO_ON, note, bend, tilt, velocity ]
[ STRISO_OFF, note, bend, tilt, velocity ]
[ STRISO_MOVE, note, bend, tilt, velocity ]
[ STRISO_MOTION, acc_x, acc_y, acc_z, rot_x, rot_y, rot_z ]
```

Will send these to the onboard synth, MIDI and a remote device (if configured in the options).

## Attributes

- `input`
- `output`

## Example

```html
<striso-board input="striso-in" output="striso-out" />
```

<striso-board input="striso-in" output="striso-out" />

