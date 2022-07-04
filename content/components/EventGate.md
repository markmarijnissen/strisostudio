# EventGate

A checkbox to connect or disconnect two components.

## Attributes

- `input`
- `output`

## Example

```html
<event-button output="in" event="hello">Say Hello</event-button>
<event-gate input="in" output="out">I want to hear it</event-gate>
<striso-event-log input="out" class="sm"></striso-event-log>
```

<event-button output="in" event="hello">Say Hello</event-button>
<event-gate input="in" output="out">I want to hear it</event-gate>
<striso-event-log input="out" class="sm"></striso-event-log>