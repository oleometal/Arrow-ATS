#include <Servo.h>

Servo myServo;
int angle = 0;
String message;

void setup() {
  message = "";
  myServo.attach(9);
  myServo.write(0);
  Serial.begin(9600);
}

void loop() {
  while(Serial.available()){
    char incomingChar = Serial.read();
    if (isDigit(incomingChar)) {
      message += incomingChar;
    } else if (incomingChar == 'T') {
      angle = constrain(message.toInt(), 0, 180);
      myServo.write(angle);
      message = "";
    }
  }
}
