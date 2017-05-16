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

    this.RST = (s, a, dx, dy) => {
        return new branch(this.pt1.RST(s, a, dx, dy), this.pt2.RST(s, a, dx, dy));
    }

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

 RTreeMenu = d3.select("#RTreeMenu");
 RTreeCreateMenu = d3.select("#RTreeCreateMenu");

//*************���� RTree***************
RTreeMenu.select("#RTreeCreateMenuButton").on("click", () => {
    ChangeMenu(RTreeCreateMenu);
});
RTreeMenu.select("#RTreeTestButton").on("click", () => {
    var f = () => {
        DW.xRange(-10, 10).yRange(0, 10);
        DW.clear();
        drawBranch(22)(new branch(new pt(0, 0), new pt(0, 2.3)).grow(12, modelStatic1));
    }
    DW.recentActions = f;
    DW.recentActions();
});
//**********���� Create RTree***********
RTreeCreateMenu.select("#RTreeTrunkButton").on("click", () => {

});
RTreeCreateMenu.select("#RTreeModelButton").on("click", () => {

});
RTreeCreateMenu.select("#RTreeAcceptButton").on("click", () => {
    //��������
    ChangeMenu(RTreeMenu);
});

