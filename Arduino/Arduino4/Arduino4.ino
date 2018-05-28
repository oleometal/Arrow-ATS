/*
  Arduino Yún Bridge example

  This example for the YunShield/Yún shows how 
  to use the Bridge library to access the digital and
  analog pins on the board through REST calls.
  It demonstrates how you can create your own API when
  using REST style calls through the browser.

  Possible commands created in this shetch:

  "/arduino/digital/13"     -> digitalRead(13)
  "/arduino/digital/13/1"   -> digitalWrite(13, HIGH)
  "/arduino/analog/2/123"   -> analogWrite(2, 123)
  "/arduino/analog/2"       -> analogRead(2)
  "/arduino/mode/13/input"  -> pinMode(13, INPUT)
  "/arduino/mode/13/output" -> pinMode(13, OUTPUT)

  This example code is part of the public domain

  http://www.arduino.cc/en/Tutorial/Bridge

DIRECCION MAC: C4:93:00:04:0C:FA



*/
void setup() {
  // Bridge startup
  pinMode(31, INPUT);      //<- 3R28 <- BT18
  pinMode(A1, INPUT);      //<-  <- VC11
  pinMode(A11, INPUT);     //<- 6R9  <- ST12 (ST1U1)
  Bridge.begin();
  

  // Listen for incoming connection only from localhost
  // (no one from the external network could connect)
  server.listenOnLocalhost();
  server.begin();
}

