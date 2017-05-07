
demoVideoMenu = d3.select("#demoVideoMenu");

var videoCollection = document.getElementById("video_collection")
var videos = videoCollection.getElementsByTagName("video");
var currentVideo = videos[0];

for (var i = 0; i < videos.length; i++) {
    videos[i].id = "video" + i;
    videos[i].setAttribute("hidden", true);
}
videos[0].removeAttribute("hidden");


var radioContainer = d3.select("#demoVideoMenu").append("p").attr("id", "radioContainer");
radioContainer.attr("style", "text-align:center;");
for (var i = 0; i < videos.length; i++) {
    var input = radioContainer.append("input")
        .attr("type", "radio")
        .attr("name", "demoVideo_menu")
        .attr("id", "radio" + i);
}
radioContainer = document.getElementById("radioContainer");
var radios = radioContainer.getElementsByTagName("input");
var currentRadio = radios[0];

//проблемы с выделением radio (BUG)
radioContainer.onclick = function (event) {
    var target = event.target;
    textstatus.text();
    while (target != this) {
        if (target.tagName == 'INPUT') {
            for (var i = 0; i < radios.length; i++) {
                if (target.id == radios[i].id) {
                    currentRadio.removeAttribute("checked");
                    currentVideo = SwitchVideo(currentVideo, videos[i]);
                    currentRadio = radios[i];
                    currentRadio.setAttribute("checked", true);
                }
            }
            return;
        }
        target = target.parentNode;
    }
}

videoCollection.onclick = function (event) {
    var target = event.target;
    while (target != this) {
        if (target.tagName == 'VIDEO') {
            playPause();
            return;
        }
        target = target.parentNode;
    }
}
videoCollection.onmouseover = function (event) {
    var target = event.target;
    while (target != this) {
        if (target.tagName == 'VIDEO') {
            button_prev_video.style("visibility", "visible");
            button_next_video.style("visibility", "visible");
            return;
        }
        target = target.parentNode;
    }
}
videoCollection.onmouseout = function (event) {
    var target = event.target;
    while (target != this) {
        if (target.tagName == 'VIDEO') {
            button_prev_video.style("visibility", "hidden");
            button_next_video.style("visibility", "hidden");
            return;
        }
        target = target.parentNode;
    }
}


var button_prev_video = d3.select("#demoVideoMenu").select("#prev_video");
var button_next_video = d3.select("#demoVideoMenu").select("#next_video");

d3.select("#demoVideo_menu-layers").select("#close").on("click", () => {
    RemoveMenu($('#demoVideo_menu-layers'), $('#demoVideoMenuJS'));
});

button_prev_video.on("click", () => {
    if (currentVideo != videos[0]) {
        for (var i = 0; i < videos.length; i++) {
            if (currentVideo == videos[i]) {
                currentVideo = SwitchVideo(currentVideo, videos[i - 1]);
                radios[i].removeAttribute("checked");
                radios[i - 1].setAttribute("checked", true);
                currentRadio = radios[i - 1];
                break;
            }
        }
    }
})
button_next_video.on("click", () => {
    if (currentVideo != videos[videos.length - 1]) {
        for (var i = 0; i < videos.length; i++) {
            if (currentVideo == videos[i]) {
                currentVideo = SwitchVideo(currentVideo, videos[i + 1]);
                radios[i].removeAttribute("checked");
                radios[i + 1].setAttribute("checked", true);
                currentRadio = radios[i + 1];
                break;
            }
        }
    }
})

button_prev_video.on("mouseover", () => {
    d3.select("#prev_video").style("visibility", "visible");
})
button_next_video.on("mouseover", () => {
    button_next_video.style("visibility", "visible");
})
button_prev_video.on("mouseout", () => {
    button_prev_video.style("visibility", "hidden");
})
button_next_video.on("mouseout", () => {
    button_next_video.style("visibility", "hidden");
})



//шлак внизу
demoVideoMenu.select("#demoVideoMenu-1Radio").on("click", () => {
    var newElement = d3.select("#demoVideoMenu-1");
    currentElement_video = replaceElement(currentElement_video, newElement);
    var newVideo = document.getElementById("video1");
    //currentVideo = video_Stop_Playing(currentVideo, newVideo);
});
demoVideoMenu.select("#demoVideoMenu-2Radio").on("click", () => {
    var newElement = d3.select("#demoVideoMenu-2");
    currentElement_video = replaceElement(currentElement_video, newElement);
    var newVideo = document.getElementById("video2");
    //currentVideo = video_Stop_Playing(currentVideo, newVideo);
});
demoVideoMenu.select("#demoVideoMenu-3Radio").on("click", () => {
    var newElement = d3.select("#demoVideoMenu-3");
    currentElement_video = replaceElement(currentElement_video, newElement);
    var newVideo = document.getElementById("video3");
    //currentVideo = video_Stop_Playing(currentVideo, newVideo);
});
demoVideoMenu.select("#demoVideoMenu-4Radio").on("click", () => {
    var newElement = d3.select("#demoVideoMenu-4");
    currentElement_video = replaceElement(currentElement_video, newElement);
    var newVideo = document.getElementById("video4");
    //currentVideo = video_Stop_Playing(currentVideo, newVideo);
});

//функции

function SwitchVideo(currentVideo, newVideo) {
    stop(currentVideo);
    currentVideo.hidden = true;
    newVideo.hidden = false;
    newVideo.play();
    return newVideo;
}

function stop(video) {
    video.pause();
    video.currentTime = 0;
}
function playPause() {
    if (currentVideo.paused)
        currentVideo.play();
    else
        currentVideo.pause();
};

