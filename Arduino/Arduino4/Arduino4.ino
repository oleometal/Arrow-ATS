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

DIRECCION MAC: C4:93:00:04:0E::FB

servopack-X CN1    rele      arduino pin
      32 --------->  8  ---->   8
      28 --------->  7  ---->   9
      30 --------->  6  ---->   10
      33 ------------------->   2
      34 ------------------->   Gnd.
      35 ------------------->   3
      36 ------------------->   Gnd.
      19 ------------------->   4
      20 ------------------->   Gnd.
      37 ------------------->   5
      38 ------------------->   6
      39 ------------------->   7
      26 --------->  5  ---->   11

Cable color
azul UX1W3 ------->  4  ---->   12
limite home X

      41 <---------  3  <----   14

*/


