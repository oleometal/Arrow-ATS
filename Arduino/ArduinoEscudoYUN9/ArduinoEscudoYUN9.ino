/*
  Arduino9 Yún Bridge 
  Ubicacion +A Armario
  MAC: C4:93:00:04:32:83
  IP: 192.168.0.87
  
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
#include <HttpClient.h>


// Listen to the default port 5555, the Yún webserver
// will forward there all the HTTP requests you send
BridgeServer server;

 int i=0;
    String url ="http://192.168.0.98/api/arduino9/";
    bool O339;
bool I357;
bool I358;
bool I359;
bool O333;
bool I345;
bool I378;
bool I379;
bool O332;
bool I375;
bool I374;
bool I373;
bool O336;
bool I392;
bool I391;
bool I431;
bool I430;
bool I429;
bool I427;
bool I412;
bool I411;
bool I410;
bool I408;
bool I393;
bool O340;
bool O342;
bool O335;
int I372;
int I338;
int I436;
int I390;
int I409;
int I415;
int I341;
int I416;
int I396;
int I397;
int I389;
int I428;
int I435;
int I434;

void setup() {
     
  // Bridge startup        Rele    Cable
  pinMode(A0, INPUT); //<- 2R10 <- UZ12(UZ1W4)
  pinMode(A1, INPUT); //<- 1R10 <- ST126(ST1W4)
  pinMode(A2, INPUT); //<- 1R9  <- ST17(ST1W5) QUITAR PORQUE ES EL FRENO DEL EJE Z1
  pinMode(A3, INPUT); //<- 2R9  <- ST130(ST1W4)
  pinMode(A4, INPUT); //<- 3R9  <- ST132(ST1W4)
  pinMode(A5, INPUT); //<- 2R13 <- UA132(UA1W4)
  pinMode(A7, INPUT); //<- 7R9  <- CU126(CU1W4)
  pinMode(A8, INPUT); //<- 8R9  <- CU128(CU1W4)
  pinMode(A9, INPUT); //<- 8R21 <- CU130(CU1W4)
  pinMode(A10,INPUT); //<- 7R21 <- CU132(CU1W4)
  pinMode(A11,INPUT); //<- 6R9  <- ST12
  pinMode(A12,INPUT); //<- 3R21 <- CN126(CN1W4)
  pinMode(A13,INPUT); //<- 2R21 <- CN128(CN1W4)
  pinMode(A14,INPUT); //<- 1R21 <- CN130(CN1W4)
  pinMode(A15,INPUT); //<- 8R22 <- CN132(CN1W4)
  pinMode(2, OUTPUT); //-> 1R12 -> SV141(SV1W4)
  pinMode(3, INPUT);
  pinMode(4, INPUT_PULLUP); //<--- UC137(UC1W4)
  pinMode(5, INPUT_PULLUP); //<--- UC138(UC1W4)
  pinMode(6, INPUT_PULLUP); //<--- UC139(UC1W4)
  pinMode(7, OUTPUT); //-> 1R11 -> UC141(UC1W4)
  pinMode(9,  INPUT); //<- 8R10 <- UZ126(UZ1W4)
  pinMode(10, INPUT); //<- 7R10 <- UZ17(UZ1W4) ELIMINAR PORQUE ES EL FRENO DEL EJE Z
  pinMode(11, INPUT); //<- 6R10 <- UZ130(UZ1W4)
  pinMode(12, INPUT); //<- 5R10 <- UZ132(UZ1W4)
  pinMode(14, INPUT);
  pinMode(15, INPUT_PULLUP); //<-- UZ137(UZ1W4)
  pinMode(16, INPUT_PULLUP); //<-- UZ138(UZ1W4)
  pinMode(17, INPUT_PULLUP); //<-- UZ139(UZ1W4)
  pinMode(18,OUTPUT); //-> 3R10 -> UZ141(UZ1W4)  
  pinMode(22, INPUT_PULLUP); //<-- ST138(ST1W4)
  pinMode(23, INPUT_PULLUP); //<-- ST139(ST1W4)
  pinMode(24, INPUT);
  pinMode(25, INPUT);
  pinMode(26, INPUT_PULLUP); //<-- CU137(CU1W4)
  pinMode(27, INPUT_PULLUP); //<-- CU138(CU1W4)
  pinMode(28, INPUT_PULLUP); //<-- CU139(CU1W4)
  pinMode(29, INPUT); //<- 4R21 <- CU12(CU1W4)
  pinMode(30, INPUT);
  pinMode(31, INPUT_PULLUP); //<-- UY139(UY1W4)
  pinMode(32, INPUT);
  pinMode(33, INPUT_PULLUP); //<-- CN137(CN1W4)
  pinMode(34, INPUT_PULLUP); //<-- CN138(CN1W4)
  pinMode(35, INPUT_PULLUP); //<-- CN139(CN1W4)
  pinMode(36, INPUT); //<- 5R22 <- CN12 
  pinMode(37, INPUT); 
  pinMode(38, INPUT); 
  pinMode(39, INPUT);
  pinMode(40, INPUT);
  pinMode(41, INPUT_PULLUP); //<-- ST137(ST1W4)
  pinMode(42, INPUT);       //<--------- ST135(ST1W4)
  pinMode(43, OUTPUT);      //-> 6R22 -> ST141(CN1W4)
  pinMode(44, OUTPUT);      //-> 5R21 -> CU141(CU1W4)
  pinMode(45, OUTPUT);      //-> TERMINAL 16 DEL VARIADOR
  pinMode(46, INPUT);       //<--------- UA133(UA1W4)
  pinMode(47, INPUT);
  pinMode(48, INPUT);
  pinMode(49, OUTPUT);      //-> 4R22 -> WQ12(RESET)
  Bridge.begin();
  

  // Listen for incoming connection only from localhost
  // (no one from the external network could connect)
  server.listenOnLocalhost();
  server.begin();
}

void loop() {
    
    url ="http://192.168.0.98/api/arduino9/";
    O339=digitalRead(2);
I357=digitalRead(4);
I358=digitalRead(5);
I359=digitalRead(6);
O333=digitalRead(7);
I345=digitalRead(9);
I378=digitalRead(11);
I379=digitalRead(12);
O332=digitalRead(14);
I375=digitalRead(15);
I374=digitalRead(16);
I373=digitalRead(17);
O336=digitalRead(18);
I392=digitalRead(22);
I391=digitalRead(23);
I431=digitalRead(26);
I430=digitalRead(27);
I429=digitalRead(28);
I427=digitalRead(29);
I412=digitalRead(33);
I411=digitalRead(34);
I410=digitalRead(35);
I408=digitalRead(36);
I393=digitalRead(41);
O340=digitalRead(43);
O342=digitalRead(44);
O335=digitalRead(49);
I372=analogRead(A0);
I338=analogRead(A1);
I436=analogRead(A10);
I390=analogRead(A11);
I409=analogRead(A12);
I415=analogRead(A13);
I341=analogRead(A14);
I416=analogRead(A15);
I396=analogRead(A3);
I397=analogRead(A4);
I389=analogRead(A5);
I428=analogRead(A7);
I435=analogRead(A8);
I434=analogRead(A9);    
      i++;
    if (i>=25){
        url = url+I338+"/"+I341+"/"+I345+"/"+I357+"/"+I358+"/"+I359+"/"+O333+"/"+O332+"/"+O335+"/"+O336+"/"+I372+"/"+I373+"/"+I374+"/"+I375+"/"+I378+"/"+I379+"/"+I389+"/"+I390+"/"+I391+"/"+I392+"/"+I393+"/"+I396+"/"+I397+"/"+O339+"/"+O340+"/"+I408+"/"+I409+"/"+I410+"/"+I411+"/"+I412+"/"+I415+"/"+I416+"/"+O342+"/"+I427+"/"+I428+"/"+I429+"/"+I430+"/"+I431+"/"+I434+"/"+I435+"/"+I436;
        HttpClient client;
        client.getAsynchronously(url);
        i=0;
    }
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
