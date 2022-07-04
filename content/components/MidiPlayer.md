# MidiPlayer

Play a MIDI file from your hard disk, or from an URL.

## Attributes

- `url`: URL of the MIDI file to load (optional)
- `output`: Striso Events

## Example (URL)

```html
<midi-player url="/test.mid" output="midi"></midi-player>
<striso-synth input="midi"  ui="true"></striso-synth>
<d-compose input="midi"></d-compose>
```

<midi-player url="/test.mid" output="midi"></midi-player>
<striso-synth input="midi" ui="true"></striso-synth>
<d-compose input="midi"></d-compose>

## Example (File)

```html
<midi-player output="midi"></midi-player>
<striso-synth input="midi"  ui="true"></striso-synth>
<d-compose input="midi"></d-compose>
```

<midi-player output="midi"></midi-player>
<d-compose input="midi"></d-compose>
