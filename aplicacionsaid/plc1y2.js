var five = require("johnny-five");
//PLC2
/*var board = new five.Board({
  port: "/dev/ttyACM0"
});
//PLC1
var board2 = new five.Board({
  port: "/dev/ttyACM1"
});*/

var ports = [
    { id: "PLC1", port: "/dev/ttyACM0" }
  ];

//PLC2 adn PLC1 BOARD
new five.Boards(ports).on("ready", function() {


  	function validplc2(thist){

  		var obj = 1;

  		thist.each(function(board) {

  			//Lineas de seguridad

  			if (board.id === "PLC1") {

				var sensorI2 = new five.Pin("A8");
				var sensorI5 = new five.Pin("A6");
				var sensorI11 = new five.Pin("A9");
				var sensorI10 = new five.Pin("A2");
			 	var sensorI1 = new five.Pin("A0");
			 	var sensorI3 = new five.Pin(2);
			 	var sensorI4 = new five.Pin(3);
			 	var sensorI14 = new five.Pin(19);

				

				sensorI2.read(function(error, value) {
					//var value = this.scaleTo(0, 1);
			    	if(value>=512 && value<=1023){
						console.log("Interruptores Termomagneticos Aprobados | valor: "+value);
					}else{
						console.log("Error: Interruptores Termomagneticos No Aprobados.");
						obj = 0;
					}
			  	});
			  	sensorI5.read(function(error, value) {
					//var value = this.scaleTo(0, 1);
			    	if(value>=512 && value<=1023){
						console.log("ENABLE AUXILIARY CIRCUITS | valor: "+value);
					}else{
						console.log("Error: DISABLED AUXILIARY CIRCUITS.");
						obj = 0;
					}
			  	});
			  	sensorI11.read(function(error, value) {
					//var value = this.scaleTo(0, 1);
					//console.log(value);
			    	if(value>=512 && value<=1023){
						console.log("Freno de eje Z cerrado OK | valor: "+value);
					}else{
						console.log("Error: Freno de eje Z abierto.");
						obj = 0;
					}
			  	});
			  	sensorI10.read(function(error, value) {
					//var val = this.scaleTo(0, 1);
			    	if(value>=512 && value<=1023){
						console.log("Resistencia del Inversor SETTING cerrado OK | valor: "+value);
					}else{
						console.log("Error: Resistencia del Inversor SETTING abierto. "+value);
						obj = 0;
					}
			  	});
			  	sensorI1.read(function(error, value) {
					//var value = this.scaleTo(0, 1);
					//console.log("I14: "+value);
			    	if(value>=512 && value<=1023){
						console.log("Boton de circuito de emergencia cerrado OK | valor: "+value);
					}else{
						console.log("Error: Boton de circuito de emergencia abierto.");
						obj = 0;
					}
			  	});

			  	sensorI3.read(function(error, value) {
					//var value = this.scaleTo(0, 1);
					console.log("I3: "+value);
			  	});

			  	sensorI4.read(function(error, value) {
					//var value = this.scaleTo(0, 1);
					console.log("I4: "+value);
			  	});
			  	sensorI14.read(function(error, value) {
					//var value = this.scaleTo(0, 1);
					console.log("I14: "+value);
			  	});

			}

  			if (board.id === "PLC2") {

				//SENSORES LECTURA
				/*var sensorI21 = new five.Sensor("A3");*/
				var sensorI21 = new five.Pin("A3");
				var sensorI28 = new five.Pin("A8");
				var sensorI22 = new five.Pin("A0");
				var sensorI29 = new five.Pin("A13");
				var sensorI30 = new five.Pin("A6");
				var sensorI31 = new five.Pin("A7");
				var sensorI27 = new five.Pin(3);
				var sensorI18 = new five.Pin("A1");
				var sensorI23 = new five.Pin("A2");
				//var sensorO19 = new five.Pin(24);

				

				// Assuming a sensor is attached to pin "A1"
				//sensorI21.read(function(error, value) {
					//var value = this.scaleTo(0, 1);
					//console.log("A3: "+value);
			    	/*if(value>=512 && value<=1023){
						console.log("Contactores en reposo | valor: "+value);
					}else{
						console.log("Error: Contactores Abiertos.");
						obj = 0;
					}*/
			  	//});
			  	/*sensorI28.read(function(error, value) {
			  		//var value = this.scaleTo(0, 1);
			    	if(value>=512 && value<=1023){
						console.log("Resistencias de Inversores Aprobada | valor: "+value);
					}else{
						console.log("Error: Resistencias de Inversores No Aprobada.");
						obj = 0;
					}
			  	});
			  	sensorI22.read(function(error, value) {
			  		//var value = this.scaleTo(0, 1);
			    	if(value>=512 && value<=1023){
						console.log("Linea de seguridad aprobada | valor: "+value);
					}else{
						console.log("Error: Linea de seguridad No Aprobada. | valor: "+value);
						obj = 0;
					}
			  	});
			  	sensorI29.read(function(error, value) {
			  		//var value = this.scaleTo(0, 1);
			    	if(value>=512 && value<=1023){
						console.log("Resistencias de Inversores del eje X Cerradas | valor: "+value);
					}else{
						console.log("Error: Resistencias del eje X Abirta.");
						obj = 0;
					}
			  	});
			  	sensorI30.read(function(error, value) {
			  		//var value = this.scaleTo(0, 1);
			    	if(value>=512 && value<=1023){
						console.log("Freno de meza derecha cerrado Ok | valor: "+value);
					}else{
						console.log("Error: Freno de meza derecha Abierto.");
						obj = 0;
					}
			  	});
			  	sensorI31.read(function(error, value) {
			  		//var value = this.scaleTo(0, 1);
			    	if(value>=512 && value<=1023){
						console.log("Freno de meza izquierda cerrado Ok | valor: "+value);
					}else{
						console.log("Error: Freno de meza izquierda Abierto.");
						obj = 0;
					}
			  	});
			  	sensorI27.read(function(error, value) {
			  		//var value = this.scaleTo(0, 1);
			    	if(value==1){
						console.log("Dispositivos de emergencia Ok | valor: "+value);
					}else{
						console.log("Error: Dispositivos de emergencia algo pasa.");
						obj = 0;
					}
			  	});*/
			  	//sensorI18.read(function(error, value) {
			  		//var value = this.scaleTo(0, 1);
			  		//console.log("A1: "+value);
			    	/*if(value>=0 && value<=512){
						console.log("Sensor de presion de aire OK | valor: "+value);
					}else{
						console.log("Error: Sensor de presion de aire, no tiene aire.");
						obj = 0;
					}*/
			  	//});
			  	//sensorI23.read(function(error, value) {
			  		//var value = this.scaleTo(0, 1);
			  		//console.log("A2: "+value);
			    	/*if(value>=512 && value<=1023){
						console.log("Sensor de refrigerante del husillo de aire OK | valor: "+value);
					}else{
						console.log("Error: Sensor de refrigerante de husillo.");
						obj = 0;
					}*/
			  	//});
			}
			return obj;
		});
	}
	validplc2(this);
	/*var vv = validplc2(this);
	if(vv==1){
		//SENSORES ESCRITURA OUTPUT
		var sensorO19 = new five.Pin({
		    pin: 24,
		    board: this.byId("PLC2")
		});
		sensorO19.high();
	}*/

});