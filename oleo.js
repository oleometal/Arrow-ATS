const SerialPort = require('serialport');
const port = new SerialPort('COM3',{
    baudRate: 9600
});

port.on('open', function showPortOpen() {
   console.log(`port open. Data rate: ${port}`);

  });
