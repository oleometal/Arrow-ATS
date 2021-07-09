/*
  Arduino3 Yún Bridge 
  Ubicacion +A Armario
  MAC: C4:93:00:03:E9:B1
  IP: 192.168.0.85
  
  Los pines descritos en el setup deben ser siempre declarados como inputs
  porque hay un voltaje permanente que viene de los encoders
  no debe permitir que se cambien desde la aplicacion web;
  El motivo Principal es porque se calienta la tarjeta.
  

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


// Listen to the default port 5555, the Yún webserver
// will forward there all the HTTP requests you send
BridgeServer server;
String url ="http://192.168.0.98/api/arduino3/";
int i = 0;
bool O49;
bool O50;
bool O51;
bool O52;
bool O53;
bool O54;
bool O45;
bool O46;
bool O44;
bool O39;
bool O38;
bool O48;
bool O56;
bool I66;
bool I67;
bool I69;
bool I64;
bool I71;
bool I70;
bool O37;
bool O36;
bool O55;
bool I72;
bool I65;
bool I10;
bool I1;
bool I5;
bool I2;
bool I11;
bool I82;
bool I63;
bool O338;
bool I50;
bool I59;
bool I58;
bool I56;
bool I57;
bool I54;
bool I53;
bool I51;
int I52;
int I55;
int I32;
int I33;
int I35;
int I43;
int I42;
int I40;
int I60;
int I62;
int I61;
int I49;
int I48;
int I68;
int I34;
int pinesDigitales[] = {2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,22,23,24,25,26,27,28,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49};
byte pinesAnalogos[] = {A0,A1,A2,A3,A4,A5,A7,A8,A9,A10,A11,A12,A13,A14,A15};

void setup() {
  // Bridge startup        Rele    Cable
  pinMode(A0, INPUT); //<-      <- AL111
  pinMode(A1, INPUT); //<-      <- AL117
  pinMode(A2, INPUT); //<-      <- AL127
  pinMode(A3, INPUT); //<-      <- AL131
  pinMode(A4, INPUT); //<-      <- AL129
  pinMode(A5, INPUT); //<-      <- NEGRO (AL1W16)
  pinMode(A7, INPUT); //<-      <- NARANJA (AL1W16)
  pinMode(A8, INPUT); //<-      <- AL144
  pinMode(A9, INPUT); //<-      <- BB210
  pinMode(A10,INPUT); //<-      <- BA110
  pinMode(A11,INPUT); //<-      <- BA210
  pinMode(A12,INPUT); //<-      <- BB110
  pinMode(A13,INPUT); //<-      <- BC29
  pinMode(A14,INPUT); //<-      <- BC19
  pinMode(A15,INPUT); //<-      <- BF19
  pinMode(2, OUTPUT); //->      -> AL112
  pinMode(3, OUTPUT); //->      -> AL114
  pinMode(4, OUTPUT); //->      -> AL116
  pinMode(5, OUTPUT); //->      -> AL118
  pinMode(6, OUTPUT); //->      -> AL120
  pinMode(7, OUTPUT); //->      -> AL122
  pinMode(8, OUTPUT); //->      -> BT26,BT24
  pinMode(9, OUTPUT); //->      -> AG1105,SU111
  pinMode(10,OUTPUT); //->      -> BT16,BT14
  pinMode(11,OUTPUT); //->      -> BT214
  pinMode(12,OUTPUT); //->      -> BT114
  pinMode(14,OUTPUT); //->      -> AL110
  pinMode(15,OUTPUT); //->      -> AL126
  pinMode(16, INPUT); //<-      <- AL140
  pinMode(17, INPUT); //<-      <- AL142
  pinMode(18, INPUT); //<-      <- AL143
  pinMode(19, INPUT); //<-      <- AL135
  pinMode(22, INPUT); //<-      <- AL139
  pinMode(23, INPUT); //<-      <- AL141
  pinMode(24,OUTPUT); //->      -> BT21
  pinMode(25,OUTPUT); //->      -> BT11
  pinMode(26,OUTPUT); //->      -> AL124
  pinMode(27, INPUT); //<-      <- AL138
  pinMode(28, INPUT); //<-      <- AL137
  pinMode(34, INPUT); //<- 5R41 <- AP170
  pinMode(35, INPUT); //<- 4R41 <- AP180
  pinMode(36, INPUT); //<- 3R41 <- AG113
  pinMode(37, INPUT); //<- 2R41 <- AP1310
  pinMode(38, INPUT); //<- 1R41 <- AP164
  pinMode(39, INPUT); //<-      <- AR132
  pinMode(40, INPUT); //<-      <- AL1W16 (cafe)
  pinMode(41, INPUT); //<-      <- AL113
  pinMode(42, INPUT); //<-      <- AL115
  pinMode(43, INPUT); //<-      <- AL133
  pinMode(44,OUTPUT); //-> 5R9  -> ST141 (ST1W5)
  pinMode(45, INPUT); //<-      <- VERDE (AL1W16)
  pinMode(46, INPUT); //<-      <- AL125
  pinMode(47, INPUT); //<-      <- AL123
  pinMode(48, INPUT); //<-      <- AL119
  pinMode(49, INPUT); //<-      <- AL121
  Bridge.begin();
  /*----------------------------------------------
   *    Lectura Inicial de Sensores Digitales
   *---------------------------------------------*/
  for ( byte i = 0; i < (sizeof(pinesDigitales) / sizeof(pinesDigitales[0])); i++){
    //llamar una funcion que haga post y guarde en memoria pinesDigitales[i]
     if ( digitalRead(pinesDigitales[i] == HIGH){
        boolean valorSensor = true; 
        //enviar estado de sensor
        //falta enviar el ID sel sensor relacionado
        postDigital(valorSensor);
      }else{
        boolean valorSensor = false;
        postDigital(valorSensor);
        }
    };
  /*--------------------------------------------------
   * Lectura Inicial de Sensores Análogos
   *-------------------------------------------------*/
  // falta terminar esta logica 
  for ( byte i = 0; i < (sizeof(pinesAnalogos) / sizeof(pinesAnalogos[0])); i++){
    if ( analogRead(pinesAnalogos[i] > 500){
        boolean valorSensor = true; 
        //enviar estado de sensor
        postDigital(valorSensor);
      }else{
        boolean valorSensor = false;
        postDigital(valorSensor);
        }
    };
  
  /*--------------------- ------------------------------
   * Listen for incoming connection only from localhost
   * (no one from the external network could connect)
   * --------------------------------------------------*/
  server.listenOnLocalhost();
  server.begin();
}

void loop() {
  url ="http://192.168.0.98/api/arduino3/";

O49=digitalRead(2);
O50=digitalRead(3);
O51=digitalRead(4);
O52=digitalRead(5);
O53=digitalRead(6);
O54=digitalRead(7);
O45=digitalRead(8);
O46=digitalRead(9);
O44=digitalRead(10);
O39=digitalRead(11);
O38=digitalRead(12);
O48=digitalRead(14);
O56=digitalRead(15);
I66=digitalRead(16);
I67=digitalRead(17);
I69=digitalRead(18);
I64=digitalRead(19);
I71=digitalRead(22);
I70=digitalRead(23);
O37=digitalRead(24);
O36=digitalRead(25);
O55=digitalRead(26);
I72=digitalRead(27);
I65=digitalRead(28);
I10=digitalRead(34);
I1=digitalRead(35);
I5=digitalRead(36);
I2=digitalRead(37);
I11=digitalRead(38);
I82=digitalRead(39);
I63=digitalRead(43);
O338=digitalRead(44);
I50=digitalRead(45);
I59=digitalRead(46);
I58=digitalRead(47);
I56=digitalRead(48);
I57=digitalRead(49);
I54=digitalRead(51);
I53=digitalRead(52);
I51=digitalRead(53);
I52=analogRead(A0);
I55=analogRead(A1);
I32=analogRead(A10);
I33=analogRead(A11);
I35=analogRead(A12);
I43=analogRead(A13);
I42=analogRead(A14);
I40=analogRead(A15);
I60=analogRead(A2);
I62=analogRead(A3);
I61=analogRead(A4);
I49=analogRead(A5);
I48=analogRead(A7);
I68=analogRead(A8);
I34=analogRead(A9);
    i++;
    
    if (i>=25){
        url = url+I1+"/"+I2+"/"+I5+"/"+I10+"/"+I11+"/"+I32+"/"+I33+"/"+I34+"/"+I35+"/"+I40+"/"+I42+"/"+I43+"/"+O36+"/"+O37+"/"+O38+"/"+O39+"/"+O44+"/"+O45+"/"+O46+"/"+I48+"/"+I49+"/"+I50+"/"+I51+"/"+I52+"/"+I53+"/"+I54+"/"+I55+"/"+I56+"/"+I57+"/"+I58+"/"+I59+"/"+I60+"/"+I61+"/"+I62+"/"+I63+"/"+O48+"/"+O49+"/"+O50+"/"+O51+"/"+O52+"/"+O53+"/"+O54+"/"+O55+"/"+O56+"/"+I64+"/"+I65+"/"+I66+"/"+I67+"/"+I68+"/"+I69+"/"+I70+"/"+I71+"/"+I72+"/"+I82+"/"+O338;

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
//nuncio();
  //Activar_Sensores();
  delay(50); // Poll every 50ms
}//fin de loop()

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

/*--------------------------------------------------- 
 *    post Sensores
 *--------------------------------------------------*/
void postDigital(int pinLeido){
  
}
    Process p;
    bool estadoActualSensor;
  
  //este evento sucede una vez, solo si el valor del sensor cambia.
  if (lecturaSensor > 500 && estadoActualSensor == 0) {
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
