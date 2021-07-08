//sudo deno run --allow-net --allow-env ./servidor.ts
import { serve, serveFile,existsSync,listenAndServe} from './guiones/dependencias.js'
//import enrutador from './guiones/rutas.js'

//const puerto = Deno.env.get("PORT") || 80

const servidor = serve({port:80})

console.log(`Servidor corriendo en  http://localhost`)

for await (const req of servidor){
  const path=`${Deno.cwd()}${req.url}`;
  if (!req.url.endsWith("/") && existsSync(path)){
    const res = await serveFile(req, path);
    req.respond(res);
  }else if (req.url ==='/' ){
    req.respond({body:"Home"});
  }else{
    req.respond({status:404});
  }
}







// listenAndServe({ port: 8080 }, async (req) => {
//     if (req.method === 'GET' && req.url === '/') {
//         req.respond({
//             status: 200,
//             headers: new Headers({
//                 'content-type': 'text/html',
//             }),
//             body: await Deno.open('./index.html')
//         })
//     }
// })
//
// console.log("Deno is running on port 8080")
