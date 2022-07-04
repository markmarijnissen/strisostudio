# d-compose

Shows the 3.5 octaves of the d-compose note layout. Touch-enabled, will output note on, note off, tilt (y) and bend (x) events. Has no support for velocity (z), but can be set using a property.

## Attributes:

- `input`:  Visualize incoming d-compose events.
- `output`: Send touches as d-compose events.
- `octave`: Starting octave.

## Events

```javascript
[ STRISO_ON, note, bend, tilt, velocity ]
[ STRISO_OFF, note, bend, tilt, velocity ]
[ STRISO_MOVE, note, bend, tilt, velocity ]
[ STRISO_UP, octave ]
[ STRISO_DOWN, octave ]
[ STRISO_CONFIGURE_VELOCITY, velocity ]
```

- `note` is for example `C#4`, `Db4` or `E3`. Note that flat notes are located the left, and sharp notes are on the right.
- `bend` and `tilt` range from -1 ... +1 
- `velocity` ranges from 0 ... 1
- `octave` is a number from 0...n

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
