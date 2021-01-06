const canvas = document.getElementById("can");
// var ctx = canvas.getContext("2d");
let mainWidth = canvas.parentNode.offsetWidth;

// Assume ctx is canvas 2D Context and ready to render to

const setCanvasWidth = function () {
    canvas.setAttribute("width", mainWidth.toString());
};

setCanvasWidth();

const ctx = canvas.getContext("2d");
const height = ctx.canvas.height;

var center = {
    x: mainWidth / 2,
    y: height / 2
};


window.addEventListener('resize', function() {
    mainWidth = canvas.parentNode.offsetWidth;
    center.x = mainWidth / 2;
    setCanvasWidth();
});



var drawFibonacciSpiral = function(p1, p2){
    ctx.clearRect(0, 0, mainWidth, height);

    // Draw coord axis -> center viewport at 0,0
    drawStroke([{x:0, y:-center.y}, {x:0, y:center.y}], center, "gray");
    drawStroke([{x:-center.x, y:0}, {x:center.x, y:0}], center,"gray");

    // Draw spiral -> center viewport at 0,0
    drawStroke(getSpiral(p1, p2, getDistance({x:0,y:0},center), 4), center);
};

var getDistance = function(p1, p2){
    return Math.sqrt(Math.pow(p1.x-p2.x, 2) + Math.pow(p1.y-p2.y, 2));
};

var getAngle = function(p1, p2){
    return Math.atan2(p2.y-p1.y, p2.x-p1.x);
};

var drawStroke = function(points, offset, strokeColor){
    // Default value
    offset = offset || {x:0,y:0}; // Offset to center on screen
    strokeColor = strokeColor || "black";

    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    var p = points[0];
    ctx.moveTo(offset.x + p.x, offset.y + p.y);
    for(var i = 1; i < points.length; i++){
        p = points[i];
        ctx.lineTo(offset.x + p.x, offset.y + p.y);
    }
    ctx.stroke();  // draw it all
};



var FibonacciGenerator = function(){
    var thisFibonacci = this;

    // Start with 0 1 2... instead of the real sequence 0 1 1 2...
    thisFibonacci.array = [0, 1, 2];

    thisFibonacci.getDiscrete = function(n){

        // If the Fibonacci number is not in the array, calculate it
        while (n >= thisFibonacci.array.length){
            var length = thisFibonacci.array.length;
            var nextFibonacci = thisFibonacci.array[length - 1] + thisFibonacci.array[length - 2];
            thisFibonacci.array.push(nextFibonacci);
        }

        return thisFibonacci.array[n];
    };

    thisFibonacci.getNumber = function(n){
        var floor = Math.floor(n);
        var ceil = Math.ceil(n);

        if (Math.floor(n) == n){
            return thisFibonacci.getDiscrete(n);
        }

        var a = Math.pow(n - floor, 1.15);

        var fibFloor = thisFibonacci.getDiscrete(floor);
        var fibCeil = thisFibonacci.getDiscrete(ceil);

        return fibFloor + a * (fibCeil - fibFloor);
    };

    return thisFibonacci;
};

var getSpiral = function(pA, pB, maxRadius, steps){
    // 1 step = 1/4 turn or 90º

    var precision = 50; // Lines to draw in each 1/4 turn
    var stepB = steps; // Steps to get to point B

    var angleToPointB = getAngle(pA,pB); // Angle between pA and pB
    var distToPointB = getDistance(pA,pB); // Distance between pA and pB

    var fibonacci = new FibonacciGenerator();

    // Find scale so that the last point of the curve is at distance to pB
    var radiusB = fibonacci.getNumber(stepB);
    var scale = distToPointB / radiusB;

    // Find angle offset so that last point of the curve is at angle to pB
    var angleOffset = angleToPointB - stepB * Math.PI / 2;

    var path = [];

    var i, step , radius, angle, p;

    // Start at the center
    i = step = radius = angle = 0;

    // Continue drawing until reaching maximum radius
    while (radius * scale <= maxRadius){
        p = {
            x: scale * radius * Math.cos(angle + angleOffset) + pA.x,
            y: scale * radius * Math.sin(angle + angleOffset) + pA.y
        };

        path.push(p);

        i++; // Next point
        step = i / precision; // 1/4 turns at point    
        radius = fibonacci.getNumber(step); // Radius of Fibonacci spiral
        angle = step * Math.PI / 2; // Radians at point
    }

    return path;
};

var isStarted = false;

const startAnimation = function() {
    if (isStarted === false) {
        isStarted = true;
        ctx.clearRect(0, 0, mainWidth, height);

        // Draw coord axis -> center viewport at 0,0
        drawStroke([{x:0, y:-center.y}, {x:0, y:center.y}], center, "gray");
        drawStroke([{x:-center.x, y:0}, {x:center.x, y:0}], center,"gray");

        animateSpiral(getSpiral({x:0, y:0}, {x:-3, y:0}, getDistance({x:0,y:0},center), 4), center);
    }
}

var animateSpiral = function(points, offset, strokeColor){
    // Default value
    offset = offset || {x:0,y:0}; // Offset to center on screen
    strokeColor = strokeColor || "black";

    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    var p = points[0];
    ctx.moveTo(offset.x + p.x, offset.y + p.y);
    ctx.font = "10px Arial";
    ctx.fillStyle = 'red';
    var i = 1;
    setInterval(function() {
        p = points[i];
        ctx.lineTo(offset.x + p.x, offset.y + p.y);
        if ((Math.abs(p.x) > 30 && Math.abs(p.y) < 0.02) || (Math.abs(p.y) > 30 && Math.abs(p.x) < 0.02)) {

            ctx.fillText("x: " + p.x.toFixed(2) + "\n y: " + p.y.toFixed(2), offset.x + p.x, offset.y + p.y);
        }
        ctx.stroke();
        i += 1;
        if (i >= points.length) {
            isStarted = false;
            clearInterval();
        }
    }, 5);

};