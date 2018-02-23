/* Control Arduino Ethernet PLC2
  by: Irra
  da potencia a los servopack y los pone en run.
  Controla la presion de aire.
*/

// Incluye Librerias del Sistema.
#include <SPI.h>
#include <Ethernet.h>
#include <MDUINO-Relay.h>
#include <EEPROM.h>


byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };   //Direccion Fisica MAC
byte ip[] = { 192, 168, 0, 96 };                       // IP Local que usted debe configurar
byte gateway[] = { 192, 168, 0, 1 };                   // Puerta de enlace
byte subnet[] = { 255, 255, 255, 0 };                  //Mascara de Sub Red
EthernetServer server(80);                             //Se usa el puerto 80 del servidor                           //Se usa el puerto 80 del servidor
String readString;
String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;  // whether the string is complete
EthernetClient client;

void setup() {


  Serial.begin(9600);  // Inicializa el puerto serial

  // Configure analog output pin
  pinMode(A0_0, OUTPUT);

  // Configure INPUT pins
  pinMode(I0_0, INPUT);
  pinMode(I0_1, INPUT);
  pinMode(I0_2, INPUT);
  pinMode(I0_3, INPUT);
  pinMode(I0_4, INPUT);
  pinMode(I0_5, INPUT); //linea de seguridad ok.
  pinMode(I1_0, INPUT); //Interruptor de Calibracion eje x
  pinMode(I1_1, INPUT);
  pinMode(I1_2, INPUT); //ENABLE AUXILIARY CIRCUITS
  pinMode(I1_3, INPUT);
  pinMode(I1_4, INPUT); //start
  pinMode(I1_5, INPUT); //sensor de presion de aire
  pinMode(I2_0, INPUT);
  pinMode(I2_1, INPUT);
  pinMode(I2_2, INPUT);
  pinMode(I2_3, INPUT);
  pinMode(I2_4, INPUT);
  pinMode(I2_5, INPUT);

  // Configure DIGITAL OUTPUT pins
  pinMode(Q0_0, OUTPUT);
  pinMode(Q0_1, OUTPUT);
  pinMode(Q0_2, OUTPUT);
  pinMode(Q1_0, OUTPUT);
  pinMode(Q1_1, OUTPUT);
  pinMode(Q1_2, OUTPUT);
  pinMode(Q2_0, OUTPUT);
  pinMode(Q2_1, OUTPUT);

  // Configure RELAY OUTPUT pins
  pinMode(R0_1, OUTPUT); //pone en run los servopack.
  pinMode(R0_2, OUTPUT); //da poder a los servopack.
  pinMode(R0_3, OUTPUT);
  pinMode(R0_4, OUTPUT); //run husillo
  pinMode(R0_5, OUTPUT);
  pinMode(R0_6, OUTPUT);
  pinMode(R0_7, OUTPUT);
  pinMode(R0_8, OUTPUT);
  pinMode(R1_1, OUTPUT);
  pinMode(R1_2, OUTPUT);
  pinMode(R1_3, OUTPUT);
  pinMode(R1_4, OUTPUT);
  pinMode(R1_5, OUTPUT);
  pinMode(R1_6, OUTPUT);
  pinMode(R1_7, OUTPUT);
  pinMode(R1_8, OUTPUT);
  pinMode(R2_1, OUTPUT);
  pinMode(R2_2, OUTPUT);
  pinMode(R2_3, OUTPUT);
  pinMode(R2_4, OUTPUT);
  pinMode(R2_6, OUTPUT);
  pinMode(R2_7, OUTPUT);
  pinMode(R2_8, OUTPUT);

  ////////////////////////////////////////////////////////////////////////////////////////////////////


  Ethernet.begin(mac, ip, gateway, subnet); // Inicializa la conexion Ethernet y el servidor

  server.begin();


  Serial.println("El Servidor es: ");
  Serial.println(Ethernet.localIP());    // Imprime la direccion IP Local
}

////////////////////////////////////////////////////////////////////////////////////////////////////
void loop() {
  
  recieve();
  

 }

 void recieve()
 {
   
  char incoming[100];
  client = server.available();
  
  if(client)
  {
    if(client.connected())
    {
 
      
      Serial.println("client CONECTADO");
      delay(100);
      
      if(client.available())
      {
          int ii = 0;
          char c;
          while((c = (char)client.read()) != '\n')
          {
            
            incoming[ii++] = c;
          }

          Serial.println(incoming);
          String request = (String)incoming;
          Serial.println(request);
          if(processRequest(request)){
            client.println("success");  
          }
          else{
            client.println("error");
          }
          
          
      }
      
     client.stop(); 
    }
    else
    {
      Serial.println("client DESCONECTADO");
    }
  }
 }

 boolean processRequest(String request){
    if(request.indexOf("?") > -1){
        int from = request.indexOf("?") + 1;
        int to = request.indexOf("=");
        String key = request.substring(from, to);
        int end = request.indexOf("HTTP");
        String value = request.substring(to + 1, end);
        Serial.println(key);
        Serial.println(value);
        return true;
      }
      return false;
 }

 void sendClient(String data)
 {
   client = server.available();
  
  if(client)
  {
    Serial.println("sending");
    client.println(data);
  }
 }

 
 void serialEvent() {
  
  while (Serial.available()) {
    delay(3); 
    char inChar = (char)Serial.read();
    
    if (inChar != '\n') {
      inputString += inChar;
    }
  }
  Serial.println("serialEvnet");
  if(inputString.length() > 0)
  {
   
    if(inputString == "client")
    {
      Serial.println("client accion");  
      
      sendClient(inputString);
      
    }
   
  }
  inputString = "";

}




