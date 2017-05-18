/// <reference path="d3/d3.js">

var svg = d3.select("body").select("svg");  //создание svg-контейнера


var drawingWindow = svg.select("#drawingWindow");

DW = {
    window: drawingWindow,

    xmin: 0,
    xmax: Number(svg.attr("width")),
    ymin: 0,
    ymax: Number(svg.attr("height")),

    X: x => x,
    Y: y => y,

    xRange: function (x1, x2) {
        this.xmin = x1;
        this.xmax = x2;
        this.X = scale(this.xmin, this.xmax, 0, Number(svg.attr("width")));
        return this
    },

    yRange: function (y1, y2) {
        this.ymin = y1;
        this.ymax = y2;
        this.Y = scale(this.ymin, this.ymax, Number(svg.attr("height")), 0);
        return this
    },

    line: function (x1, y1, x2, y2, strokewidth) {
        return this.window.append("line")
            .attr("x1", this.X(x1))
            .attr("y1", this.Y(y1))
            .attr("x2", this.X(x2))
            .attr("y2", this.Y(y2))
            .style("stroke-width", strokewidth);
    },

    polyline: function (pts) {
        spoints = pts.map(pt => [this.X(pt[0]), this.Y(pt[1])])
            .reduce((el, res) => el.toString() + " " + res);
        return this.window.append("polyline")
            .attr("points", spoints);
    },

    scale: function (n) {
        var s = ("scale(" + n + ")");
        return this.window.attr("transform", s);
    },

    translate: function (dx, dy) {
        var s = ("translate(" + (dx) + "," + (dy) + ")");
        return this.window.attr("transform", s);
    },

    clear: function () {
        var elements = document.getElementById("drawingWindow");
        elements.innerHTML = "";
    },
    recentActions: () => console.log("Empty function")
}

DW.plot = function (f) {
    var pts = []
    for (i = this.xmin; i < this.xmax; i += (this.xmax - this.xmin) / 100)
        pts.push([i, f(i)])
    return this.polyline(pts).attr("class", "plotLine");
}

function scale(a, b, c, d) {
    return x => (x - a) / (b - a) * (d - c) + c;
}