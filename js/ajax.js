var button = document.querySelector('.load');
var menu = document.querySelector('.menu');
var RTreeButton = document.querySelector('#RTreeMenuButton' , '.element');
var GLandMenuButton = document.querySelector('#GlandMenuButton', '.element');
RTreeButton.addEventListener('click', function(){
//---------------------------------------------СОБЫТИЯ 
/*
fetch('module/menu/RTree/RTree.html')
.then(function(data){
    $('#result').load('module/menu/RTree/RTree.html #div');
  //  console.log(data);
    
}, function(data){
    console.log('error');
})

});
*/
$.get('module/menu/RTree/RTree.html',function(data){
    $('#main_menu-layers').append(data);
});
//$( "head" ).append( "<script defer src='module/library/RTree/RTree.js'></script>");
/*

});*/
});
GLandMenuButton.addEventListener('click',function(){

$.get('module/menu/GLand/GLand.html', function(data){
$('#main_menu-layers').append(data);
});
});






/*

*/


//----------------------------------------------/СОБЫТИЯ
// <div class="element" id="RTreeMenuButton" data-title="Ïåðåõîä â ìåíþ RTree.">