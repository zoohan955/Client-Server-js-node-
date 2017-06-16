var tmpName = "";
var startMenu = d3.select("#startMenu");
var currentElement_startMenu = d3.select("#startMenu-name");

startMenu.select("#startMenu-yearRadio").on("click", () => {
    var newElement = d3.select("#startMenu-year");
    currentElement_startMenu = replaceElement(currentElement_startMenu, newElement);
});
startMenu.select("#startMenu-nameRadio").on("click", () => {
    var newElement = d3.select("#startMenu-name");
    currentElement_startMenu = replaceElement(currentElement_startMenu, newElement);
});
startMenu.select("#startMenu-nameButton").on("click", function check() {
    document.getElementById("startMenu-yearRadio").checked = true;
    var newElement = d3.select("#startMenu-year");
    currentElement_startMenu = replaceElement(currentElement_startMenu, newElement);
    tmpName = document.querySelector("#startMenu-nameInput").value;

});
startMenu.select("#startMenu-yearButton").on("click", () => {
    tmpAge = document.querySelector("#startMenu-yearInput").value;
    user1 = new User(tmpName, tmpAge);
    checkAge(tmpAge);
    RemoveMenu($('#start_menu-layers'), $('#startMenuJS'));
    AddRemoveClass(d3.select("#demoVideo_menu-layers"), "display-none");
    currentVideo.play();
});

function checkAge(age){
    if (Number.isInteger(age))  return (age>0)?age:"error" 
    return "error";
}