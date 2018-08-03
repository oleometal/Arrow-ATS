/*
  Arduino4 Yún 
  Ubicacion +F Mesa Derecha
  MAC: C4:93:00:04:0C:FA
  IP: 192.168.0.83

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
  pinMode(32, INPUT); //<- 2R28 <- BT19
  pinMode(22, INPUT); //<-      <- BT17
  pinMode(23, INPUT); //<-      <- BF26
  pinMode(24, INPUT); //<-      <- BF16
  pinMode(25, INPUT); //<-      <- BF120
  pinMode(26, INPUT); //<-      <- BF16?
  pinMode(27, INPUT); //<-      <- BB240
  pinMode(28, INPUT); //<-      <- BB140
  pinMode(29, INPUT); //<-      <- BT112
  pinMode(30, INPUT); //<-      <- BT113
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