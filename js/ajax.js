var button = document.querySelector('.load');
////var menu = document.querySelector('.menu');
var RTreeButton = document.querySelector('#RTreeMenuButton' , '.element');
var GLandMenuButton = document.querySelector('#GlandMenuButton', '.element');


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
    document.getElementsByTagName('head')[0].appendChild(script);
$('#main_menu-layers').append(data);
});
});

//----------------------------------------------/СОБЫТИЯ
// <div class="element" id="RTreeMenuButton" data-title="Ïåðåõîä â ìåíþ RTree.">

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