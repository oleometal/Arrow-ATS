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
  to use the Bridge library to access the digi|tal and
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
#include <HttpClient.h>

// Listen to the default port 5555, the Yún webserver
// will forward there all the HTTP requests you send
BridgeServer server;
   int i=0;
    String url ="http://192.168.0.98/api/arduino5/";
    bool O331;
bool O330;
bool O317;
bool O312;
bool O325;
bool O324;
bool O322;
bool O323;
bool O326;
bool O327;
bool O306;
bool O308;
bool O307;
bool O328;
bool O313;
bool O316;
bool O314;
bool O315;
bool O310;
bool O309;
bool O304;
bool O305;
bool I309;
bool I305;
bool I308;
bool I304;
bool I307;
bool I306;
bool O318;
bool O311;
bool I310;
bool I325;
bool I322;
bool I320;
bool I323;
bool O329;
int I324;
int I321;

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
    url ="http://192.168.0.98/api/arduino5/";
    O331=digitalRead(2);
O330=digitalRead(3);
O317=digitalRead(4);
O312=digitalRead(5);
O325=digitalRead(6);
O324=digitalRead(7);
O322=digitalRead(8);
O323=digitalRead(9);
O326=digitalRead(10);
O327=digitalRead(11);
O306=digitalRead(12);
O308=digitalRead(14);
O307=digitalRead(15);
O328=digitalRead(16);
O313=digitalRead(28);
O316=digitalRead(29);
O314=digitalRead(30);
O315=digitalRead(31);
O310=digitalRead(32);
O309=digitalRead(33);
O304=digitalRead(34);
O305=digitalRead(35);
I309=digitalRead(36);
I305=digitalRead(37);
I308=digitalRead(38);
I304=digitalRead(39);
I307=digitalRead(40);
I306=digitalRead(41);
O318=digitalRead(43);
O311=digitalRead(44);
I310=digitalRead(45);
I325=digitalRead(46);
I322=digitalRead(47);
I320=digitalRead(48);
I323=digitalRead(51);
O329=digitalRead(53);
I324=analogRead(A12);
I321=analogRead(A15);
i++;
    if (i>=25){
        url = url+I304+"/"+I305+"/"+I306+"/"+I307+"/"+I308+"/"+I309+"/"+I310+"/"+O304+"/"+O305+"/"+O306+"/"+O307+"/"+O308+"/"+O309+"/"+O310+"/"+O311+"/"+O312+"/"+O313+"/"+O314+"/"+O315+"/"+O316+"/"+O317+"/"+O318+"/"+I320+"/"+I321+"/"+I322+"/"+I323+"/"+I324+"/"+I325+"/"+O322+"/"+O323+"/"+O324+"/"+O325+"/"+O326+"/"+O327+"/"+O328+"/"+O329+"/"+O330+"/"+O331;
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
    
      if (command == "subirstops") {
    subirstops(client);
  }
       if (command == "bajarstops") {
    bajarstops(client);
  }

  // is "mode" command?
  if (command == "mode") {
    modeCommand(client);
  }
}


void subirstops(BridgeClient client) {
    digitalWrite(30, HIGH);
    digitalWrite(28, HIGH);
    digitalWrite(12, HIGH);
    digitalWrite(29, HIGH);
    digitalWrite(31, HIGH);
    digitalWrite(14, HIGH);
    digitalWrite(15, HIGH);
}
    
    void bajarstops(BridgeClient client) {
        digitalWrite(30, LOW);
        digitalWrite(28, LOW);
        digitalWrite(12, LOW);
        digitalWrite(29, LOW);
        digitalWrite(31, LOW);
        digitalWrite(14, LOW);
        digitalWrite(15, LOW);
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
