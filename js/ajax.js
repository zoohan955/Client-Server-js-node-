


var inSearch = document.querySelector('.SearchInput');
var NameType = document.querySelector("#startMenu-nameButton",".button");


var button = document.querySelector('.load');
var RTreeButton = document.querySelector('#RTreeMenuButton' , '.element');
var GLandMenuButton = document.querySelector('#GlandMenuButton','#mainMenu');

var  button1 = document.querySelector('.export');



//GLAND
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'module/library/GLand/GLand.js';    
//

//RTree
var script2 = document.createElement('script');
script2.type='text/javascript';
script2.src = 'module/library/RTree/RTree.js';  
//


//objets
function  User  (name,age ){
    this.name=name;
    this.dificulty=()=>{ 
        return (age<10)?1:((age<17)?2:3);
    }
};


user1 = new User();

//console.log(user1.name+" "+ user1.dificulty);

RTreeButton.addEventListener('click', function(){
//---------------------------------------------СОБЫТИЯ 
//document.getElementsByTagName('head')[0].appendChild(script);
/*
fetch('module/menu/RTree/RTree.html')
.then(function(data){
    hd.append(RtreeS);
  // $('#main_menu-layers').append(data);
  // $("head").append(RtreeS);
  
    
}, function(data){
    console.log('error');


//module/menu/RTree/RTree.html
//$.get('module/menu/RTree/RTree.html')

    });*/
    
    $.get('module/menu/RTree/RTree.html',function(data){
    document.getElementsByTagName('head')[0].appendChild(script2);
    $('#main_menu-layers').append(data);
});


});


GLandMenuButton.addEventListener('click',function(){

$.get('module/menu/GLand/GLand.html', function(data){
$('#main_menu-layers').append(data);
console.log("htm loaded");
}).done(()=>{
document.getElementsByTagName('head')[0].appendChild(script);
console.log("htm loaded js loading");
})
});



//GLandMenuButton.addEventListener('')

//----------------------------------------------/СОБЫТИЯ


button.addEventListener('click', (e)=>{
e.preventDefault();

fetch('data.json')
    .then ((response)=>{
        return response.json();
    })
    .then((response) =>{
        console.log(response);
    });


});

button1.addEventListener('click', (e)=>{
e.preventDefault();




$.getJSON('data.json', function(data){
    if (user1.dificulty()===1){
     console.log(data.categories.category1);
}
   // console.log(data.categories.category1);

});
});

/*

for (var i = 0; i < Object.keys(JSON).length - 1; i++) {
  if (JSON[i].match(eval('{' + ('/' + search_string + '/gi') + '}')) != null){
    console.log(JSON);
  }
}*/
