# MidiInput

Receive MIDI messages and convert them to [Striso events](/components/StrisoBoard).

## Attributes

- `output`: Striso [Board](/components/StrisoBoard) (or [DCompose](/components/DCompose), [Synth](/components/StrisoSynth)) to send striso messages to.
- `striso`: Convert to Striso events (default: `true`)

## Example 1 (Midi)

```html
<midi-input striso="false" output="midi-in1"></midi-input>
<striso-event-log class="sm" input="midi-in1"></striso-event-log>

```

<midi-input :striso="false" output="midi-in1"></midi-input>
<striso-event-log class="sm" input="midi-in1"></striso-event-log>

## Example 2 (Striso)

```html
<midi-input output="midi-in2"></midi-input>
<striso-event-log class="sm" input="midi-in2"></striso-event-log>

```

<midi-input  output="midi-in2"></midi-input>
<striso-event-log class="sm" input="midi-in2"></striso-event-log>