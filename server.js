var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.');
var fs = require('fs');

//var server = http.createServer().listen(9000);

function request(req, res) {

  // если URL запроса /vote, то...
  if (req.url == '/vote') {
    // через 1.5 секунды ответить сообщением
    setTimeout(function() {
      res.end('Ваш голос принят: ' + new Date());
    }, 1500);
  } else {
    // иначе считаем это запросом к обычному файлу и выводим его
    file.serve(req, res); // (если он есть)
  }

  if(req.url=='/1.html'){
      //text1 = fs.readFileSync("1.html");
      text1 = fs.readFile('1.html','UTF-8',function(error, data){
        if(error){return console.log(error)}
        else {res.end(data);}
      });

  } else {
    // иначе считаем это запросом к обычному файлу и выводим его
    file.serve(req, res); // (если он есть)
  }


/*
 if(req.url=='/2.html'){
      //text1 = fs.readFileSync("1.html");
      text1 = fs.readFile('2.html','UTF-8',function(error, data){
        if(error){return console.log(error)}
        else {res.end(data);}
      });

  } else {
    // иначе считаем это запросом к обычному файлу и выводим его
    file.serve(req, res); // (если он есть)
  }
*/

if(req.url=='/2')
{
 req.on("data",(data)=>{
   res.end(menuGenerator(Finder(data),data,'searchingResults'));
 })
  console.log('событие для поста');
}
 console.log(`${req.method} ${req.url}`);
}

function Finder(value){
 return data.exponats.filter(e=>e.labels.some(l=>l.match(value)));
}

function menuGenerator(array,title, idMenu){
   var res='';
   var menu=`<div class="menu display-none" id="`+idMenu+`">"
            <div class="element">
            <div class="element-title">`+title+`</div>
                    </div>`;

  array.forEach((item,i,array)=>{
  var element = ` <div class="element" id="`+i+`">"
                        <div class="element-image">
                            <img src="` + item.img +  `"/>
                        </div>
                        <div class="element-title">`+item.name+`</div>
                    </div->`;
   res=res+element+`</div>`;
  
  });
return menu+res;
}

data = {
        "exponats":[
                                {       
                                        "dir":"Rtree",
                                        "img":"splash/RTreeMenu.png",
                                        "name":"Рекурсивное дерево",
                                        "html":"module/menu/RTree/RTree.html",
                                        "scripts":"module/library/RTree/RTree.js",
                                        "labels":["RTree", "Tree", "Дерево", "Рисовать"],
                                        "discription":"описание для 1 категории",
                                        "difficulty":1,
                                        "quiz":{}
                                },
                                {                                        
                                        "dir":"Rtree2",
                                        "img":"splash/RTreeMenu.png",
                                        "name":"Рекурсивное дерево",
                                        "html":"module/menu/RTree/RTree.html",
                                        "scripts":"module/library/RTree/RTree.js",
                                        "labels":["RTree", "Tree", "Дерево", "Рекурсия", "Фрактал"],
                                        "discription":"описание для 2 категории",
                                        "difficulty":2,
                                        "quiz":{}
                                },
                                {       
                                        "dir":"GLand",
                                        "img":"splash/Gland.png",
                                        "discription_full":"описание для второй категории",
                                        "name":"Генератор ландшафтов",
                                        "html":"module/menu/GLand/GLand.html",
                                        "scripts":"module/library/GLand/GLand.js",
                                        "labels":["Gland", "Generator", "Ландшафт", "Рекурсия"],
                                        "discription_simple":"описание для 1 категории",
                                        "difficulty":2,
                                        "quiz":{}
                                }
                ]
                        
}




// ------ этот код запускает веб-сервер -------

if (!module.parent) {
  http.createServer(request).listen(9000);
} else {
  exports.request = request;
}

/*
server.addListener('request', function(req,res){
     file.serve(req,res);

console.log(`${req.method} ${req.url}`);
});
*/

