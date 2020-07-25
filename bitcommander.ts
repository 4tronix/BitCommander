/**
 * Pins used to generate events
 */
enum BCPins {
    //% block="red"
    Red = DAL.MICROBIT_ID_IO_P12,
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
    let band: fireled.Band;
    let ledPin = DigitalPin.P13;
    let ledCount = 6;
    let _updateMode = BCMode.Auto;
    let btEnabled = false;

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
    //% blockId=bcOnEvent block="on %button|%event"
    //% subcategory=Inputs
    export function onEvent(button: BCPins, event: BCEvents, handler: Action)
    {
        init();
        control.onEvent(<number>button, <number>event, handler); // register handler
    }

    /**
      * check button states
      * @param buttonID Button to check
      */
    //% blockId="bcCheckButton" block="button %buttonID|pressed"
    //% weight=85
    //% subcategory=Inputs
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
      */
    //% blockId="bcReadDial" block="dial"
    //% weight=90
    //% subcategory=Inputs
    export function readDial( ): number
    {
        return pins.analogReadPin(AnalogPin.P0);
    }

    /**
      * Read joystick values
      * @param axis Axis to read
      */
    //% blockId="bcReadJoystick" block="joystick %axis"
    //% weight=90
    //% subcategory=Inputs
    export function readJoystick(axis: BCJoystick): number
    {
        if (axis == BCJoystick.X)
            return pins.analogReadPin(AnalogPin.P1);
        else
            return pins.analogReadPin(AnalogPin.P2);
    }


// Fireled Helper Blocks

    // create a FireLed band if not got one already. Default to brightness 40
    // defaults to P13 and 50 LEDs if not specified
    function fire(): fireled.Band
    {
        if (!band)
        {
            band = fireled.newBand(ledPin, ledCount);
            band.setBrightness(40);
        }
        return band;
    }

    // update LEDs if _updateMode set to Auto
    function updateLEDs(): void
    {
        if (_updateMode == BCMode.Auto)
            ledShow();
    }

    /**
      * Sets all LEDs to a given color (range 0-255 for r, g, b).
      * @param rgb RGB color of the LED
      */
    //% blockId="bcSetLedColor" block="set all LEDs to%rgb=FireColours"
    //% subcategory=Leds
    //% weight=100
    export function setLedColor(rgb: number)
    {
        fire().setBand(rgb);
        updateLEDs();
    }

    /**
      * Clear all leds.
      */
    //% blockId="bcLedClear" block="clear all LEDs"
    //% subcategory=Leds
    //% weight=90
    export function ledClear()
    {
        fire().clearBand();
        updateLEDs();
    }

    /**
     * Set single LED to a given color (range 0-255 for r, g, b).
     * @param ledId position of the LED (0 to 5)
     * @param rgb RGB color of the LED
     */
    //% blockId="bcSetPixelColor" block="set LED at%ledId|to%rgb=FireColours"
    //% subcategory=Leds
    //% weight=80
    export function setPixelColor(ledId: number, rgb: number)
    {
        fire().setPixel(ledId, rgb);
        updateLEDs();
    }

    /**
      * Shows a rainbow pattern on all LEDs.
      */
    //% blockId="bcLedRainbow" block="set LED rainbow"
    //% subcategory=Leds
    //% weight=70
    export function ledRainbow()
    {
        fire().setRainbow();
        updateLEDs()
    }

    /**
     * Shift LEDs forward and clear with zeros.
     */
    //% blockId="bcLedShift" block="shift LEDs"
    //% subcategory=Leds
    //% weight=60
    export function ledShift()
    {
        fire().shiftBand();
        updateLEDs()
    }

    /**
     * Rotate LEDs forward.
     */
    //% blockId="bcLedRotate" block="rotate LEDs"
    //% subcategory=Leds
    //% weight=50
    export function ledRotate()
    {
        fire().rotateBand();
        updateLEDs()
    }

    // Advanced Fireled blocks

    /**
     * Set the brightness of the FireLed band
     * @param brightness a measure of LED brightness in 0-255. eg: 40
     */
    //% blockId="bcLedBrightness" block="set LED brightness%brightness"
    //% brightness.min=0 brightness.max=255
    //% weight=100
    //% advanced=true
    export function ledBrightness(brightness: number)
    {
        fire().setBrightness(brightness);
        updateLEDs();
    }

    /**
      * Set LED update mode (Manual or Automatic)
      * @param updateMode setting automatic will show LED changes automatically
      */
    //% blockId="bcSetUpdateMode" block="set %updateMode|update mode"
    //% weight=90
    //% advanced=true
    export function setUpdateMode(updateMode: BCMode): void
    {
        _updateMode = updateMode;
    }

    /**
      * Show LED changes
      */
    //% blockId="bcLedShow" block="show LED changes"
    //% weight=80
    //% advanced=true
    export function ledShow(): void
    {
        if (! btEnabled)
            fire().updateBand();
    }

    /**
      * Get numeric value of colour
      * @param colour Standard RGB Led Colours eg: #ff0000
      */
    //% blockId="FireColours" block=%colour
    //% advanced=true
    //% blockHidden=false
    //% weight=70
    //% shim=TD_ID colorSecondary="#e7660b"
    //% colour.fieldEditor="colornumber"
    //% colour.fieldOptions.decompileLiterals=true
    //% colour.defl='#ff0000'
    //% colour.fieldOptions.colours='["#FF0000","#659900","#18E600","#80FF00","#00FF00","#FF8000","#D82600","#B24C00","#00FFC0","#00FF80","#FFC000","#FF0080","#FF00FF","#B09EFF","#00FFFF","#FFFF00","#8000FF","#0080FF","#0000FF","#FFFFFF","#FF8080","#80FF80","#40C0FF","#999999","#000000"]'
    //% colour.fieldOptions.columns=5
    //% colour.fieldOptions.className='rgbColorPicker'
    export function fireColours(colour: number): number
    {
        return colour;
    }

    /**
      * Convert from RGB values to colour number
      * @param red Red value of the LED (0 to 255)
      * @param green Green value of the LED (0 to 255)
      * @param blue Blue value of the LED (0 to 255)
      */
    //% blockId="bcConvertRGB" block="convert from red%red|green%green|blue%blue"
    //% weight=60
    //% advanced=true
    export function convertRGB(r: number, g: number, b: number): number
    {
        return ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF);
    }


}
