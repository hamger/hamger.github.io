var canvasWidth = Math.min(800, $(window).width() - 20)
var canvasHeight = canvasWidth

var strokeColor = 'black'
var mouseDown = false
var isMouseDown = false
var lastLoc = { x: 0, y: 0 }
var lastTimetamp = 0
var lastLineWidth = -1
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

canvas.height = canvasHeight
canvas.width = canvasWidth

$('#controller').css('width', canvasWidth + 'px')

drawGrid()

$('#clear_btn').click(
    function(e) {
        context.clearRect(0, 0, canvasWidth, canvasHeight)
        drawGrid()
    })
$('.color_btn').click(
    function(e) {
        $('.color_btn_selected').removeClass('color_btn_selected ').addClass('color_btn')
        $(this).addClass('color_btn_selected')
        strokeColor = $(this).css('background-color')
    })

function beginStroke(point) {
    isMouseDown = true
    lastLoc = windowToCanvas(point.x, point.y)
    lastTimetamp = new Date().getTime();
}

function endStroke() {
    isMouseDown = false
}

function moveStroke(point) {
    var curLoc = windowToCanvas(point.x, point.y);
    var curTimestamp = new Date().getTime();
    var s = calcDistance(curLoc, lastLoc)
    var t = curTimestamp - lastTimetamp
    var lineWidth = calcLineWidth(t, s)
        //draw
    context.beginPath();
    context.moveTo(lastLoc.x, lastLoc.y);
    context.lineTo(curLoc.x, curLoc.y);

    context.strokeStyle = strokeColor;
    context.lineWidth = lineWidth;
    context.lineCap = "round"
    context.lineJoin = "round"
    context.stroke();

    lastLoc = curLoc;
    lastTimetamp = curTimestamp
    lastLineWidth = lineWidth
}

canvas.onmousedown = function(e) {
    mouseDown = true
    e.preventDefault();
    beginStroke({ x: e.clientX, y: e.clientY })

}
 window.onmouseup = function(e) {
            e.preventDefault();
            mouseDown = false
            endStroke()
        }
canvas.onmouseout = function(e) {
    e.preventDefault();
    endStroke()
}
canvas.onmouseover = function(e) {
    e.preventDefault();
    if (mouseDown) { beginStroke({ x: e.clientX, y: e.clientY }) }


}
canvas.onmousemove = function(e) {
    e.preventDefault();
    if (isMouseDown) {
        moveStroke({ x: e.clientX, y: e.clientY })
    }
}

canvas.addEventListener('touchstart', function(e) {
    e.preventDefault()
    touch = e.touches[0]
    beginStroke({ x:touch.pageX, y:touch.pageY })
})
canvas.addEventListener('touchmove', function(e) {
    e.preventDefault()
    if (isMouseDown) {
        touch = e.touches[0]
        moveStroke({ x: touch.pageX, y: touch.pageY })
    }
})
canvas.addEventListener('tuchend', function(e) {
    e.preventDefault()
    endStroke()
})

var maxLineWidth = 25;
var minLineWidth = 1;
var maxStrokeV = 10;
var minStrokeV = 0.1;

function calcLineWidth(t, s) {
    var v = s / t;
    var resultLineWidth;
    if (v <= minStrokeV) {
        resultLineWidth = minLineWidth;
    } else if (v >= maxStrokeV) {
        resultLineWidth = maxLineWidth;
    } else {
        resultLineWidth = maxLineWidth - (v - minStrokeV) / (maxStrokeV - minStrokeV) * (maxLineWidth - minLineWidth);
    }
    if (lastLineWidth == -1) {
        return resultLineWidth;
    }
    return resultLineWidth * 1 / 4 + lastLineWidth * 3 / 4;
}

function calcDistance(loc1, loc2) {
    return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) + (loc1.y - loc2.y) * (loc1.y - loc2.y))
}

function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: Math.round(x - bbox.left), y: Math.round(y - bbox.top) }
}

function drawGrid() {
    context.save()
    context.strokeStyle = "rgb(230,11,9)"

    context.beginPath()
    context.moveTo(3, 3)
    context.lineTo(canvasWidth - 3, 3)
    context.lineTo(canvasWidth - 3, canvasHeight - 3)
    context.lineTo(3, canvasHeight - 3)
    context.closePath() //闭合回路

    context.lineWidth = 6
    context.stroke()

    context.setLineDash([8, 8])

    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(canvasWidth, canvasHeight)
    context.moveTo(canvasWidth, 0)
    context.lineTo(0, canvasHeight)
    context.moveTo(0, canvasHeight / 2)
    context.lineTo(canvasWidth, canvasHeight / 2)
    context.moveTo(canvasWidth / 2, 0)
    context.lineTo(canvasWidth / 2, canvasHeight)

    context.lineWidth = 1
    context.stroke()
    context.restore()
}
