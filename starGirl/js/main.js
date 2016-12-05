var can = document.getElementById('canvas')
var ctx = can.getContext('2d')
var w = can.width
var h = can.height
var padTop = 100
var padLeft = 100
var girlWidth = 600
var girlHeight = 300
var girlPic = new Image();
var starPic = new Image();
girlPic.src = "src/girl.jpg";
starPic.src = "src/star.png";
var switchy = false;
var deltaTime;
var lastTime;

function init() {

    document.addEventListener('mousemove', mousemove, false); //第三个参数 ：true - 事件句柄在捕获阶段执行 false- 默认。事件句柄在冒泡阶段执行

    for (var i = 0; i < num; i++) { //确定每个星星的位置和大小
        stars[i] = new starObj();
        stars[i].initialize(); 
    }
    
    lastTime = Date.now(); 
    gameLoop();
}

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( callback,element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

function gameLoop() {
    window.requestAnimFrame(gameLoop);
    var now = Date.now();
    deltaTime = now - lastTime; 
    lastTime = now;
    fillCanvas();
    drawGirl();
    drawStars();
    aliveUpdate();
}

function drawGirl() {
    ctx.drawImage(girlPic, padLeft, padTop, girlWidth, girlHeight);
}

function fillCanvas() {
    ctx.fillStyle = "#393550";
    ctx.fillRect(0, 0, w, h);
}

function mousemove(e) {
    var x = e.pageX;
    var y = e.pageY;
    if (x > padLeft && x < (padLeft + girlWidth) && y > padTop && y < (padTop + girlHeight)) {
        switchy = true;
    } else {
        switchy = false;
    }
}