var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.');
var fs = require('fs');

function request(req, res) {

 
   if (req.url == '/2') {
    req.on("data", (data) => {
      res.end(menuGenerator(Finder(data), data, 'searchingResults'));
    })
    console.log('событие для поста');
  }
  else if (req.url == '/3') {
    req.on("data", (data) => {
      fs.readFile('data.json', 'UTF-8', function (error, content) {
        res.end(JSON.stringify(menuGenerator(Finder(data, JSON.parse(content)), data, 'searchingResults')));
      });
    });
  }
  
  
   else if (req.url == '/4') {
    req.on("data", (data) => {
      fs.readFile('data.json', 'UTF-8', function (error, content) {
         res.end(JSON.stringify(jsGenerator(Finder(data, JSON.parse(content)), data)));
      });
    });
   }
  else file.serve(req, res);

  
  console.log(`${req.method} ${req.url}`);
}
//----------------FUNCTIONS-------------------------
function Finder(value, data) {
  return data.exponats.filter(e => e.labels.some(l => l.match(value)));
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
  var elem=`<script defer=" " src=`+`"`+item.scripts+`"`+`></script>`
  result=result+elem;
});
return result;

}

// ------ этот код запускает веб-сервер -------

if (!module.parent) {
  http.createServer(request).listen(9000);
} else {
  exports.request = request;
}
