let img;
var canvas;
var val=0;
var other = false;

function setup() {
  canvas = createCanvas(550, 360);
  canvas.parent("sketch-holder");
  // var name = select('makeCard');


  button = createButton('Lets Make a Card for our Special Moment');
  button.parent("sketch-holder");
  button.style('background-color', "black");
  button.style('color', "white");
  button.size(150, 50);
  button.mousePressed(drawCircles);

  logo = loadImage('./assets/logo-03.png');
  greet = loadImage('./assets/logo-03.png');
}

function draw(){
  background(255);
  drawCircles();
  if (other === true){
    drawOthers();
  }
}

function mousePressed(){
  if (mouseX < 300 && mouseX >220 && mouseY > 380){
    val = 255;
    other = true;
    console.log(nameDOM);
  }
}
function drawOthers(){
  stroke(0);
  fill(255,34,234,val);
  rect(0, 0, 200, 200);
  image(logo, 120, 50,width/4,height/4);
  image(greet, 50, 300,width/4,height/4);
}

function drawCircles(){
  stroke(0);
  fill(255);
  rect(0, 0, 548, 328);//background
  var offset = map(mouseX, 0,width, 0,2);
  //c1
  fill(41, 171, 226);
  ellipse(490, offset*2, 300, 180);
  //c2
  fill(193, 39, 45);
  ellipse(10+offset, 0, 180, 180);
  //c3
  fill(247, 147, 30);
  ellipse(100+offset*2, -2, 120, 90);
  //c4
  fill(57, 181, 74);
  ellipse(350+offset*2, 4, 100, 100);
  //c5
  fill(252, 238, 33);
  ellipse(550,60+offset, 90, 160);
  //backdrop-white
  fill(255);
  rect(30, 28, 488, 250);

  noFill();
  stroke(0);
  rect(0, 0, 548, 328);
}
