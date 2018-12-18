/*
  Arduino6 Yún Bridge 
  Ubicacion carro +E parte Derecha
  MAC: C4:93:00:04:16:DB
  IP: 192.168.0.84
  
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
    
*/

#include <Bridge.h>
#include <BridgeServer.h>
#include <BridgeClient.h>

// Listen to the default port 5555, the Yún webserver
// will forward there all the HTTP requests you send
BridgeServer server;

void setup() {
  // Bridge startup        Rele    Cable
  pinMode(29, INPUT); //<-      <- AZUL (SB1S2)
  pinMode(30, INPUT); //<-      <- AZUL (SB1S1)
  pinMode(19, INPUT); //<-      <- WG15
  pinMode(2, OUTPUT); //->      -> BLANCO ROJO (SB131)
  pinMode(3, OUTPUT); //->      -> BLANCO NARANJA (SB132)
  pinMode(4, OUTPUT); //->      -> BLANCO CAFE (SB133)
  pinMode(5, OUTPUT); //->      -> ROJO (SB134)
  pinMode(6, OUTPUT); //->      -> GRIS (SB135)
  pinMode(7, OUTPUT); //->      -> AMARILLO (SB136)
  pinMode(8, OUTPUT); //->      -> CAFE (SB137)
  pinMode(9, OUTPUT); //->      -> VERDE (SB138)
  pinMode(10,OUTPUT); //->      -> SB148
  pinMode(11,OUTPUT); //->      -> SB146
  pinMode(12,OUTPUT); //->      -> SB144
  pinMode(14,OUTPUT); //->      -> GRIS,NEGRO (SB143)
  pinMode(15,OUTPUT); //->      -> BLANCO,NEGRO
  pinMode(16,OUTPUT); //->      -> AZUL
  pinMode(17,OUTPUT); //->      -> NARANJA
  pinMode(18,OUTPUT); //->      -> NEGRO
  pinMode(27,OUTPUT); //-> 1R37 -> SB145
  pinMode(28,OUTPUT); //-> 2R37 -> SB149
  pinMode(22,OUTPUT); //->      -> SA113
  pinMode(23,OUTPUT); //->      -> SB147
  pinMode(24,OUTPUT); //->      -> SA111
  pinMode(25,OUTPUT); //->      -> SB112
  pinMode(26,OUTPUT); //->      -> SB111
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
