nbr = 0
basic.show_leds("""
    # # # # #
        # . . . #
        # . . . #
        # . . . #
        # # # # #
""")
basic.pause(2000)
basic.show_leds("""
    # . . . #
        . . . . .
        . . . . .
        . . . . .
        . . . . .
""")
OLED.init(128, 64)
OLED12864_I2C.init(60)
OLED12864_I2C.clear()
OLED.clear()

def on_forever():
    global nbr
    OLED12864_I2C.clear()
    while input.button_is_pressed(Button.B):
        OLED.write_big_number(0,
            0,
            sonar.ping(DigitalPin.P0, DigitalPin.P1, PingUnit.MICRO_SECONDS))
    led.unplot(2, 0)
    if input.button_is_pressed(Button.A):
        if nbr == 255:
            nbr = 0
            basic.pause(1000)
            led.plot(2, 2)
        elif nbr == 0:
            nbr += 255
            basic.pause(1000)
            led.unplot(2, 2)
        else:
            pass
    robotbit.motor_run(robotbit.Motors.M1A, nbr)
basic.forever(on_forever)