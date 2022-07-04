# StrisoEventLog

Striso Web Components communicate by receiving events from `input` and sending them to `output`. These events are send using a global event bus, `StrisoEvents`.

To inspect what is happening, you can log events.

## Attributes

- `input`: The events to log

Use `sm`, `md` or `lg` as `class` to set the size of the log.

## Example

```html
<d-compose output="striso"></d-compose>
<striso-event-log  class="md" input="striso"></striso-event-log>
```

<d-compose output="striso"></d-compose>
<striso-event-log class="md" input="striso"></striso-event-log>