import { serve } from "https://deno.land/std/http/server.ts"
import { insertId,client } from "./database.ts"

const server = serve({port:8000});

try{
    console.log(client);
    //insertId
}catch(e){
    console.log(e)
}


console.log('http://localhost:8000');

for await(const req of server){
    const url = req.url;
    req.respond({ body:`Vai ver se esta chover, ${url}`});
}