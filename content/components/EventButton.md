# EventButton

Click a button, trigger an event. 

## Attributes

- `output`: The output event
- `event`: The event to emit

## Example

```html
<event-button output="test" event="hello">Say Hello</event-button>
<striso-event-log input="test"></striso-event-log>
```

<event-button output="test" event="hello">Say Hello</event-button>
<striso-event-log input="test" class="sm"></striso-event-log>