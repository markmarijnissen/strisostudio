## d-compose

Shows the 3.5 octaves of the d-compose note layout. Touch-enabled, will output note on, note off, tilt (y) and bend (x) events. Has no support for velocity (z), but can be set using a property.

Attributes:

- `input`:  Visualize incoming d-compose events.
- `output`: Send touches as d-compose events.
- `octave`: Starting octave.

The d-compose event format:
```js
[ msg, note, bend, tilt, velocity ]
```

- `msg` is:
  - `STRISO_ON`: Note On event
  - `STRISO_OFF`: Note Off event
  - `STRISO_MOVE`: Tilt & Bend event
- `note` is for example `C#4`, `Db4` or `E3`. Note that flat notes are located the left, and sharp notes are on the right.
- `bend` and `tilt` range from -1 ... +1 
- `velocity` ranges from 0 ... 1

### Example 

```html
<d-compose 
    input="striso-input"
    output="striso-output"
    octave="2"
    velocity="1.0"
/>
```

<d-compose />
