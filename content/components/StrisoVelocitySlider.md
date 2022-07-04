# StrisoVelocitySlider

Web Applications have no way of detecting velocity, so using the StrisoVelocitySlider you can manually set the note velocity.

## Attributes

- `output`: The dcompose input you want to send velocity to

## Events

```javascript
[ STRISO_CONFIGURE_VELOCITY, velocity ] // 0...1
```

## Example

```html
<striso-velocity-slider output="striso-velocity" />
<d-compose input="striso-velocity" />
```

<striso-velocity-slider output="striso-velocity"></striso-velocity-slider>

<d-compose input="striso-velocity" style="width: 400px; height: 400px;" />
