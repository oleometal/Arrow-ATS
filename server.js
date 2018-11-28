const express = require('express');
const http = require('http');
const fs = require('fs');
const nombre_maquina = '127.0.0.1';
const puerto = 1337;

const app = express();

app.use(express.static(__dirname + '/jslib'));
app.use(express.static(__dirname + '/'));

app.get('/',function(req, res){
    res.render( 'index.html');
});
app.get('/jslib',function(req, res){
    res.render(  '');
});

app.listen(puerto, nombre_maquina);
console.log(`Servidor corriendo en http://${nombre_maquina}:${puerto}/`);