function _init () {
    doLights(150)
    StartbitV2.startbit_setBrightness(100)
    basic.showIcon(IconNames.Yes)
    ArmDirectionInit = (ArmDirectionTopLimit - ArmDirectionBottomLimit) / 2 + ArmDirectionBottomLimit
    ArmAngleInit = (ArmAngleTopLimit - ArmAngleBotomLimit) / 2 + ArmAngleBotomLimit
    ClawInit = (ClawTopLimit - ClawBottomLimit) / 2 + ClawBottomLimit
    StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ArmServo, ArmAngleInit, 1000)
    StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, LiftServo, ArmDirectionInit, 1000)
    StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ClawServo, ClawInit, 1000)
    ArmDirectionCurrent = ArmDirectionInit
    ArmAngleCurrent = ArmAngleInit
    ClawCurrent = ClawInit
    StartbitV2.startbit_clearLight()
    basic.clearScreen()
}
function doRY (num: number) {
    StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, LiftServo, pins.map(
    num,
    -100,
    100,
    ArmAngleTopLimit,
    ArmAngleBotomLimit
    ), 500)
}
function doClawOpen () {
    if (ClawCurrent < ClawTopLimit) {
        ClawCurrent += 10
        StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ClawServo, ClawCurrent, 500)
    }
}
radio.onReceivedString(function (receivedString) {
    doLights(60)
    if (receivedString == "stop") {
        StartbitV2.startbit_setMotorSpeed(0, 0)
    } else {
        if (receivedString == "CO") {
            doClawOpen()
        } else {
            if (receivedString == "CC") {
                doClawClose()
            } else {
                if (receivedString == "J2") {
                    music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.UntilDone)
                }
                if (receivedString == "J1") {
                    _init()
                }
            }
        }
    }
    StartbitV2.startbit_clearLight()
})
function doRX (num: number) {
    StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ArmServo, pins.map(
    num,
    -100,
    100,
    ArmDirectionTopLimit,
    ArmDirectionBottomLimit
    ), 500)
}
function doLX (num: number) {
    if (LR == 0) {
        StartbitV2.startbit_setMotorSpeed(num, num * -1)
    } else {
        StartbitV2.startbit_setMotorSpeed(num * -1, num)
    }
}
function doLights (num: number) {
    StartbitV2.startbit_setPixelRGBArgs(StartbitLights.Light1, 0)
    StartbitV2.startbit_setPixelRGBArgs(StartbitLights.Light1, 0)
    StartbitV2.startbit_showLight()
}
radio.onReceivedValue(function (name, value) {
    doLights(1)
    if (name == "LX") {
        doLX(Math.floor(value))
    }
    if (name == "LY") {
        doLY(Math.floor(value))
    }
    if (name == "RX") {
        doRX(Math.floor(value))
    }
    if (name == "RY") {
        doRY(Math.floor(value))
    }
    basic.pause(50)
    StartbitV2.startbit_clearLight()
})
function doClawClose () {
    if (ClawCurrent > ClawBottomLimit) {
        ClawCurrent += -10
        StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ClawServo, ClawCurrent, 500)
    }
}
function doLY (num: number) {
    StartbitV2.startbit_setMotorSpeed(num, num)
}
let ClawCurrent = 0
let ArmAngleCurrent = 0
let ArmDirectionCurrent = 0
let ClawInit = 0
let ArmAngleInit = 0
let ArmDirectionInit = 0
let LR = 0
let ClawBottomLimit = 0
let ClawTopLimit = 0
let ArmDirectionBottomLimit = 0
let ArmDirectionTopLimit = 0
let ArmAngleBotomLimit = 0
let ArmAngleTopLimit = 0
let ClawServo = 0
let LiftServo = 0
let ArmServo = 0
StartbitV2.startbit_Init()
StartbitV2.startbit_initRGBLight()
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
ClawTopLimit = 150
ClawBottomLimit = 90
LR = 1
_init()
