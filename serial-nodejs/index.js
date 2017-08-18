// Hardware part
const SerialPort = require('serialport');
const port = new SerialPort('COM3', {
	
	baudRate: 9600,
    parity: 'none',
  stopBits: 1,
  flowControl: false
});



function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

port.on('open', function(err){
	if (err) {
		return console.log('Error on open: ', err.message);
	}
	console.log('port opened');
});


port.on('data',(data) => {
  console.log(ab2str(data));
});


/*port.on('data', function (data) {
	console.log(`From device: ${data}`);
});
*/


// Web part
const express = require('express');
const app = express();
app.use(express.static('public'));

app.post('/servo', function (req, res) {
	if (req.headers.value){
		console.log('sent ' + req.headers.value);
		port.write(req.headers.value+'\n');
		res.send('ok');
	} else {
		res.send('not ok');
	}
});

app.listen(3000, () => {
	console.log('listening on port 3000');
});
