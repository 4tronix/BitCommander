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
    Down = DAL.MICROBIT_BUTTON_EVT_UP,
    //% block="up"
    Up = DAL.MICROBIT_BUTTON_EVT_DOWN
}

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
  * Update mode for LEDs
  * setting to Manual requires show LED changes blocks
  * setting to Auto will update the LEDs everytime they change
  */
enum BCMode
{
    Manual,
    Auto
}

/**
  * Pre-Defined LED colours
  */
enum BCColors
{
    //% block=red
    Red = 0xff0000,
    //% block=orange
    Orange = 0xffa500,
    //% block=yellow
    Yellow = 0xffff00,
    //% block=green
    Green = 0x00ff00,
    //% block=blue
    Blue = 0x0000ff,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xff00ff,
    //% block=white
    White = 0xffffff,
    //% block=black
    Black = 0x000000
}


/**
 * Custom blocks
 */
//% weight=10 color=#e7660b icon="\uf11b"
namespace bitcommander
{
    let neoStrip: neopixel.Strip;
    let _updateMode = BCMode.Auto;
    let _initEvents = true;

// Inputs. Buttons, Dial and Joystick

    //% shim=bitcommander::init
    function init(): void {
        return;
    }

    /**
      * Registers event code
      */
    //% weight=90
    //% blockId=bc_onevent block="on %button|%event"
    //% subcategory=Inputs
    //% group=Inputs
    export function onEvent(button: BCPins, event: BCEvents, handler: Action)
    {
        init();
        control.onEvent(<number>button, <number>event, handler); // register handler
    }

    /**
      * check button states
      *
      * @param buttonID Button to check
      */
    //% blockId="bitcommander_check_button" block="button %buttonID|pressed"
    //% weight=85
    //% subcategory=Inputs
    //% group=Inputs
    export function readButton(buttonID: BCButtons): boolean
    {
	switch (buttonID)
	{
            case BCButtons.Red: return pins.digitalReadPin(DigitalPin.P12)==1; break;
            case BCButtons.Yellow: return pins.digitalReadPin(DigitalPin.P16)==1; break;
            case BCButtons.Green: return pins.digitalReadPin(DigitalPin.P14)==1; break;
            case BCButtons.Blue: return pins.digitalReadPin(DigitalPin.P15)==1; break;
            case BCButtons.Joystick: return pins.digitalReadPin(DigitalPin.P8)==1; break;
	    default: return false;
	}
    }

    /**
      * Read dial
      *
      */
    //% blockId="bitcommander_read_dial" block="dial"
    //% weight=90
    //% subcategory=Inputs
    //% group=Inputs
    export function readDial( ): number
    {
        return pins.analogReadPin(AnalogPin.P0);
    }

    /**
      * Read joystick values
      *
      * @param axis Axis to read
      */
    //% blockId="bitcommander_read_joystick" block="joystick %axis"
    //% weight=90
    //% subcategory=Inputs
    //% group=Inputs
    export function readJoystick(axis: BCJoystick): number
    {
        if (axis == BCJoystick.X)
            return pins.analogReadPin(AnalogPin.P1);
        else
            return pins.analogReadPin(AnalogPin.P2);
    }


// LEDs. neopixel blocks

    // create a neopixel strip if not got one already
    function neo(): neopixel.Strip
    {
        if (!neoStrip)
        {
            neoStrip = neopixel.create(DigitalPin.P13, 6, NeoPixelMode.RGB)
            neoStrip.setBrightness(40)
        }
        return neoStrip;
    }

    // update LEDs if _updateMode set to Auto
    function updateLEDs(): void
    {
        if (_updateMode == BCMode.Auto)
            neo().show();
    }

    /**
      * Show LED changes
      */
    //% blockId="bitcommander_neo_show" block="show LED changes"
    //% weight=100
    //% subcategory=Leds
    export function neoShow(): void
    {
        neo().show();
    }

    /**
      * Sets all LEDs to a given color (range 0-255 for r, g, b).
      *
      * @param rgb RGB color of the LED
      */
    //% blockId="bitcommander_neo_set_color" block="set all LEDs to %rgb=bc_colours"
    //% weight=95
    //% subcategory=Leds
    export function neoSetColor(rgb: number)
    {
        neo().showColor(rgb);
        updateLEDs();
    }

    /**
      * Clear all LEDs.
      */
    //% blockId="bitcommander_neo_clear" block="clear all LEDs"
    //% weight=90
    //% subcategory=Leds
    export function neoClear(): void
    {
        neo().clear();
        updateLEDs();
    }

    /**
      * Set LED to a given color (range 0-255 for r, g, b).
      *
      * @param ledId position of the LED (0 to 5)
      * @param rgb RGB color of the LED
      */
    //% blockId="bitcommander_neo_set_pixel_color" block="set LED at %ledId|to %rgb=bc_colours"
    //% weight=85
    //% subcategory=Leds
    export function neoSetPixelColor(ledId: number, rgb: number): void
    {
        neo().setPixelColor(ledId, rgb);
        updateLEDs();
    }

    /**
      * Shows a rainbow pattern on all LEDs.
      */
    //% blockId="bitcommander_neo_rainbow" block="set led rainbow"
    //% weight=80
    //% subcategory=Leds
    export function neoRainbow(): void
    {
        neo().showRainbow(1, 360)
        updateLEDs()
    }

    /**
      * Rotate LEDs forward.
      */
    //% blockId="bitcommander_neo_rotate" block="rotate LEDs"
    //% weight=75
    //% subcategory=Leds
    export function neoRotate(): void
    {
        neo().rotate(1);
        updateLEDs();
    }

    /**
      * Shift LEDs forward and clear with zeros.
      */
    //% blockId="bitcommander_neo_shift" block="shift LEDs"
    //% weight=70
    //% subcategory=Leds
    export function neoShift(): void
    {
        neo().shift(1);
        updateLEDs();
    }

    // advanced blocks

    /**
      * Set LED update mode (Manual or Automatic)
      * @param updateMode setting automatic will show LED changes automatically
      */
    //% blockId="bitcommander_set_updateMode" block="set %updateMode|update mode"
    //% brightness.min=0 brightness.max=255
    //% weight=65
    //% advanced=true
    export function setUpdateMode(updateMode: BCMode): void
    {
        _updateMode = updateMode;
    }

    /**
      * Set the brightness of the LEDs
      * @param brightness a measure of LED brightness (0 to 255) eg: 40
      */
    //% blockId="bitcommander_neo_brightness" block="set led brightness %brightness"
    //% brightness.min=0 brightness.max=255
    //% weight=60
    //% advanced=true
    export function neoBrightness(brightness: number): void
    {
        neo().setBrightness(brightness);
        updateLEDs();
    }

    /**
      * Get numeric value of colour
      *
      * @param color Standard RGB Led Colours
      */
    //% blockId="bc_colours" block=%color
    //% weight=55
    //% advanced=true
    export function BCColours(color: BCColors): number
    {
        return color;
    }

    /**
      * Convert from RGB values to colour number
      *
      * @param red Red value of the LED (0 to 255)
      * @param green Green value of the LED (0 to 255)
      * @param blue Blue value of the LED (0 to 255)
      */
    //% blockId="bitcommander_convertRGB" block="convert from red %red| green %green| blue %bblue"
    //% weight=50
    //% advanced=true
    export function convertRGB(r: number, g: number, b: number): number
    {
        return ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF);
    }

}
