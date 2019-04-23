/*
  Arduino5 Yún Bridge 
  Ubicación : +G Mesa Izquierda 
  MAC : C4:93:00:03:EA:FE
  IP: 192.168.0.82
  
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
  pinMode(A0, INPUT); 
  pinMode(A1, INPUT);
  pinMode(A12,INPUT); //<- 1R30 <- BT222 
  pinMode(A13,INPUT); //<- 2R30 <- BC220
  pinMode(A15,INPUT); //<- 3R30 <- BC26
  pinMode(49, INPUT); //<-      <- BC16?
  pinMode(48, INPUT); //<-      <- BC16?
  pinMode(47, INPUT); //<-      <- BC120
  pinMode(46, INPUT); //<-      <- BT223
  pinMode(45, INPUT); //<-      <- BA240
  pinMode(41, INPUT); //<-      <- BT29
  pinMode(40, INPUT); //<-      <- BT212
  pinMode(39, INPUT); //<-      <- BT27
  pinMode(38, INPUT); //<-      <- BT213
  pinMode(37, INPUT); //<-      <- BT28
  pinMode(36, INPUT); //<-      <- BA140
  pinMode(2, OUTPUT); //->      -> BT221    
  pinMode(3, OUTPUT); //->      -> BT220
  pinMode(4, OUTPUT); //->      -> BH11
  pinMode(5, OUTPUT); //->      -> BC22
  pinMode(6, OUTPUT); //->      -> BC28
  pinMode(7, OUTPUT); //->      -> BC27
  pinMode(8, OUTPUT); //->      -> BC17
  pinMode(9, OUTPUT); //->      -> BC18
  pinMode(53,OUTPUT); //->      -> BC24
  pinMode(16,OUTPUT); //->      -> BC23
  pinMode(15,OUTPUT); //->      -> BA24
  pinMode(14,OUTPUT); //->      -> BA26
  pinMode(12,OUTPUT); //->      -> BA14
  pinMode(11,OUTPUT); //->      -> BC14
  pinMode(10,OUTPUT); //->      -> BC13
  pinMode(43,OUTPUT); //->      -> BH12
  pinMode(44,OUTPUT); //->      -> BC21
  pinMode(35,OUTPUT); //->      -> BT211
  pinMode(34,OUTPUT); //->      -> BT210
  pinMode(33,OUTPUT); //->      -> BC11
  pinMode(32,OUTPUT); //->      -> BC12
  pinMode(31,OUTPUT); //->      -> BA21
  pinMode(30,OUTPUT); //->      -> BA12
  pinMode(29,OUTPUT); //->      -> BA22
  pinMode(28,OUTPUT); //->      -> BA11
  Bridge.begin();
  

  // Listen for incoming connection only from localhost
  // (no one from the external network could connect)
  server.listenOnLocalhost();
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
