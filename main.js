var five = require("johnny-five");
var board = new five.Board({
    port: "COM3"
});

board.on("ready", function() {
  this.pinMode(13,this.MODES.OUTPUT);
  this.loop(500,()=>{
      this.digitalWrite(13,this.pins[13].value ? 0 : 1);
  });
});