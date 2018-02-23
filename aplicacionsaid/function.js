var request = require('request');
var retu = require('./return.js');
var json = 0;

Array.prototype.clean = function( deleteValue ) {
  for ( var i = 0, j = this.length ; i < j; i++ ) {
    if ( this[ i ] == deleteValue ) {
      this.splice( i, 1 );
      i--;
    }
  }
  return this;
};

/***************************************************************************************

FUNCTIONS------

****************************************************************************************/

// Lectura y encendido digitales
function getpinD(options) {
    return new Promise(function(resolve, reject) {  
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //var info = JSON.parse(body);
                var str = body;
                var res = str.replace(/Pin|set|to/gi,"-");
                var spa = res.trim();
                var rep = spa.split("-");
                var clean = rep.clean("");
                var cleans = clean.clean(" ");
                var strs = "{ pin: '"+cleans[0]+"', values: '"+cleans[1]+"' }";
                json = JSON.stringify(eval("(" + strs + ")"));
                resolve(json);
            }else{
                reject(error);
            }

        });
    });

};

// Lectura y encendido analogos
function getpinA(options) {
    return new Promise(function(resolve, reject) {  
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //var info = JSON.parse(body);
                var str = body;
                var res = str.replace(/Pin|reads|analog/gi,"-");
                var spa = res.trim();
                var rep = spa.split("-");
                var clean = rep.clean("");
                var cleans = clean.clean(" ");
                var strs = "{ pin: '"+cleans[0]+"', values: '"+cleans[1]+"' }";
                json = JSON.stringify(eval("(" + strs + ")"));
                resolve(json);
            }else{
                reject(error);
            }

        });
    });

};

/***************************************************************************************

MODULE EXPORT------

****************************************************************************************/

// Cambio de modo de sensores
module.exports.modepin = function (ip,id,mode) {

    var url_mode = {
      url: "http://"+ip+"/arduino/mode/"+id+"/"+mode,
      headers: {
        'User-Agent': 'request'
      }
    };
    return new Promise(function(resolve, reject) {  
        request(url_mode, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //var info = JSON.parse(body);
                /*var str = body;
                var res = str.replace(/Pin|set|to/gi,"-");
                var spa = res.trim();
                var rep = spa.split("-");
                var clean = rep.clean("");
                var cleans = clean.clean(" ");
                var strs = "{ pin: '"+cleans[0]+"', values: '"+cleans[1]+"' }";
                json = JSON.stringify(eval("(" + strs + ")"));*/
                resolve(body);
            }else{
                reject(error);
            }

        });
    });

};

module.exports.geturlD = function (url){

  if(url){

    var url_plc2 = {
      url: url,
      headers: {
        'User-Agent': 'request'
      }
    };

    return getpinD(url_plc2);

  }

}

module.exports.geturlA = function (url){

  if(url){

    var url_plc2 = {
      url: url,
      headers: {
        'User-Agent': 'request'
      }
    };

    return getpinA(url_plc2);

  }

}
//module.exports = getpin;