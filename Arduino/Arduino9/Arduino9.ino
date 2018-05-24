/*
  Arduino9 Yún Bridge 
  
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
  pinMode(A2, INPUT);      //<- 2R13 <- 32   (UA1U1)
  pinMode(A11, INPUT);     //<- 6R9  <- ST12 (ST1U1)
  pinMode(3, INPUT);
  pinMode(4, INPUT_PULLUP);
  pinMode(5, INPUT_PULLUP);
  pinMode(6, INPUT_PULLUP);
  pinMode(8, INPUT);
  pinMode(14, INPUT);
  pinMode(15, INPUT_PULLUP);
  pinMode(16, INPUT_PULLUP);
  pinMode(17, INPUT_PULLUP);
  pinMode(19, INPUT);
  pinMode(22, INPUT_PULLUP);
  pinMode(23, INPUT_PULLUP);
  pinMode(24, INPUT);
  pinMode(25, INPUT);
  pinMode(26, INPUT_PULLUP);
  pinMode(27, INPUT_PULLUP);
  pinMode(28, INPUT_PULLUP);
  pinMode(30, INPUT);
  pinMode(31, INPUT_PULLUP);
  pinMode(32, INPUT);
  pinMode(33, INPUT_PULLUP);
  pinMode(34, INPUT_PULLUP);
  pinMode(35, INPUT_PULLUP);
  pinMode(36, INPUT);       //<- 5R22 <- CN12 
  pinMode(37, INPUT);       //<--------- 33 (CN1U1)
  pinMode(38, INPUT);       //<--------- 33 (CU1U1)
  pinMode(39, INPUT);
  pinMode(40, INPUT);
  pinMode(41, INPUT_PULLUP);//<--------- 37 (ST1U1)
  pinMode(42, INPUT);       //<--------- 35 (ST1U1)
  pinMode(43, OUTPUT);      //-> 6R22 -> 41 (CN1U1)
  pinMode(44, OUTPUT);      //-> 5R21 -> 41 (CU1U1)
  pinMode(45, INPUT);
  pinMode(46, INPUT);       //<--------- 33 (UA1U1)
  pinMode(47, INPUT);
  pinMode(48, INPUT);
  pinMode(49, OUTPUT);      //-> 4R22 -> 44 (CN1U1)
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
