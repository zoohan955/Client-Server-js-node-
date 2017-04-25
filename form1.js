/// <reference path="d3/d3.js" />
var textstatus = d3.select("body").append("p").text("click");
var svg = d3.select("body").select("svg"),
    widthSvg = Number(svg.attr("width")),
    heightSvg = Number(svg.attr("height"));

var resizer = d3.select(".window_resizing");

var tBG = svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", widthSvg)
    .attr("height", heightSvg)
    .attr("id", "transparentBG");
svg.append("g").attr("id", "drawingWindow");

//***********************Объекты меню********************************
var mainMenu = d3.select("#mainMenu");
//*******************Текущее&&Предыдущее меню************************
var currentMenu = mainMenu;
var prevMenu = [currentMenu];


//**************************События**********************************
//***************Общие******************
var dragResize = d3.drag().on('drag', function () {

    x = d3.mouse(this.parentNode)[0];
    y = d3.mouse(this.parentNode)[1];

    x = Math.max(600, x);
    y = Math.max(400, y);

    svg.style("width", x + "px").style("height", y + "px");
    tBG.style("width", svg.style("width")).style("height", svg.style("height"));
    svg.select("#drawingWindow").style("width", svg.style("width")).style("height", svg.style("height"));
});
resizer.call(dragResize);
d3.select("#open_close_main_menu").on("click", () => {
    CloseMenu("#main_menu-layers", "#open_close_main_menu", "icons/menu.svg", "icons/close.svg");
});
d3.select("#open_close_info_menu").on("click", () => {
    CloseMenu("#info_menu-layers", "#open_close_info_menu", "icons/info.svg", "icons/close.svg");
});
d3.select("#main_menu-layers").select("#back").on("click", () => {
    BackMenu();
})
//***********mainMenu-layear***************
d3.select("#main_menu-layers").select("#search").on("click", () => {
    showHideElementStd(d3.select("#main_menu-layers").select("#back"));
    showHideElementStd(d3.select("#main_menu-layers").select("#input-search"));
})
//************Меню MainMenu****************
mainMenu.select("#RTreeMenuButton").on("click", () => {
    ChangeMenu(RTreeMenu);
});
mainMenu.select("#GLandMenuButton").on("click", () => {
    ChangeMenu(GLandMenu);
});
mainMenu.select("#TrashButton").on("click", () => {
    DW.clear();
});
//*************Меню RTree***************

//**********Меню Create RTree***********

//************Меню StartMenu************


//**************************Функции**********************************
ChangeMenu = (menu) => {
    replaceMenu(menu);
    prevMenu.push(currentMenu);
};
BackMenu = () => {
    if (prevMenu.length > 1) {
        prevMenu.pop();
        replaceMenu(prevMenu[prevMenu.length - 1]);
    }
};
CloseMenu = (id_menu, id_open_close_button, path_img1, path_img2) => {
    var menuLayers = d3.select(id_menu);
    if (menuLayers.style("display") == "flex") {
        menuLayers.style("display", "none");
        d3.select(id_open_close_button).select("img").attr("src", path_img1);
    }
    else {
        menuLayers.style("display", "flex");
        d3.select(id_open_close_button).select("img").attr("src", path_img2);
    }
};
RemoveMenu = (id_menu, id_js) => {
    id_menu.remove();
    id_js.remove();
};
replaceMenu = (newcurrent) => {
    currentMenu.style("display", "none");
    currentMenu = newcurrent;
    currentMenu.style("display", "block");
}
replaceElement = (currentElement, newElement) => {
    currentElement.style("display", "none");
    newElement.style("display", "block");
    return newElement;
}
showHideElementStd = (elementStd) => {
    if (elementStd.style("display") == "none")
        elementStd.style("display", "inline");
    else
        elementStd.style("display", "none");
}

//***********************Прочие функции******************************

/*
function steper() {
    var qn = 0;
    return () => {
        DW.clear();
        b = new branch(new pt(0, 0), new pt(0, 3)).grow(9, model4(qn++));
        drawBranch(10)(b);
    }
}
*/
