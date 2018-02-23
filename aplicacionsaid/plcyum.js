var request = require('request');
var conf = require("./function.js");
var details;

//Analog
/*pin5 = "http://192.168.0.89/arduino/analog/5";
var p5 = conf.geturlA(pin5);
p5.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    console.log(details.values)
}, function(err) {
    console.log(err);
})*/

//MODE
/*var pM37 = conf.modepin("192.168.0.89","37","input");
pM37.then(function(result) {
    //details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    console.log(result);
}, function(err) {
    console.log(err);
})*/

//PIN 11 DIGITAL OUTPUT POWER MAQUINA - HIGH ENCIENDE - LOW APAGA

//Digital

/***************************************************************************************

LINEA DE SEGURIDAD------

****************************************************************************************/

//HIGH
pinI21 = "http://192.168.0.89/arduino/digital/53";
var pI21 = conf.geturlD(pinI21);
pI21.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    //console.log(details.values);
    console.log("I21: "+details.values);
}, function(err) {
    console.log(err);
})

//HIGH
pinI22 = "http://192.168.0.89/arduino/digital/37";
var pI22 = conf.geturlD(pinI22);
pI22.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    console.log("I22: "+details.values);
}, function(err) {
    console.log(err);
})

//HIGH
pinI18 = "http://192.168.0.89/arduino/digital/48";
var pI18 = conf.geturlD(pinI18);
pI18.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    console.log("I18: "+details.values);
}, function(err) {
    console.log(err);
})

//HIGH
pinI28 = "http://192.168.0.89/arduino/analog/8";
var pI28 = conf.geturlA(pinI28);
pI28.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    console.log("I28: "+details.values);
}, function(err) {
    console.log(err);
})

//HIGH
pinI29 = "http://192.168.0.89/arduino/analog/2";
var pI29 = conf.geturlA(pinI29);
pI29.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    console.log("I29: "+details.values);
}, function(err) {
    console.log(err);
})
//HIGH
pinI30 = "http://192.168.0.89/arduino/analog/3";
var pI30 = conf.geturlA(pinI30);
pI30.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    console.log("I30: "+details.values);
}, function(err) {
    console.log(err);
})
//HIGH
pinI31 = "http://192.168.0.89/arduino/analog/4";
var pI31 = conf.geturlA(pinI31);
pI31.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    console.log("I31: "+details.values);
}, function(err) {
    console.log(err);
})


//HIGH
pinI27 = "http://192.168.0.89/arduino/digital/47";
var pI27 = conf.geturlD(pinI27);
pI27.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    console.log("I27: "+details.values);
}, function(err) {
    console.log(err);
})


/***************************************************************************************

END LINEA DE SEGURIDAD------

****************************************************************************************/


/***************************************************************************************

HERRAMIENTAS------

****************************************************************************************/



pinI73 = "http://192.168.0.89/arduino/digital/43";
var pI73 = conf.geturlD(pinI73);
pI73.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    //console.log(details.values);
}, function(err) {
    console.log(err);
})


pinI79 = "http://192.168.0.89/arduino/analog/9";
var pI79 = conf.geturlA(pinI79);
pI79.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    //console.log(details.values);
}, function(err) {
    console.log(err);
})


pinI24 = "http://192.168.0.89/arduino/analog/7";
var pI24 = conf.geturlA(pinI24);
pI24.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    //console.log(details.values);
}, function(err) {
    console.log(err);
})

pinI80 = "http://192.168.0.89/arduino/digital/40";
var pI80 = conf.geturlD(pinI80);
pI80.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    //console.log(details.values);
}, function(err) {
    console.log(err);
})


pinI81 = "http://192.168.0.89/arduino/digital/46";
var pI81 = conf.geturlD(pinI81);
pI81.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    //console.log(details.values);
}, function(err) {
    console.log(err);
})


pinI82 = "http://192.168.0.89/arduino/digital/52";
var pI82 = conf.geturlD(pinI82);
pI82.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    //console.log(details.values);
}, function(err) {
    console.log(err);
})

pinI83 = "http://192.168.0.89/arduino/analog/10";
var pI83 = conf.geturlA(pinI83);
pI83.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    //console.log(details.values);
}, function(err) {
    console.log(err);
})

pinI84 = "http://192.168.0.89/arduino/digital/45";
var pI84 = conf.geturlD(pinI84);
pI84.then(function(result) {
    details = JSON.parse(result);
    //console.log("Initialized user details");
    // Use user details from here
    //console.log(details.values);
}, function(err) {
    console.log(err);
})