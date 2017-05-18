///<reference path="DrawingWindow.js" />

function pt(x, y) {
    this.x = x;
    this.y = y;

    this.rotate = (angle) => {
        f = angle * Math.PI / 180;
        return new pt(this.x * Math.cos(f) - this.y * Math.sin(f), this.x * Math.sin(f) + this.y * Math.cos(f));
    }
    this.rotateAt = (o, angle) => {
        return this.translate(-o.x, -o.y).rotate(angle).translate(o.x, o.y);
    }

    this.scale = (s) => {
        return new pt(this.x * s, this.y * s);
    }
    this.translate = (dx, dy) => {
        return new pt(this.x + dx, this.y + dy);
    }
    this.toString = () => {
        return this.x + "," + this.y;
    }

    this.sub = (p) => new pt(this.x - p.x, this.y - p.y)

    this.RST = (s, a, dx, dy) => {
        var C = Math.cos(a / 180 * Math.PI);
        var S = Math.sin(a / 180 * Math.PI);
        return new pt(dx + s * (this.x * C - this.y * S), dy + s * (this.x * S + this.y * C));
    }

}

function branch(pt1, pt2) {
    this.pt1 = pt1;
    this.pt2 = pt2;
    this.branches = [];

    this.rotate = function (angle) {
        return new branch(this.pt1.rotate(angle), this.pt2.rotate(angle));
    }
    this.rotateAt = (x1, y1) => {

    }
    this.scale = function (s) {
        return new branch(this.pt1.scale(s), this.pt2.scale(s));
    }
    this.translate = function (dx, dy) {
        return new branch(this.pt1.translate(dx, dy), this.pt2.translate(dx, dy));
    }

    this.RST = (pars) => {
        return new branch(this.pt1.RST(pars[0], pars[1], pars[2], pars[3]), this.pt2.RST(pars[0], pars[1], pars[2], pars[3]));
    }

    this.makeRST = (b) => {
        s = b.length() / this.length();
        a = this.angle(b);
        d = b.pt1.sub(this.pt1);
        return [s, a, d.x, d.y];
    }

    this.dot = (b) => (this.pt2.x - this.pt1.x) * (b.pt2.x - b.pt1.x) + (this.pt2.y - this.pt1.y) * (b.pt2.y - b.pt1.y)

    this.length = () => Math.sqrt(this.dot(this))

    this.angle = (b) => 180 / Math.PI * Math.acos(this.dot(b) / (this.length() * b.length()))

    this.grow = function (generation, model) {
        if (generation <= 0) {
            return this;
        }
        this.branches = model(this).map(b => b.grow(generation - 1, model));
        return this;
    }
}


model1 = (t) => (br1) => {
    var t1 = t / 7;
    return [br1.translate(0, 10).rotate(120 + 10 * Math.sin(t1 - 1)).scale(0.5),
    br1.translate(0, 10).rotate(15 * Math.sin(t1)).scale(0.5),
    br1.translate(0, 10).rotate(-120 + 10 * Math.sin(t1 + 1)).scale(0.5)];
}

model2 = (t) => (br1) => {
    var t1 = t / 7;
    return [br1.RST(0.5, 30 + 1.2 * Math.sin(t1 + 1), 0, 3),
    br1.RST(1.2, -15 + 1.2 * Math.sin(t1 + 1), 0, 3)];
}
modelStatic1 = (br1) => {
    return [br1.RST(0.6, 30, 0, 2),
    br1.RST(0.9, -25, 0, 2)];
}
modelStatic2 = (br1) => {
    return [br1.RST(0.8, 30, 0, 0.45),
    br1.RST(0.8, -30, 0, 0.45)];
}
modelStatic3 = (br1) => {
    return [br1.RST(0.5, 120, 0, 1),
    br1.RST(0.5, 0, 0, 1),
    br1.RST(0.5, -120, 0, 1)];
}


drawBranch = (depth) => (br) => {
    var depth1 = depth / 1.15;
    if (depth < 0.1) return;
    DW.line(br.pt1.x, br.pt1.y, br.pt2.x, br.pt2.y, depth);
    br.branches.forEach(drawBranch(depth / 1.5));
}
function makeTree(stem, branches) {
    var x0 = stem.pt1.x
    var y0 = stem.pt1.y
    modelPars = branches.map(x => stem.makeRST(x))
    DW.clear();
    t = new branch(new pt(0, 0), stem.pt2.sub(stem.pt1)).grow(3, x => modelPars.map(x.RST));
    drawBranch(5)(t);
    DW.translate(x0, y0);
}

function flatMap(lst, f) {
    return lst.map(f).reduce((r, x) => r.concat(x))
}

//**************объекты меню************
RTreeMenu = d3.select("#RTreeMenu");
RTreeCreateMenu = d3.select("#RTreeCreateMenu");


//*************���� RTree***************
RTreeMenu.select("#RTreeCreateMenuButton").on("click", () => {
    ChangeMenu(RTreeCreateMenu);
});
RTreeMenu.select("#RTreeTestButton").on("click", () => {
    var f = () => {
        DW.clear();
        DW.xRange(0, 900).yRange(0, 400);
        //drawBranch(22)(new branch(new pt(0, 0), new pt(0, 2.3)).grow(12, modelStatic1));
        makeTree(new branch(new pt(5, 5), new pt(6, 7)), [new branch(new pt(6, 7), new pt(7, 7)), new branch(new pt(6, 7), new pt(6, 8))])
    }
    DW.recentActions = f;
    DW.recentActions();
});

//TEMP
var flagButton = false;
var flagButton2 = false;
var br_pt1;
var br_pt2;
var tmpTrunk = new branch();
var tmpBranch = new branch();
var tmpBranches = [];
var h = d3.select("svg").attr("height");
//**********���� Create RTree***********
RTreeCreateMenu.select("#RTreeTrunkButton").on("click", () => {
    AddRemoveClass(d3.select("#right_menu-layers"), "display-none");
    replaceImg(d3.select("#open_close_right_menu"), "icons/menu.svg", "icons/close.svg");
    flagButton = true;
});


var trunk = d3.drag().on('start', function () {
    if (flagButton === true) {
        var x = d3.mouse(this.parentNode)[0];
        var y = d3.mouse(this.parentNode)[1];
        console.log("pt1=" + x + ":" + y);
        br_pt1 = new pt(x, y);
    }
}).on('drag', function () {
    if (flagButton === true) {
        var x = d3.mouse(this.parentNode)[0];
        var y = d3.mouse(this.parentNode)[1];
        DW.line(br_pt1.x, br_pt1.y, x, y);
    }
}).on('end', function () {
    if (flagButton === true) {
        var x = d3.mouse(this.parentNode)[0];
        var y = d3.mouse(this.parentNode)[1];
        br_pt2 = new pt(x, y);
        DW.line(br_pt1.x, br_pt1.y, br_pt2.x, br_pt2.y);
        tmpBranch = new branch(br_pt1, br_pt2);
        tmpTrunk = tmpBranch;
        console.log("pt2=" + x + ":" + y);
        flagButton = false;

        d3.select("#transparentBG").call(model);
    }
});
d3.select("#transparentBG").call(trunk);

var model = d3.drag().on('start', function () {
    if (flagButton2 === true) {
        var x = d3.mouse(this.parentNode)[0];
        var y = d3.mouse(this.parentNode)[1];
        console.log("pt1=" + x + ":" + y);
        br_pt1 = new pt(x, y);
    }
}).on('drag', function () {
    if (flagButton2 === true) {
        var x = d3.mouse(this.parentNode)[0];
        var y = d3.mouse(this.parentNode)[1];
    }
}).on('end', function () {
    if (flagButton2 === true) {
        var x = d3.mouse(this.parentNode)[0];
        var y = d3.mouse(this.parentNode)[1];
        br_pt2 = new pt(x, y);
        DW.line(br_pt1.x, br_pt1.y, br_pt2.x, br_pt2.y);
        tmpBranch = new branch(br_pt1, br_pt2);
        tmpBranches.push(tmpBranch);
        console.log("pt2=" + x + ":" + y);
        flagButton2 = false;

        d3.select("#transparentBG").call(model);
    }
});


RTreeCreateMenu.select("#RTreeModelButton").on("click", () => {
    AddRemoveClass(d3.select("#right_menu-layers"), "display-none");
    replaceImg(d3.select("#open_close_right_menu"), "icons/menu.svg", "icons/close.svg");
    flagButton2 = true;
});
RTreeCreateMenu.select("#RTreeAcceptButton").on("click", () => {
    //��������
    DW.clear();
    // DW.xRange(0, 900).yRange(0, 400);
    makeTree(tmpBranch, tmpBranches);
    ChangeMenu(RTreeMenu);
});

