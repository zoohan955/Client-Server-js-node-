var http = require('http');
var static = require('node-static');
var fs = require('fs');
var file = new static.Server('.');


var server = http.createServer().listen(9000);

server.addListener('request', function(req,res){
     file.serve(req,res);
    console.log(`${req.method} ${req.url}`);

/*
   if(req.url==='home'|| req.url==='/'){
       res.writeHead(200,{'Content-Type':'text/html'});
        fs.createReadStream(__dirname +  '/form1.html').pipe(res);
       file.serve(req,res);
       console.log(`${req.method} ${req.url}`);


    } else {
         res.writeHead(404,{'Content-Type':'text/html'});
        fs.createReadStream(__dirname +  '/error.html').pipe(res);
    } 

 */

  
});
    console.log("Server Started");


