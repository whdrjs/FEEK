import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=new URL('../dist/',import.meta.url);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
http.createServer(async(req,res)=>{
  try{
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const name=pathname==='/'?'index.html':pathname.slice(1);
    if(!['index.html','app.js','style.css'].includes(name)){res.writeHead(404);res.end('Not found');return;}
    const data=await readFile(new URL(name,root));
    res.writeHead(200,{'Content-Type':types[name.slice(name.lastIndexOf('.'))],'Cache-Control':'no-store'});res.end(data);
  }catch{res.writeHead(500);res.end('Unable to read file');}
}).listen(4173,'127.0.0.1',()=>console.log('FEEK: http://127.0.0.1:4173'));
