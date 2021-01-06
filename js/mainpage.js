

canvas.addEventListener('mousemove', function(){
    var mouse = {};

    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
    if(mouse.x === undefined){ // if firefox
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }

    // Substract offset (so it's centered at 0,0)
    mouse.x -= center.x;
    mouse.y -= center.y;

    drawFibonacciSpiral({x:0, y:0}, mouse);
});
