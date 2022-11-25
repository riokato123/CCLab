function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);
}

function draw() {
  //
  circle(50, 50, 50)
}

function buttonClicked() {
  console.log("Button Clicked!");
  background(random(255));
}
