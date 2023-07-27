let nbr = 0
let oled = 0
let len = 0
let sonar2 = 0
basic.showLeds(`
    # # # # #
    # . . . #
    # . . . #
    # . . . #
    # # # # #
    `)
koi.koi_init(SerialPin.P12, SerialPin.P13)
OLED.init(128, 64)
OLED12864_I2C.init(60)
OLED12864_I2C.clear()
OLED.clear()
basic.pause(2000)
koi.koi_lcd_direction(koi.LcdDirection.Back)
basic.showLeds(`
    # . . . #
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
basic.forever(function () {
    sonar2 = sonar.ping(
    DigitalPin.P0,
    DigitalPin.P1,
    PingUnit.Centimeters
    )
    len = convertToText(sonar2).length
    if (input.buttonIsPressed(Button.B)) {
        if (oled == 255) {
            oled = 0
        } else if (oled == 0) {
            oled += 255
        }
    }
    if (oled == 255) {
        OLED.writeBigNumber(0, 0, sonar2)
        if (len < convertToText(sonar2).length) {
            OLED12864_I2C.clear()
            len = convertToText(sonar2).length
        }
        OLED.progressBar(
        input.acceleration(Dimension.X),
        6,
        9,
        110,
        true
        )
    }
    led.unplot(2, 0)
    if (input.buttonIsPressed(Button.A)) {
        if (nbr == 255) {
            nbr = 0
            basic.pause(1000)
            led.plot(2, 2)
        } else if (nbr == 0) {
            nbr += 255
            basic.pause(1000)
            led.unplot(2, 2)
        } else {
        	
        }
    }
    robotbit.MotorRun(robotbit.Motors.M1A, nbr)
})
