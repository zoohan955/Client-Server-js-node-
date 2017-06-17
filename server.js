var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.');
var debug = require('debug')('server');
var fs = require('fs');
var now = new Date();



//для логирования прописать в консоли
//1. set DEBUG=server
//2. node server.js - стартует сервер
//если нет модуля: nmp install debug
//---------------------------------
function  User  (name,age ){
    this.name=name;
    this.dificulty=()=>{ 
        return (age<10)?1:((age<17)?2:3);
    }
};


//user1 = new User();
//-----------------------------------



function request(req, res) {
//------------------REQUESTS------------------------------
 //debug('Server Running');
   if (req.url == '/2') {
    req.on("data", (data) => {
      res.end(menuGenerator(Finder(data), data, 'searchingResults'));
    })
    console.log('событие для поста');
  }
  else if (req.url == '/search') {
    req.on("data", (data) => {
      fs.readFile('data.json', 'UTF-8', function (error, content) {
        res.end(JSON.stringify(menuGenerator(Finder(data, JSON.parse(content)), data, 'searchingResults')));
      });
    });
  }
   else if (req.url == '/4') {
    req.on("data", (data) => {
      fs.readFile('categories.json', 'UTF-8', function (error, content) {
        res.end(JSON.stringify(scriptGenerator(JSON.parse(content))));
      });
    });
   }
   else if(req.url=='/44'){
     req.on("data",(data)=>{
       fs.readFile('exponats.json','UTF-8',function(error,content){
         res.end(JSON.stringify(nameFinder(data, JSON.parse(content))));
        // debug(req);

       })
     })
   }
   //else if(req.url=='/newUser'){
    // user1 = new User();
   //}
  else file.serve(req, res);
  debug('URL:',req.url,'|METHOD:',req.method,'|TIME:',now, '|RESPONSE_STATUS_CODE:',res.statusCode);
}

//----------------FUNCTIONS-------------------------
function labelsFinder(value, data) {
    return data.filter(e => e.labels.some(l => l.match(value)));
 }
 
function nameFinder(value,data){
  return data.filter(x=>x.name.match(value));
}

function menuGenerator(array, title, idMenu) {
  var res = '';
  var menu = `<div class="menu display-none" id="` + idMenu + `">
            <div class="element">
            <div class="element-title">`+ title + `</div>
                    </div>`;

  array.forEach((item, i, array) => {
    var element = ` <div class="element" id="` + i + `">
                        <div class="element-image">
                            <img src="` + item.img + `"/>
                        </div>
                        <div class="element-title">`+ item.name + `</div>
                    </div>`;
    res = res + element + `</div>`;

  });
  return menu + res;
}

function jsGenerator(array){
  var result='';
 
array.forEach((item,array)=>{
  var elem=item.scripts
  result=result+elem;
});
return result;
}

function scriptGenerator(array){
  var result = '';

  array.forEach((item,i,array)=>{
    var element = `<script>
                  d3.select("#`+item.id+`").on("click",()=>{body function
                            });
                  </script>`

    
    result = result+element;
  });
return result;
}


// ------ этот код запускает веб-сервер -------

if (!module.parent) {
  http.createServer(request).listen(9000);
  debug('STARTS');
  
} else {
  exports.request = request;
}
