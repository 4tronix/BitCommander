
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
    Joystick
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
      * Read joystick
      *
      * @param dir Direction to read
      */
    //% blockId="bitcommander_read_joystick" block="read 31joystick %dir"
    //% weight=90
    export function readJoystick(dir: BCJoystick): number {
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
    //% blockId="bitcommander_neo_set_color" block="set pixels to %rgb=neopixel_colors"
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
    //% blockId="bitcommander_neo_set_pixel_color" block="set pixel color at %offset|to %rgb=neopixel_colors"
    //% weight=80
    export function neoSetPixelColor(offset: number, rgb: number): void {
        neo().setPixelColor(offset, rgb);
    }

    /**
      * Show leds.
      */
    //% blockId="bitcommander_neo_show" block="show leds"
    //% weight=76
    export function neoShow(): void {
        neo().show();
    }

    /**
      * Clear leds.
      */
    //% blockId="bitcommander_neo_clear" block="clear leds"
    //% weight=75
    export function neoClear(): void {
        neo().clear();
    }

    /**
      * Shows a rainbow pattern on all LEDs.
      */
    //% blockId="bitcommander_neo_rainbow" block="set led rainbow"
    //% weight=70
    export function neoRainbow(): void {
        neo().showRainbow(1, 360);
    }

    /**
     * Shift LEDs forward and clear with zeros.
     */
    //% blockId="bitcommander_neo_shift" block="shift led pixels"
    //% weight=66
    export function neoShift(): void {
        neo().shift(1);
    }

    /**
     * Rotate LEDs forward.
     */
    //% blockId="bitcommander_neo_rotate" block="rotate led pixels"
    //% weight=65
    export function neoRotate(): void {
        neo().rotate(1);
    }

    /**
     * Set the brightness of the strip. Note this only applies to future writes to the strip.
     *
     * @param brightness a measure of LED brightness in 0-255. eg: 255
     */
    //% blockId="bitcommander_neo_brightness" block="set led brightness %brightness"
    //% brightness.min=0 brightness.max=255
    //% weight=10
    export function neoBrightness(brightness: number): void {
        neo().setBrightness(brightness);
    }


}
