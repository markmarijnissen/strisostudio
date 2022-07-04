# PeerSend

Send events to a remove device using a [peer to peer connection](/components/PeerConnection).

## Attributes

- `input`: The input events to forward to remote device
- `as`: Rename the input event

## Example
```html
<peer-send input="striso-output" as="striso-input" />
```

The remote device will receive all `striso-output` events as `striso-input`.