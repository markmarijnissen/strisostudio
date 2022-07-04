# StrisoSynth

The original [onboard Striso synth](https://github.com/striso/striso-control-firmware/blob/main/synth.dsp), compiled for the browser, is included.

It accepts [Striso events](/components/StrisoBoard), which [DCompose](/components/DCompose), [StrisoMotionSensors](/components/StrisoMotionSensors) or [MidiInput](/components/MidiInput) can provide.

## Attributes

- `input`: Striso events

## Example

```html
<d-compose output="striso"></d-compose>
<striso-synth input="striso"></striso-synth>
<striso-event-log input="striso" class="sm"></striso-event-log>
```

<d-compose output="striso"></d-compose>
<striso-synth input="striso"></striso-synth>
<striso-event-log input="striso" class="sm"></striso-event-log>