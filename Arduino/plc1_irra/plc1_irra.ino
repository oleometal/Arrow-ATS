/* Control Arduino Ethernet PLC1
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
byte ip[] = { 192, 168, 0, 99 };                       // IP Local que usted debe configurar
byte gateway[] = { 192, 168, 0, 1 };                   // Puerta de enlace
byte subnet[] = { 255, 255, 255, 0 };                  //Mascara de Sub Red
EthernetServer server(80);                             //Se usa el puerto 80 del servidor                          
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

void loop()
{

  EthernetClient client = server.available(); // Crea una conexion Cliente
  if (client) {                               //Verificamos si se detecte un cliente a través de una petición HTTP
    while (client.connected()) {
      
      if (client.available()) {
        char c = client.read(); //Leemos la petición HTTP carácter por carácter

        //Lee caracter por caracter HTTP
        if (readString.length() < 100) {
          //Almacena los caracteres a un String
          
          readString += c;

        }
      
        // si el requerimiento HTTP fue finalizado
        if (c == '\n') {
          //Serial.println(readString); //Imprime en el monitor serial
          client.println("HTTP/1.1 200 OK");           //envia una nueva pagina en codigo HTML
          client.println("Content-Type: text/html");
          client.println("Refresh: 10"); // refresh the page automatically every 5 sec
          client.println();
          client.println("<HTML>");  //Página web en formato HTML
          client.println("<HEAD>");
          client.println("<TITLE>Dida Arrow ATS</TITLE>");
          client.println("</HEAD>");
          client.println("<BODY>");
          client.println("<hr />");
          client.println("<H1>Arrow ATS</H1>");

          client.println("<a href=\"/?button2on\"\"> habilitar husillo</a> ");           // construye en la pagina cada uno de los botones
          client.println(" | | | ");
          client.println("<a href=\"/?button2off\"\"> inhabilitar husillo</a><br /> ");
          client.println("<br />");

          /* client.println("<br />");
            client.println("<a href=\"/?button3on\"\"> Encender Husillo</a> ");
            client.println(" | | | ");
            client.println("<a href=\"/?button3off\"\"> Apagar Husillo</a><br /> ");
            client.println("<br />");
          */



          client.println("<br />");

          // output the value of each analog input pin
          client.println("<h2>Entradas Digitales</h2>");
          client.print("Input de start = "); client.print(digitalRead(I1_4));
          client.print("<br />linea de seguridad ok = "); client.print(digitalRead(I0_5)); client.println(" ,foglio 160.");
          client.print("<br />Contactores en reposo = "); client.print(digitalRead(I1_3)); client.println(" ,foglio 160.");
          client.print("<br />Habilitacion de Circuito Auxiliar = "); client.print(digitalRead(I1_2)); client.println(" ,foglio 160.");
          client.print("<br />Aire = "); client.print(digitalRead(I1_5));
          client.print("<br />Interruptor de calibracion eje X = "); client.print(digitalRead(I1_0)); client.println(" ,foglio 1691.");
          client.print("<br />Interruptor de calibracion eje Z = "); client.print(digitalRead(I1_1));
          client.print("<br />Interruptor de calibracion eje Y = "); client.print(digitalRead(I0_0));
          client.print("<br />Interruptor de calibracion eje A = "); client.print(digitalRead(I0_1));
          client.print("<br />Husillo TinyG = "); client.print(analogRead(I0_4));
          client.println("<br /><br />");

          client.println("<br />");

          client.println("<hr />");
          client.println("<h2>Salidas</h2>");
          client.println("<br />salida run servopack ="); client.print(digitalRead(R0_1));
          client.println("<br />Habilitacion de Husillo ="); client.print(digitalRead(R0_3));
          client.println("<br />Interruptor de Calibracion eje X ="); client.print(digitalRead(R1_7));
          client.println("<br />Interruptor de Calibracion eje Z ="); client.print(digitalRead(R1_6));
          client.println("<br />Interruptor de Calibracion eje Y ="); client.print(digitalRead(R1_5));
          client.println("<br />Interruptor de Calibracion eje A ="); client.print(digitalRead(R1_4));
          client.println("<p>by: Irra</p>");
          client.println("<br />");
          client.println("<script>console.log('nuevo cliente')</script>");
          client.println("</BODY>");
          client.println("</HTML>");

          delay(1);
          //detiene el cliente servidor
          client.stop();

          //control del arduino si un boton es presionado

          if (readString.indexOf("?button2on") > 0) {
            digitalWrite(R0_3, HIGH);
            digitalWrite(R0_4, HIGH); //run husillo
          }
          if (readString.indexOf("?button2off") > 0) {
            digitalWrite(R0_3, LOW);
            digitalWrite(R0_4, LOW);
          }

          /*if (readString.indexOf("?button3on") >0){  //Husillo avance
              analogWrite(A0_0, 255);
            }
            if (readString.indexOf("?button3off") >0){
              analogWrite(A0_0, 0);
            }

          */
          if (readString.indexOf("?button4on") > 0) {
            digitalWrite(4, HIGH);
          }
          if (readString.indexOf("?button4off") > 0) {
            digitalWrite(4, LOW);
          }

          if (readString.indexOf("?button5on") > 0) {
            digitalWrite(5, HIGH);
          }
          if (readString.indexOf("?button5off") > 0) {
            digitalWrite(5, LOW);
          }


          if (readString.indexOf("?button6on") > 0) {
            digitalWrite(6, HIGH);
          }
          if (readString.indexOf("?button6off") > 0) {
            digitalWrite(6, LOW);
          }


          // Limpia el String(Cadena de Caracteres para una nueva lectura
          readString = "";



        }
      }
    }
  }



  

  //////////////////Lineas de Seguridad//////////////////////////////////
  if (digitalRead(I1_2) == HIGH) //lee input circuito auxiliar
  { digitalWrite(R0_2, HIGH); //habilita circuito auxiliar servopacks.
  }
  else {
    digitalWrite(R0_2, LOW); //apaga la potencia de servopack
  }
  if (digitalRead(I1_2) == LOW)
  { digitalWrite(R0_1, LOW); //manda estado bajo la salida del run del servopack
  }
  if (digitalRead(I1_4) == HIGH ) // lee input  run
  { digitalWrite(R0_1, HIGH); //manda a run los servopack.
  }


  ////////////////Limites para tinyg home/////////////////////////////
  if (digitalRead(I1_0) == HIGH) //lee input de interruptor de home X.
  { digitalWrite(R1_7, LOW);
  }
  else {
    digitalWrite(R1_7, HIGH);
  }
  if (digitalRead(I1_1) == HIGH) //lee input de interruptor de home Z.
  { digitalWrite(R1_6, LOW);
  }
  else {
    digitalWrite(R1_6, HIGH);
  }
  if (digitalRead(I0_0) == HIGH) //lee input de interruptor de home Y.
  { digitalWrite(R1_5, LOW);
  }
  else {
    digitalWrite(R1_5, HIGH);
  }
  if (digitalRead(I0_1) == HIGH) //lee input de interruptor de home A.
  { digitalWrite(R1_4, LOW);
  }
  else {
    digitalWrite(R1_4, HIGH);
  }
  if (analogRead(I0_4) > 100) //lee input tinyg husillo
  { analogWrite(A0_0, 255);
  }
  else {
    analogWrite(A0_0, 0);
  }
}