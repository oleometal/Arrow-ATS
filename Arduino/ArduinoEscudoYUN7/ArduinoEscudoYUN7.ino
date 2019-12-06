/*
  Arduino7 Yún 
  Ubicacion carro +E parte izquierda
  MAC: C4:93:00:04:32:59
  IP: 192.168.0.80

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

#define PIN_TRIGGER 31
#define PIN_ECHO 32
#define MEDIA_VELOCIDAD_SONIDO 0.017175 // Mitad de la velocidad del sonido a 20 °C expresada en cm/µs
#define ESPERA_ENTRE_LECTURAS 100 // tiempo entre lecturas consecutivas en milisegundos
#define TIMEOUT_PULSO 25000 // la espera máxima de es 30 ms o 30000 µs
// Listen to the default port 5555, the Yún webserver
// will forward there all the HTTP requests you send


float distancia;
unsigned long tiempo;
unsigned long cronometro;
unsigned long reloj=0;
BridgeServer server;
int i=0;
    String url ="http://192.168.0.98/api/arduino7/";
        String estadoch ="1";

    bool O32;
bool O33;
bool O40;
bool O41;
bool I98;
bool I99;
bool I100;
bool I101;
bool I102;
bool I103;
bool I104;
bool I105;
bool O97;
bool O98;
bool O99;
bool O100;
bool O101;
bool O102;
bool O106;
bool I160;
bool I161;
bool I164;
bool O160;
bool O161;
void setup() {
    

  // Bridge startup        Rele    Cable
  pinMode(18, INPUT); //<- 1R39 <- 
  pinMode(24, INPUT); //<- 3R38 <- CN115
  pinMode(25, INPUT); //<- 2R38 <- CU115
  pinMode(26, INPUT); //<- 1R38 <- CU114
  pinMode(10, INPUT); //<- 8R39 <- SA124
  pinMode(11, INPUT); //<- 7R39 <- SA125
  pinMode(12, INPUT); //<- 6R39 <- SA135
  pinMode(14, INPUT); //<- 5R39 <- SA136
  pinMode(15, INPUT); //<- 4R39 <- SC124
  pinMode(16, INPUT); //<- 3R39 <- SC125
  pinMode(17, INPUT); //<- 2R39 <- SC126
  pinMode(29, INPUT); //<-      <- CN114
  pinMode(28,OUTPUT); //-> 6R38 -> CN121
  pinMode(23,OUTPUT); //-> 4R38 -> SA122
  pinMode(27,OUTPUT); //-> 7R38 -> CN122    
  pinMode(22,OUTPUT); //-> 5R38 -> SA121
  pinMode(2, OUTPUT); //-> 8R40 -> CU112
  pinMode(19,OUTPUT); //-> 8R38 -> CU111
  pinMode(3, OUTPUT); //-> 7R40 -> SA132
  pinMode(4, OUTPUT); //-> 6R40 -> SC122
  pinMode(5, OUTPUT); //-> 5R40 -> SC121
  pinMode(6, OUTPUT); //-> 4R40 -> ST19
  pinMode(7, OUTPUT); //-> 3R40 -> CN111
  pinMode(8, OUTPUT); //-> 2R40 -> SA131
  pinMode(9, OUTPUT); //-> 1R40 -> SA134
 pinMode(PIN_ECHO,INPUT);
  pinMode(PIN_TRIGGER,OUTPUT);
  digitalWrite(PIN_TRIGGER,LOW); // Para «limpiar» el pulso del pin trigger del módulo
  delayMicroseconds(2);
  // PIN 20 TRIG
  // PIN 21 ECHO 
  Bridge.begin();
  

  // Listen for incoming connection only from localhost
  // (no one from the external network could connect)
  server.listenOnLocalhost();
  server.begin();
}
void loop() {
    cronometro=millis()-reloj;
  if(cronometro>ESPERA_ENTRE_LECTURAS)
  {
    digitalWrite(PIN_TRIGGER,HIGH); // Un pulso a nivel alto…
    delayMicroseconds(10); // …durante 10 µs y
    digitalWrite(PIN_TRIGGER,LOW); // …volver al nivel bajo
    tiempo=pulseIn(PIN_ECHO,HIGH,TIMEOUT_PULSO); // Medir el tiempo que tarda en llegar un pulso
    distancia=MEDIA_VELOCIDAD_SONIDO*tiempo;
  reloj=millis();
  }

    url ="http://192.168.0.98/api/arduino7/";
    O32=digitalRead(22);
O33=digitalRead(27);
O40=digitalRead(19);
O41=digitalRead(28);
I98=digitalRead(10);
I99=digitalRead(11);
I100=digitalRead(12);
I101=digitalRead(14);
I102=digitalRead(26);
I103=digitalRead(25);
I104=digitalRead(18);
I105=digitalRead(24);
O97=digitalRead(8);
O98=digitalRead(3);
O99=digitalRead(6);
O100=digitalRead(7);
O101=digitalRead(2);
O102=digitalRead(23);
O106=digitalRead(9);
I160=digitalRead(15);
I161=digitalRead(16);
I164=digitalRead(17);
O160=digitalRead(5);
O161=digitalRead(4);
    i++;
    if (i>=25){
        url = url+O32+"/"+O33+"/"+O40+"/"+O41+"/"+I98+"/"+I99+"/"+I100+"/"+I101+"/"+I102+"/"+I103+"/"+I104+"/"+I105+"/"+O97+"/"+O98+"/"+O99+"/"+O100+"/"+O101+"/"+O102+"/"+O106+"/"+I160+"/"+I161+"/"+I164+"/"+O160+"/"+O161;
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

  delay(10); // Poll every 50ms
}


void process(BridgeClient client) {
  // read the command
  String command = client.readStringUntil('/');

  // is "digital" command?
  if (command == "digital") {
    digitalCommand(client);
  }

   if (command == "distancia") {
    dist(client);
  }

  // is "analog" command?
  if (command == "analog") {
    analogCommand(client);
  }

  if (command == "ch1") {
    ch1(client);
  }

    if (command == "ch2") {
    ch2(client);
  }
 if (command == "estado") {
    estado(client);
  }
  // is "mode" command?
  if (command == "mode") {
    modeCommand(client);
  }
}

void estado(BridgeClient client) {
  client.print(estadoch);
  estadoch = "1";
}

void dist(BridgeClient client) {
  client.print(distancia);
}

void ch2(BridgeClient client) {

//Sube brazo.
digitalWrite(19,HIGH);
delay(100);
digitalWrite(19,LOW);
delay(3000);


//Confirma si subio brazo
  if(digitalRead(26)){
    //Cierra valvulas
    digitalWrite(22,HIGH);
    digitalWrite(28,HIGH);
    delay(500);
    digitalWrite(22,LOW);
    digitalWrite(28,LOW);
    delay(1000);
  //Revisa si valvula de husillo cerro
    if (digitalRead(10)){
 //Revisa si valvula de carrusel cerro
        if (digitalRead(29)){

              estadoch = "1";
              client.print(F("1"));

        }
        else{
               estadoch = "pcvc";
                             client.print(F("1"));

          //Problema cerrando valvula de carrusel
        }
    }
    else{
           estadoch = "pcvh";
                         client.print(F("1"));

      //Problema cerrando valvula de husillo
    }
    
  }
  else{
    //Problema brazo subiendo
     estadoch = "pbs";
                   client.print(F("1"));


  }
}


void ch1(BridgeClient client) {

//Suelta Husillo
digitalWrite(23,HIGH);
//Suelta Carrusel
digitalWrite(27,HIGH);

delay(100);

//FIN PULSO HUSILLO
digitalWrite(23,LOW);
//FIN PULSO CARRUSEL
digitalWrite(27,LOW);

delay(600);

if (digitalRead(11)){
    if (digitalRead(24)){

      // Baja brazo
      digitalWrite(2,HIGH);
      delay(100);
      digitalWrite(2,LOW);
      delay(1000);
      if(digitalRead(25)){
        //Todo bien
                      client.print(F("1"));

       estadoch = "1";
       
      }
      else{
        //Problema Brazo Bajando
                      client.print(F("1"));

       estadoch = "pbb";
      }
    }else{
      //Problema valvula carrusel
                    client.print(F("1"));

     estadoch = "pavc";
    }
}else{
      //Problema valvula husillo
                    client.print(F("1"));

 estadoch = "pavh";
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

