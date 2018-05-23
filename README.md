# BitCommander Package for Microsoft PXT

This library provides a Microsoft PXT package for Bit:Commander, see
https://4tronix.co.uk/bitcommander/.

## Reading the buttons

There are 5 buttons that can be checked: `Red`, `Yellow`, `Green` and `Blue` on the left and the `Joystick` on the right can be pressed as well
If the button is pressed it will return a '1'. If it isn't pressed, then it returns a '0'
The following code checks the Green button and does something if it is pressed

```
// Check Green button
if (bitcommander.readButton(BCButtons.Green) == 1) {
    ... do something ...
}
```

## Reading the position of the Dial

When writing code, be aware that the Dial control input is shared with the speaker output and so the input range is limited to around 0 - 850 instead of the normal 0 - 1023. 
Use the readDial block to get the value (0 to ~850) into a variable, or test the value directly

```
// Read the Dial value into the myDial variable
myDial = bitcommander.readDial()
if (myDial > 500) {
   ... do something ...
}

or this is equivalent:

if (bitcommander.readDial() > 500) {
   ... do something ...
}
```

## Reading the position of the Joystick

Both the X and Y axes of the joystick have a range 0 to 1023. Specify the axis as part of the function call.
Use the readJoystick block to get the value.

```
// Read the Joystick X axis value in to the xAxis variable
xAxis = bitcommander.readJoystick(BCJoystick.X)
```

## Playing music

There is a small speaker on Bit:Commander wired to Pin 0, which is the default for playing music files. Use the standard Music blocks for this:

```blocks
// Play The Entertainer music clip
music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
```



## NeoPixel helpers

The Bit:Commander has 6 NeoPixels

```blocks
// Show all leds
bitcommander.neoSetColor(neopixel.colors(NeoPixelColors.Red));
bitcommander.neoShow();

// Clear all leds
bitcommander.neoClear();
bitcommander.neoShow();

// Show led at position 1
bitcommander.neoSetPixelColor(0, neopixel.colors(NeoPixelColors.Red));
bitcommander.neoShow();

// Show led rainbow
bitcommander.neoRainbow();
bitcommander.neoShow();

// Show led rainbow and shift
bitcommander.neoRainbow();
bitcommander.neoShift();
bitcommander.neoShow();

// Show led rainbow and rotate
bitcommander.neoRainbow();
bitcommander.neoRotate();
bitcommander.neoShow();

// Set brightness of leds
bitcommander.neoBrightness(100);
bitcommander.neoShow();

// Use neo() variable
bitcommander.neo().clear();
bitcommander.neo().show();
```

## Supported targets

* for PXT/microbit

## License

Apache 2.0
