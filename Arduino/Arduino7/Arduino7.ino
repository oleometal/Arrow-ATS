/*
  Arduino7 Yún 
  Ubicacion carro +E parte izquierda
  MAC: C4:93:00:04:2D:C1
  IP: 192.168.1.89

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

*/
void setup() {
  // Bridge startup        Rele    Cable
  pinMode(24, INPUT); //<-      <- CN115
  pinMode(25, INPUT); //<-      <- CU115
  pinMode(26, INPUT); //<-      <- CU114
  pinMode(10, INPUT); //<-      <- SA124
  pinMode(11, INPUT); //<-      <- SA125
  pinMode(12, INPUT); //<-      <- SA135
  pinMode(14, INPUT); //<-      <- SA136
  pinMode(15, INPUT); //<-      <- SC124
  pinMode(16, INPUT); //<-      <- SC125
  pinMode(17, INPUT); //<-      <- SC126
  pinMode(18, INPUT); //<-      <- CN114
  pinMode(19,OUTPUT); //->      -> CN121
  pinMode(27,OUTPUT); //-> 7R38 -> SA122
  pinMode(28,OUTPUT); //-> 6R38 -> CN122    
  pinMode(22,OUTPUT); //->      -> SA121
  pinMode(23,OUTPUT); //->      -> CU112
  pinMode(2, OUTPUT); //->      -> CU111
  pinMode(3, OUTPUT); //->      -> SA132
  pinMode(4, OUTPUT); //->      -> SC122
  pinMode(5, OUTPUT); //->      -> SC121
  pinMode(6, OUTPUT); //->      -> ST19
  pinMode(7, OUTPUT); //->      -> CN111
  pinMode(8, OUTPUT); //->      -> SA131
  pinMode(9, OUTPUT); //->      -> SA134
  Bridge.begin();
  

  // Listen for incoming connection only from localhost
  // (no one from the external network could connect)
  server.listenOnLocalhost();
  server.begin();
}

