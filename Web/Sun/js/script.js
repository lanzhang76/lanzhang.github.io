
document.body.style.background = "url('assets/burst-01.png') no-repeat left top";
let buttonDom = document.getElementById("submit");
buttonDom.addEventListener("click",getUserData);

let nameDOM;
let locationDOM;
let dateDOM;

function getUserData(){
  let locationInput = document.getElementById('inputSentence').value;
  let nameInput = document.getElementById('inputName').value;
  tryCountry(locationInput)
  .then(function(result){
    displayName(nameInput);
    getSun(result.latitude,result.longitude);
    displayPart();
  })
  .catch(error => alert("Please type in a country name correctly"));

}

//get Information about Sun
function getSun(lat,long){
  sunInfo(lat,long)
  .then(function(result){
    displayTime(result.sun);
    getDate();
  })
  .catch(error => console.log(error));
}

async function sunInfo(lat,long){
  let origin = "https://api.sunrise-sunset.org/json?";
  let letnum = lat;//36.7201600;
  let lngnum = long;//-4.4203400;
  let url = origin + "lat=" + letnum + "&lng=" + lngnum;
  let response = await fetch(url);
  let responseJson = await response.json();
  let dataOutput = responseJson.results.sunrise;
  console.log(responseJson);
  return{
    sun:dataOutput
  }
}

async function tryCountry(location){
  let link = "https://restcountries.eu/rest/v2/name/";
  let country = location;
  let url = link + country + "?fullText=true";
  let response = await fetch(url);
  let responseJson = await response.json();
  console.log(responseJson);
  let dataOutput = responseJson[0].latlng;
  let displayInfo = responseJson[0].capital + " , " + responseJson[0].name
  displayLocation(displayInfo);
  let lat =dataOutput[0];
  let long = dataOutput[1];
  return{
    latitude: lat,
    longitude: long
  }
}

//showing and styling functions
function displayName(input){
  document.getElementById("nameDisplay").innerHTML = "Lan & " + input;
  nameDOM = "Lan & " + input;
}

function displayLocation(input){
  document.getElementById("locationDisplay").innerHTML = "watched sunrise at " + input;
  locationDOM = input;
}

function displayTime(input){
  document.getElementById("timeDisplay").innerHTML = "UTZ Time: "+ input;
  dateDOM = "UTZ Time: "+ input;
}

function getDate(){
  let date = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let displayDate = date + " / " + month + " / 2019";
  document.getElementById("dateDisplay").innerHTML = "" + displayDate;
}

function displayPart(){
  $( ".part2" ).show();
}


//--------------------P5-------------------------//
var logo;
var greet;
var sunriseImg;
var canvas;
var other = false;
var offset;
let font;
let music;

function preload() {
  font = loadFont('assets/Montserrat-Regular.otf');
  logo = loadImage('assets/logo-03.png');
  greet = loadImage('assets/logo-04.png');
  sunriseImg = loadImage('assets/dog.jpg');
  music = loadSound("Heaven.mp3");
}

function setup() {
  canvas = createCanvas(550, 360);
  canvas.parent("sketch-holder");
  textFont(font);



  button = createButton('Lets Make a Card for our Special Moment');
  button.parent("sketch-holder");
  button.style('background-color', "black");
  button.style('color', "white");
  button.size(150, 50);
  // button.mousePressed(drawCircles);

}

function draw(){
  background(255);
  offset = map(mouseX, 0, windowWidth, 0,2);
  drawCircles();
  if (other === true){
    drawOthers();
  }
}

function mousePressed(){
  if (mouseX < 350 && mouseX >220 && mouseY > 380){
    val = 255;
    other = true;
    console.log("draw Text");
    if (music.isPlaying()) {
      music.stop();
    } else {
      music.play();
    }

  }
}

function drawOthers(){
  stroke(0);
  image(sunriseImg,31, 29, 487, 249);
  image(logo, 30, 190 - offset, logo.width / 5, logo.height / 5);
  image(greet, offset *2, 3,greet.width/5,greet.height/5);
  fill(0);
  textFont("Montserrat");
  text("Friends: " + nameDOM, 30, 300);
  text(dateDOM, 390, 300);
  fill(255);
  text(locationDOM, 290, 50);
}

function drawCircles(){
  stroke(0);
  fill(255);
  rect(0, 0, 548, 328);//background
  //c1
  fill(41, 171, 226);
  ellipse(490, offset*2, 300, 180);
  //c2
  fill(193, 39, 45);
  ellipse(10+offset, 0, 180, 180);
  //c3
  fill(247, 147, 30);
  ellipse(100+offset*2, -2, 80, 90);
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
