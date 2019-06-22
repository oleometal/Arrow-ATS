/*
  Arduino2 Yún Bridge 
  Ubicacion +A Armario
  MAC: C4:93:00:04:2D:C1
  IP: 192.168.0.88
  
  Possible commands created in this shetch:
  "/arduino/digital/13"     -> digitalRead(13)
  "/arduino/digital/13/1"   -> digitalWrite(13, HIGH)
  "/arduino/analog/2/123"   -> analogWrite(2, 123)
  "/arduino/analog/2"       -> analogRead(2)
  "/arduino/mode/13/input"  -> pinMode(13, INPUT)
  "/arduino/mode/13/output" -> pinMode(13, OUTPUT)

  "/data" is used to access to the internal key/value storage. The available calls are:

    /put/KEY/VALUE : stores a value inside the storage
    /get/KEY : obtains the value of the requested key in JSON
    /get : obtains the entire storage list in JSON.
    /delete : deletes the internal storage
    
*/

#include <Bridge.h>
#include <BridgeServer.h>
#include <BridgeClient.h>
#include <HttpClient.h>
//ID de Sensores
const int pinI85 =  A0;  
const int pinI16 =  A1;  
const int pinI41 =  38; 
const int pinI22 =  37;  
const int pinI86 =  39;
const int pinI80 =  40;
const int pinI87 =  41;
const int pinI74 =  42;
const int pinI73 =  43;
const int pinI78 =  44;
const int pinI84 =  45;
const int pinI81 =  46;
const int pinI27 =  47;
const int pinI18 =  48;
const int pinI17 =  49;
const int pinI21 =  36;
//const int pinI39 = A15;
//const int pinI37 = A14;
//const int pinI38 = A13;
//const int pinI36 = A12;
const int pinI23 = A11;
const int pinI83 = A10;
const int pinI79 =  A9;
const int pinI28 =  A8;
const int pinI24 =  A7;
const int pinI19 =  A5;
const int pinI31 =  A4;
const int pinI30 =  A3;
const int pinI29 =  A2;
const int pinI14 =  30;
const int pinI8  =  31;
const int pinI3  =  32;
const int pinI4  =  33;
const int pinO0  =  29;
const int pinO4  =  27;
const int pinO11 =  35;
const int pinO12 =  28;
const int pinO16 =   3;
const int pinO17 =   8;
const int pinO19 =  11;
const int pinO20 =   4;
const int pinO21 =   2;
const int pinO22 =  10;
const int pinO28 =   5;
const int pinO29 =   9;
const int pinO30 =   6;
const int pinO31 =   7;
const int pinO57 =  12;
const int pinO58 =  17;
const int pinO59 =  18;
const int pinO60 =  16;
const int pinO61 =  14;
const int pinO62 =  15;
const int pinO343=  34;
const int pinO344=  22;
const int pinO345=  19;
int ValorSensor_I85 = 0;    //Variable para almacenar el valor del sensor.
int Estado_I85 = 0;        // Estado Actual del Sensor
String key1 = "I85";

// Listen to the default port 5555, the Yún webserver
// will forward there all the HTTP requests you send
BridgeServer server;
int i = 0;
bool  O21;
bool  O16;
bool  O20;
bool  O28;
bool  O30;
bool  O31;
bool  O17;
bool  O29;
bool  O22;
bool  O19;
bool  O57;
bool  O61;
bool  O62;
bool  O60;
bool  O58;
bool  O59;
bool O345;
bool O344;
bool   O4;
bool  O11;
bool  O12;
bool   O0;
bool  I14;
bool   I8;
bool   I3;
bool   I4;
bool O343;
bool  I21;
bool  I22;
bool  I41;
bool  I86;
bool  I80;
bool  I87;
bool  I74;
bool  I73;
bool  I78;
bool  I84;
bool  I81;
bool  I27;
bool  I18;
bool  I17;
bool  I16;
int   I85;
int   I83;
int   I23;
int   I36;
int   I38;
int   I37;
int   I39;
int   I29;
int   I30;
int   I31;
int   I19;
int   I24;
int   I28;
int   I79;
String url ="http://192.168.0.98/api/arduino2/";

void setup() {
    
  //Bridge.put(key1, String(Estado_I85)); // imprime estado de sensor en memoria.
  // declarar pines como input y output.
  pinMode(pinI85,  INPUT);//<-      <- AR141
  pinMode(pinI16,  INPUT);//<-      <- VC11
  pinMode(pinI41,  INPUT);//<-      <- BF29
  pinMode(pinI22,  INPUT);//<-      <- AP1100
  pinMode(pinI86,  INPUT);//<-      <- AR144
  pinMode(pinI80,  INPUT);//<-      <- AR16
  pinMode(pinI87,  INPUT);//<-      <- AR143
  pinMode(pinI74,  INPUT);//<-      <- BC110
  pinMode(pinI73,  INPUT);//<-      <- AR15
  pinMode(pinI78,  INPUT);//<-      <- VB13
  pinMode(pinI84,  INPUT);//<-      <- AR142
  pinMode(pinI81,  INPUT);//<-      <- AR17
  pinMode(pinI27,  INPUT);//<-      <- AP186
  pinMode(pinI18,  INPUT);//<-      <- AP191
  pinMode(pinI17,  INPUT);//<-      <- VC12
  pinMode(pinI21,  INPUT);//<-      <- AP140
//  pinMode(pinI39,  INPUT);//<-      <- BC25
//  pinMode(pinI37,  INPUT);//<-      <- BF25
//  pinMode(pinI38,  INPUT);//<-      <- BC15
//  pinMode(pinI36,  INPUT);//<-      <- BF15
  pinMode(pinI23,  INPUT);//<-      <- VF12
  pinMode(pinI83,  INPUT);//<-      <- AR131
  pinMode(pinI79,  INPUT);//<-      <- AR14
  pinMode(pinI28,  INPUT);//<-      <- AP1318
  pinMode(pinI24,  INPUT);//<-      <- AR13
  pinMode(pinI19,  INPUT);//<-      <- AS18
  pinMode(pinI31,  INPUT);//<-      <- AP163
  pinMode(pinI30,  INPUT);//<-      <- AP162
  pinMode(pinI29,  INPUT);//<-      <- AP161
  pinMode(pinI14,  INPUT);//<-      <- WD36
  pinMode(pinI8,   INPUT);//<-      <- SA11
  pinMode(pinI3,   INPUT);//<-      <- WD16
  pinMode(pinI4,   INPUT);//<-      <- WD26
  pinMode(pinO12, OUTPUT);//->      -> BB211
  pinMode(pinO0,  OUTPUT);//->      -> SA15
  pinMode(pinO4,  OUTPUT);//->      -> SB15
  pinMode(pinO21, OUTPUT);//->      -> BH24
  pinMode(pinO16, OUTPUT);//->      -> VC13
  pinMode(pinO20, OUTPUT);//->      -> BH23
  pinMode(pinO28, OUTPUT);//->      -> WG13
  pinMode(pinO30, OUTPUT);//->      -> BH13
  pinMode(pinO31, OUTPUT);//->      -> BH14
  pinMode(pinO17, OUTPUT);//->      -> AS15,AS16
  pinMode(pinO29, OUTPUT);//->      -> VB52
  pinMode(pinO22, OUTPUT);//->      -> SC15
  pinMode(pinO19, OUTPUT);//->      -> AG113,AP12
  pinMode(pinO57, OUTPUT);//->      -> AL128
  pinMode(pinO58, OUTPUT);//->      -> AL130
  pinMode(pinO59, OUTPUT);//->      -> AL132
  pinMode(pinO345,OUTPUT);//->  -   -> PIN 13 DE VARIADOR Master speed frequence reference.
  pinMode(pinO60, OUTPUT);//->      -> AL134
  pinMode(pinO61, OUTPUT);//->      -> AL136
  pinMode(pinO62, OUTPUT);//->      -> VB14
  pinMode(pinO344,OUTPUT);//-> 3R3  -> PIN 1 DE VARIADOR Forward run/stop command.
  pinMode(pinO343,OUTPUT);//->      -> RUN SERVOPACKS
  pinMode(pinO11, OUTPUT);//->      -> BA211
  // Bridge startup
  Bridge.begin();
  

  // Listen for incoming connection only from localhost
  // (no one from the external network could connect)
  server.noListenOnLocalhost();
  server.begin();
}

void loop() {
O21 = digitalRead(pinO21);
O16 = digitalRead(pinO16);
O20 = digitalRead(pinO20);
O28 = digitalRead(pinO28);
O30 = digitalRead(pinO30);
O31 = digitalRead(pinO31);
O17 = digitalRead(pinO17);
O29 = digitalRead(pinO29);
O22 = digitalRead(pinO22);
O19 = digitalRead(pinO19);
O57 = digitalRead(pinO57);
O61 = digitalRead(pinO61);
O62 = digitalRead(pinO62);
O60 = digitalRead(pinO60);
O58 = digitalRead(pinO58);
O59 = digitalRead(pinO59);
O345=digitalRead(pinO345);
O344=digitalRead(pinO344);
O4  =  digitalRead(pinO4);
O11 = digitalRead(pinO11);
O12 = digitalRead(pinO12);
O0  =  digitalRead(pinO0);
I14 = digitalRead(pinI14);
I8  =  digitalRead(pinI8);
I3  =  digitalRead(pinI3);
I4  =  digitalRead(pinI4);
O343=digitalRead(pinO343);
I21 = digitalRead(pinI21);
I22 = digitalRead(pinI22);
I41 = digitalRead(pinI41);
I86 = digitalRead(pinI86);
I80 = digitalRead(pinI80);
I87 = digitalRead(pinI87);
I74 = digitalRead(pinI74);
I73 = digitalRead(pinI73);
I78 = digitalRead(pinI78);
I84 = digitalRead(pinI84);
I81 = digitalRead(pinI81);
I27 = digitalRead(pinI27);
I18 = digitalRead(pinI18);
I17 = digitalRead(pinI17);
I16 = digitalRead(pinI16);
I85 =  analogRead(pinI85);
I83 =  analogRead(pinI83);
I23 =  analogRead(pinI23);
//I36 =  analogRead(pinI36);
//I38 =  analogRead(pinI38);
//I37 =  analogRead(pinI37);
//I39 =  analogRead(pinI39);
I29 =  analogRead(pinI29);
I30 =  analogRead(pinI30);
I31 =  analogRead(pinI31);
I19 =  analogRead(pinI19);
I24 =  analogRead(pinI24);
I28 =  analogRead(pinI28);
I79 =  analogRead(pinI79);
    
i++;
    if (i>=25){
        url = url+O343+"/"+O345+"/"+O344+"/"+I4+"/"+I8+"/"+I14+"/"+O0+"/"+O4+"/"+O12+"/"+I16+"/"+I17+"/"+I18+"/"+I19+"/"+I21+"/"+I22+"/"+I23+"/"+I24+"/"+I27+"/"+I28+"/"+I29+"/"+I30+"/"+I31+"/"+O16+"/"+O17+"/"+O19+"/"+O20+"/"+O21+"/"+O22+"/"+O28+"/"+O29+"/"+O30+"/"+O31+"/"+I36+"/"+I37+"/"+I38+"/"+I39+"/"+I41+"/"+O57+"/"+O58+"/"+O59+"/"+O60+"/"+O61+"/"+O62+"/"+I73+"/"+I74+"/"+I78+"/"+I79+"/"+I80+"/"+I81+"/"+I83+"/"+I84+"/"+I85+"/"+I86+"/"+I87;
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
  Leer_Sensores();
  Activar_Sensores();
  
  delay(50); // Poll every 50ms
}//Fin de void loop()

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
// +++++++++++++++++++++++++++leer el Sensor++++++++++++++++++++++
void Leer_Sensores(){
  Process p;
  ValorSensor_I85 = analogRead(A0);
  //este evento sucede una vez, solo si el valor del sensor cambia.
  if (ValorSensor_I85 > 500 && Estado_I85 == 0) {
    //el estado del sensor cambio a HIGH
    Estado_I85 = 1;
    //comando que empuje el valor del sensor hacia el cliente (este es un ejemplo).
    p.begin("curl");
    p.addParameter("-X"); // use POST instead of default GET
    p.addParameter("POST");
    p.addParameter("-d");
    p.addParameter("{\"name\":\"Irra\"}");
    p.addParameter("-H"); 
    p.addParameter("Content-type: application/json");
    p.addParameter("http://192.168.0.131:3131/api/product");
    //p.runAsynchronously();
    p.run();
    //p.runShellCommandAsynchronously("curl -d \'{\"estado\":\"1\"}\' -H \"Content-Type: application/json\" http://192.168.10.86:3000");
    // A process output can be read with the stream methods
  while (p.available() > 0) {
    char c = p.read();
    SerialUSB.print(c);
  }
  // Ensure the last bit of data is sent.
  SerialUSB.flush();
    Bridge.put(key1, String(Estado_I85)); //actualiza los datos almacenados.
    
  }
  else if (ValorSensor_I85 < 500 && Estado_I85 == 1){
    //el estado del sensor cambio a LOW
    Estado_I85 = 0;
    //comando que empuje el valor del sensor hacia el cliente.
    p.runShellCommandAsynchronously("curl -d \'{\"estado\":\"0\"}\' -H \"Content-Type: application/json\" http://192.168.10.86:3000");
    Bridge.put(key1, String(Estado_I85));
      
    }


  

  //++++++++++++++++++Agregado++++++++++++++++++++++++++++++++++++++

}
void Activar_Sensores(){
  
  String command;
  char buf[3];
  Bridge.get("O343", buf, 3);
  command = buf[0];
  if (command.toInt() == 1){
    digitalWrite(13, HIGH);
  }
  else if (command.toInt() == 0){
    digitalWrite(13, LOW);
  }
  Bridge.put("hola",command );



}
