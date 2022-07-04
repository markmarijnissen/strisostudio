# PeerConnection

Create a peer-to-peer connection with a remote device.

To establish a connection, you need to enter the ID from the remote device, which is a six digit number.

The connection is established using WebRTC, which should have similar latency to Open Sound Control. You will get the fastest connection if one of your devices can create a WiFi hotspot, as this will eliminate the router in between.

Once you have established a connection, use [PeerSend](./components/PeerSend) to send events.

## Attributes

- `id`: Hardcode the remove device ID to connect to
- `ui`: The User Interface to show:
    - `simple` (default): Input the remote device ID.
    - `id`: To show your [own Device ID](./components/PeerId)

## Example

```html
<h3>My ID</h3>
<peer-connection ui="id" /><br/>
<h3>Remote ID</h3>
<peer-connection  />
<h3>Send Test</h3>
<event-button output="peer-output" event="hello">Send Hello</event-button>
<peer-send input="peer-output" as="peer-input"></peer-send>
<h3>Receive data</h3>
<striso-event-log input="peer-input" class="sm"></striso-event-log>
```

<h3>My ID</h3>
<peer-connection ui="id"></peer-connection>
<h3>Remote ID</h3>
<peer-connection ></peer-connection>
<h3>Send Test</h3>
<event-button output="peer-output" event="hello">Send Hello</event-button>
<peer-send input="peer-output" as="peer-input"></peer-send>
<h3>Receive data</h3>
<striso-event-log input="peer-input" class="sm"></striso-event-log>9