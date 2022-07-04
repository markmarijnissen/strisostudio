# StrisoMotionSensors

StrisoMotionSensors is an invisible element that will use the devicemotion api to read accelerometer and gyroscope data.

## Attributes

- `output`: Sends accelerometer and gyroscope to this event.
- `ui`: Set to `text` to show a simple text user interface.

## Events

```javascript
[ STRISO_MOTION, acc_x, acc_y, acc_z, rot_x, rot_y, rot_z ]
```

## Example
```html
<striso-motion-sensors ui="text" output="striso-motion" />
```

<striso-motion-sensors ui="text" output="striso-motion" />