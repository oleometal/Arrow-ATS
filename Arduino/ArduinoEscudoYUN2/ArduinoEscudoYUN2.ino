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
//const int I85 = A0;  //<-      <- AR141
//int ValorSensor_I85 = 0;    //Variable para almacenar el valor del sensor.
//int Estado_I85 = 0;        // Estado Actual del Sensor
//String key1 = "I85";

// Listen to the default port 5555, the Yún webserver
// will forward there all the HTTP requests you send
BridgeServer server;
 int i=0;
    bool O21;
bool O16;
bool O20;
bool O28;
bool O30;
bool O31;
bool O17;
bool O29;
bool O22;
bool O19;
bool O57;
bool O61;
bool O62;
bool O60;
bool O58;
bool O59;
bool O345;
bool O344;
bool O4;
bool O12;
bool O0;
bool I14;
bool I8;
bool I4;
bool O343;
bool I21;
bool I22;
bool I41;
bool I86;
bool I80;
bool I87;
bool I74;
bool I73;
bool I78;
bool I84;
bool I81;
bool I27;
bool I18;
bool I17;
bool I16;
int  I85;
int  I83;
int  I23;
int  I36;
int  I38;
int  I37;
int  I39;
int  I29;
int  I30;
int  I31;
int  I19;
int  I24;
int  I28;
int  I79;
String url ="http://192.168.0.98/api/arduino2/";

void setup() {
  
   
    
    
    
    
  //Bridge.put(key1, String(Estado_I85)); // imprime estado de sensor en memoria.
  // declarar pines como input y output.
  pinMode(A1, INPUT); //<-      <- VC11
  pinMode(38, INPUT); //<-      <- BF29
  pinMode(37, INPUT); //<-      <- AP1100
  pinMode(39, INPUT); //<-      <- AR144
  pinMode(40, INPUT); //<-      <- AR16
  pinMode(41, INPUT); //<-      <- AR143
  pinMode(42, INPUT); //<-      <- BC110
  pinMode(43, INPUT); //<-      <- AR15
  pinMode(44, INPUT); //<-      <- VB13
  pinMode(45, INPUT); //<-      <- AR142
  pinMode(46, INPUT); //<-      <- AR17
  pinMode(47, INPUT); //<-      <- AP186
  pinMode(48, INPUT); //<-      <- AP191
  pinMode(49, INPUT); //<-      <- VC12
  pinMode(36, INPUT); //<-      <- AP140
  pinMode(A15,INPUT); //<-      <- BC25
  pinMode(A14,INPUT); //<-      <- BF25
  pinMode(A13,INPUT); //<-      <- BC15
  pinMode(A12,INPUT); //<-      <- BF15
  pinMode(A11,INPUT); //<-      <- VF12
  pinMode(A10,INPUT); //<-      <- AR131
  pinMode(A9, INPUT); //<-      <- AR14
  pinMode(A8, INPUT); //<-      <- AP1318
  pinMode(A7, INPUT); //<-      <- AR13
  pinMode(A5, INPUT); //<-      <- AS18
  pinMode(A4, INPUT); //<-      <- AP163
  pinMode(A3, INPUT); //<-      <- AP162
  pinMode(A2, INPUT); //<-      <- AP161
  pinMode(30, INPUT); //<-      <- WD36
  pinMode(31, INPUT); //<-      <- SA11
  pinMode(32, INPUT); //<-      <- WD16
  pinMode(33, INPUT); //<-      <- WD26
  pinMode(28,OUTPUT); //->      -> BB211
  pinMode(29,OUTPUT); //->      -> SA15
  pinMode(2, OUTPUT); //->      -> BH24
  pinMode(3, OUTPUT); //->      -> VC13
  pinMode(4, OUTPUT); //->      -> BH23
  pinMode(5, OUTPUT); //->      -> WG13
  pinMode(6, OUTPUT); //->      -> BH13
  pinMode(7, OUTPUT); //->      -> BH14
  pinMode(8, OUTPUT); //->      -> AS15,AS16
  pinMode(9, OUTPUT); //->      -> VB52
  pinMode(10,OUTPUT); //->      -> SC15
  pinMode(11,OUTPUT); //->      -> AG113,AP12
  pinMode(12,OUTPUT); //->      -> AL128
  pinMode(17,OUTPUT); //->      -> AL130
  pinMode(18,OUTPUT); //->      -> AL132
  pinMode(19,OUTPUT); //->  -   -> PIN 13 DE VARIADOR Master speed frequence reference.
  pinMode(16,OUTPUT); //->      -> AL134
  pinMode(14,OUTPUT); //->      -> AL136
  pinMode(15,OUTPUT); //->      -> VB14
  pinMode(22,OUTPUT); //-> 3R3  -> PIN 1 DE VARIADOR Forward run/stop command.
  pinMode(23,OUTPUT); //-> 4R2  -> BA111
  pinMode(24,OUTPUT); //-> 5R2  -> BB111
  pinMode(34,OUTPUT); //->      -> RUN SERVOPACKS
  pinMode(35,OUTPUT); //->      -> BA211
  pinMode(27,OUTPUT); //-> 8R2  -> SB15
  // Bridge startup
  Bridge.begin();
  

  // Listen for incoming connection only from localhost
  // (no one from the external network could connect)
  server.noListenOnLocalhost();
  server.begin();
}

void loop() {
  // Get clients coming from server
url ="http://192.168.0.98/api/arduino2/";

    O21=digitalRead(2);
O16=digitalRead(3);
O20=digitalRead(4);
O28=digitalRead(5);
O30=digitalRead(6);
O31=digitalRead(7);
O17=digitalRead(8);
O29=digitalRead(9);
O22=digitalRead(10);
O19=digitalRead(11);
O57=digitalRead(12);
O61=digitalRead(14);
O62=digitalRead(15);
O60=digitalRead(16);
O58=digitalRead(17);
O59=digitalRead(18);
O345=digitalRead(19);
O344=digitalRead(22);
O4=digitalRead(27);
O12=digitalRead(28);
O0=digitalRead(29);
I14=digitalRead(30);
I8=digitalRead(31);
I4=digitalRead(33);
O343=digitalRead(34);
I21=digitalRead(36);
I22=digitalRead(37);
I41=digitalRead(38);
I86=digitalRead(39);
I80=digitalRead(40);
I87=digitalRead(41);
I74=digitalRead(42);
I73=digitalRead(43);
I78=digitalRead(44);
I84=digitalRead(45);
I81=digitalRead(46);
I27=digitalRead(47);
I18=digitalRead(48);
I17=digitalRead(49);
I16=digitalRead(50);
I85=analogRead(A0);
I83=analogRead(A10);
I23=analogRead(A11);
I36=analogRead(A12);
I38=analogRead(A13);
I37=analogRead(A14);
I39=analogRead(A15);
I29=analogRead(A2);
I30=analogRead(A3);
I31=analogRead(A4);
I19=analogRead(A5);
I24=analogRead(A7);
I28=analogRead(A8);
I79=analogRead(A9);
    
i++;
    if (i>=25){
        url = url+O343+"/"+O345+"/"+O344+"/"+I4+"/"+I8+"/"+I14+"/"+O0+"/"+O4+"/"+O12+"/"+I16+"/"+I17+"/"+I18+"/"+I19+"/"+I21+"/"+I22+"/"+I23+"/"+I24+"/"+I27+"/"+I28+"/"+I29+"/"+I30+"/"+I31+"/"+O16+"/"+O17+"/"+O19+"/"+O20+"/"+O21+"/"+O22+"/"+O28+"/"+O29+"/"+O30+"/"+O31+"/"+I36+"/"+I37+"/"+I38+"/"+I39+"/"+I41+"/"+O57+"/"+O58+"/"+O59+"/"+O60+"/"+O61+"/"+O62+"/"+I73+"/"+I74+"/"+I78+"/"+I79+"/"+I80+"/"+I81+"/"+I83+"/"+I84+"/"+I85+"/"+I86+"/"+I87;
        HttpClient client;
        client.getAsynchronously(url);
        i=0;
    }

    
  BridgeClient client = server.accept();

  // There is a new client?
  if (client) {
    // Process request
    process(client);

    // Close connection and free resources.
    client.stop();
  }
 // Leer_Sensores();
  //Activar_Sensores();
  
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
// +++++++++++++++++++++++++++leer el Sensor++++++++++++++++++++++
/*void Leer_Sensores(){
  
  
  Process p;
  
  
  ValorSensor_I85 = analogRead(I85);
  
  //este evento sucede una vez, solo si el valor del sensor cambia.
  if (ValorSensor_I85 > 500 && Estado_I85 == 0) {
    //el estado del sensor cambio a HIGH
    Estado_I85 = 1;
    //comando que empuje el valor del sensor hacia el cliente (este es un ejemplo).
    p.begin("curl");
    p.addParameter("-X"); // use POST instead of default GET
    p.addParameter("POST");
    p.addParameter("-d");
    p.addParameter("{\"name\":\"Nick\"}");
    p.addParameter("-H"); 
    p.addParameter("Content-type: application/json");
    p.addParameter("http://192.168.0.120:3000/");
    p.runAsynchronously();
    Bridge.put(key1, String(Estado_I85)); //actualiza los datos almacenados.

    
  }
  else if (ValorSensor_I85 < 500 && Estado_I85 == 1){
    //el estado del sensor cambio a LOW
    Estado_I85 = 0;
    //comando que empuje el valor del sensor hacia el cliente.
    Bridge.put(key1, String(Estado_I85));
      
    }


  

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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



}*/

