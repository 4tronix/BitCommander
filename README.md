# Makecode Extension for 4tronix BitCommander

This library provides a Microsoft Makecode extension for 4tronix Bit:Commander, see
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



## Fireled helpers

The Bit:Commander has 6 Fireleds
The default update mode is automatic so LEDs will be updated immediately after changes

```blocks
// Set all leds to Red
bitcommander.bitcommander.setLedColor(0xff0000);

// Clear all leds
bitcommander.ledClear();

// Set Fireled at position 1 to Green
bitcommander.setPixelColor(0, 0x00ff00);

// Show rainbow across all Fireleds (Red..Violet)
bitcommander.ledRainbow();

// Show led rainbow and shift
bitcommander.ledRainbow();
bitcommander.ledhift();

// Show led rainbow and rotate
bitcommander.ledRainbow();
bitcommander.ledRotate();

// Set brightness of leds
bitcommander.ledBrightness(100);
```

## Supported targets

* for PXT/microbit

## License
MIT
