
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
  * Enumeration of joystick axes
  */
enum BCJoystick {
    //% block="x"
    X,
    //% block="y"
    Y
}

/**
 * Pins used to generate events
 */
enum BCPins {
    //% block="red"
    Red = <number>DAL.MICROBIT_ID_IO_P12,
    //% block="yellow"
    Yellow = DAL.MICROBIT_ID_IO_P16,
    //% block="green"
    Green = DAL.MICROBIT_ID_IO_P14,
    //% block="blue"
    Blue = DAL.MICROBIT_ID_IO_P15,
    //% block="joystick"
    Joystick = DAL.MICROBIT_ID_IO_P8
}

/**
 * Button events
 */
enum BCEvents {
    //% block="down"
    Down = DAL.MICROBIT_BUTTON_EVT_DOWN,
    //% block="up"
    Up = DAL.MICROBIT_BUTTON_EVT_UP,
    //% block="click"
    Click = DAL.MICROBIT_BUTTON_EVT_CLICK,
}

/**
 * Custom blocks
 */
//% weight=10 color=#e7660b icon="\uf11b"
namespace bitcommander {

    //% shim=bitcommander::init
    function init(): void {
        return;
    }

    let neoStrip: neopixel.Strip;

    /**
     * Return a neo pixel strip.
     */
    //% blockId="bitcommander_neo" block="neo strip"
    //% weight=5
    function neo(): neopixel.Strip {
        if (!neoStrip) {
            neoStrip = neopixel.create(DigitalPin.P13, 6, NeoPixelMode.RGB)
        }

        return neoStrip;
    }

    /**
      * Registers event code
      */
    //% weight=90
    //% blockId=bc_onevent block="on %button|%event"
    export function onEvent(button: BCPins, event: BCEvents, handler: Action)
    {
        init();
        control.onEvent(<number>button, <number>event, handler); // register handler
    }

    /**
      * Read joystick values
      *
      * @param dir Axis to read
      */
    //% blockId="bitcommander_read_joystick" block="read joystick %axis"
    //% weight=90
    export function readJoystick(axis: BCJoystick): number {
        if (axis == BCJoystick.X) {
            return pins.analogReadPin(AnalogPin.P1);
        } else {
            return pins.analogReadPin(AnalogPin.P2);
        }
    }

    /**
      * check button states
      *
      * @param buttonID Button to check
      */
    //% blockId="bitcommander_check_button" block="check button %buttonID"
    //% weight=85
    export function readButton(buttonID: BCButtons): number {
	switch (buttonID)
	{
            case BCButtons.Red: return pins.digitalReadPin(DigitalPin.P12); break;
            case BCButtons.Yellow: return pins.digitalReadPin(DigitalPin.P16); break;
            case BCButtons.Green: return pins.digitalReadPin(DigitalPin.P14); break;
            case BCButtons.Blue: return pins.digitalReadPin(DigitalPin.P15); break;
            case BCButtons.Joystick: return pins.digitalReadPin(DigitalPin.P8); break;
	    default: return 0;
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
