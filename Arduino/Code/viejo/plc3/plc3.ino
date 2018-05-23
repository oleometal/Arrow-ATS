/* Control Arduino Ethernet PLC2 Gabinete
  by: Irra
  limites de carrusel.
  
*/

// Incluye Librerias del Sistema.
#include <SPI.h>
#include <Ethernet.h>
#include <MDUINO-Relay.h>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xBE };   //Direccion Fisica MAC
IPAddress ip(192, 168, 0, 97);                             //Se usa el puerto 80 del servidor
IPAddress server(192, 168, 0, 99);
EthernetClient client;
int port = 8989;
String readString;
String inputString = "";         // a string to hold incoming data

char myVar[100];

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
  pinMode(I0_5, INPUT); 
  pinMode(I1_0, INPUT); 
  pinMode(I1_1, INPUT);
  pinMode(I1_2, INPUT);
  pinMode(I1_3, INPUT);
  pinMode(I1_4, INPUT); 
  pinMode(I1_5, INPUT); 
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
  pinMode(R0_1, OUTPUT); 
  pinMode(R0_2, OUTPUT); 
  pinMode(R0_3, OUTPUT);
  pinMode(R0_4, OUTPUT); 
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


  Ethernet.begin(mac, ip);

  if(client.connect(server, port))
  {
    Serial.println("connected");
    client.println("3");

    
  }
  else
  {
    client.println("0");
    Serial.println("connection failed");
    resetEthernetShield();
  }
  delay(100);
  Serial.println("connecting...");

 
}

////////////////////////////////////////////////////////////////////////////////////////////////////
void loop() {
  int ii;
  recieve();
  /*
  if(client.available()){
    char c = client.read();
    Serial.print("*** Server says: ***");
    Serial.println(c);
  }

  
    if(client.connected())
    {
      Serial.println(3);
      client.print("3");
      client.stop();
    }
    
    */
}

 void serialEvent() {
  
  while (Serial.available()) {
    delay(3); 
    char inChar = (char)Serial.read();
    
    if (inChar != '\n') {
      inputString += inChar;
    }
  }
  Serial.println("serialEvent");
  Serial.println(inputString);
  if(inputString.length() > 0)
  {
     if(client.connect(server, port))
      {
        Serial.println("connected");
        client.println(inputString);
    
        
      }
    
  }
  client.stop();
  inputString = "";

}

void recieve()
{
   while(client.connected() && !client.available()) delay(1);
    while(client.connected() || client.available())
    {
      Serial.println("conected and available");
      char c = (char)client.read();
      Serial.println(c);
    }

    client.stop();
    delay(15);
}

void resetEthernetShield()
{
  delay(100);
  Serial.println("reset ethernet");
  client.stop();
  Ethernet.begin(mac, ip);
  delay(100);
}
