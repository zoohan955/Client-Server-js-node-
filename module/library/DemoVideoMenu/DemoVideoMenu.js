
demoVideoMenu = d3.select("#demoVideoMenu");

var currentElement_video = d3.select("#demoVideoMenu-1");

d3.select("#demoVideo_menu-layers").select("#close").on("click", () => {
    RemoveMenu($('#demoVideo_menu-layers'),$('#demoVideoMenuJS'));
});

demoVideoMenu.select("#demoVideoMenu-1Radio").on("click", () => {
    var newElement = d3.select("#demoVideoMenu-1");
    currentElement_video = replaceElement(currentElement_video, newElement);
});
demoVideoMenu.select("#demoVideoMenu-2Radio").on("click", () => {
    var newElement = d3.select("#demoVideoMenu-2");
    currentElement_video = replaceElement(currentElement_video, newElement);
});
demoVideoMenu.select("#demoVideoMenu-3Radio").on("click", () => {
    var newElement = d3.select("#demoVideoMenu-3");
    currentElement_video = replaceElement(currentElement_video, newElement);
});
demoVideoMenu.select("#demoVideoMenu-4Radio").on("click", () => {
    var newElement = d3.select("#demoVideoMenu-4");
    currentElement_video = replaceElement(currentElement_video, newElement);
});