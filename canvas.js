var w = $('.canvas-1').width();
var h = $('.canvas-1').height();
var scale = h/w;
var clickX = new Array();
var clickY = new Array();
var clickDrag = false;
var paint;


$('.canvas-1').css({'height': w + 'px'});

$('.canvas-1').mousedown(function(e){
  var rect = this.getBoundingClientRect();
  var mouseX = e.clientX - rect.left;
  var mouseY = Math.round(scale*(e.clientY - rect.top));
  paint = true;
  addClick(mouseX, mouseY);
  redraw();
});

$('.canvas-1').mousemove(function(e){
  var rect = this.getBoundingClientRect();
  var mouseX = e.clientX - rect.left;
  var mouseY = Math.round(scale*(e.clientY - rect.top));
  if(paint){
    addClick(mouseX, mouseY, true);
    redraw();
  }
});

$('.canvas-1').mouseup(function(e){
  paint = false;
});

$('.canvas-1').mouseleave(function(e){
  paint = false;
});


function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag = dragging;
}

function redraw(){
 
 var canvas = document.getElementsByClassName('canvas-1'); 
 var arrayLength = canvas.length;
 for (var j = 0; j < arrayLength; j++) {
  var context = canvas[j].getContext("2d");
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 12;

  var i = clickX.length - 1;
  if (clickDrag && i) {
    context.moveTo(clickX[i-1], clickY[i-1]);
  }else{
    context.moveTo(clickX[i], clickY[i]);
  }
  context.lineTo(clickX[i], clickY[i]);
  context.closePath();
  context.stroke();
 }
}

