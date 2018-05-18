
/**
  * Enumeration of buttons
  */
enum BCButtons {
    //% block="red"
    Red,
    //% block="yellow"
    Yellow,
    //% block="green"
    Green,
    //% block="blue"
    Blue,
    //% block="joystick"
    JoyBtn
}

/**
  * Enumeration of joystick directions
  */
enum BCJoystick {
    //% block="x"
    X,
    //% block="y"
    Y
}


/**
 * Custom blocks
 */
//% weight=10 color=#e7660b icon="\uf11b"
namespace bitcommander {

    let neoStrip: neopixel.Strip;

    /**
     * Return a neo pixel strip.
     */
    //% blockId="bitcommander_neo" block="neo strip"
    //% weight=5
    export function neo(): neopixel.Strip {
        if (!neoStrip) {
            neoStrip = neopixel.create(DigitalPin.P13, 6, NeoPixelMode.RGB)
        }

        return neoStrip;
    }


    /**
      * Sound a buzz.
      *
      * @param flag Flag to set (0) for off and (1) for on.
      */
    //% blockId="bitbot_buzz" block="buzz sound %flag"
    //% flag.min=0 flag.max=1
    //% weight=95
    export function buzz(flag: number): void {
        pins.digitalWritePin(DigitalPin.P14, flag === 0 ? 0 : 1);
    }

    /**
      * Read line sensor.
      *
      * @param button Button to read.
      */
    //% blockId="bitcommander_check_button" block="check button %button"
    //% weight=90
    export function checkButton(sensor: BCButtons): number
    {
        switch(button)
	{
	    case BCButtons.Red: return pins.digitalReadPin(DigitalPin.P12); break;
	    case BCButtons.Yellow: return pins.digitalReadPin(DigitalPin.P16); break;
	    case BCButtons.Green: return pins.digitalReadPin(DigitalPin.P14); break;
	    case BCButtons.Blue: return pins.digitalReadPin(DigitalPin.P15); break;
	    case BCButtons.JoyBtn: return pins.digitalReadPin(DigitalPin.P8); break;
	    default: return 0;
        }
    }

    /**
      * Read joystick
      *
      * @param dir Direction to read
      */
    //% blockId="bitcommander_read_joystick" block="read joystick %dir"
    //% weight=90
    export function readJoystick(sensor: BCJoystick): number {
        if (dir == BCJoystick.X) {
            return pins.analogReadPin(AnalogPin.P1);
        } else {
            return pins.analogReadPin(AnalogPin.P2);
        }
    }

    /**
      * Read dial
      *
      */
    //% blockId="bitcommander_read_dial" block="read dial"
    //% weight=90
    export function readDial( ): number {
        return pins.analogReadPin(AnalogPin.P0);
    }

    /**
      * Shows all LEDs to a given color (range 0-255 for r, g, b).
      *
      * @param rgb RGB color of the LED
      */
    //% blockId="bitbot_neo_set_color" block="set pixels to %rgb=neopixel_colors"
    //% weight=80
    export function neoSetColor(rgb: number) {
        neo().showColor(rgb);
    }

    /**
     * Set LED to a given color (range 0-255 for r, g, b).
     *
     * @param offset position of the NeoPixel in the strip
     * @param rgb RGB color of the LED
     */
    //% blockId="bitbot_neo_set_pixel_color" block="set pixel color at %offset|to %rgb=neopixel_colors"
    //% weight=80
    export function neoSetPixelColor(offset: number, rgb: number): void {
        neo().setPixelColor(offset, rgb);
    }

    /**
      * Show leds.
      */
    //% blockId="bitbot_neo_show" block="show leds"
    //% weight=76
    export function neoShow(): void {
        neo().show();
    }

    /**
      * Clear leds.
      */
    //% blockId="bitbot_neo_clear" block="clear leds"
    //% weight=75
    export function neoClear(): void {
        neo().clear();
    }

    /**
      * Shows a rainbow pattern on all LEDs.
      */
    //% blockId="bitbot_neo_rainbow" block="set led rainbow"
    //% weight=70
    export function neoRainbow(): void {
        neo().showRainbow(1, 360);
    }

    /**
     * Shift LEDs forward and clear with zeros.
     */
    //% blockId="bitbot_neo_shift" block="shift led pixels"
    //% weight=66
    export function neoShift(): void {
        neo().shift(1);
    }

    /**
     * Rotate LEDs forward.
     */
    //% blockId="bitbot_neo_rotate" block="rotate led pixels"
    //% weight=65
    export function neoRotate(): void {
        neo().rotate(1);
    }

    /**
     * Set the brightness of the strip. Note this only applies to future writes to the strip.
     *
     * @param brightness a measure of LED brightness in 0-255. eg: 255
     */
    //% blockId="bitbot_neo_brightness" block="set led brightness %brightness"
    //% brightness.min=0 brightness.max=255
    //% weight=10
    export function neoBrightness(brightness: number): void {
        neo().setBrightness(brightness);
    }

    /**
    * Read distance from sonar module connected to accessory connector.
    *
    * @param unit desired conversion unit
    */
    //% blockId="bitbot_sonar" block="read sonar as %unit"
    //% weight=7
    export function sonar(unit: BBPingUnit): number {
        // send pulse
        let trig = DigitalPin.P15;
        let echo = DigitalPin.P15;

        let maxCmDistance = 500;

        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse
        let d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case BBPingUnit.Centimeters: return d / 58;
            case BBPingUnit.Inches: return d / 148;
            default: return d;
        }
    }

    /**
      * Adjust opening of Claw attachment
      *
      * @param degrees Degrees to open Claw.
      */
    //% blockId="bitbot_set_claw" block="set claw %degrees"
    //% weight=90
    export function setClaw(degrees: number): void
    {
        pins.servoWritePin(AnalogPin.P15, Math.clamp(0, 80, degrees))
    }
}
