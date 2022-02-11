// 计算原理 https://www.jb51.net/html5/595444.html
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var p = 0; //贝塞尔函数涉及的占比比例，0<=p<=1
var points = []; //点击的控制点对象数组
var dots = []; // 储存每一帧的点
var dragPointIndex = -1; //当前的拖拽点的索引
var drawing = false; // 是否正在绘制中
var dragging = false; // 是否正在拖拽中
var w = document.documentElement.clientWidth || document.body.clientWidth;
var h = document.documentElement.clientHeight || document.body.clientHeight;
canvas.width = w - 150;
canvas.height = h - 64;
$(canvas)
  .mousedown(function(e) {
    dragging = true
    var pos = getLocation(canvas, e);
    if (!points.some(function (item, index) {
      if (Math.abs(pos.x - item.x) <= 4 && Math.abs(pos.y - item.y) <= 4) {
        dragPointIndex = index;
        return true
      }
    })) {
      dragPointIndex = -1;
      // 当曲线已经绘制完成，阻止新控制点的增加
      if (!dots.length) changePoint(pos);
    }
  })
  .mousemove(function(e) {
    if (dragPointIndex === -1 || drawing || !dragging) return;
    var pos = getLocation(canvas, e);
    changePoint(dragPointIndex, pos);
    dots = [];
    for (var i = 0; i < 1; i += 0.01) {
      dots.push(bezierRule(i))
    }
    clear();
    drawPoint();
    drawLine();
  })
  .mouseup(function(e) {
    dragging = false
    if (dragPointIndex === -1 && !dots.length) drawPoint();
    else dragPointIndex === -1
  });
$("#print").click(function() {
  if (points.length < 2 || drawing) return;
  drawing = true;
  drawBezier();
});
$("#cancel").click(function() {
  var num = points.length;
  if (!num || drawing || drawing) return;
  points.pop();
  num--;
  $("#view")
    .children()
    .eq(num)
    .remove();
  clear();
  drawPoint();
});
$("#clear").click(function() {
  if (drawing) return;
  drawing = false;
  clear();
  points = [];
  dots = [];
  p = 0;
  $("#points").text("");
  $("#view").empty();
});
$("#output").click(function() {
  if (drawing) return;
  $("#points").text(JSON.stringify(points));
});
function drawBezier() {
  if (p > 1) {
    drawing = false;
    return;
  }
  drawing = true;
  clear();
  drawPoint();
  dots.push(bezierRule(p));
  drawLine();
  p += 0.01;
  window.requestAnimationFrame(drawBezier);
}

function drawPoint() {
  ctx.strokeStyle = "#696969";
  ctx.fillStyle = "#696969";
  points.forEach(function(item, index) {
    var x = item.x,
      y = item.y;
    ctx.fillText("p" + index, x, y + 20);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2, false);
    ctx.fill();
    if (index) {
      var startX = points[index - 1].x,
        startY = points[index - 1].y;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  });
}

function drawLine () {
  ctx.strokeStyle = "red";
  dots.forEach(function(dot, i) {
    if (!i) {
      ctx.beginPath();
      ctx.moveTo(dot.x, dot.y);
    } else {
      ctx.lineTo(dot.x, dot.y);
      ctx.stroke();
    }
  });
}

// 贝塞尔曲线计算公式
function bezierRule(p) {
  let x = 0;
  let y = 0;
  const n = points.length - 1;
  points.forEach(function(item, index) {
    const a = combination(n, index);
    const b = Math.pow(1 - p, n - index);
    const c = Math.pow(p, index);
    x += a * item.x * b * c;
    y += a * item.y * b * c;
  });
  return { x: x, y: y };
}

// 求解杨辉三角的第 i 行，第 j 列数值(从零开始计数)
function combination(i, j) {
  // 每行的第一个数和最后一个数为 1
  if (j === 0) return 1;
  else if (i === j) return 1;
  else return combination(i - 1, j - 1) + combination(i - 1, j);
}

// 获取相对于容器的坐标
function getLocation(container, event) {
  let hastouch = "ontouchstart" in window;
  let e = event || window.event;
  let x = hastouch ? e.targetTouches[0].pageX : e.clientX;
  let y = hastouch ? e.targetTouches[0].pageY : e.clientY;
  return {
    x: x - container.getBoundingClientRect().left,
    y: y - container.getBoundingClientRect().top
  };
}

// 更改控制点
function changePoint(idxOrPos, pos) {
  if (typeof idxOrPos === "number") {
    $("#view")
      .children()
      .eq(idxOrPos)
      .html("<div>p" + idxOrPos + ": (" + pos.x + ", " + pos.y + ")</div>");
    points[idxOrPos] = pos;
  } else {
    $("#view").append("<div>p" + points.length + ": (" + idxOrPos.x + ", " + idxOrPos.y + ")</div>");
    points.push(idxOrPos);
  }
}

// 清空画布
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
