function init () {
    StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ArmServo, ArmDirectionInit, 1000)
    StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, LiftServo, ArmAngleInit, 1000)
    StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ClawServo, ClawInit, 1000)
    basic.showString("F")
    StartbitV2.startbit_setMotorSpeed(80, 80)
    basic.showString("B")
    StartbitV2.startbit_setMotorSpeed(-80, -80)
    basic.showString("L")
    StartbitV2.startbit_setMotorSpeed(-80, 80)
    basic.showString("R")
    StartbitV2.startbit_setMotorSpeed(80, -80)
    basic.showString("S")
    StartbitV2.startbit_setMotorSpeed(0, 0)
}
radio.onReceivedValue(function (name, value) {
    Speed = pins.map(
    value,
    -5,
    5,
    -100,
    100
    )
    if (name == "34") {
        basic.showString("F")
        StartbitV2.startbit_setMotorSpeed(Speed, Speed)
    } else if (name == "56") {
        if (value < 0) {
            basic.showString("R")
            StartbitV2.startbit_setMotorSpeed(Speed, Speed / 2)
        } else {
            basic.showString("L")
            StartbitV2.startbit_setMotorSpeed(Speed / 2, Speed)
        }
    } else if (name == "90") {
        basic.showString("S")
        ArmDirectionCurrent = pins.map(
        value,
        -5,
        5,
        ArmDirectionBottomLimit,
        ArmDirectionTopLimit
        )
        StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ArmServo, ArmDirectionCurrent, 1000)
    } else if (name == "ArmLift") {
        basic.showString("E")
        ArmAngleCurrent = pins.map(
        value,
        -5,
        5,
        ArmAngleBotomLimit,
        ArmAngleTopLimit
        )
        StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, LiftServo, ArmAngleCurrent, 1000)
    } else {
    	
    }
    if (name == "1") {
        basic.showString("O")
        ClawCurrent = ClawCurrent - 15
        StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ClawServo, ClawCurrent, 1000)
    } else if (name == "2") {
        basic.showString("C")
        ClawCurrent = ClawCurrent + 15
        StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range1, ClawServo, ClawCurrent, 1000)
    } else {
    	
    }
})
let Speed = 0
let ArmAngleCurrent = 0
let ArmDirectionCurrent = 0
let ClawCurrent = 0
let ClawInit = 0
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
ArmServo = 1
LiftServo = 2
ClawServo = 3
ArmAngleTopLimit = 110
ArmAngleBotomLimit = 45
ArmDirectionTopLimit = 130
ArmDirectionBottomLimit = 25
ArmDirectionInit = 78
ArmAngleInit = 70
let ClawTopLimit = 150
let ClawBottomLimit = 90
ClawInit = 120
ClawCurrent = ClawInit
ArmDirectionCurrent = ArmDirectionInit
ArmAngleCurrent = ArmAngleInit
basic.showIcon(IconNames.SmallHeart)
