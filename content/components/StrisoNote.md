# StrisoNote

Visualize and play notes with `StrisoNote`

## Attributes

Choose one event type:
- `on`: Trigger `STRISO_ON` event (default)
- `off`: Trigger `STRISO_OFF` event
- `move`: Trigger `STRISO_MOVE` event

Define a note:
- `note`: A note with octave, e.g. `D5` or `Bb4`. Notes on the left have flats (`b`), on the right have sharp (`#`)

Then, add more information (optional):
- `velocity`: Set velocity from 0...1
- `tilt`: Set tilt (y) from -1...1
- `bend`: Set bend (x) from -1...1

If you want, you can delay the note.
- `t`: Time in seconds

You can also trigger it with an event (Leave undefined to trigger immediately):
- `input`: Input event to trigger this note.


## Example 1

```html
<d-compose input="striso1" />
<striso-note  output="striso1" note="C4,E4,G4" />
<striso-event-log input="striso1" class="sm"></striso-event-log>
```

<d-compose input="striso1"></d-compose>
<striso-note  output="striso1" note="C4,E4,G4"></striso-note>
<striso-event-log input="striso1" class="sm"></striso-event-log>

## Example 2

```html
<event-button output="play">Play</event-button>
<d-compose input="striso2" />
<striso-note input="play" output="striso2" note="C4" />
<striso-note input="play" output="striso2" note="E4" :t="3" />
<striso-note input="play" output="striso2" note="G4" :t="6" />
<striso-note input="play" output="striso2" off note="C4,E4,G4" :t="10" />
<striso-event-log input="striso2" class="sm"></striso-event-log>
```

<event-button output="play">Play</event-button>
<d-compose input="striso2"></d-compose>
<striso-note input="play" output="striso2" note="C4"></striso-note>
<striso-note input="play" output="striso2" note="E4" :t="3"></striso-note>
<striso-note input="play" output="striso2" note="G4" :t="6"></striso-note>
<striso-note input="play" output="striso2" off note="C4,E4,G4" :t="10"></striso-note>
<striso-event-log input="striso2" class="sm"></striso-event-log>