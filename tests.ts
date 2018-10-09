{
  // Read Joystick X axis
  basic.showNumber(bitcommander.readJoystick(BCJoystick.X));
  basic.pause(100);

  // Read Joystick Y axis
  basic.showNumber(bitcommander.readJoystick(BCJoystick.Y));
  basic.pause(100);

  // Read Dial
  basic.showNumber(bitcommander.readDial());
  basic.pause(100);

  // Show states of all buttons
  basic.showNumber(bitcommander.readButton(BCButtons.Red));
  basic.showNumber(bitcommander.readButton(BCButtons.Yellow));
  basic.showNumber(bitcommander.readButton(BCButtons.Green));
  basic.showNumber(bitcommander.readButton(BCButtons.Blue));
  basic.showNumber(bitcommander.readButton(BCButtons.Joystick));
  basic.pause(100);

  // Play tune on Speaker
  music.playTone(262, music.beat(BeatFraction.Whole));
  basic.pause(100);

  // Show all leds
  bitbot.neoSetColor(neopixel.colors(NeoPixelColors.Red));
  bitbot.neoShow();

  // Clear all leds
  bitbot.neoClear();
  bitbot.neoShow();

  // Show led at position 0
  bitbot.neoSetPixelColor(0, neopixel.colors(NeoPixelColors.Red));
  bitbot.neoShow();

  // Show led rainbow
  bitbot.neoRainbow();
  bitbot.neoShow();

  // Show led rainbow and shift
  bitbot.neoRainbow();
  bitbot.neoShift();
  bitbot.neoShow();

  // Show led rainbow and rotate
  bitbot.neoRainbow();
  bitbot.neoRotate();
  bitbot.neoShow();

  // Set brightness of leds
  bitbot.neoBrightness(100);
  bitbot.neoShow();

  // Use neo() variable
  bitbot.neo().clear();
  bitbot.neo().show();
}
