//sudo deno run --allow-net --allow-env ./servidor.js
import { Application } from 'https://deno.land/x/oak/mod.ts'
import enrutador from './guiones/rutas.ts'
const puerto = Deno.env.get("PORT") || 80

const app = new Application()


app.use(enrutador.routes())
app.use(enrutador.allowedMethods())



console.log(`Servidor corriendo en  http://localhost:${puerto}`)

await app.listen({ port: +puerto })
