'use strict'
const express = require(`express`)
const bodyParser = require('body-parser')
//import http from 'http';
const fs = require('fs');


//const nombre_maquina = '127.0.0.1';
//const puerto = 1337;

const app = express();
const port = process.env.PORT || 3131

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/jslib'));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json())                      //json 

/*app.get('/hola/:name',(req, res) => {
    res.send({message:`hola ${req.params.name}!`})
})*/
app.get('/api/product',(req, res)=>{
    console.log('hola oleo')
    res.send(200,{products:[]})

})
app.get('/api/product/:productID',(req, res)=>{

})
app.post('/api/product',(req, res)=>{
    console.log(req.body)
    res.status(200).send({message: 'el producto se ha recibido'})

})
app.put('/api/product/:productID',(req,res)=>{

})
app.delete('/api/product/productID',(req, res)=>{

})
app.get('/',function(req, res){
    res.render( 'index.html');
});
app.get('/jslib',function(req, res){
    res.render(  '');
});
/*app.post('/', function(request, response){
    console.log(request.body);          //tu json
    response.send(request.body);        // manda de vuelta una respuesta
});*/

app.listen(port,() => {
    console.log(`Servidor API REST corriendo en http://localhost:${port}`)
})
