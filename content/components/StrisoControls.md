# StrisoControls

Render the Striso Control buttons: glissando, octave up, octave down and options. Also includes the leds and the title. Best used in conjunction with a [StrisoBoardCasing](/components/StrisoBoardCasing).

## Attributes

- `output`: Emit button presses to this event

## Events

```javascripts
[ STRISO_UP, octave ] // number
[ STRISO_DOWN, octave ] // number
[ STRISO_GLISSANDO, glissando ] // true or false
[ STRISO_OPTIONS ]
```

## Example

```html
<striso-board-casing>
    <striso-controls />
</striso-board-casing>
```

<striso-board-casing>
    <striso-controls />
</striso-board-casing>