//sudo deno run --allow-net --allow-env --allow-read ./servidor.ts
import {
  existsSync,
  listenAndServe,
  readAll,
  serve,
  serveFile,
} from "./guiones/dependencias.js";
//import enrutador from './guiones/rutas.js'

//const puerto = Deno.env.get("PORT") || 80

const servidor = serve({ port: 80 });

console.log(`Servidor corriendo en  http://localhost`);

const descifrador = new TextDecoder();

for await (const req of servidor) {
  const path = `${Deno.cwd()}${req.url}`;
  switch (true) {
    case !req.url.endsWith("/") && existsSync(path):
      const res = await serveFile(req, path);
      req.respond(res);
      break;
    case req.url === "/":
      req.respond({ body: "Home" });
      break;
    case req.url === "/api" && req.method === "POST":
      const buf = await readAll(req.body);
      const codigo = descifrador.decode(buf);
      //const formData = await req.formData();

      const contentType = req.headers.get("content-type");
      req.respond({ body: "respuesta desde server" });

      console.log(`"${req.method} ${req.url}"`, contentType, codigo); //json

      break;
    default:
      req.respond({ status: 404 });
  }
}

// for await (const req of servidor){
//   const path=`${Deno.cwd()}${req.url}`;
//   if (!req.url.endsWith("/") && existsSync(path)){
//     const res = await serveFile(req, path);
//     req.respond(res);
//   }else if (req.url ==='/' ){
//     req.respond({body:"Home"});
//   }else{
//     req.respond({status:404});
//   }
// }
