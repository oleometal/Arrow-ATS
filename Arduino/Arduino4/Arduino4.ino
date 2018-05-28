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
  // Bridge startup        Rele    Cable
  pinMode(31, INPUT); //<- 3R28 <- BT18
  pinMode(2, OUTPUT); //->      -> BB13
  pinMode(3, OUTPUT); //->      -> BF27
  pinMode(4, OUTPUT); //->      -> BF28    
  pinMode(12,OUTPUT); //->      -> BF21
  pinMode(11,OUTPUT); //->      -> BH22
  pinMode(10,OUTPUT); //->      -> BH21
  pinMode(9, OUTPUT); //->      -> BB22
  pinMode(8, OUTPUT); //->      -> BB21
  pinMode(7, OUTPUT); //->      -> BB12
  pinMode(6, OUTPUT); //->      -> BB11
  pinMode(5, OUTPUT); //->      -> BF22
  pinMode(14,OUTPUT); //->      -> BB23
  pinMode(15,OUTPUT); //->      -> BF18
  pinMode(16,OUTPUT); //->      -> BF17
  pinMode(17,OUTPUT); //->      -> BF13
  pinMode(18,OUTPUT); //->      -> BF14
  pinMode(19,OUTPUT); //->      -> BF23
  pinMode(49,OUTPUT); //-> 1R25 -> BF24
  pinMode(48,OUTPUT); //-> 2R25 -> BF12
  pinMode(47,OUTPUT); //-> 3R25 -> BF11
  pinMode(46,OUTPUT); //-> 4R25 -> BB26
  pinMode(45,OUTPUT); //-> 5R25 -> BB14
  pinMode(44,OUTPUT); //-> 6R25 -> BB24
  pinMode(43,OUTPUT); //-> 7R25 -> BT111
  pinMode(42,OUTPUT); //-> 8R25 -> BT110
  Bridge.begin();
  

  // Listen for incoming connection only from localhost
  // (no one from the external network could connect)
  server.listenOnLocalhost();
  server.begin();
}

