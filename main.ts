input.onButtonPressed(Button.A, function () {
    StartbitV2.startbit_setPixelRGB(StartbitLights.Light1, StartbitRGBColors.Red)
    StartbitV2.startbit_showLight()
    ArmDirectionInit = (ArmDirectionTopLimit - ArmDirectionBottomLimit) / 2 + ArmDirectionBottomLimit
    ArmAngleInit = (ArmAngleTopLimit - ArmAngleBotomLimit) / 2 + ArmAngleBotomLimit
    ClawInit = (ClawTopLimit - ClawBottomLimit) / 2 + ClawBottomLimit
    StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ArmServo, ArmAngleInit, 1000)
    StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, LiftServo, ArmDirectionInit, 1000)
    StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ClawServo, ClawInit, 1000)
    basic.showIcon(IconNames.Yes)
    StartbitV2.startbit_clearLight()
    basic.clearScreen()
})
radio.onReceivedString(function (receivedString) {
    StartbitV2.startbit_setPixelRGB(StartbitLights.Light1, StartbitRGBColors.Red)
    StartbitV2.startbit_setPixelRGB(StartbitLights.Light2, StartbitRGBColors.Red)
    StartbitV2.startbit_showLight()
    if (receivedString == "stop") {
        StartbitV2.startbit_setMotorSpeed(0, 0)
    } else {
        if (receivedString == "CO") {
            if (ClawCurrent < ClawTopLimit) {
                ClawCurrent += 10
                StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ClawServo, ClawCurrent, 1000)
            }
        } else {
            if (receivedString == "CC") {
                if (ClawCurrent > ClawBottomLimit) {
                    ClawCurrent += -10
                    StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ClawServo, ClawCurrent, 1000)
                }
            } else {
                if (receivedString == "J2") {
                    music.play(music.stringPlayable("E E - E E - A A ", 220), music.PlaybackMode.UntilDone)
                }
                if (receivedString == "J1") {
                    music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.UntilDone)
                }
            }
        }
    }
    StartbitV2.startbit_clearLight()
})
radio.onReceivedValue(function (name, value) {
    let RY = 0
    let RX = 0
    StartbitV2.startbit_setPixelRGB(StartbitLights.Light1, StartbitRGBColors.Red)
    StartbitV2.startbit_setPixelRGB(StartbitLights.Light2, StartbitRGBColors.Red)
    StartbitV2.startbit_showLight()
    if (name == "LX") {
        if (value < 0) {
            LX = value
            StartbitV2.startbit_setMotorSpeed(value * -1, value)
        } else {
            LX = value
            StartbitV2.startbit_setMotorSpeed(value, value * -1)
        }
    }
    if (name == "LY") {
        LY = value
        StartbitV2.startbit_setMotorSpeed(value, value)
    }
    if (name == "RX") {
        if (ArmDirectionCurrent > ArmDirectionBottomLimit) {
            ArmDirectionCurrent += -10
            StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ArmServo, ArmDirectionCurrent, 500)
        } else {
            if (ArmDirectionCurrent > ArmDirectionBottomLimit) {
                ArmDirectionCurrent += -10
                StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ArmServo, ArmDirectionCurrent, 500)
            }
        }
    }
    if (name == "RY") {
        if (ArmAngleCurrent < ArmAngleTopLimit) {
            ArmAngleCurrent += 20
            StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, LiftServo, ArmAngleCurrent, 500)
        } else {
            if (ArmAngleCurrent > ArmAngleBotomLimit) {
                ArmAngleCurrent += -20
                StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, LiftServo, ArmAngleCurrent, 500)
            }
        }
    }
    led.plot(pins.map(
    LX,
    -100,
    100,
    0,
    4
    ), pins.map(
    LY,
    -100,
    100,
    0,
    4
    ))
    led.plot(pins.map(
    RX,
    -100,
    100,
    0,
    4
    ), pins.map(
    RY,
    -100,
    100,
    0,
    4
    ))
    basic.pause(50)
    basic.clearScreen()
    StartbitV2.startbit_clearLight()
})
let LY = 0
let LX = 0
let ArmAngleCurrent = 0
let ArmDirectionCurrent = 0
let ClawCurrent = 0
let ClawInit = 0
let ClawBottomLimit = 0
let ClawTopLimit = 0
let ArmAngleInit = 0
let ArmDirectionInit = 0
let ArmDirectionBottomLimit = 0
let ArmDirectionTopLimit = 0
let ArmAngleBotomLimit = 0
let ArmAngleTopLimit = 0
let ClawServo = 0
let LiftServo = 0
let ArmServo = 0
StartbitV2.startbit_Init()
radio.setGroup(1)
basic.showNumber(1)
basic.showIcon(IconNames.Yes)
ArmServo = 1
LiftServo = 2
ClawServo = 3
ArmAngleTopLimit = 110
ArmAngleBotomLimit = 45
ArmDirectionTopLimit = 130
ArmDirectionBottomLimit = 25
ArmDirectionInit = (ArmDirectionTopLimit - ArmDirectionBottomLimit) / 2 + ArmDirectionBottomLimit
ArmAngleInit = (ArmAngleTopLimit - ArmAngleBotomLimit) / 2 + ArmAngleBotomLimit
ClawTopLimit = 150
ClawBottomLimit = 90
ClawInit = (ClawTopLimit - ClawBottomLimit) / 2 + ClawBottomLimit
ClawCurrent = ClawInit
ArmDirectionCurrent = ArmDirectionInit
ArmAngleCurrent = ArmAngleInit
StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ArmServo, ArmAngleInit, 1000)
StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, LiftServo, ArmDirectionInit, 1000)
StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ClawServo, ClawInit, 1000)
StartbitV2.startbit_setPixelRGB(StartbitLights.Light1, StartbitRGBColors.Green)
StartbitV2.startbit_setPixelRGB(StartbitLights.Light2, StartbitRGBColors.Green)
basic.clearScreen()
basic.forever(function () {
    led.plot(2, 2)
})
