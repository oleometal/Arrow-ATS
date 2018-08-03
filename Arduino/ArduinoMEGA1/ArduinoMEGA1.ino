 #include <digitalWriteFast.h>

 //los encendidos borrarlos.
 
 
 int counter1 = 0; 
 int aLastState1;
 int outputA1 = 2;
 int outputB1 = 3;
 int movimiento1 = 26;
 bool valorA1;
 bool valorB1;
 int movact1;
 
 int counter2 = 0; 
 int aLastState2;
 int outputA2 = 4;
 int outputB2 = 5;
 int movimiento2 = 15;
 bool valorA2;
 bool valorB2;
 int movact2;

  int counter3 = 0; 
 int aLastState3;
 int outputA3 = 7;
 int outputB3 = 6;
 int movimiento3 = 28;
 bool valorA3;
 bool valorB3;
 int movact3;

  int counter4 = 0; 
 int aLastState4;
 int outputA4 = 8;
 int outputB4 = 9;
 int movimiento4 = 23;
 bool valorA4;
 bool valorB4;
 int movact4;

  int counter5 = 0; 
 int aLastState5;
 int outputA5 = 10;
 int outputB5 = 11;
 int movimiento5 = 25;
 bool valorA5;
 bool valorB5;
 int movact5;

 void setup() { 
   pinMode (outputA1,INPUT);
   pinMode (outputB1,INPUT);
   pinMode (movimiento1,INPUT);
   aLastState1 = digitalRead(outputA1);   
   pinMode (outputA2,INPUT);
   pinMode (outputB2,INPUT);
   pinMode (movimiento2,INPUT);
   aLastState2 = digitalRead(outputA2);   
   pinMode (outputA3,INPUT);
   pinMode (outputB3,INPUT);
   pinMode (movimiento3,INPUT);
   aLastState3 = digitalRead(outputA3);   
   pinMode (outputA4,INPUT);
   pinMode (outputB4,INPUT);
   pinMode (movimiento4,INPUT);
   aLastState4 = digitalRead(outputA4);   
   pinMode (outputA5,INPUT);
   pinMode (outputB5,INPUT);
   pinMode (movimiento5,INPUT);
   aLastState5 = digitalRead(outputA5);   

 
   Serial1.begin(74880);


  
 } 

 
 void loop() { 
 /*I1.0 (ARDUINO PIN 27) es el detector de movimiento.
PIN 28 del CNC hace 24 a moverse, 0v al detenerse.*/

 valorA1 = digitalRead(outputA1);
 valorB1 = digitalRead(outputB1);
 movact1 = digitalRead(movimiento1);
  valorA2 = digitalRead(outputA2);
 valorB2 = digitalRead(outputB2);
 movact2 = digitalRead(movimiento2);
  valorA3 = digitalRead(outputA3);
 valorB3 = digitalRead(outputB3);
 movact3 = digitalRead(movimiento3);
  valorA4 = digitalRead(outputA4);
 valorB4 = digitalRead(outputB4);
 movact4 = digitalRead(movimiento4);
  valorA5 = digitalRead(outputA5);
 valorB5 = digitalRead(outputB5);
 movact5 = digitalRead(movimiento5);


 
  if (movact1 && valorA1 != aLastState1 ){     
      if ((valorB1 !=  0 && valorA1 == 1)|| (valorB1 !=  1 && valorA1 == 0)) { 
        counter1 ++;
          } 
      else {  
        counter1 --;
     }
         aLastState1 = digitalRead(outputA1);
   
   }

   
     if (movact2 && valorA2 != aLastState2 ){     
      if (valorB2 != valorA2) { 
        counter2 ++;
          } 
      else {  
        counter2 --;
     }
    
   }
   
     if (movact3 && valorA3 != aLastState3 ){     
      if (valorB3 != valorA3) { 
        counter3 ++;
          } 
      else {  
        counter3 --;
     }

 
   }
     if (movact4 && valorA4 != aLastState4 ){     
      if (valorB4 != valorA4) { 
        counter4 ++;
          } 
      else {  
        counter4 --;
     }
 
   }
     if (movact5 && valorA5 != aLastState5){     
      if (valorB5 != valorA5) { 
        counter5 ++;
          } 
      else {  
        counter5 --;
     }
 
   }

   aLastState1 = digitalRead(outputA1);
    aLastState2 = digitalRead(outputA2);
    aLastState3 = digitalRead(outputA3);
    aLastState4 = digitalRead(outputA4);
    aLastState5 = digitalRead(outputA5);
Serial1.print('!');
   Serial1.print(counter1);
   Serial1.write(",");
      Serial1.print(counter2);
   Serial1.write(",");
      Serial1.print(counter3);
   Serial1.write(",");
      Serial1.print(counter4);
   Serial1.write(",");
      Serial1.print(counter5);
          Serial1.print('P');
   Serial1.println();
 
   
}
