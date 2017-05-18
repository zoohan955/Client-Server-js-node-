/// <reference path="d3/d3.js" />
/// <reference path="DrawingWindow.js"/>

function triangle(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
}

function square(a, b, c, d) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
}
function drawSquare(sq) {
    DW.polyline([sq.a, sq.b, sq.c, sq.d].map(projection));
}
function splitSquare() {

    ac = middle([t.a, t.c]);
    ab = middle([t.a, t.b]);
    ad = middle([t.a, t.d]);
    bc = middle([t.b, t.c]);
    bd = middle([t.b, t.d]);

    return ([new square(t.a, ac, ab, ad),
    new square(t.b, ab, ad, bc),
    new square(t.c, ac, bc, dc),
    new square(ab, bd, cd, ac)
    ])



}

var dict = {}
function amnesia(f) {
    return dict = {};
}

function memo(f) {


    return function (x) {
        const hash = x.sort().toString()
        if (dict[hash] == undefined) {
            const res = f(x)
            dict[hash] = res
            return res
        }
        return dict[hash]

    }
}

function draw(tr) {//��������� �����������, �����-CVG
    DW.polyline([tr.a, tr.b, tr.c, tr.a].map(projection));
}


function projection(pt) {
    var x = pt[0] + pt[1] / Math.sqrt(2);
    var y = pt[1] / Math.sqrt(2) + pt[2];
    return [x, y];
}
function rotate(a, [x, y, z]) {

}

var middle = memo(function (x) {
    var a = x[0];
    var b = x[1];
    var d = norm(a, b)
    var dz = 0.30 * (2 * Math.random() - 1);
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, d * dz + (a[2] + b[2]) / 2];
});

sqr = x => x * x;

function norm(a, b) {
    return Math.sqrt(sqr(a[0] - b[0]) + sqr(a[1] - b[1]) + sqr(a[2] - b[2]))
}

function split(t) {
    ac = middle([t.a, t.c]);
    bc = middle([t.b, t.c]);
    ab = middle([t.a, t.b]);

    return [new triangle(t.a, ab, ac),
    new triangle(t.b, ab, bc),
    new triangle(t.c, ac, bc),
    new triangle(ac, bc, ab)]
}

function split2(t) {
    ac = middle([t.a, t.c]);
    ab = middle([t.a, t.b]);
    bc = middle([t.b, t.c]);


    return [new triangle(t.a, ac, ab),
    new triangle(t.b, ab, bc),
    new triangle(t.c, ac, bc),
    new triangle(ac, bc, ab)]

}

function iter(n, f, x) {
    if (n == 0) return x
    return iter(n - 1, f, x.reduce((res, el) => res.concat(f(el)), []));
}
//t = new triangle([-1, 0, 0], [1, 0, 0], [-1, 1, 0]);
//iter(6,split2,[t]).forEach(draw)


GLandMenu = d3.select("#GLandMenu");

GLandMenu.select("#GLandGenerationButton").on("click", () => {
    var f = () => {
        DW.xRange(0, 2).yRange(-2, 2);
        DW.clear();
        amnesia(t);
        //var tmpValue=d3.select("#Steps").valueOf();
        var tmpValue = document.getElementById("Steps").value;
        var t = [new triangle([0, 1, 0], [1, 1, 1], [1, 0, 0]),
        new triangle([0, 0, -1], [1, 0, 0], [0, 1, 0])]
        iter(tmpValue, split, t).forEach(draw);
    }
    DW.recentActions = f;
    DW.recentActions();
});



