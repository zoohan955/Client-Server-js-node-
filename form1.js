/// <reference path="d3/d3.js" />

//------------MODULES
var script2 = document.createElement('script');
script2.type = 'text/javascript';
script2.src = 'module/library/RTree/RTree.js';

//var script = document.createElement('script');
//script.type = 'text/javascript';
//script.src = 'module/library/GLand/GLand.js';

//-----------------------BUTOONS
var RTreeButton = document.querySelector('#RTreeMenuButton', '.element');
var GLandMenuButton = document.querySelector('#GlandMenuButton', '#mainMenu');
var button1 = document.querySelector('.load');
//----------------------


var textstatus = d3.select("body").append("p").text("click");
var svg = d3.select("body").select("svg");

var resizer = d3.select(".window_resizing");

var tBG = svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", Number(svg.attr("width")))
    .attr("height", Number(svg.attr("height")))
    .attr("id", "transparentBG");
svg.append("g").attr("id", "drawingWindow");

//***********************Объекты меню********************************
var mainMenu = d3.select("#mainMenu");
//*******************Текущее&&Предыдущее меню************************
var currentMenu = mainMenu;
var currentInfoMenu = d3.select("#informationMenu");
var currentInfoStd = d3.select("#information");
var prevMenu = [currentMenu];


//**************************События**********************************
//***************Общие******************
var dragResize = d3.drag().on('start', function () { DW.clear(); })
    .on('drag', function () {

        x = d3.mouse(this.parentNode)[0];
        y = d3.mouse(this.parentNode)[1];

        x = Math.max(600, x);
        y = Math.max(400, y);
        svg.attr("width", x).attr("height", y);
        tBG.attr("width", svg.attr("width")).attr("height", svg.attr("height"));
    })
    .on('end', function () { DW.recentActions(); });
resizer.call(dragResize);

d3.select("#open_close_right_menu").on("click", () => {
    AddRemoveClass(d3.select("#right_menu-layers"), "display-none");
    replaceImg(d3.select("#open_close_right_menu"), "icons/menu.svg", "icons/close.svg");
});
d3.select("#open_close_info_menu").on("click", () => {
    AddRemoveClass(d3.select("#info_menu-layers"), "display-none");
    replaceImg(d3.select("#open_close_info_menu"), "icons/info.svg", "icons/close.svg");
});
d3.select("#right_menu-layers").select("#back").on("click", () => {
    BackMenu();
})
//***********infoMenu-layear*********************
d3.select("#info_menu-layers").select("#information").on("click", () => {
    AddRemoveClass(currentInfoMenu, "display-none");
    currentInfoMenu = d3.select("#informationMenu");
    AddRemoveClass(currentInfoMenu, "display-none");

    AddRemoveClass(currentInfoStd, "backlight");
    currentInfoStd = d3.select("#information");
    AddRemoveClass(currentInfoStd, "backlight");
})
d3.select("#info_menu-layers").select("#questions").on("click", () => {
    AddRemoveClass(currentInfoMenu, "display-none");
    currentInfoMenu = d3.select("#questionsMenu");
    AddRemoveClass(currentInfoMenu, "display-none");

    AddRemoveClass(currentInfoStd, "backlight");
    currentInfoStd = d3.select("#questions");
    AddRemoveClass(currentInfoStd, "backlight");
})
d3.select("#info_menu-layers").select("#interactive").on("click", () => {
    AddRemoveClass(currentInfoMenu, "display-none");
    currentInfoMenu = d3.select("#interactiveMenu");
    AddRemoveClass(currentInfoMenu, "display-none");

    AddRemoveClass(currentInfoStd, "backlight");
    currentInfoStd = d3.select("#interactive");
    AddRemoveClass(currentInfoStd, "backlight");
})
//***********rightMenu-layear***************
d3.select("#right_menu-layers").select("#search").on("click", () => {
    AddRemoveClass(d3.select("#right_menu-layers").select("#back"), "display-none");
    AddRemoveClass(d3.select("#right_menu-layers").select("#input-search"), "display-none");
    AddRemoveClass(d3.select("#right_menu-layers").select("#search"), "backlight");
})
//************Меню MainMenu****************
mainMenu.select("#RTreeMenuButton").on("click", () => {

    document.getElementsByTagName('head')[0].appendChild(script2);
    if (document.getElementById('RTreeMenu') == null) {
        $.get('module/menu/RTree/RTree.html', function (data) {
            $('#right_menu-layers').append(data);
        });
    }

    console.log("changing menu");
    ChangeMenu(RTreeMenu);
});


GLandMenuButton.addEventListener('click', function () {

    document.getElementsByTagName('head')[0].appendChild(script);
    if (document.getElementById('GLandMenu') == null) {
        $.get('module/menu/GLand/GLand.html', function (data) {
            $('#right_menu-layers').append(data);

            console.log("htm loaded");
        });

    }

    console.log("changing menu");
    ChangeMenu(GLandMenu)

});


/*
mainMenu.select("#GLandMenuButton").on("click", () => {
    ChangeMenu(GLandMenu);
});
*/
mainMenu.select("#TrashButton").on("click", () => {
    DW.clear();
});
//*************Меню RTree***************

//**********Меню Create RTree***********

//************Меню StartMenu************


//**************************Функции**********************************
ChangeMenu = (menu) => {
    currentMenu = replaceElement(currentMenu, menu);
    prevMenu.push(currentMenu);
};
BackMenu = () => {
    if (prevMenu.length > 1) {
        prevMenu.pop();
        currentMenu = replaceElement(currentMenu, prevMenu[prevMenu.length - 1]);
    }
};
AddRemoveClass = (element, mclass) => {
    if (element.classed(mclass) === false)
        element.classed(mclass, true);
    else element.classed(mclass, false);
};
RemoveMenu = (id_menu, id_js) => {
    id_menu.remove();
    id_js.remove();
};
replaceImg = (element_img, path_img1, path_img2) => {
    if (element_img.select("img").attr("src") == path_img1)
        element_img.select("img").attr("src", path_img2);
    else
        element_img.select("img").attr("src", path_img1)
}
replaceElement = (currentElement, newElement) => {
    currentElement.classed("display-none", true);
    newElement.classed("display-none", false);
    return newElement;
}

function Search(s) {
    var xhr=new XMLHttpRequest();
   
    xhr.open('POST','/4',true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState!=4) return;
        if(xhr.status!=200){
        console.log('Ошибка '+xhr.readyState+" " + xhr.status + ': ' + xhr.statusText);
        return;
    }
  
function addScript(src) {
  var elem = document.createElement("script");
  elem.src = JSON.parse(xhr.responseText);
  document.head.appendChild(elem);
}

addScript(xhr.responseText);



    console.log(JSON.parse(xhr.responseText));
}
xhr.send(s);
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

button1.addEventListener('click', (e) => {
    //e.preventDefault();
    $.getJSON('data.json', function (data) {
        // if (user1.dificulty()===1){
        console.log(data);
    });
    //  console.log(data);

});
//});


