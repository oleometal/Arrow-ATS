/*
  Arduino2 Yún Bridge 
  Ubicacion +A Armario
  MAC: C4:93:00:04:2D:C1
  IP: 192.168.0.88
  
  Los pines descritos en el setup deben ser siempre declarados como inputs
  porque hay un voltaje permanente que viene de los encoders
  no debe permitir que se cambien desde la aplicacion web;
  El motivo Principal es porque se calienta la tarjeta.
  
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
  
*/

#include <Bridge.h>
#include <BridgeServer.h>
#include <BridgeClient.h>

// Listen to the default port 5555, the Yún webserver
// will forward there all the HTTP requests you send
BridgeServer server;

void setup() {
  // Bridge startup
  pinMode(A0, INPUT); //<-      <- AR141
  pinMode(A1, INPUT); //<-      <- VC11
  pinMode(38, INPUT); //<-      <- BF29
  pinMode(37, INPUT); //<-      <- AP1100
  pinMode(39, INPUT); //<-      <- AR144
  pinMode(40, INPUT); //<-      <- AR16
  pinMode(41, INPUT); //<-      <- AR143
  pinMode(42, INPUT); //<-      <- BC110
  pinMode(43, INPUT); //<-      <- AR15
  pinMode(44, INPUT); //<-      <- VB13
  pinMode(45, INPUT); //<-      <- AR142
  pinMode(46, INPUT); //<-      <- AR17
  pinMode(47, INPUT); //<-      <- AP186
  pinMode(48, INPUT); //<-      <- AP191
  pinMode(49, INPUT); //<-      <- VC12
  pinMode(36, INPUT); //<-      <- AP140
  pinMode(A15,INPUT); //<-      <- BC25
  pinMode(A14,INPUT); //<-      <- BF25
  pinMode(A13,INPUT); //<-      <- BC15
  pinMode(A12,INPUT); //<-      <- BF15
  pinMode(A11,INPUT); //<-      <- VF12
  pinMode(A10,INPUT); //<-      <- AR131
  pinMode(A9, INPUT); //<-      <- AR14
  pinMode(A8, INPUT); //<-      <- AP1318
  pinMode(A7, INPUT); //<-      <- AR13
  pinMode(A5, INPUT); //<-      <- AS18
  pinMode(A4, INPUT); //<-      <- AP163
  pinMode(A3, INPUT); //<-      <- AP162
  pinMode(A2, INPUT); //<-      <- AP161
  pinMode(30, INPUT); //<-      <- WD36
  pinMode(31, INPUT); //<-      <- SA11
  pinMode(32, INPUT); //<-      <- WD16
  pinMode(33, INPUT); //<-      <- WD26
  pinMode(28,OUTPUT); //->      -> BB211
  pinMode(29,OUTPUT); //->      -> SA15
  pinMode(2, OUTPUT); //->      -> BH24
  pinMode(3, OUTPUT); //->      -> VC13
  pinMode(4, OUTPUT); //->      -> BH23
  pinMode(5, OUTPUT); //->      -> WG13
  pinMode(6, OUTPUT); //->      -> BH13
  pinMode(7, OUTPUT); //->      -> BH14
  pinMode(8, OUTPUT); //->      -> AS15,AS16
  pinMode(9, OUTPUT); //->      -> VB52
  pinMode(10,OUTPUT); //->      -> SC15
  pinMode(11,OUTPUT); //->      -> AG113,AP12
  pinMode(12,OUTPUT); //->      -> AL128
  pinMode(17,OUTPUT); //->      -> AL130
  pinMode(18,OUTPUT); //->      -> AL132
  pinMode(16,OUTPUT); //->      -> AL134
  pinMode(14,OUTPUT); //->      -> AL136
  pinMode(15,OUTPUT); //->      -> VB14
  pinMode(34,OUTPUT); //->      -> RUN SERVOPACKS
  pinMode(35,OUTPUT); //->      -> BA211
  Bridge.begin();
  

  // Listen for incoming connection only from localhost
  // (no one from the external network could connect)
  server.noListenOnLocalhost();
  server.begin();
}

void loop() {
  // Get clients coming from server
  BridgeClient client = server.accept();

  // There is a new client?
  if (client) {
    // Process request
    process(client);

    // Close connection and free resources.
    client.stop();
  }

  delay(50); // Poll every 50ms
}

void process(BridgeClient client) {
  // read the command
  String command = client.readStringUntil('/');

  client.println("Status: 200");
  client.println("Access-Control-Allow-Origin: *");   
  client.println("Access-Control-Allow-Methods: GET");
  client.println("Content-Type: text/html");
  client.println("Connection: close");
  client.println();

  // is "digital" command?
  if (command == "digital") {
    digitalCommand(client);
  }

  // is "analog" command?
  if (command == "analog") {
    analogCommand(client);
  }

  // is "mode" command?
  if (command == "mode") {
    modeCommand(client);
  }
}

void digitalCommand(BridgeClient client) {
  int pin, value;

  // Read pin number
  pin = client.parseInt();

  // If the next character is a '/' it means we have an URL
  // with a value like: "/digital/13/1"
  if (client.read() == '/') {
    value = client.parseInt();
    digitalWrite(pin, value);
  } else {
    value = digitalRead(pin);
  }

  // Send feedback to client
  client.print(F("Pin D"));
  client.print(pin);
  client.print(F(" set to "));
  client.println(value);

  // Update datastore key with the current pin value
  String key = "D";
  key += pin;
  Bridge.put(key, String(value));
}

void analogCommand(BridgeClient client) {
  int pin, value;

  // Read pin number
  pin = client.parseInt();

  // If the next character is a '/' it means we have an URL
  // with a value like: "/analog/5/120"
  if (client.read() == '/') {
    // Read value and execute command
    value = client.parseInt();
    analogWrite(pin, value);

    // Send feedback to client
    client.print(F("Pin D"));
    client.print(pin);
    client.print(F(" set to analog "));
    client.println(value);

    // Update datastore key with the current pin value
    String key = "D";
    key += pin;
    Bridge.put(key, String(value));
  } else {
    // Read analog pin
    value = analogRead(pin);

    // Send feedback to client
    client.print(F("Pin A"));
    client.print(pin);
    client.print(F(" reads analog "));
    client.println(value);

    // Update datastore key with the current pin value
    String key = "A";
    key += pin;
    Bridge.put(key, String(value));
  }
}

void modeCommand(BridgeClient client) {
  int pin;

  // Read pin number
  pin = client.parseInt();

  // If the next character is not a '/' we have a malformed URL
  if (client.read() != '/') {
    client.println(F("error"));
    return;
  }

  String mode = client.readStringUntil('\r');

  if (mode == "input") {
    pinMode(pin, INPUT);
    // Send feedback to client
    client.print(F("Pin D"));
    client.print(pin);
    client.print(F(" configured as INPUT!"));
    return;
  }

  if (mode == "output") {
    pinMode(pin, OUTPUT);
    // Send feedback to client
    client.print(F("Pin D"));
    client.print(pin);
    client.print(F(" configured as OUTPUT!"));
    return;
  }

  client.print(F("error: invalid mode "));
  client.print(mode);
}
