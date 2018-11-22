//cambiar variable currentLine por localStorage.set('currentLine')
var currentLine = 0;
var current_tool = 0;
var current_pocket = 0;
var commands = [];
var tools = [];
const M6 = "M6";
const M7 = "M7";
const serialPort = "/dev/ttyACM0";

var myWatchChiliPepprPause = {

	init: function() { // INICIO DEL MACRO
		if (window["myWatchChiliPepprPause"]) {
			macro.status("This macro was run before. Cleaning up...");
			window["myWatchChiliPepprPause"].uninit();
		}
		macro.status("Subscribing to chilipeppr_pause pubsub event");
		// store macro in window object so we have it next time thru
		window["myWatchChiliPepprPause"] = this;

		this.setupSubscribe();

		chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Initting Example of beginTransaction", "Shows how to use chilipeppr_pause Gcode command and 2nd CNC controller");
	},
	uninit: function() {
		macro.status("Uninitting chilipeppr_pause macro.");
		this.unsetupSubscribe();
	},
	setupSubscribe: function() { // SUBSCRIBIRSE A LOS EVENTOS

		chilipeppr.subscribe("/com-chilipeppr-widget-gcode/onChiliPepprPauseOnExecute", this, this.onChiliPepprPauseOnExecute);
		//chilipeppr.subscribe("/com-chilipeppr-widget-gcode/onChiliPepprPauseOnComplete", this, this.onChiliPepprPauseOnComplete);

		chilipeppr.subscribe("/com-chilipeppr-widget-serialport/ws/recv", this, this.onRecvData);
	},
	unsetupSubscribe: function() { // REMOVER LA SUBSCRIPCION
		chilipeppr.unsubscribe("/com-chilipeppr-widget-gcode/onChiliPepprPauseOnExecute", this.onChiliPepprPauseOnExecute);
		//chilipeppr.unsubscribe("/com-chilipeppr-widget-gcode/onChiliPepprPauseOnComplete", this.onChiliPepprPauseOnComplete);

		chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/ws/recv", this.onRecvData);

	},
	onChiliPepprPauseOnExecute: function(data) {// EVENTO QUE SE EJECUTA EN LA PAUSA DEL CHILIPEPPR
		macro.status('onChiliPepprPauseOnExecute');
		chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "onChiliPepprPauseOnExecute", "Nice.", 2000);
		this.beginTransaction();
	},
	onChiliPepprPauseOnComplete: function(data) {
		macro.status('chillipeppr pause complete');
	},
	unpauseGcode: function() { // QUITAR LA PAUSA DEL MACRO
		macro.status('continuar');
		currentLine = parseInt(localStorage.getItem('currentLine'));
		macro.status(currentLine);
		chilipeppr.publish("/com-chilipeppr-widget-gcode/pause", "");
	},
	ctr: 0,
	beginTransaction: function() { // COMENZAR LA EJECUCION DEL MACRO

		this.ctr++;
		macro.status('beginTransaction');
		if(localStorage.getItem('last-imported')){
			macro.status('last-imported');
			if(parseInt(localStorage.getItem('currentLine')) == commands.length){
				macro.status('currentLine');
				myWatchChiliPepprPause.enableControls();
				myWatchChiliPepprPause.unpauseGcode();
			}
			else{
				macro.status('not currentLine');
				myWatchChiliPepprPause.disableControls();
				myWatchChiliPepprPause.checkTools(parseInt(localStorage.getItem('currentLine')));
			}
		}
	},
	openPort: function() {
		// chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Opening serial port", "We are ensuring the port " + serialPort + " is open so we can write to it.", 3000);

		// var cmd = "open " + serialPort + " 115200 tinyg";
		// cmd += "\n";
		// chilipeppr.publish("/com-chilipeppr-widget-serialport/ws/send", cmd);

	},
	sendCommandToPlc: function(cmd){ // ENVIAR COMANDO AL PLC
		macro.status('enviando a plc');
		macro.status(cmd);
		$.ajax({
			url: 'http://192.168.0.97?cmd=' + cmd,
			type: 'GET',
		})
		.done(function(res) {
			macro.status('recibido del plc');
			macro.status(res);
			if(myWatchChiliPepprPause.isJson(res)){
				var json = $.parseJSON(res);

				if(json.status == '1'){
					macro.status('arduino puede continuar');
					myWatchChiliPepprPause.sendCommandToArduino('1');

				}
				else{
					myWatchChiliPepprPause.updateOrGetLog(0, res.msg);
					macro.status('error de plc');
				}
			}
		})
		.fail(function() {
			chilipeppr.publish(
                "/com-chilipeppr-elem-flashmsg/flashmsg",
                "ERROR DEL PLC",
                "NO SE PUDO ESTABLECER LA CONEXION CON EL PLC",
                2000
            );
			myWatchChiliPepprPause.enableControls();
            $("#plc-console").append("<li class='list-group-item'>NO SE PUDO ESTABLECER LA CONEXION CON EL PLC</li>");
		});

	},
	sendCommandToArduino: function(cmd){ // ENVIAR COMANDO AL ARDUINO
		macro.status('enviando a arduino: ' + cmd);
		chilipeppr.publish("/com-chilipeppr-widget-serialport/ws/send", "send " + serialPort + " " + cmd + "\n");
	},
	sendNextToolToArduino: function(){	// ENVIANDO SIGUIENTE HERRAMIENTA AL ARDUINO
		// SEND NEXT TOOL
		currentLine = parseInt(localStorage.getItem('currentLine'));
		macro.status('currentLine: ' + currentLine);
		var nextToolChangeLine = 0;

		for (var i = (currentLine + 1); i < commands.length; i++) {
			if(commands[i].includes(M6))
			{
				macro.status('sending next line');
				var cmd = commands[i].replace("N" + (i + 1), "").trim();
				cmd = cmd.replace(M6, "").trim();
				cmd = cmd.replace(M7, "").trim();
				cmd = cmd.split(/[ ]+/).join(';');
				current_tool = cmd.split(/[;]+/)[0].replace("T", '');
				//new code
				macro.status('current_tool: ' + current_tool);
				current_pocket = myWatchChiliPepprPause.getToolPocket(tools, current_tool);
				//new code

				cmd = "h" + current_pocket;
				macro.status(cmd);
				myWatchChiliPepprPause.sendCommandToArduino(cmd);

				break;
			}
		}
	}
	,
	msg: "", // stores data received
	onRecvData: function(data) { // RECIBIENDO DATOS DEL SERIAL
		if (data.match(/^{/)) {
			console.log('recvData: ' + data);
			var json = $.parseJSON(data);
			if ('P' in json && json.P == serialPort) {
				if(json.D) this.msg += json.D;
				if (this.msg.match(/\n/)) {
					macro.status('recibido de arduino');
					macro.status(this.msg);
					if(myWatchChiliPepprPause.isJson(this.msg)){
						var response = $.parseJSON(this.msg);
						//no hubo problema al ejecutar el comando
						if(response.status == 1)
						{
							//la transaccion termino correctamente
							if(response.msg == 'e'){
								macro.status('transaccion completada');
								setTimeout(this.unpauseGcode, 1000);
								//myWatchChiliPepprPause.sendNextToolToArduino();
								this.updateOrGetLog(current_tool, response.msg);

								$('#current-tool').html(current_tool);
							}
						}
						else
						{
							myWatchChiliPepprPause.enableControls();
							macro.status('error de arduino');
							this.updateOrGetLog(0, response.msg);
						}
					}
					else
					{
						macro.status(this.msg);
						this.sendCommandToPlc(this.msg);
					}
					this.msg = ""; // clear buffer
				}
			}
		}
	},

	checkTools: function(id = 1){ // REVISAR SI LAS HERRAMIENTAS ESTAN LISTAS
		commands = localStorage.getItem('last-imported').split('\n');
		var tools =  commands[1];
		var url = 'http://192.168.0.98:8080/check?tools=' + tools;
		
		macro.status("checkTools: " + url);
		$.ajax({
			url: url,
			type: 'GET'
		})
		.done(function(data) {
			  if(!data.status){
			  	var tools = data.tools;
			  	var error = "HERRAMIENTAS NO LISTAS: " + tools;
			  	chilipeppr.publish(
	                "/com-chilipeppr-elem-flashmsg/flashmsg",
	                "PLC STATUS",
	                error,
	                2000
	            );
	            myWatchChiliPepprPause.enableControls();
			  	$("#plc-console").append("<li class='list-group-item'>" + error + "</li>");
			  }
			  else
			  {

			  	if(parseInt(localStorage.getItem('currentLine')) > 3){

			  		var nextLine = id + 1;
			  		macro.status("nextLine: " + nextLine);
					var cmd = commands[id].replace("N" + nextLine, "").trim();
					cmd = cmd.replace(M6, "").trim();
					cmd = cmd.replace(M7, "").trim();
					cmd = cmd.split(/[ ]+/).join(';');
					macro.status("inside ajax: " + cmd);

					current_tool = cmd.split(/[;]+/)[0].replace("T", '');
					macro.status('current tool:' + current_tool);
					//new code
					current_pocket = myWatchChiliPepprPause.getToolPocket(data.tools, current_tool);
					//new code
					macro.status('current pocket: ' + current_pocket);
					if(current_pocket > 0){
						cmd = "T" + current_pocket + ";" + cmd.split(/[;]+/)[1];
						macro.status(cmd);
						myWatchChiliPepprPause.sendCommandToArduino(cmd);
					}
					else{
						macro.status('unpauseGcode');
						myWatchChiliPepprPause.unpauseGcode();
						// comment this line
						//myWatchChiliPepprPause.sendCommandToArduino();
					}

			  	}
			  	else
			  	{
					macro.status('unpauseGcode');
			  		myWatchChiliPepprPause.unpauseGcode();
			  	}

			  }
		})
		.fail(function() {
			chilipeppr.publish(
                "/com-chilipeppr-elem-flashmsg/flashmsg",
                "ERROR DE APLICACION",
                "NO SE PUDO ESTABLECER LA CONEXION CON LA APLICACION ARROW",
                2000
            );
            myWatchChiliPepprPause.enableControls();
            $("#plc-console").append("<li class='list-group-item'>NO SE PUDO ESTABLECER LA CONEXION CON LA APLICACION ARROW</li>");
		});


	},
	updateOrGetLog: function(tool = 0, msg = null){ // ACTUALIZAR ESTADO DE LA TABLA DEL OFFSET
		$.ajax({
			url: 'http://192.168.0.98:8080/update-or-get-log',
			type: 'GET',
			data: {tool: tool, msg: msg},
		})
		.done(function(data) {
			if(data.status){
				if(data.msg){
					$("#plc-console").append("<li class='list-group-item'>" + data.msg + "</li>");
					macro.status(data.msg);
				}
				if(data.tools){
					macro.status('tools');
					tools = JSON.parse(data.tools);
					myWatchChiliPepprPause.sendNextToolToArduino();
				}
			}

		})
		.fail(function() {
			chilipeppr.publish(
                "/com-chilipeppr-elem-flashmsg/flashmsg",
                "ERROR DE APLICACION",
                "NO SE PUDO ESTABLECER LA CONEXION CON LA APLICACION ARROW",
                2000
            );
            myWatchChiliPepprPause.enableControls();
            $("#plc-console").append("<li class='list-group-item'>NO SE PUDO ESTABLECER LA CONEXION CON LA APLICACION ARROW</li>");

		});
	},
	getToolPocket: function(data, id){ // OBTENER EL POCKET EN EL QUE ESTA LA HERRAMIENTA
	macro.status('get toolpocket function');		
	for (var i = 0; i < data.length; i++) {
			if(parseInt(data[i].id) == parseInt(id)) return parseInt(data[i].pocket);
		}
	},
	disableControls: function(){ // DESHABILITAR LOS CONTROLES
		macro.status('disable controls');
		$('#husillo').attr('disabled', 'disabled');
		$('#brazo').attr('disabled', 'disabled');
		$('#carusel').attr('disabled', 'disabled');
		$('.select-pocket').attr('disabled', 'disabled');
	},
	enableControls: function(){ // HABILITAR LOS CONTROLES
		macro.status('enable controls');
		$('#husillo').removeAttr('disabled');
		$('#brazo').removeAttr('disabled');
		$('#carusel').removeAttr('disabled');
		$('.select-pocket').removeAttr('disabled');
	},
	isJson: function(str){
		try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	    return true;
	}


}
myWatchChiliPepprPause.init();
