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
#include <HttpClient.h>

// Listen to the default port 5555, the Yún webserver
// will forward there all the HTTP requests you send
BridgeServer server;
int i=0;
    String url ="http://192.168.0.98/api/arduino6/";
    bool I107;
bool O96;
bool O105;
bool O107;
bool O108;
bool O109;
bool O110;
bool O111;
bool I128;
bool I129;
bool O128;
bool O129;
bool O130;
bool O131;
bool O132;
bool O133;
bool O134;
bool O135;
bool O136;
bool O137;
bool O138;
bool O139;
bool O140;
bool O141;
bool O142;
bool O143;

void setup() {
    

  // Bridge startup        Rele    Color  Cable   Valvula 
  pinMode(29, INPUT); //<-      <- AZUL   (SB115) (SB1S2)
  pinMode(30, INPUT); //<-      <- AZUL           (SB1S1)
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
  pinMode(15,OUTPUT); //->      -> BLANCO,NEGRO (SB142)
  pinMode(16,OUTPUT); //->      -> AZUL (SB141)
  pinMode(17,OUTPUT); //->      -> NARANJA (SB140)
  pinMode(18,OUTPUT); //->      -> NEGRO (SB139)
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
  server.listenOnLocalhost();
  server.begin();
}

void loop() {
    
    url ="http://192.168.0.98/api/arduino6/";
    I107=digitalRead(19);
O96=digitalRead(24);
O105=digitalRead(22);
O107=digitalRead(26);
O108=digitalRead(25);
O109=digitalRead(27);
O110=digitalRead(23);
O111=digitalRead(28);
I128=digitalRead(30);
I129=digitalRead(29);
O128=digitalRead(2);
O129=digitalRead(3);
O130=digitalRead(4);
O131=digitalRead(5);
O132=digitalRead(6);
O133=digitalRead(7);
O134=digitalRead(8);
O135=digitalRead(9);
O136=digitalRead(18);
O137=digitalRead(17);
O138=digitalRead(16);
O139=digitalRead(15);
O140=digitalRead(14);
O141=digitalRead(13);
O142=digitalRead(11);
O143=digitalRead(10);
i++;
    if (i>=25){
        url = url+I107+"/"+O96+"/"+O105+"/"+O107+"/"+O108+"/"+O109+"/"+O110+"/"+O111+"/"+I128+"/"+I129+"/"+O128+"/"+O129+"/"+O130+"/"+O131+"/"+O132+"/"+O133+"/"+O134+"/"+O135+"/"+O136+"/"+O137+"/"+O138+"/"+O139+"/"+O140+"/"+O141+"/"+O142+"/"+O143;
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

  // is "digital" command?
  if (command == "digital") {
    digitalCommand(client);
  }

  // is "analog" command?
  if (command == "analog") {
    analogCommand(client);
  }
    
  if (command == "subirbrocas") {
    subirbrocas(client);
  }

      if (command == "bajarbrocas") {
    bajarbrocas(client);
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





void subirbrocas(BridgeClient client) {
   
    digitalWrite(2, LOW);
    digitalWrite(3, LOW);
    digitalWrite(4, LOW);
    digitalWrite(5, LOW);
    digitalWrite(6, LOW);
    digitalWrite(7, LOW);
    digitalWrite(8, LOW);
    digitalWrite(9, LOW);
    digitalWrite(18, LOW);
    digitalWrite(17, LOW);
    digitalWrite(16, LOW);
    digitalWrite(15, LOW);
    digitalWrite(14, LOW);
    digitalWrite(27, HIGH);
        digitalWrite(23, HIGH);
        digitalWrite(28, HIGH);


    
    delay(2000);
    
    digitalWrite(27, LOW);
        digitalWrite(23, LOW);
    digitalWrite(28, LOW);

    


  
}



void bajarbrocas(BridgeClient client) {
   digitalWrite(2, HIGH);
    digitalWrite(3, HIGH);
    digitalWrite(4, HIGH);
    digitalWrite(5, HIGH);
    digitalWrite(6, HIGH);
    digitalWrite(7, HIGH);
    digitalWrite(8, HIGH);
    digitalWrite(9, HIGH);
    digitalWrite(18, HIGH);
    digitalWrite(17, HIGH);
    digitalWrite(16, HIGH);
    digitalWrite(15, HIGH);
    digitalWrite(14, HIGH);
    digitalWrite(12, HIGH);
        digitalWrite(11, HIGH);
        digitalWrite(10, HIGH);


    
    delay(2000);
    
    digitalWrite(12, LOW);
        digitalWrite(11, LOW);
    digitalWrite(10, LOW);


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
