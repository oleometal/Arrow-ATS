var express = require('express');
var path = require('path');
var Client = require('node-rest-client').Client;
var mime = require('mime');
var fs = require('fs');
var router = express.Router();
var client = new Client();
let file_path;
var json = [];
var chunkSize = 6;
const pockets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const T = "T";
const M6 = "M6";
const M7 = "M7";
const HOME = "M6 a\n";
const _TINYG = "_tinyg";


/* GET home page. */
router.get('/', function(req, res, next) {
 
  var data = getOffsetData();
  if(data){
    data.controls = getControls();
    return res.render('index', data);      
  }
  return res.send('No hay datos');
  
  
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
      console.log(tools);
      var result = checkIfToolsAreReady(tools);
      
      if(result.valid){
        var newGcode = generateNewGCode(result.items, array, tools);
        newGcode = newGcode.toString().replace(/,/g, '');
        newGcode = newGcode.toString().replace(/  +/g, ' ');
        newGcode = newGcode.toString().replace(/\r/g, '\n');
        console.log(newGcode);
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
  console.log(repeat);
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

router.get('/update-pocket', function(req, res, next){

  var pocket = req.query.pocket;
  var msg = req.query.msg;
  

  var result = {};
  if(pocket > 0){
    var json = JSON.parse(fs.readFileSync('offset.json').toString());
    
    var result = checkSpindleTool(json);
    var currentTool = getToolFromPocket(json, pocket);

    json = makeToolChange(json, result.tool, currentTool);
    
    json = JSON.stringify(json, null, "\t"); 

    fs.writeFile('offset.json', json, 'utf8');
    //emitir senal a traves del socket
    if(global.io) {
      global.io.emit('reload'); 
    }
    return res.send({status: true});
  }

  else if(msg){
    
    return res.send({status: true, msg: getLog(msg)});
  }
  return res.send({status: false});
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
          console.log({status: false});
        }
      }
    }
    console.log(array.toString());
    if(array.length > 0) return res.send({status: false, tools: array.toString()});
    else return res.send({status: true});
    
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

function getToolFromPocket(data, pocket){

  for (var i = 0; i < data.length; i++) {
    if(data[i].pocket == pocket){
      console.log("herramienta: " + data[i].id);
      return data[i];

    }
  }
  
  return {pocket: pocket, notool: true};

}

function makeToolChange(data, spindleTool, current){
  // si no hay herramienta en el pocket seleccionado y hay una herramienta en el husillo
  if(current.notool && spindleTool){
      console.log('no habia herramienta en el pocket');
      for (var i = 0; i < data.length; i++) {
        if(data[i].pocket == 0){
          data[i].pocket = current.pocket;
        }
      }
  }
  // si hay herramienta en el pocket seleccionado
  else{
    var currentPocket = current.pocket;
    console.log('si habia herramienta en el pocket');
    for (var i = 0; i < data.length; i++) {
      if(spindleTool){
        if(data[i].id == spindleTool.id){
          data[i].pocket = currentPocket;
        }
        if(data[i].id == current.id){
         data[i].pocket = 0; 
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
    for (i = 0; i < json.length; i += chunkSize) {
          data.push(json.slice(i, i + chunkSize));              
    }
    var spindleTool = getSpindleTool(json);

    return {data: data, spindleTool: spindleTool, pockets: pockets}
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
  
  var json = JSON.parse(fs.readFileSync('offset.json').toString());
  
  var errors = [];
  var items = [];
  for (i = 0; i < test.length; i++) {
    for (j = 0; j < json.length; j++) {

        if(parseInt(test[i]) == parseInt(json[j].id)){
          
          if(parseInt(json[j].status) != 1){
            errors = checkIfItemExists(errors, json[j]);
          }
          else
          {
            items = checkIfItemExists(items, json[j]);
          }
        }
    }     
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
    if(gcode[i].indexOf(M6) > -1){
      positions.push(i + found);
      found++;
      for(var j = 0; j < data.length; j++){
        if(parseInt(data[j].id) == parseInt(getToolFromCommand(gcode[i]))){
          var position = gcode[i].indexOf(M7);
          if(position > -1){
            var offset = (parseFloat(data[j].length) + parseFloat(data[j].offset));  
            var output = [gcode[i].slice(0, position + 2 ), offset, gcode[i].slice(position + 2)].join(' ');
            output = changeToolIdForPocket(output, data[j].pocket);
            gcode[i] = output;
          }
          
        }
      }
    }
  }

  for( var i = 0; i < positions.length; i++ ){
    gcode.splice(positions[i], 0, "(chilipeppr_pause cambio herramienta)\n");  
    
  }

  gcode.splice(0, 0, "(chilipeppr_pause chequeo de herramientas)\n");  

  var string = ';' + tools.join(';');
  gcode.splice(0, 0,  string + '\n');  
  
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
