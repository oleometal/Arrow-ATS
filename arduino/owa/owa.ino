/*
 
 It demonstrates how you can create your own API when using REST style
 calls through the browser with CORS enabled.

 Possible commands created in this shetch:

 * "/arduino/digital/13"     -> digitalRead(13)
 * "/arduino/digital/13/1"   -> digitalWrite(13, HIGH)
 * "/arduino/analog/2/123"   -> analogWrite(2, 123)
 * "/arduino/analog/2"       -> analogRead(2)

 */

#include <YunServer.h>
#include <YunClient.h>

// Listen on default port 5555, the webserver on the Yun
// will forward there all the HTTP requests for us.
YunServer server;
bool ledState[] = {};

void setup() {
  // Bridge startup
  pinMode(13, OUTPUT);
  digitalWrite(13, LOW);
  Bridge.begin();
  digitalWrite(13, HIGH);

  server.begin();
}

void loop() {
  // Get clients coming from server
  YunClient client = server.accept();

  // There is a new client?
  if (client) {    
    // Process request
    process(client);

    // Close connection and free resources.
    client.stop();
  }

  delay(50); // Poll every 50ms
}

void process(YunClient client) {
  // read the command
  String command = client.readStringUntil('/');
  command.trim();
  
  client.println("Status: 200");
  client.println("Access-Control-Allow-Origin: *");   
  client.println("Access-Control-Allow-Methods: GET");
  client.println("Content-Type: text/html");
  client.println("Connection: close");
  client.println();
  
  if (command == "digital") {
    digitalCommand(client);
  } else if (command == "analog") {
    analogCommand(client);
  } else {
    client.print(F("Error"));
  }
}

void digitalCommand(YunClient client) {
  int pin, value;

  // Read pin number
  pin = client.parseInt();

  // If the next character is a '/' it means we have an URL
  // with a value like: "/digital/13/1"
  if (client.read() == '/') {
    value = client.parseInt();
    digitalWrite(pin, value);
    if(value > 0) {
      ledState[pin] = true;
    } else {
      ledState[pin] = false;
    }
  } else {
    value = ledState[pin];
  }

  // Send feedback to client
  client.print(value);

}

void analogCommand(YunClient client) {
  int pin, value;

  // Read pin number
  pin = client.parseInt();

  // If the next character is a '/' it means we have an URL
  // with a value like: "/analog/5/120"
  if (client.read() == '/') {
    // Read value and execute command
    value = client.parseInt();
    analogWrite(pin, value);
    if(value > 0) {
      ledState[pin] = true;
    } else {
      ledState[pin] = false;
    }
  } else {
    value = ledState[pin];
  }
  // Send feedback to client
  client.print(value);
}
