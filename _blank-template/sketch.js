let x = 500;
let y = 500;
let photo;
let apple;
let pic;
let NUM_OF_GHOSTS = 10;
let NUM_OF_PUPPETS = 10;
let NUM_OF_Muggles = 10;
let ghost = [];
let puppets = [];
let muggles = [];
let NUM_OF_PARTICLES = 1000;
let particles = [];

function preload() {
  pic = loadImage("Screen Shot 2022-11-04 at 14.57.52.png");
  photo = loadImage("Screen Shot 2022-11-04 at 14.58.24.png");
  apple = loadImage("Screen Shot 2022-11-08 at 15.24.54.png");
  key = loadImage("Screen Shot 2022-11-27 at 14.05.45.png");
}

function setup() {
  let canvas = createCanvas(1000, 1000);
  canvas.parent("canvasContainer");
  background(220);
  for (let i = 0; i < NUM_OF_GHOSTS; i++) {
    ghost[i] = new PacMan(
      random(width),
      random(height),
      random(240, 255),
      random(10),
      random(10)
    );
  }
  for (let i = 0; i < NUM_OF_PUPPETS; i++) {
    puppets[i] = new HappyMan(
      random(width),
      random(height),
      random(10),
      random(240, 255),
      random(10)
    );
  }
  for (let i = 0; i < NUM_OF_Muggles; i++) {
    muggles[i] = new JoyMan(
      random(width),
      random(height),
      random(0),
      random(0),
      random(250, 255)
    );
  }
}
function draw() {
  background(0);
  strokeWeight(4);
  line(255, 255, 1000, 1000);
  //////////////////////////////////////////////
  if (keyIsPressed) {
    if (keyCode == ENTER) {
      particles.push(new Particle(x, y));
    }
  }

  // update and display
  for (let n = 0; n < particles.length; n++) {
    let p = particles[n];
    p.move();
    p.display();
  }
  // limit
  while (particles.length > NUM_OF_PARTICLES) {
    particles.splice(0, 1); // remove the first "oldest" object.
  }
  //////////////////////////////////////////////
  for (var a = 20; a <= 1000; a += 50) {
    for (var b = 20; b <= 1000; b += 50) {
      fill(255, 255, 255);
      rect(b, a, 10, 10);
      strokeWeight(4);
    }
  }
  //////////////////////////////////////////////
  push();
  strokeWeight(5);
  stroke(21, 81, 255);
  fill(0, 0, 0, 1);
  rect(100, 100, 300);
  pop();
  push();
  strokeWeight(5);
  stroke(21, 81, 255);
  fill(0, 0, 0, 1);
  rect(100, 600, 300);
  pop();
  push();
  strokeWeight(5);
  stroke(21, 81, 255);
  fill(0, 0, 0, 1);
  rect(600, 100, 300);
  pop();
  push();
  strokeWeight(5);
  stroke(21, 81, 255);
  fill(0, 0, 0, 1);
  rect(600, 600, 300);
  pop();
  push();
  strokeWeight(5);
  fill(0);
  rect(0, 0, 1000, 80);
  pop();
  ///////////////////////////////////////////////////
  push();
  textSize(70);
  text("HIGH SCORE:", 10, 70);
  text(particles.length, 500, 70);
  fill(0);
  pop();
  push();
  text("PRESS ENTER TO SCORE & ARROW KEYS FOR CONTROL", 10, 90);
  textSize(10);
  fill(255, 255, 255);
  pop();
  /////////////////////////////////////////////////////
  image(pic, 700, 5, 90, 90);
  image(photo, 800, 5, 90, 90);
  image(apple, 900, 5, 90, 90);
  // image(key, 900, 5, 90, 90);

  push();
  textSize(170);
  fill(255, 255, 0, 100);
  text("PACMAN", 150, 550);
  pop();

  push();
  textSize(140);
  fill(255, 255, 0, 100);
  text("HIDE & SEEK", 44, 660);
  pop();
  //////////////////////////////////////////////
  for (let i = 0; i < ghost.length; i++) {
    let g = ghost[i];
    g.attractedTo(x, y);
    g.slowDown();
    g.display();
    g.move();
    g.bounce();
    push();
    if (keyIsPressed) {
      if (keyCode == UP_ARROW) {
        fill(255, 255, 0);
        arc(x, y, 90, 90, 5.34, 4.08);
      } else if (keyCode == DOWN_ARROW) {
        fill(255, 255, 0);
        arc(x, y, 90, 90, 2.04, 0.94);
      } else if (keyCode == LEFT_ARROW) {
        fill(255, 255, 0);
        arc(x, y, 90, 90, 3.77, 2.51);
      } else if (keyCode == RIGHT_ARROW) {
        fill(255, 255, 0);
        arc(x, y, 90, 90, 0.52, 5.76);
      } else if (keyCode == " ") {
        fill(255, 255, 0);
        arc(x, y, 90, 90, 0.52, 5.76);
      }
    }
    pop();
  }
  //////////////////////////////////////////////
  for (let i = 0; i < puppets.length; i++) {
    let p = puppets[i];
    p.attractedTo(x, y);
    p.slowDown();
    p.display();
    p.move();
    p.bounce();
    push();
    function keyReleased() {
      if (keyIsPressed) {
        if (keyCode == UP_ARROW) {
          fill(255, 255, 0);
          arc(x, y, 90, 90, 5.34, 4.08);
        } else if (keyCode == DOWN_ARROW) {
          fill(255, 255, 0);
          arc(x, y, 90, 90, 2.04, 0.94);
        } else if (keyCode == LEFT_ARROW) {
          fill(255, 255, 0);
          arc(x, y, 90, 90, 3.77, 2.51);
        } else if (keyCode == RIGHT_ARROW) {
          fill(255, 255, 0);
          arc(x, y, 90, 90, 0.52, 5.76);
        } else if (keyCode == keyTyped()) {
          fill(255, 255, 0);
          arc(x, y, 90, 90, 0.52, 5.76);
        }
      }
    }
    pop();
  }
  //////////////////////////////////////////////
  for (let i = 0; i < muggles.length; i++) {
    let m = muggles[i];
    m.attractedTo(x, y);
    m.slowDown();
    m.display();
    m.move();
    m.bounce();
  }

  if (keyIsPressed) {
    if (keyCode == UP_ARROW) {
      y = y - 13;
    } else if (keyCode == DOWN_ARROW) {
      y = y + 13;
      fill(255, 255, 0);
    } else if (keyCode == LEFT_ARROW) {
      x = x - 13;
    } else if (keyCode == RIGHT_ARROW) {
      x = x + 13;
    }
  }
}
class Particle {
  constructor(x, y) {
    // properties
    this.x = x;
    this.y = y;
    this.xSpd = random(0.5);
    this.ySpd = random(0.5);
    this.dia = 10;
  }
  // methods
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  display() {
    push();
    translate(this.x, this.y);
    fill(255, 255, 0);
    circle(0, 0, this.dia);
    pop();
  }
}
class PacMan {
  constructor(tempX, tempY, r, g, b) {
    this.x = tempX;
    this.y = tempY;
    this.diameter = 400;
    this.r = r;
    this.g = g;
    this.b = b;
    this.size = random(0.1, 0.3);
    this.xSpd = random(-0.01, 0.3);
    this.ySpd = random(-0.01, 0.3);
    this.speed = random(0.1, 0.4);
    this.distance = random(-200, 300);
    this.anotherdistance = random(-200, 300);
    // make them various in size and speeed!
  }
  ////////////////////////////////////
  bounce() {
    if (this.x < 0) {
      this.x = 0;
      this.xSpd = this.xSpd * -1;
    } else if (this.x > width) {
      this.x = width;
      this.xSpd = this.xSpd * -1;
    }
    if (this.y < 0) {
      this.y = 0;
      this.ySpd = this.ySpd * -1;
    } else if (this.y > height) {
      this.y = height;
      this.ySpd = this.ySpd * -1;
    }
  }
  ///////////////////////////////////////

  ////////////////////////////////////
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  ///////////////////////////////////////
  attractedTo(targetX, targetY) {
    let xAcc = (targetX - this.x - this.distance) * this.speed;
    let yAcc = (targetY - this.y - this.anotherdistance) * this.speed;
    this.xSpd += xAcc;
    this.ySpd += yAcc;
  }
  slowDown() {
    this.xSpd = this.xSpd * 0.04;
    this.ySpd = this.ySpd * 0.04; // 3% less per frame
  }
  ////////////////////////////////////
  display() {
    noStroke();
    push();
    translate(this.x, this.y);
    scale(this.size);
    fill(this.r, this.g, this.b);
    ellipse(0, 0, this.diameter, this.diameter);

    push();
    rectMode(CENTER);
    fill(this.r, this.g, this.b);
    rect(0, +200, this.diameter - 1, this.diameter);
    pop();

    fill(this.r, this.g, this.b);
    triangle(-199.5, +400, -200, +500, -100, +400);
    triangle(+60, +400, +210, +500, +199, +400);
    triangle(-100, +400, -50, +500, -22, +400);
    triangle(-30, +400, +50, +500, +80, +400);
    push();
    fill(255, 255, 255);
    ellipse(-81, 0, this.diameter - 220, this.diameter - 150);
    ellipse(+81, 0, this.diameter - 220, this.diameter - 150);
    pop();

    push();
    fill(0);
    circle(-100, -30, this.diameter / 6);
    circle(+50, -30, this.diameter / 6);
    pop();

    push();
    strokeWeight(30);
    stroke(this.r - 20, this.g - 20, this.b - 20);

    let leftShoulderX = -180 + this.x;
    let leftShoulderY = 200 + this.y;
    let lefrArmX = x - 100 - leftShoulderX;
    let lefrArmY = y - leftShoulderY;
    push();
    translate(-180, 200);
    line(0, 0, lefrArmX, lefrArmY);
    pop();

    let rightShoulderX = 180 + this.x;
    let rightShoulderY = 200 + this.y;
    let rightArmX = x + 100 - rightShoulderX;
    let rightArmY = y - rightShoulderY;
    push();
    translate(180, 200);
    line(0, 0, rightArmX, rightArmY);
    pop();

    /*
    let rightX = 180;
    let rightY = 200;
    let x = (mouseX - this.x) * 5;
    let y = (mouseY - this.y) * 5;
    line(0, 0, x, y);
    */

    noStroke();

    // line( - 100,   + 300,  - 300,  );
    // line( + 100,   + 300,  + 300,  );
    pop();

    // fill(0, 255, 0);
    // circle(0, 0, 100);

    pop();
  }
}
class HappyMan {
  constructor(tempY, tempX, r, g, b) {
    this.x = tempX;
    this.y = tempY;
    this.diameter = 400;
    this.r = r;
    this.g = g;
    this.b = b;
    this.size = random(0.1, 0.3);
    this.xSpd = random(-0.01, 0.3);
    this.ySpd = random(-0.01, 0.3);
    this.speed = random(0.1, 0.4);
    this.distance = random(random(-100, -110), random(200, 250));
    this.anotherdistance = random(random(-100, -110), random(200, 250));
    // make them various in size and speeed!
  }
  ////////////////////////////////////
  bounce() {
    if (this.x < 0) {
      this.x = 0;
      this.xSpd = this.xSpd * -1;
    } else if (this.x > width) {
      this.x = width;
      this.xSpd = this.xSpd * -1;
    }
    if (this.y < 0) {
      this.y = 0;
      this.ySpd = this.ySpd * -1;
    } else if (this.y > height) {
      this.y = height;
      this.ySpd = this.ySpd * -1;
    }
  }
  ///////////////////////////////////////

  ////////////////////////////////////
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  ///////////////////////////////////////
  attractedTo(targetX, targetY) {
    let xAcc = (targetX - this.x - this.distance) * this.speed;
    let yAcc = (targetY - this.y - this.anotherdistance) * this.speed;
    this.xSpd += xAcc;
    this.ySpd += yAcc;
  }
  slowDown() {
    this.xSpd = this.xSpd * 0.04;
    this.ySpd = this.ySpd * 0.04; // 3% less per frame
  }
  ////////////////////////////////////
  display() {
    noStroke();
    push();
    translate(this.x, this.y);
    scale(this.size);
    fill(this.r, this.g, this.b);
    ellipse(0, 0, this.diameter, this.diameter);

    push();
    rectMode(CENTER);
    fill(this.r, this.g, this.b);
    rect(0, +200, this.diameter - 1, this.diameter);
    pop();

    fill(this.r, this.g, this.b);
    triangle(-199.5, +400, -200, +500, -100, +400);
    triangle(+60, +400, +210, +500, +199, +400);
    triangle(-100, +400, -50, +500, -22, +400);
    triangle(-30, +400, +50, +500, +80, +400);
    push();
    fill(255, 255, 255);
    ellipse(-81, 0, this.diameter - 220, this.diameter - 150);
    ellipse(+81, 0, this.diameter - 220, this.diameter - 150);
    pop();

    push();
    fill(0);
    circle(-100, -30, this.diameter / 6);
    circle(+50, -30, this.diameter / 6);
    pop();

    push();
    strokeWeight(30);
    stroke(this.r - 20, this.g - 20, this.b - 20);

    let leftShoulderX = -180 + this.x;
    let leftShoulderY = 200 + this.y;
    let lefrArmX = x - 100 - leftShoulderX;
    let lefrArmY = y - leftShoulderY;
    push();
    translate(-180, 200);
    line(0, 0, lefrArmX, lefrArmY);
    pop();

    let rightShoulderX = 180 + this.x;
    let rightShoulderY = 200 + this.y;
    let rightArmX = x + 100 - rightShoulderX;
    let rightArmY = y - rightShoulderY;
    push();
    translate(180, 200);
    line(0, 0, rightArmX, rightArmY);
    pop();

    /*
    let rightX = 180;
    let rightY = 200;
    let x = (mouseX - this.x) * 5;
    let y = (mouseY - this.y) * 5;
    line(0, 0, x, y);
    */

    noStroke();

    // line( - 100,   + 300,  - 300,  );
    // line( + 100,   + 300,  + 300,  );
    pop();

    // fill(0, 255, 0);
    // circle(0, 0, 100);

    pop();
  }
}
class JoyMan {
  constructor(tempY, tempX, r, g, b) {
    this.x = tempX;
    this.y = tempY;
    this.diameter = 400;
    this.r = r;
    this.g = g;
    this.b = b;
    this.size = random(0.1, 0.3);
    this.xSpd = random(-0.01, 0.3);
    this.ySpd = random(-0.01, 0.3);
    this.speed = random(0.1, 0.4);
    this.distance = random(random(-100, -110), random(400, 450));
    this.anotherdistance = random(random(-300, -410), random(400, 450));
    // make them various in size and speeed!
  }
  ////////////////////////////////////
  bounce() {
    if (this.x < 0) {
      this.x = 0;
      this.xSpd = this.xSpd * -1;
    } else if (this.x > width) {
      this.x = width;
      this.xSpd = this.xSpd * -1;
    }
    if (this.y < 0) {
      this.y = 0;
      this.ySpd = this.ySpd * -1;
    } else if (this.y > height) {
      this.y = height;
      this.ySpd = this.ySpd * -1;
    }
  }
  ///////////////////////////////////////

  ////////////////////////////////////
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  ///////////////////////////////////////
  attractedTo(targetX, targetY) {
    let xAcc = (targetX - this.x - this.distance) * this.speed;
    let yAcc = (targetY - this.y - this.anotherdistance) * this.speed;
    this.xSpd += xAcc;
    this.ySpd += yAcc;
  }
  slowDown() {
    this.xSpd = this.xSpd * 0.04;
    this.ySpd = this.ySpd * 0.04; // 3% less per frame
  }
  ////////////////////////////////////
  display() {
    noStroke();
    push();
    translate(this.x, this.y);
    scale(this.size);
    fill(this.r, this.g, this.b);
    ellipse(0, 0, this.diameter, this.diameter);

    push();
    rectMode(CENTER);
    fill(this.r, this.g, this.b);
    rect(0, +200, this.diameter - 1, this.diameter);
    pop();

    fill(this.r, this.g, this.b);
    triangle(-199.5, +400, -200, +500, -100, +400);
    triangle(+60, +400, +210, +500, +199, +400);
    triangle(-100, +400, -50, +500, -22, +400);
    triangle(-30, +400, +50, +500, +80, +400);
    push();
    fill(255, 255, 255);
    ellipse(-81, 0, this.diameter - 220, this.diameter - 150);
    ellipse(+81, 0, this.diameter - 220, this.diameter - 150);
    pop();

    push();
    fill(0);
    circle(-100, -30, this.diameter / 6);
    circle(+50, -30, this.diameter / 6);
    pop();

    push();
    strokeWeight(30);
    stroke(this.r - 20, this.g - 20, this.b - 20);

    let leftShoulderX = -180 + this.x;
    let leftShoulderY = 200 + this.y;
    let lefrArmX = x - 100 - leftShoulderX;
    let lefrArmY = y - leftShoulderY;
    push();
    translate(-180, 200);
    line(0, 0, lefrArmX, lefrArmY);
    pop();

    let rightShoulderX = 180 + this.x;
    let rightShoulderY = 200 + this.y;
    let rightArmX = x + 100 - rightShoulderX;
    let rightArmY = y - rightShoulderY;
    push();
    translate(180, 200);
    line(0, 0, rightArmX, rightArmY);
    pop();
    noStroke();

    // line( - 100,   + 300,  - 300,  );
    // line( + 100,   + 300,  + 300,  );
    pop();

    // fill(0, 255, 0);
    // circle(0, 0, 100);

    pop();
  }
}

