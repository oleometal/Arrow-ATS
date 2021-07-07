import { Router } from './dependencias.js'
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from './controladores/productos.ts'
import {indice}from './app.js'
const enrutador = new Router()

enrutador.get('/api/v1/products', getProducts)
    .get('/api/v1/products/:id', getProduct)
    .post('/api/v1/products', addProduct)
    .put('/api/v1/products/:id', updateProduct)
    .delete('/api/v1/products/:id', deleteProduct)
    .get('/',indice)


export default enrutador
