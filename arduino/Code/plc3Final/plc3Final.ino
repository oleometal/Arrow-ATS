//---------------------------- BLOQUE DE LIBRERÍAS --------------------------//

#include <SPI.h>
#include <Ethernet.h>
#include <MDUINO-Relay.h>
#include <EEPROM.h>
#include <ArduinoJson.h>

/*
// Sensores de bloqueo
int slockC = I2_5;
int slockB = I2_3;
int slockH = I2_1;

// Sensores de desbloqueo
int sunlockC = I2_4;
int sunlockB = I2_2;
int sunlockH = I2_0;

// Actuadores de bloqueo
int lockC = R2_2;
int lockB = R2_4;
int lockH = R1_1;

// Actuadores de desbloqueo
int unlockC = R2_3;
int unlockB = R1_3;
int unlockH = R1_2;
*/

//---------------------------- BLOQUE DE ETHERNET ---------------------------//

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };   //Direccion Fisica MAC
byte ip[] = { 192, 168, 0, 97 };                       // IP Local que usted debe configurar
byte gateway[] = { 192, 168, 0, 1 };                   // Puerta de enlace
byte subnet[] = { 255, 255, 255, 0 };                  //Mascara de Sub Red
EthernetServer server(80);                             //Se usa el puerto 80 del servidor
String readString;
String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;  // whether the string is complete
EthernetClient client;


//--------------------- VARIABLES DE SENSORES Y ACTUADORES ------------------//

//               Cb    Bb    Hb    Cd    Bd    Hd
int packS[6] = {I2_5, I2_3, I0_5, I2_4, I2_2, I0_4};
int packR[6] = {R2_2, R2_4, R1_1, R2_3, R1_3, R1_2};
int sensor[6];
int validacion = 0;


//---------------------- FUNCIÓN DE CONFIGURACIÓN INICIAL -------------------//

void setup() {
  Serial.begin(9600);  

  for(int i = 0; i <= 5; i++){
    pinMode(packS[i], INPUT);
    pinMode(packR[i], OUTPUT);
    sensor[i] = digitalRead(packS[i]);
  }

  if((sensor[0] == sensor[3]) || (sensor[1] == sensor[4]) ||(sensor[2] == sensor[5])){
    validacion = 0;
  }
  else validacion = 1;

  //Inicialización de server
  Ethernet.begin(mac, ip, gateway, subnet); // Inicializa la conexion Ethernet y el servidor
  server.begin();
  //Serial.print("El Servidor es: ");
  //Serial.println(Ethernet.localIP());
}

void loop(){
  recieve();
  if(Serial.available()){
    char c = Serial.read();
    String algo = ejecutarPistones(c);
    Serial.println(algo);
  }
}


//------------------------ FUNCIÓN DE CODIFICACIÓN JSON ---------------------//

String sendJson(String msg, String status){
  String root = "{\"msg\":\""+msg+"\",\"status\":\""+String(status)+"\"}";
  return root;
}

String sendSensorJson(int carrusel,  int brazo, int husillo){
  String root = "{\"carrusel\":\""+String(carrusel)+"\",\"brazo\":\""+String(brazo)+"\",\"husillo\":\""+String(husillo)+"\"}";
  return root;
}


//------------------ FUNCIÓN DE RECEPCIÓN DATOS ETHERNET --------------------//

void recieve(){
  char incoming[100];
  client = server.available();
  if(client){
    if(client.connected()){
      //Serial.println("client CONECTADO");
      delay(100);
      if(client.available()){
        int ii = 0;
        char c;
        while((c = (char)client.read()) != '\n'){
          incoming[ii++] = c;
        }
        //Serial.println(incoming);
        String request = (String)incoming;
        String value = processRequest(request);
        String accion = ejecutarPistones(char(value[0]));
        client.println(accion);
        delay(100);
        client.stop(); 
      }
    }
    //else{
    //Serial.println("client DESCONECTADO");
    //}
  }
}

String processRequest(String request){
  if(request.indexOf("?") > -1){
    int from = request.indexOf("?") + 1;
    int to = request.indexOf("=");
    String key = request.substring(from, to);
    int end = request.indexOf("HTTP");
    String value = request.substring(to + 1, end);
    //Serial.println(key);
    //Serial.println(value);
    return value;
  }
  return "0";
}


//--------------------------- FUNCIÓN DE CONTROL PISTONES -------------------//

String ejecutarPistones(char valor){
  String secuencia = "0";
  if(valor == 'a'){ // accionar pistones
    secuencia = piston('c', 1);
    if(secuencia == "1"){
      secuencia = "0";
      secuencia = piston('h', 1);
      if(secuencia == "1"){
        delay(400);
        secuencia = "0";
        secuencia = piston('b', 1);
        return sendJson("Accionamiento de pistones realizado", String(1));
      }
      else return secuencia;
    }
    else return secuencia;
  }
  if(valor == 'b'){ // contraer pistones
    secuencia = piston('b', 0);
    if(secuencia == "1"){
      delay(600);
      secuencia = "0";
      secuencia = piston('h', 0);
      if(secuencia == "1"){
        secuencia = "0";
        secuencia = piston('c', 0);
        return sendJson("Contraccion de pistones realizado", String(1));
      }
      else return secuencia;
    }
    else return secuencia;
  }
  if(valor == 's'){ // enviar configuracion de los sensores de los sensores
    int carrusel;
    int brazo;
    int husillo;
    if(digitalRead(I2_5) == 1 && digitalRead(I2_4) == 0){
      carrusel = 0;
    }
    else carrusel = 1;
    if(digitalRead(I2_3) == 1 && digitalRead(I2_2) == 0){
      brazo = 0;
    }
    else brazo = 1;
    if((digitalRead(I0_5) == 1 && digitalRead(I0_4) == 0) || (digitalRead(I0_5) == 0 && digitalRead(I0_4) == 0)){
      husillo = 0;
    }
    else husillo = 1;
    return sendSensorJson(carrusel,brazo,husillo);
  }
  else{
    switch(valor){
      case '1': // accionar piston carrusel 
        secuencia = piston('c',1);
        break;
      case '2': // contraer piston carrusel
        secuencia = piston('c',0);
        break;
      case '3': // accionar piston brazo
        secuencia = piston('b',1);
        break;
      case '4': // contraer piston brazo
        secuencia = piston('b',0);
        break;
      case '5': // accionar piston husillo
        secuencia = piston('h',1);
        break;
      case '6': // contraer piston husillo
        secuencia = piston('h',0);
        break;
    }
    if(secuencia == "1"){
      return sendJson("Contraccion de piston realizado", String(1));
    }
    else return secuencia;
  }
}

String piston(char tipo, int estado){
  int conjunto[] = {0,0,0,0};
  String tipoPiston;
  if(tipo == 'c'){
    conjunto[0] = I2_5;
    conjunto[1] = I2_4;
    conjunto[2] = R2_2;
    conjunto[3] = R2_3;
    tipoPiston = "Piston del carrusel";
  }
  else if(tipo == 'b'){
    conjunto[0] = I2_3;
    conjunto[1] = I2_2;
    conjunto[2] = R2_4;
    conjunto[3] = R1_3;
    tipoPiston = "Piston del brazo";
  }
  else if(tipo == 'h'){
    conjunto[0] = I0_5;
    conjunto[1] = I0_4;
    conjunto[2] = R1_1;
    conjunto[3] = R1_2;
    tipoPiston = "Piston del husillo";    
  }

  if((digitalRead(conjunto[0]) == estado && digitalRead(conjunto[1]) == (1 - estado)) || tipo == 'h'){ 
    digitalWrite(conjunto[3], estado);
    digitalWrite(conjunto[2], 1 - estado);
    delay(20); //100
    digitalWrite(conjunto[2], LOW);
    digitalWrite(conjunto[3], LOW);
    unsigned long timeControl = millis();
    int estadoSensor = digitalRead(conjunto[1 - estado]);
    while(estadoSensor){
      estadoSensor = digitalRead(conjunto[1 - estado]);
      if(millis() - timeControl > 3000){
        return sendJson("No se pudo accionar el " + tipoPiston + ", o sensor no detectado",String(0));
        estadoSensor = 0;
      }
    }
    return "1";
  }
  else if(digitalRead(conjunto[0]) == (1 - estado) && digitalRead(conjunto[1]) == estado){
    return "1";
  }
  else return sendJson("No se puede leer sensor del " + tipoPiston,String(0));  
}
