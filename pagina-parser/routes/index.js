var express = require('express');
var path = require('path');
var mime = require('mime');
var fs = require('fs');
var router = express.Router();
let file_path;
var json = [];
const pockets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const T = "T";
const M3 = "M3";
const M5 = "M5";
const M6 = "M6";
const M7 = "M7";
const HOME = "M6 a\n";
const _TINYG = "_tinyg";


/* GET home page. */
router.get('/', function(req, res, next) {
 
  var data = getOffsetData();
  if(data)
  {
    data.controls = getControls();
    return res.render('index', data);      
  }
  return res.send('No hay datos');
  
  
});

router.get('/home/:id', function(req, res, next){
	var tool = req.params.id;
  if(tool > 0){
    var json = JSON.parse(fs.readFileSync('offset.json').toString());
    for (var i = 0; i < json.length; i++) {
      if(json[i].id == tool) {
        json.splice(i, 1);
        break;
      }
    }
    //return json;
    json = orderDescendingJson(json);
    json = JSON.stringify(json, null, "\t");
    return  res.send(json);
    fs.writeFile('offset.json', json, 'utf8');
  }
});
router.get('/delete/:id', function(req, res, next){
  var tool = req.params.id;
  if(tool > 0){
    var json = JSON.parse(fs.readFileSync('offset.json').toString());
    for (var i = 0; i < json.length; i++) {
      if(json[i].id == tool) {
        json.splice(i, 1);
        break;
      }
    }
    //return json;
    json = orderDescendingJson(json);
    json = JSON.stringify(json, null, "\t"); 
    fs.writeFile('offset.json', json, 'utf8');
  }
  return res.redirect("/");
});

router.post('/tool', function(req, res, next){
  var tool = req.body;
  if(tool.id){
    var json = JSON.parse(fs.readFileSync('offset.json').toString());

    for (var i = 0; i < json.length; i++) {
      if(json[i].id == tool.id) return res.redirect('/');
    }

    json.push(tool);
    
    json = orderDescendingJson(json);
    
    json = JSON.stringify(json, null, '\t');

    fs.writeFile('offset.json', json, 'utf8');

    return res.redirect('/');
  }
  return res.send(tool);
});


router.post('/save-tool', function(req, res, next){
  var tool = req.body;

    var json = JSON.parse(fs.readFileSync('offset.json').toString());
    //return res.send(json);
    var nextId = json[json.length - 1].id + 1;
    tool.id = nextId;
    json.push(tool);
    json = orderDescendingJson(json);
    json = JSON.stringify(json, null, '\t');

    fs.writeFile('offset.json', json, 'utf8');

    return res.redirect('/');
});

router.post('/upload', function(req, res, next){
  
   if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  let file = req.files.file;

  file_path = 'uploads/' + getCurrentDate() + '/';
  if (!fs.existsSync(file_path)){
      fs.mkdirSync(file_path);
  }
  var position = req.files.file.name.lastIndexOf('.');
  var newFileName = [req.files.file.name.slice(0, position), _TINYG, req.files.file.name.slice(position)].join('')
  file_path += newFileName;
  
  file.mv(file_path, function(err) {
    if (err)
      return res.status(500).send(err);

    var array = fs.readFileSync(file_path).toString().split('\n');
    
    if(checkToolChangesCommands(array)){
      var tools = getTools(array);
      
      var result = checkIfToolsAreReady(tools);
      
      if(result.valid){
        var newGcode = generateNewGCode(result.items, array, tools);
        newGcode = newGcode.toString().replace(/,/g, '');
        newGcode = newGcode.toString().replace(/  +/g, ' ');
        newGcode = newGcode.toString().replace(/\r/g, '\n');
        
        fs.writeFile(file_path, newGcode, function(err) {
          if(err)console.log('error al generar el archivo');
          else res.send(file_path);

        });

        
      }
      else{
        res.status(400).send({errors: result.errors});
      }
    }
    else
    {
      return res.send(file_path);
    }
    
  });

});


router.get('/download', function(req, res){
    var file = req.query.file;
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
  
  
});

router.post('/update', function(req, res, next){
  
  var data = req.body.data;

  var repeat = false;
  for (var i = 0; i < data.length; i++) {
    for (var j = i + 1; j < data.length; j++) {
      if(data[i].pocket == data[j].pocket){
        repeat = true;
      }
    }
  }
  
  if(repeat) res.send({error: true});
  else{
    json = JSON.stringify(data, null, "\t"); 

    fs.writeFile('offset.json', json, 'utf8', function(){
      console.log('guardando');
    });
    setTimeout(function(){
      var data = getOffsetData();
      if(data)
        return res.render('offset', data);
      return res.send({errpr: true});  
    }, 1000);
    
  }

});

router.get('/update-or-get-log', function(req, res, next){

  var tool = req.query.tool;
  var msg = req.query.msg;
  

  var result = {};
  if(tool > 0){
    var json = JSON.parse(fs.readFileSync('offset.json').toString());
    
    var result = checkSpindleTool(json);
    var currentTool = getToolFromId(json, tool);

    json = makeToolChange(json, result.tool, currentTool);
    
    json = JSON.stringify(json, null, "\t"); 

    fs.writeFile('offset.json', json, 'utf8');
    //emitir senal a traves del socket
    if(global.io) {
      global.io.emit('reload'); 
    }
    return res.send({status: true, tools: json});
  }

  else if(msg){
    
    return res.send({status: true, msg: getLog(msg)});
  }
  return res.send({status: false});
});

router.post('/update-control', function(req, res, next){
  var data = req.body;
  console.log(data);
  if(data){
    var json = JSON.parse(fs.readFileSync('controls.json').toString());

    for (var i = 0; i < json.length; i++) {
      if(json[i].id == data.id){
        json[i].value = parseInt(data.value);
      }
    }
    json = JSON.stringify(json, null, "\t"); 
    fs.writeFile('controls.json', json, 'utf8');
    return {saved: true}
  }
  return {saved: false}
});

router.get('/check', function(req, res, next){
  var tools = req.query.tools;
  console.log(tools);
  if(tools){  
    var array = [];
    tools = tools.split(';');
    var json = JSON.parse(fs.readFileSync('offset.json').toString());
    for(var i = 0; i < tools.length; i++){
      for(var j = 0; j < json.length; j++){
        if(tools[i] == json[j].id && parseInt(json[j].status) != 1){
          array.push(json[j].id);
          
        }
      }
    }
    
    if(array.length > 0) return res.send({status: false, tools: array.toString()});
    else return res.send({status: true, tools: json});
    
  }
  return res.send({status: false});
});

function checkSpindleTool(data){
  for (var i = 0; i < data.length; i++) {
    if (data[i].pocket == 0){
      console.log("husillo: " + data[i].id);
      return {status: true, tool: data[i]};
    }
  }
  return {status: false};
}

function getToolFromId(data, id){

  for (var i = 0; i < data.length; i++) {
    if(data[i].id == id){
      console.log("herramienta: " + data[i].id);
      return data[i];

    }
  }
  
  return {id: id, notool: true};

}

function makeToolChange(data, spindleTool, current){
  // si no hay herramienta en el pocket seleccionado y hay una herramienta en el husillo
  if(spindleTool && (current.id == spindleTool.id)){ //falta validacion
      
      console.log('LA HERRAMIENTA YA SE ENCUENTRA EN EL HUSILLO');
  }
  // si hay herramienta en el pocket seleccionado
  else{
    var currentPocket = current.pocket;
    var currentTool = current.id;
    console.log('si habia herramienta en el pocket');
    for (var i = 0; i < data.length; i++) {
      if(spindleTool){
        if(data[i].id == spindleTool.id){
          data[i].pocket = currentPocket;
          console.log('La herramienta ' + data[i].id + ' esta en el home');
        }
        if(data[i].id == current.id){
         data[i].pocket = 0; 
         console.log('La herramienta ' + data[i].id + ' esta en el husillo');
        }  
      }
      else{
        if(data[i].id == current.id){
          console.log('No habia herramienta en el husillo');
     
         data[i].pocket = 0; 
        } 
      }
      
    }
  }
  
  return data;
}

function getOffsetData(){
  var json = JSON.parse(fs.readFileSync('offset.json').toString());
  console.log('leyendo');
  if(json){
    
    var data = [];
    var chunkSize = Math.ceil(json.length/3);
    for (i = 0; i < json.length; i += chunkSize) {
          data.push(json.slice(i, (i + chunkSize)));              
    }

    var spindleTool = getSpindleTool(json);
    var availablePockets = getAvailablePockets(json);
    var availableTools = getAvailableTools(json);
    return {data: data, spindleTool: spindleTool, pockets: pockets, availablePockets: availablePockets, availableTools: availableTools}
  }
  else{
    return null;
  }
}

function getControls(){
 var json = JSON.parse(fs.readFileSync('controls.json').toString());
 
 if(json){
   
   return json;
 }
 else{
   return null;
 } 
}

function getLog(code){
  var json = JSON.parse(fs.readFileSync('log.json').toString());

  for(var i = 0; i < json.length; i++){
    
    if(json[i].id == code){
      return json[i].msg;
    }

  }
}

function checkIfItemExists(array, item)
{
  var exists = false;
  for (var i = 0; i < array.length; i++) {
    if(array[i].id == item.id) exists = true;
  }

  if(!exists) array.push(item);
  return array;
}

function checkIfToolsAreReady(test){
  console.log(test);
  var json = JSON.parse(fs.readFileSync('offset.json').toString());
  
  var errors = [];
  var items = [];
  for (i = 0; i < test.length; i++) {
    var found = false;
    for (j = 0; j < json.length; j++) {

        if(parseInt(test[i]) == parseInt(json[j].id)){
          found = true;
          if(parseInt(json[j].status) != 1){
            errors = checkIfItemExists(errors, json[j]);
          }
          else
          {
            items = checkIfItemExists(items, json[j]);
          }
          break;
        }
    }
    if(!found)  errors.push({description: "La Herramienta T" + test[i] + " no existe"});
  }

  if(errors.length > 0) {
    return {valid: false, errors: errors};
  }
  else {
    return {valid: true, items: items};
  }
}

function checkToolChangesCommands(array){
  var found = false;
  for(var i = 0; i < array.length; i++){
    if(array[i].indexOf(M6) > -1){
      found = true;
    }
  }
  return found;
}

function generateNewGCode(data, gcode, tools){
  var positions = [];
  var found = 0;
  for(var i = 0; i < gcode.length; i++){
    gcode[i] += '\n';
    if(gcode[i].indexOf(M6) > -1){
      positions.push(i + found);
      found++;
      for(var j = 0; j < data.length; j++){
        if(parseInt(data[j].id) == parseInt(getToolFromCommand(gcode[i]))){
          var position = gcode[i].indexOf(M7);
          if(position > -1){
            var offset = (parseFloat(data[j].length) + parseFloat(data[j].offset));  
            var output = [gcode[i].slice(0, position + 2 ), offset, gcode[i].slice(position + 2)].join(' ');
            gcode[i] = output;
          }
          
        }
      }
    }
    if(gcode[i].indexOf(M3) > -1 || gcode[i].indexOf(M5) > -1){
      positions.push(i + found);
      found++;

    }
  }

  for( var i = 0; i < positions.length; i++ ){
    gcode.splice(positions[i], 0, "(chilipeppr_pause cambio herramienta)\n");  
    
  }

  gcode.splice(0, 0, "(chilipeppr_pause chequeo de herramientas)\n");  
  // agregar las herramientas que se utilizaran
  var string = ';' + tools.join(';');
  gcode.splice(0, 0,  string + '\n');  
  gcode.push("(chilipeppr_pause habilitar controles)\n");
  return gcode;
}

function changeToolIdForPocket(instruction, pocket){
  var result; 
  var index = instruction.indexOf(T);
  result = instruction.substr(0, index + 1) + pocket + " " + instruction.substr(index + 3);
 
  return result;
}

function getTools(data){
  var tools = [];
  for(var i = 0; i < data.length; i++){
    var found = false;
    if(data[i].indexOf(M6) > -1){
      var index = data[i].indexOf("T");
      if(index > -1){
        var item = parseInt(data[i].substr(index + 1, index + 2));
        for(var j = 0; j < tools.length; j++){
          if(tools[j] == item) found = true;
        }
        if(!found) tools.push(item);
      }
      else
      {
        console.log('tool not found');
      }
      
    }
  }
  
  return tools;
}
function getToolFromCommand(command){
  if(command.indexOf(M6) > -1){
      var toolNumber = 0;
      var index = command.indexOf("T");
      if(index > -1){
        toolNumber = parseInt(command.substr(index + 1, index + 2));
      }
      else
      {
        console.log('tool not found');
      }
   return toolNumber;   
  } 
}

function getSpindleTool(data){
  for (var i = 0; i < data.length; i++) {
    if(data[i].pocket == 0){

      return data[i];
    }
  }
  return null;
}

function getAvailablePockets(data){
  var pockets = [];
  for (var i = 0; i < 18; i++) {
    var found = false;
    for (var j = 0; j < data.length; j++) {
      if((i + 1) == parseInt(data[j].pocket)){
        found = true;
        break;
      }
    }
    if(!found) pockets.push((i + 1));
  }

  return pockets;
}

function getAvailableTools(data) {
  var tools = [];
  for (var i = 0; i < 18; i++) {
    var found = false;
    for (var j = 0; j < data.length; j++) {
      if((i + 1) == parseInt(data[j].id)){
        found = true;
        break;
      }
    }
    if(!found) tools.push((i + 1));
  }

  return tools;
}

function orderDescendingJson(data){
  for (var i = 0; i < data.length; i++) {
    for (var j = (i + 1); j < data.length; j++) {
      console.log("i: " + data[i].id);
      console.log("j: " + data[j].id);
      if(parseInt(data[i].id) > parseInt(data[j].id)){
        var temp = data[j];
        data[j] = data[i];
        data[i] = temp;
      }
    }
  }
  
  return data;
}

function getCurrentDate()
{
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  var newdate = day + "-" + month + "-" + year;
  return newdate;
}
module.exports = router;

