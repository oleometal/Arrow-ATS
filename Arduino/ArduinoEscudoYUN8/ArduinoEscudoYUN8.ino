/*
  Arduino8 Yún Bridge 
  Ubicacion +A Armario
  MAC: C4:93:00:04:0E:FB
  IP: 192.168.0.86
  
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
  pinMode(A0, INPUT); //<- 2R11 <- UC12
  pinMode(A1, INPUT); //<- 3R13 <- UC130(UA1W4)
  pinMode(A2, INPUT); //<- 4R11 <- UC132(UC1W4)
  pinMode(A3, INPUT); //<- 5R11 <- UC130(UC1W4)
  pinMode(A4, INPUT); //<- 6R11 <- UC128(UC1W4)
  pinMode(A5, INPUT); //<- 7R11 <- UC126(UC1W4)
  pinMode(A8, INPUT); //<- 4R13 <- UA128(UA1W4)
  pinMode(A13,INPUT); //<- 7R12 <- UA12
  pinMode(A14,OUTPUT);//-> 8R12 -> UA141(UA1W4)(1CN.41)
  pinMode(A15,INPUT); //<- 5R13 <- UA126(UA1W4)
  pinMode(A7, INPUT); //<- 8R11 <- SV12
  pinMode(A12,INPUT); //<- 6R12 <- SV126(SV1W4)
  pinMode(A11,INPUT); //<- 5R12 <- SV128(SV1W4)
  pinMode(A10,INPUT); //<- 4R12 <- SV130(SV1W4)
  pinMode(A9, INPUT); //<- 3R12 <- SV132(SV1W4)
  pinMode(2,  INPUT);
  pinMode(3,  INPUT);
  pinMode(4,  INPUT);
  pinMode(5,  INPUT_PULLUP); //<-- UX137(UX1W4)
  pinMode(6,  INPUT_PULLUP); //<-- UX138(UX1W4)
  pinMode(7,  INPUT_PULLUP); //<-- UX139(UX1W4)
  pinMode(8,  INPUT); //<- 8R15 <- UX132(UX1W4)
  pinMode(9,  INPUT); //<- 7R15 <- UX128(UX1W4)
  pinMode(10, INPUT); //<- 6R15 <- UX130(UX1W4)
  pinMode(11, INPUT); //<- 5R15 <- UX126(UX1W4)
  pinMode(12, INPUT); //<- 4R15 <- UX12 
  pinMode(14,OUTPUT); //-> 3R15 -> UX141(UX1W4)
  pinMode(15, INPUT);
  pinMode(16, INPUT);
  pinMode(17, INPUT);
  pinMode(18, INPUT_PULLUP); //<-- UY137(UY1W4)
  pinMode(19, INPUT_PULLUP); //<-- UY138(UY1W4)
  pinMode(22, INPUT_PULLUP); //<-- UY237(UY2W4)
  pinMode(23, INPUT_PULLUP); //<-- UY238(UY2W4)
  pinMode(24, INPUT_PULLUP); //<-- UY239(UY2W4)
  pinMode(25, INPUT);
  pinMode(26, INPUT); 
  pinMode(27, INPUT); 
  pinMode(28, INPUT_PULLUP); //<-- UA137(UA1W4)
  pinMode(29, INPUT_PULLUP); //<-- UA138(UA1W4)
  pinMode(30, INPUT_PULLUP); //<-- UA139(UA1W4)
  pinMode(31, INPUT);
  pinMode(32, INPUT);
  pinMode(33,INPUT_PULLUP); //<--- SV137(SV1W4)
  pinMode(34,INPUT_PULLUP); //<--- SV138(SV1W4)
  pinMode(35,INPUT_PULLUP); //<--- SV139(SV1W4)  
  pinMode(36, INPUT);
  pinMode(37, INPUT); //<- 2R15 <- UY132(UY1W4)
  pinMode(38, INPUT); //<- 1R15 <- UY128(UY1W4)
  pinMode(39, INPUT); //<- 8R14 <- UY130(UY1W4)
  pinMode(40, INPUT); //<- 7R14 <- UY126(UY1W4)
  pinMode(41, INPUT); //<- 6R14 <- UY12
  pinMode(42, INPUT); //<- 5R14 <- UX141(UX1W4)
  pinMode(43,OUTPUT); //<- 4R?  <- UY241(UY2W4)
  pinMode(44, INPUT); //<- 3R?  <- homeUY2W3(UY2W4)
  pinMode(45, INPUT); //<- 2R?  <- 26(UY2W4)
  pinMode(46, INPUT); //<- 1R14 <- 28(UY2W4)
  pinMode(47, INPUT); //<- 8R13 <- 30(UY2W4)
  pinMode(48, INPUT); //<- 7R13 <- 32(UY2W4)
  pinMode(49, INPUT);
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