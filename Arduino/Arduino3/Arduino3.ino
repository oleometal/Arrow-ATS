/*
  Arduino3 Yún Bridge 
  Ubicacion +A Armario
  MAC: C4:93:00:03:E9:B1
  IP: 192.168.1.85
  
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
  // Bridge startup        Rele    Cable
  pinMode(47, INPUT); //<-      <- AL123
  pinMode(48, INPUT); //<-      <- AL119
  pinMode(49, INPUT); //<-      <- AL121
  pinMode(A0, INPUT); //<-      <- AL111
  pinMode(A1, INPUT); //<-      <- AL117
  pinMode(27, INPUT); //<-      <- AL138
  pinMode(28, INPUT); //<-      <- AL137
  pinMode(34, INPUT); //<- 5R41 <- AP170
  pinMode(35, INPUT); //<- 4R41 <- AP180
  pinMode(36, INPUT); //<- 3R41 <- AG113
  pinMode(37, INPUT); //<- 2R41 <- AP1310
  pinMode(38, INPUT); //<- 1R41 <- AP164
  pinMode(39, INPUT); //<-      <- AR132
  pinMode(40, INPUT); //<-      <- AL1W16 (cafe)
  pinMode(41, INPUT); //<-      <- AL113
  pinMode(42, INPUT); //<-      <- AL115
  pinMode(A8, INPUT); //<-      <- AL144
  pinMode(A9, INPUT); //<-      <- BB210
  pinMode(A10,INPUT); //<-      <- BA110
  pinMode(A11,INPUT); //<-      <- BA210
  pinMode(A12,INPUT); //<-      <- BB110
  pinMode(A13,INPUT); //<-      <- BC29
  pinMode(A14,INPUT); //<-      <- BC19
  pinMode(A15,INPUT); //<-      <- BF19
  pinMode(A7, INPUT); //<-      <- NARANJA (AL1W16)
  pinMode(45, INPUT); //<-      <- VERDE (AL1W16)
  pinMode(A5, INPUT); //<-      <- NEGRO (AL1W16)
  pinMode(40, INPUT); //<-      <- CAFE (AL1W16)
  pinMode(A4, INPUT); //<-      <- AL129
  pinMode(A3, INPUT); //<-      <- AL131
  pinMode(A2, INPUT); //<-      <- AL127
  pinMode(46, INPUT); //<-      <- AL125
  pinMode(16, INPUT); //<-      <- AL140
  pinMode(17, INPUT); //<-      <- AL142
  pinMode(18, INPUT); //<-      <- AL143
  pinMode(19, INPUT); //<-      <- AL135
  pinMode(28, INPUT); //<-      <- AL137
  pinMode(27, INPUT); //<-      <- AL138
  pinMode(22, INPUT); //<-      <- AL139
  pinMode(23, INPUT); //<-      <- AL141
  pinMode(43, INPUT); //<-      <- AL133
  pinMode(26,OUTPUT); //->      -> AL124
  pinMode(14,OUTPUT); //->      -> AL110
  pinMode(2, OUTPUT); //->      -> AL112
  pinMode(3, OUTPUT); //->      -> AL114
  pinMode(4, OUTPUT); //->      -> AL116
  pinMode(5, OUTPUT); //->      -> AL118
  pinMode(6, OUTPUT); //->      -> AL120
  pinMode(7, OUTPUT); //->      -> AL122
  pinMode(8, OUTPUT); //->      -> BT26,BT24
  pinMode(9, OUTPUT); //->      -> AG1105,SU111
  pinMode(10,OUTPUT); //->      -> BT16,BT14
  pinMode(11,OUTPUT); //->      -> BT214
  pinMode(12,OUTPUT); //->      -> BT114
  pinMode(24,OUTPUT); //->      -> BT21
  pinMode(25,OUTPUT); //->      -> BT11
  pinMode(15,OUTPUT); //->      -> AL126
  pinMode(44,OUTPUT); //-> 5R9  -> ST141(ST1W5)
  Bridge.begin();
  

  // Listen for incoming connection only from localhost
  // (no one from the external network could connect)
  //server.listenOnLocalhost();
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
