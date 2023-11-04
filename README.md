# Makecode Extension for 4tronix BitCommander

This library provides a Microsoft Makecode extension for 4tronix Bit:Commander, see
https://4tronix.co.uk/bitcommander/.

The BitCommander can be used as a stand-alone device, or it can be used to remotely control other Microbit devices such as robots, using the Microbit's inbuilt `radio` blocks.
You can easily write a probram to send a `radio` message when the buttons are pressed or the joystick value changes.

## Reading the buttons

There are 5 buttons that can be checked: `Red`, `Yellow`, `Green` and `Blue` on the left and the `Joystick` on the right can be pressed as well
If the button is pressed it will return `true`. If it isn't pressed, then it returns `false`.

The following code checks the Green button and, if pressed, scrolls "Green" on the Microbit display:

```blocks
if (bitcommander.readButton(BCButtons.Green)) {
    basic.showString("Green")
}
```

You can also respond directly to a button press or release event using the `onEvent(...)` block.
The following code runs when the Blue button is pressed and scrolls "Blue" on the Microbit display:

```blocks
bitcommander.onEvent(BCPins.Blue, BCEvents.Down, function () {
    basic.showString("Blue")
})
```

## Reading the position of the Dial

When writing code, be aware that the Dial control input is shared with the speaker output and so the input range is limited to around 0 - 850 instead of the normal 0 - 1023. 
Use the `readDial(...)` block to get the value (0 to ~850) into a variable, or test the value directly

Read the Dial value:

```block
bitcommander.readDial()
```

## Reading the position of the Joystick

Both the X and Y axes of the joystick have a range 0 to 1023. Specify the axis as part of the `readJoystick(...)` function call.
Use the `readJoystick(...)` block to get the value.

eg.Read the Joystick X axis value in to the xAxis variable:

```block
bitcommander.readJoystick(BCJoystick.X)
```

## Playing music

There is a small speaker on Bit:Commander wired to Pin 0, which is the default for playing music files. Use the standard Microbit Music blocks for this:

Play The Entertainer music clip:

```block
music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.UntilDone)
```


## Fireled helpers

The Bit:Commander has 6 Fireleds
The default update mode is automatic so LEDs will be updated immediately after changes

Set all leds to Red:

```block
bitcommander.setLedColor(0xff0000)
```

Clear all leds:

```block
bitcommander.ledClear()
```

Set Fireled at position 1 to Green (Fireleds are numbered 0 to 5):

```block
bitcommander.setPixelColor(1, 0x00ff00)
```

Show rainbow across all Fireleds (Red..Violet):

```block
bitcommander.ledRainbow()
```

Shift FireLeds up one place, blanking the first FireLed:

```block
bitcommander.ledShift()
```

Rotate FireLeds by shifting up one and replace the first with the last:

```block
bitcommander.ledRotate()
```

Set brightness of leds:

```block
bitcommander.ledBrightness(100);
```

## Supported targets

* for PXT/microbit

## License
MIT
