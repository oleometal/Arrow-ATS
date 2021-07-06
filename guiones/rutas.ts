import { Router, send } from 'https://deno.land/x/oak/mod.ts'
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from './controladores/productos.ts'

const enrutador = new Router()

enrutador.get('/api/v1/products', getProducts)
    .get('/api/v1/products/:id', getProduct)
    .post('/api/v1/products', addProduct)
    .put('/api/v1/products/:id', updateProduct)
    .delete('/api/v1/products/:id', deleteProduct)
    .get('/',
    async (context) => {
        await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}`,
          index: "index.html",
        });
    }
)


export default enrutador
