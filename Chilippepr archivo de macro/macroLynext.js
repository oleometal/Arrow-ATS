
/*

G0 X0 Y0 Z0
G0 X10
(chilipeppr_pause cambio de herramienta)
M6 b10
G1 X20
(chilipeppr_pause cambio de herramienta)
M6 b12
G0 X0


*/

var index = 0;
var commands = [];
var M6 = "M6";
var M7 = "M7";

var myWatchChiliPepprPause = {
	serialPort: "COM9",
	init: function() {
		if (window["myWatchChiliPepprPause"]) {
			macro.status("This macro was run before. Cleaning up...");
			window["myWatchChiliPepprPause"].uninit();
		}
		macro.status("Subscribing to chilipeppr_pause pubsub event");
		
		// store macro in window object so we have it next time thru
		window["myWatchChiliPepprPause"] = this;
		
		this.setupSubscribe();
		
		
		myWatchChiliPepprPause.checkTools();
		
		chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Initting Example of Solder Paste Dispenser", "Shows how to use chilipeppr_pause Gcode command and 2nd CNC controller");
	},
	uninit: function() {
		macro.status("Uninitting chilipeppr_pause macro.");
		this.unsetupSubscribe();
	},
	setupSubscribe: function() {
		
		chilipeppr.subscribe("/com-chilipeppr-widget-gcode/onChiliPepprPauseOnExecute", this, this.onChiliPepprPauseOnExecute);
		chilipeppr.subscribe("/com-chilipeppr-widget-gcode/onChiliPepprPauseOnComplete", this, this.onChiliPepprPauseOnComplete);

		chilipeppr.subscribe("/com-chilipeppr-widget-serialport/ws/recv", this, this.onRecvData);
	},
	unsetupSubscribe: function() {
		chilipeppr.unsubscribe("/com-chilipeppr-widget-gcode/onChiliPepprPauseOnExecute", this.onChiliPepprPauseOnExecute);
		chilipeppr.unsubscribe("/com-chilipeppr-widget-gcode/onChiliPepprPauseOnComplete", this.onChiliPepprPauseOnComplete);

		chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/ws/recv", this.onRecvData);

	},
	onChiliPepprPauseOnExecute: function(data) {
		
		console.log("got onChiliPepprPauseOnExecute. data:", data);
		//chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Time to sync", "Pretend we are sending a command to our solder paste dispenser to do its thing and then we will unpause our main Gcode file.", 4000);
		
		this.dispense();
		
	},
	onChiliPepprPauseOnComplete: function(data) {
		
		console.log("got onChiliPepprPauseOnComplete. data:", data);
		//chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Time to sync", "Pretend we are sending a command to our solder paste dispenser to do its thing and then we will unpause our main Gcode file.", 14000);
		
		setTimeout(this.dispense.bind(this), 3000);
		
		// since we'll get this onComplete way ahead of moves,
		// wait WAYYY longer than onExecute
		//setTimeout(this.unpauseGcode, 5000);
	},
	unpauseGcode: function() {
		
		chilipeppr.publish("/com-chilipeppr-widget-gcode/pause", "");
	},
	ctr: 0,
	dispense: function() {

		this.ctr++;
		

		if(localStorage.getItem('last-imported')){
			commands = localStorage.getItem('last-imported').split('\n');
			var next_index = 0;
			for (var i = 0; i < commands.length; i++) {
				if(commands[i].includes(M6))
				{

					if(index == next_index)
					{
						myWatchChiliPepprPause.checkTools();
						setTimeout(function() {
							if(!localStorage.getItem('tool-error')){
								var cmd = commands[i].replace("N" + (i + 1), "").trim();
								cmd = cmd.replace(M6, "").trim();
								cmd = cmd.replace(M7, "").trim();
								macro.status(cmd);
								chilipeppr.publish("/com-chilipeppr-widget-serialport/ws/send", "send " + this.serialPort + " " + cmd + "\n");			
								index++;
								break;		
							}
						  
						}, 1000);
						
					}
					next_index++;
				} 
			}
		}
		
		


	},
	openPort: function() {
							
		chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Opening serial port", "We are ensuring the port " + this.serialPort + " is open so we can write to it.", 3000);

		var cmd = "open " + this.serialPort + " 115200 tinyg";
		cmd += "\n";
		chilipeppr.publish("/com-chilipeppr-widget-serialport/ws/send", cmd);

	},
	msg: "", // stores data received
	onRecvData: function(data) {
		
		if (data.match(/^{/)) {
			var json = $.parseJSON(data);

			if ('P' in json && json.P == this.serialPort) {
				
				console.log("got onRecvData for this port. json:", json);
				if(json.D) this.msg += json.D;	
				
				
				if (this.msg.match(/\n/)) {
					var response = $.parseJSON(this.msg);	
					
					if(parseInt(response.status) == 1)
					{
						setTimeout(this.unpauseGcode, 1000);

					}
					var substring = "Herramienta";

					if(response.msg.includes(substring))
					{
						var thenum = response.msg.replace( /^\D+/g, '');
						$('#current-tool').html(thenum);
					}
					$("#plc-console").append("<li class='list-group-item'>" + response.msg + "</li>");
					macro.status(this.msg);

					this.msg = ""; // clear buffer
				}
			}
		}
	},
	checkTools: function(data){
		var tools =  commands[1]; 
		
		$.get('http://localhost/check?tools=' + tools, function(data) {
		  /*optional stuff to do after success */
		  if(!data.status){
		  	chilipeppr.publish(
                "/com-chilipeppr-elem-flashmsg/flashmsg",
                "PLC STATUS",
                "ALGUNAS HERRAMIENTAS NO ESTAN LISTAS",
                2000
            );

            if(!localStorage.getItem('tool-error')){
            	localStorage.setItem('tool-error', true);

            } 
            else{
            	localStorage.removeItem('tool-error');	
            } 
		  }
		  else
		  {
		  	chilipeppr.publish(
                "/com-chilipeppr-elem-flashmsg/flashmsg",
                "PLC STATUS",
                "TODAS LAS HERRAMIENTAS ESTAN LISTAS",
                2000
            );
            else localStorage.removeItem('tool-error');
		  }
		  
		});
	}
}
myWatchChiliPepprPause.init();