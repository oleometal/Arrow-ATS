//---------------------------- BLOQUE DE LIBRERÍAS --------------------------//

#include <EEPROM.h>



//------------------------ BLOQUE DE CONTROL DE TIEMPO ----------------------//

unsigned long timeMaxC; // tiempo máximo para calibración del home del carrusel
unsigned long tiempoC; //tiempo de calibracion del sensor del carrusel
unsigned long timeMaxH; // tiempo máximo para calibración del home de la herramienta
unsigned long timeMaxB; // tiempo máximo para calibración del home del brazo

// unsigned long timePLC; // tiempo de respuesta máxima para que el plc ejecute la acción

float giro180 = 1635;
int timeTool = 488;//1956 tiempo entre cada herramienta
int tiempoEspera = 500; // tiempo de espera entre cada cambio de herramienta 
unsigned long tiempoSerial; // tiempo de espera serial para recibir la respuesta del otro PLC

//----------------- BLOQUE DE CONTROL DE INDICADORES BANDERA ----------------//

int flagC = 0; 
int flagH = 0;
int flagB = 0;


//----------------------- BLOQUE DE ASIGNACIÓN DE PINES ---------------------//

// Sensores
int sensorC = 7; // Sensor de efecto hall del carrusel
int sensorH = 6; // Sensor de final de carrera del mandril de herramienta
int sensorB = 5; // Sensor del BRAZO AHORA ES A0 y SU VALOR EN POSITIVO ES MENOR A 100
int sensorP = 49;
// Paso de los servomotores (NO MODIFICAR NINGUNO DE ESTOS PINES)
int pasoC = 10; // Salida al servo motor del carrusel
int pasoH = 13; // Salida al servo motor del mandril de la herramienta
int pasoB = 12; // Salida al servo motor del brazo

// Dirección de los servomotores
int direccionC = 8 ; // dirección del motor del carrusel
int direccionH = 9 ; // dirección del motor del mandril de la herramienta
int direccionB = 11; // dirección del motor del brazo

// Comunicacion con PLC
int tx2 = 17;  // Trasmisión de datos
int rx2 = 16;  // recepción de ejecución
char ultimocorrido = "9";
/*
UTP1
cafe -> Ground
azul -> 13 paso del mandril de la herramienta
verde -> 12 Paso servo brazo
naranja -> 11 direccion motor brazo
azul/b -> 9 direccion motor mandril herramienta
naranja/b -> 8 direccion motor carrusel
UTP2
Cafe -> 7 sensor de efecto hall del carrusel
Cafe/b -> 6 sensor de final de carreradel madril
Verde -> 5 sensor del brazo
Verde/b -> 4 paso del carrusel 
Azul -> tx3
Azul/b -> rx3
naranja -> tx2
naranja/b -> rx2
*/


//---------------------- BLOQUE DE DETECCIÓN DE SENSORES --------------------//

int accionC = 1; 
int accionH = 1;
int accionB = 1;
int accionS = 1;

// int accionPLC = 1;
int detectTinyG = 0;


//--------------------- VARIABLES DE CONTROL DEL CARRUSEL -------------------//

int directionTool = 0;
int tool = EEPROM.read(directionTool); // herramienta en posicion de home
int validationHome = 0;
int changeNumber = 0;


//---------------------- FUNCIÓN DE CONFIGURACIÓN INICIAL -------------------//

void setup(){
  Serial.begin(115200); 
  //Serial3.begin(9600);
  //Serial2.begin(9600);

  pinMode(sensorC, INPUT);
  pinMode(pasoC, OUTPUT);
  pinMode(direccionC, OUTPUT);
  pinMode(sensorH, INPUT);
  pinMode(pasoH, OUTPUT);
  pinMode(direccionH, OUTPUT);
  pinMode(sensorB, INPUT);
  pinMode(pasoB, OUTPUT);
  pinMode(direccionB, OUTPUT);
  pinMode(tx2,OUTPUT);
  pinMode(rx2,INPUT);

  digitalWrite(pasoC, LOW);
  digitalWrite(pasoH, LOW);
  digitalWrite(pasoB, LOW);

  digitalWrite(direccionC,LOW);
  digitalWrite(direccionH,LOW);
  digitalWrite(direccionB,LOW);

  digitalWrite(tx2,LOW);  
}


//-------------------------- FUNCIÓN DE LOOP PRINCIPAL ----------------------//

void loop() {
  //Serial.print(analogRead(A0));
  if(Serial.available()){
    
    if(detectTinyG == 0){
      while(Serial.available()){
        char x = Serial.read();
        //x = 0;
        delay(100);
        //Serial.flush();
      }
      detectTinyG = 1;
      Serial.flush();
    }
    
    char c = Serial.read();
    switch(c){
      case 'a': // home de todas las herramientas
        homeTool();
        break;
      case 'T':changeTool();
        break;
      case 'z': //enganchar
        changeB(1,0);
        break;
      case 'w': //desenganchar
        changeB(1,1);
        break;
      case 'o': //girar media vuelta
        changeB(2,0);
        break;
      case 'p': //mover la herramienta a 250cm de la posición de trabajo
        changeH(-20.0);
        break;
             case 'j': //mover la herramienta a 250cm de la posición de trabajo
        changeH(309);
        break;
                     case 'x': //Paso 1 CH
                   
        changeToolJ1(1);
        break;
                      case 'l': //Paso 2 CH
                         if ( ultimocorrido != "l"){
                     ultimocorrido = "l";
        changeToolJ2(1);
                         }
        break;
                      case 'm':
                         if ( ultimocorrido != "xm"){
                     ultimocorrido = "m";//Paso 3 CH
        changeToolJ3(1);
                         }
        break;
 

                     case 'X': //Paso 1 CH
        changeToolJ1(2);
        break;
                      case 'L': //Paso 2 CH
                         if ( ultimocorrido != "L"){
                     ultimocorrido = "L";
        changeToolJ2(2);
                         }
        break;
                      case 'M': //Paso 3 CH
                         if ( ultimocorrido != "M"){
                     ultimocorrido = "M";
        changeToolJ3(2);
                         }
        break;
          

                     case 'q': //Paso 1 CH
        changeToolJ1(3);
        break;
                      case '#': //Paso 2 CH
                         if ( ultimocorrido != "#"){
                     ultimocorrido = "#";
        changeToolJ2(3);}
        break;
                      case '$': //Paso 3 CH
                         if ( ultimocorrido != "$"){
                     ultimocorrido = "$";
        changeToolJ3(3);}
        break;
 

                     case 'Q': //Paso 1 CH
        changeToolJ1(4);
        break;
                      case 'R': //Paso 2 CH
                         if ( ultimocorrido != "R"){
                     ultimocorrido = "R";
        changeToolJ2(4);}
        break;
                      case 'S': //Paso 3 CH
           if ( ultimocorrido != "S"){
                     ultimocorrido = "S";
        changeToolJ3(4);}
        break;


           case 'u': //home de brazo cambiador
         homeB();
        break;
      case 'f': //home del carrusel
        homeC();
        break;
      case 'g': //home del braxo
        homeH();
        break;
      case 'i': //mover carrusel a la herramienta seleccionado, agregar el entero de 1-18 seguido del i
        changeToolWeb();
        break;
      case 'h':
        changeNextTool();
        break;

    }
  }
}

//------------------- FUNCIÓN CAMBIO DE HERRAMIENTA CARRUSEL ----------------//

void changeNextTool(){
  char j = Serial.parseInt();
  if(j > 0 && j <= 18){
    delay(8000);
    changeC(j);
  }
}

void changeToolWeb(){
  char j = Serial.parseInt();
  if(j > 0 && j <= 18){
    changeC(j);
    changeNumber ++;
  }

}





void changeToolJ3(int tipocambio){
 int secuencia = 0;
                      delay(tiempoEspera+1000);
                      secuencia = changeB(1,1); // regresar el brazo a la posicion inicial
                      if(secuencia == 1){
                        homeH();
                        
                        delay(tiempoEspera);
                       
                      
                 
                        if (tipocambio == 1){
                Serial.print("C");
                }
                                if (tipocambio ==  2){
                Serial.print("c");
                }
                  if (tipocambio ==  3){
                  Serial.print("F");
                }
     if (tipocambio ==  4){
                  Serial.print("f");
                }
                        

}
}

void changeToolJ2(int tipocambio){
 int secuencia = 0;
                 

 delay(tiempoEspera+1500);
 secuencia = changeB(2,0); // cambio de herramienta
                if(secuencia == 1){
                    changeH(307);
                    delay(1000);
                    if (tipocambio == 1){
                Serial.print("B");
        
                }
                              if (tipocambio ==  2){
                Serial.print("b");
                }
                  if (tipocambio ==  3){
                  Serial.print("E");
                }
     if (tipocambio ==  4){
                  Serial.print("e");
                }

                   }

}
void changeToolJ1(int tipocambio){
 delay(5);
  int a = Serial.parseInt();
  delay(3);
  char b = Serial.read();
  delay(5);
  float c = Serial.parseFloat();
  if(a >= 1 && a <= 18){ // validar el numero de la herramienta
    if(b == ';'){ // validar el carácter limitador
      if(c >=0 && c <=300){ // validar la longitud maxima del offset
        int secuencia = 0;
        if(validationHome == 1){ // validar que anteriormente se realizó la calibración
          if(changeNumber >= 10){ // número máximo de cambios de herramienta que puede realizar
            homeTool();
            changeNumber = 0;
          }
          secuencia = homeH();
          if(secuencia == 1){ 
            secuencia = 0;
            delay(tiempoEspera);
            secuencia = changeC(a); 
            if(secuencia == 1){
              changeNumber ++;
              secuencia = 0;
              delay(tiempoEspera);
              secuencia = changeB(1,0); // enganchar las herramientas con el brazo
              if(secuencia == 1){
                if (tipocambio ==  1){
                Serial.print("A");
                }
                  if (tipocambio ==  2){
                  Serial.print("a");
                }
                                if (tipocambio ==  3){
                Serial.print("D");
                }
                  if (tipocambio ==  4){
                  Serial.print("d");
                }
          }
          }
          }
          }// Error de Home
else{
          Serial.print("nohome");}
          }
          }
          }




      }
//------------------------ FUNCIÓN DE CODIFICACIÓN JSON ---------------------//

void sendJson(String msg, int status){
 
}


//--------------------- FUNCIÓN HOME DE TODOS LOS MOTORES -------------------//

void homeTool(){
  int secuencia = 0;
  validationHome = 0;
  secuencia = homeH();
  if(secuencia == 1){
    secuencia = 0;
    secuencia = homeC();
    if(secuencia == 1){
      secuencia = 0;
      secuencia = homeB();
      if(secuencia == 1){
        if(EEPROM.read(directionTool) != 1){
          EEPROM.write(directionTool,1);
        }
        
       // sendJson("a",1);
        validationHome = 1;
        changeNumber = 0;
      }
      //else sendJson("c",0);
    }
    //else sendJson("b",0);
  }
  //else sendJson("d",0);
}


//------------------------- FUNCIÓN HOME DEL CARRUSEL -----------------------//

int homeC(){

  if (digitalRead(sensorP) == 0){
  accionC = 1;
  
  TCCR2B = TCCR2B & B11111000 | B00000011;
  analogWrite(pasoC,5);
  int estadoH = 0;
  int distanciaHome = abs(1 - tool);
  flagC = 0;
  if(tool == 18){
    estadoH = 0;
  }
  else if(distanciaHome <= 9){
    estadoH = 0;
  }
  else {
    estadoH = 1;
  }
  digitalWrite(direccionC, 1 - estadoH);
  timeMaxC = millis();
  while(accionC){
    if(digitalRead(sensorC) == HIGH && flagC == 0){
      digitalWrite(pasoC, LOW);
     TCCR2B = TCCR2B & B11111000 | B00000100; 
      delay(100);
      tiempoC = millis();
      analogWrite(pasoC, 5);
      flagC = 1;
    }
    else if(digitalRead(sensorC) == LOW && flagC == 1){
      digitalWrite(pasoC, LOW);
      tiempoC = millis() - tiempoC;
      digitalWrite(direccionC, estadoH);
      delay(100);
      analogWrite(pasoC, 5);
      delay(tiempoC*3/5);
      digitalWrite(pasoC, LOW);
      accionC = 0;
      flagC = 0;
      delay(200);
      digitalWrite(pasoC, LOW);
      TCCR2B = TCCR2B & B11111000 | B00000011;    
      digitalWrite(direccionC, LOW);
      analogWrite(pasoC, 5);
      delay(2989); //2980tiempo para llegar del sensor al home con la primera herramienta
      digitalWrite(pasoC, LOW);
      tool = 1;
      //sendJson("Herramienta 1 en Home",1);
      return 1;
      break;
    }
    if(millis() - timeMaxC >= 40000){
      accionC = 0;
      digitalWrite(pasoC, LOW);
      //sendJson("No se pudo detectar el sensor del carrusel",0);
      return 0;
    } 
  }
  }
}


//----------------- FUNCIÓN HOME DEL MANDRIL DE LA HERRAMIENTA --------------//

int homeH(){

  if (digitalRead(sensorP) == 0){
  accionH = 1;
  flagH = 0;
  
  TCCR0B = TCCR0B & 0b1111000 | 0x02;
  digitalWrite(direccionH,HIGH);
  analogWrite(pasoH,5);
  timeMaxH = millis();
  while(accionH){
    if(digitalRead(sensorH) == HIGH && flagH == 0){
      digitalWrite(pasoH, LOW);
      TCCR0B = TCCR0B & 0b1111000 | 0x03;
      flagH = 1;
    }
    else if(digitalRead(sensorH) == LOW && flagH == 1){
      delay(1000);
      digitalWrite(direccionH,LOW);
      analogWrite(pasoH,5);
      delay(400); //tiempo de calibración, 740 originalmente
      digitalWrite(pasoH, LOW);
      accionH = 0;
      flagH = 0;
      return 1;
    }
    if((millis() - timeMaxH) > 32000){
      accionH = 0;
      digitalWrite(pasoH, LOW);
      return 0;
    }
  }
}}


//------------------------- FUNCIÓN HOME DEL BRAZO -----------------------//

int homeB(){
  accionB = 1;
  flagB = 0;
  
  TCCR1B = TCCR1B & 0b1111000 | 0x02;
  digitalWrite(direccionB,LOW);
  analogWrite(pasoB,5);
  timeMaxB = millis();
  while(accionB){
    if(analogRead(A0) < 100 && flagB == 0){
      delay(120);//encontrar el sensor en el centro
      digitalWrite(pasoB, LOW);
      flagB == 1;
      accionB = 0;
    }
    if(millis() - timeMaxB >= 7000){
      accionB = 0;
      digitalWrite(pasoB, LOW);
      digitalWrite(direccionB, LOW);
      return 0;
    }
  }
  TCCR1B = TCCR1B & 0b1111000 | 0x01;
  delay(1000);
  digitalWrite(direccionB,HIGH);
  analogWrite(pasoB,5);
  delay(680); //650
  digitalWrite(pasoB, LOW);
  digitalWrite(direccionB, LOW);
  return 1;
}


//------------ FUNCIÓN CAMBIO DE HERRAMIENTA DE TODOS LOS MOTORES -----------//


void changeTool(){
  delay(5);
  int a = Serial.parseInt();
  delay(3);
  char b = Serial.read();
  delay(5);
  float c = Serial.parseFloat();
  if(a >= 1 && a <= 18){ // validar el numero de la herramienta
    if(b == ';'){ // validar el carácter limitador
      if(c >=0 && c <=300){ // validar la longitud maxima del offset
        int secuencia = 0;
        if(validationHome == 1){ // validar que anteriormente se realizó la calibración
          if(changeNumber >= 10){ // número máximo de cambios de herramienta que puede realizar
            homeTool();
            changeNumber = 0;
          }
          secuencia = homeH(); // hacer home en la herramienta del motor
          if(secuencia == 1){ 
            secuencia = 0;
            delay(tiempoEspera);
            secuencia = changeC(a); // Cambia el carrusel a la herramienta deseada
            if(secuencia == 1){
              secuencia = 0;
              delay(tiempoEspera);
              secuencia = changeB(1,0); // enganchar las herramientas con el brazo
              if(secuencia == 1){ //Continuar con la accion al plc
                secuencia = 0;
                delay(tiempoEspera);
                secuencia = comunicationPLC(1); // acción para bajar los pistones
                if(secuencia == 1){
                  secuencia = 0;
                  delay(tiempoEspera+1500);
                  secuencia = changeB(2,0); // cambio de herramienta, gira brazo
                   changeH(307);
                  if(secuencia == 1){ 
                    secuencia = 0;
                    delay(tiempoEspera);
                    // Serial.print("a0");
                    // Serial.setTimeout(tiempoSerial*2);
                    // secuencia = Serial.parseInt();
                    secuencia = comunicationPLC(0); // acción para subir los pistones
                    if(secuencia == 1){
                      secuencia = 0;
                      delay(tiempoEspera+1000);
                      secuencia = changeB(1,1); // regresar el brazo a la posicion inicial
                      if(secuencia == 1){
                        secuencia = 0;
                        delay(tiempoEspera);
                        secuencia =  1;//changeH(c); // llevar herramienta a la posición de trabajo
                        if(secuencia == 1){
                          secuencia = 0;
                          // int x = 0;
                          //sendJson("e",1);
                          changeNumber ++;
                        
                        
                        }
                        else sendJson("f",0);
                      }
                      else sendJson("g",0);
                      //}
                      //else sendJson("h",0);
                    }
                    else sendJson("i",0);
                  }
                  else sendJson("j",0);
                }
                else sendJson("k",0);
                //}
                //else sendJson("l",0);
              }
              else sendJson("m",0);
            }
            else sendJson("n",0);
          }
          else sendJson("o",0); 
        }
        else sendJson("p",0);
      }
      else sendJson("q",0);
    }
    else sendJson("r",0);
  }
  else sendJson("s",0);
}



//------------------------ FUNCIÓN CAMBIO DEL CARRUSEL ----------------------//

int changeC(int newTool){

  if (digitalRead(sensorP) == 0){
  TCCR2B = TCCR2B & B11111000 | B00000010;
  int distancia = abs(newTool - tool);
  
  if(distancia <= 9){
    if((newTool - tool)>0){
      digitalWrite(direccionC, LOW);
    }
    else digitalWrite(direccionC, HIGH);
  }
  else {
    distancia = 18 - distancia;
    if((newTool - tool)>0){
      digitalWrite(direccionC, HIGH);
    }
    else digitalWrite(direccionC, LOW);
  }
  analogWrite(pasoC,5);
 for (int i = 1; i <= distancia; i++) {
delayMicroseconds(15000);
delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

delayMicroseconds(15000);

// ORIGINAL 7950
delayMicroseconds(4450);

  
 }
  //delay(distancia*timeTool); // tiempo entre cada herramienta
  digitalWrite(pasoC, LOW);
  EEPROM.write(directionTool,newTool);    
  tool = newTool;
  //sendJson("Herramienta "+String(tool)+" en Home",1);
  return 1;}
}


//------------------------ FUNCIÓN CAMBIO DEL BRAZO ----------------------//

int changeB(int giro, int sentido){
    TCCR1B = TCCR1B & 0b1111000 | 0x01;
      TCCR0B = TCCR0B & 0b1111000 | 0x03;

   int muestra = giro;
   double suma = 816000;
 

  digitalWrite(direccionB, sentido); //0 en sentido antihorario, 1 sentido horario 
  analogWrite(pasoB,5);
  double TiempoAhora = micros();
  //delay(giro); // tiempo de espera

    if(muestra == 2){
   while(micros() < TiempoAhora+1633000){
    
  }
  }else{
  while(micros() < TiempoAhora+816500){
    
  }}
  //delayMicroseconds(1000);
  digitalWrite(pasoB, LOW);
  return 1;
}


//--------------- FUNCIÓN CAMBIO DEL MANDRIL DE LA HERRAMIENTA --------------//

int changeH(double offset){
  if (digitalRead(sensorP) == 0 || offset == 307){
  delay(5);
  double value = -83.5143*offset + 26024.1356;
  TCCR0B = TCCR0B & 0b1111000 | 0x02;
  digitalWrite(direccionH, LOW);
  analogWrite(pasoH,5);
  delay(value); // tiempo de espera
  digitalWrite(pasoH, LOW);
  return 1;}
}


//---------------------------- COMUNICACIÓN PLC -----------------------------//

int comunicationPLC(int function){
  accionS = 1;
  if(function == 1){  // accionar pistones
    Serial.print("a");
  }
  else Serial.print("b");
  tiempoSerial = millis();
  while(accionS){
    if(Serial.available()){
      char response = Serial.read();
      //Serial.print(response);
      if(response == '1'){
        accionS = 0;
        return 1;
      }
    }
    else if((millis() - tiempoSerial) > 18000){
      accionS = 0;
      return 0;
    }
  }
}
