//var NameType = document.querySelector("#startMenu-nameButton",".button");
//inType = document.querySelector("#startMenu-nameInput");
//var YearType = document.querySelector("#startMenu-yearButton");
//ageType=document.querySelector("#startMenu-yearInput");


tmpName="";

startMenu = d3.select("#startMenu");

startMenu.select("#startMenu-yearRadio").on("click", () => {
    replaceElement(d3.select("#startMenu-name"), d3.select("#startMenu-year"));
});
startMenu.select("#startMenu-nameRadio").on("click", () => {
    replaceElement(d3.select("#startMenu-year"), d3.select("#startMenu-name"));
});
startMenu.select("#startMenu-nameButton").on("click", function check() {
    document.getElementById("startMenu-yearRadio").checked = true;
    replaceElement(d3.select("#startMenu-name"), d3.select("#startMenu-year"));
    tmpName=document.querySelector("#startMenu-nameInput").value;
    //console.log(user1.name+" "+ user1.dificulty);
});
startMenu.select("#startMenu-yearButton").on("click", () => {
    tmpAge=document.querySelector("#startMenu-yearInput").value;
    user1 = new User(tmpName,tmpAge);
$('#start_menu-layers').remove();
document.getElementById('startMenuJS').parentNode.removeChild(document.getElementById('startMenuJS'));

});

