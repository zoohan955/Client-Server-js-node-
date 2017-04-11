var http = require('http');
var static = require('node-static');

var file = new static.Server('.');


var server = http.createServer().listen(9000);

server.addListener('request', function(req,res){
    file.serve(req,res);
    console.log(`${req.method} ${req.url}`);
    
});