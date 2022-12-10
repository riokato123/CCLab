const NUM_OF_GHOSTS = 15;
const NUM_OF_PARTICLES = 1000;
const NUM_OF_HARTICLES = 1;

let pacMan;
let photo;
let apple;
let pic;
let title;
let namco;
let press;
let reset;
let wasted;
let success;
let ghosts = [];
let items = [];
let seq = 0;
let seqTime = 0;
let winsound;

function preload() {
  pic = loadImage("Screen Shot 2022-11-04 at 14.57.52.png");
  photo = loadImage("Screen Shot 2022-11-04 at 14.58.24.png");
  apple = loadImage("Screen Shot 2022-11-08 at 15.24.54.png");
  title = loadImage("Screen Shot 2022-12-06 at 14.36.19.png");
  namco = loadImage("Screen Shot 2022-12-06 at 14.43.25.png");
  press = loadImage("d1921df3a5e1c957b3ec36e78ff49bf0.png");
  wasted = loadImage("0407c660fe65d89ac672bb80bf2b10fc.png");
  reset = loadImage("4d29550e15b891ba436551dfaac83523.png");
  success = loadImage("be940b8ec150daaa04f8694bda8de0d2.png");
}

function setup() {
  let canvas = createCanvas(1750, 900);
  canvas.parent("canvasContainer");
  background(220);
}

function draw() {
  background(50);

  updateSequence();

  // draw scenes
  if (seq == 0) {
    drawIntro();
    pacMan = new PacMan(width / 2, height / 2);
    seqTime = 0;
  } else if (seq == 1) {
    drawScene1();
  } else if (seq == 2) {
    drawScene2();
  } else if (seq == 3) {
    drawEnding();
  }
}

function keyPressed() {
  if (key == " ") {
    if (seq == 0) {
      seq = 1;
    } else if (seq == 2) {
      seq = 0;
    } else if (seq == 3) {
      seq = 0;
    }
  }
}

function updateSequence() {
  if (seq == 1) {
    if (seqTime > 999) {
      seq = 2;
    }
    seqTime++;
  }
}

function drawIntro() {
  background(0);
  fill(255, 0, 0);
  image(title, 475, -10, 800, 0);
  image(namco, 570, 600, 600, 200);
  image(press, 655, 450, 400, 40);
}

function drawScene1() {
  // generate ghosts
  if (random() < 0.06) {
    let ghostType;
    if (random() < 0.33) {
      ghostType = "A";
    } else if (random() < 0.66) {
      ghostType = "B";
    } else {
      ghostType = "C";
    }
    ghosts.push(new Ghost(random(width), random(height), ghostType));
  }

  // generate items
  if (random() < 0.004) {
    let itemType;
    if (random() < 0.033) {
      itemType = "A";
    }
    itemType = "super";
    items.push(
      new Item(random(100, width - 100), random(100, height - 100), 3, itemType)
    );
  }

  background(0);
  strokeWeight(4);
  line(255, 255, 1000, 1000);

  //////////////////////////////////////////////
  for (let a = 20; a <= 2000; a += 50) {
    for (let b = 20; b <= 2000; b += 50) {
      fill(255, 255, 255);
      rect(b, a, 10, 10);
      strokeWeight(4);
    }
  }
  /////////////////////////////////////////////////////
  push();
  strokeWeight(10)
  textSize(100);
  fill(255, 255, 0, 100);
  text("PACMAN", 14, 320);
  pop();
  push();
  strokeWeight(10)
  fill(255, 255, 0, 100);
  textSize(300);
  text("MISSION", 0, 550);
  textSize(290);
  text("IMPOSSIBLE", -5, 780);
  pop();
  push();

  ///// ITEMS /////
  for (let i = 0; i < items.length; i++) {
    let t = items[i];
    t.display();
    t.collideWith(pacMan);
  }
  for (let i = items.length - 1; i >= 0; i--) {
    let t = items[i];
    if (t.isDone) {
      items.splice(i, 1);
    }
  }

  ///// PAC MAN /////
  pacMan.move();
  pacMan.reappear();
  pacMan.display();

  ///// GHOSTS /////
  for (let i = 0; i < ghosts.length; i++) {
    let g = ghosts[i];
    g.slowDown();
    g.display(pacMan);
    g.move();
    g.bounce();
    if (pacMan.status == "super") {
      g.repelledFrom(pacMan);
    } else if (pacMan.status == "hidden") {
      //g.confused(); // develop this new behavior?
    } else {
      g.attractedTo(pacMan);
      g.avoid(pacMan);
      g.collideWith(pacMan);
    }
  }
  let time = map(seqTime, 0, 1000, 1000, 0);
  push();
  textSize(100);
  fill(random(255), random(255), random(255));
  text("Time: " + time, 10, 90);
  pop();
}

function drawScene2() {
  ghosts = []; // empty the array!
  items = []; // empty the array!

  background(0);
  fill(255, 0, 0);
  image(title, 475, -10, 800, 0);
  image(namco, 570, 600, 600, 200);
  image(press, 655, 450, 400, 40);
  push();
  fill(255, 0, 0);
  image(success, 655, 400, 400, 40);
  pop();
}

function drawEnding() {
  ghosts = []; // empty the array!
  items = []; // empty the array!
  background(0);
  fill(255, 0, 0);
  image(title, 475, -10, 800, 0);
  image(namco, 570, 600, 600, 200);
  image(press, 655, 450, 400, 40);
  push();
  fill(255, 0, 0);
  image(wasted, 655, 400, 400, 40);
  pop();
}

class PacMan {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rad = 45;
    this.speed = 15;
    this.status = "normal";
    this.duration = 0;
  }
  move() {
    if (keyIsPressed) {
      // this.isHidden = false;
      if (keyCode == UP_ARROW) {
        this.y = this.y - this.speed;
      } else if (keyCode == DOWN_ARROW) {
        this.y = this.y + this.speed;
      } else if (keyCode == LEFT_ARROW) {
        this.x = this.x - this.speed;
      } else if (keyCode == RIGHT_ARROW) {
        this.x = this.x + this.speed;
      }
      // else if (key == " ") {
      //   this.status = "hidden";
      //   this.duration = 120;
      // }
    }
    this.updateStatus();
  }
  updateStatus() {
    if (this.duration < 0) {
      this.duration = 0;
      this.status = "normal";
    } else {
      this.duration -= 1;
    }
  }
  reappear() {
    if (this.x < 0) {
      this.x = width;
    } else if (this.x > width) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = height;
    } else if (this.y > height) {
      this.y = 0;
    }
  }
  display() {
    // if (this.status == "hidden") return;// // finish this function.

    push();
    translate(this.x, this.y);
    noStroke();
    fill(255, 255, 0);
    circle(0, 0, this.rad / 3, this.rad / 3);

    if (keyCode == UP_ARROW) {
      arc(0, 0, this.rad * 2, this.rad * 2, 5.34, 4.08);
    } else if (keyCode == DOWN_ARROW) {
      arc(0, 0, this.rad * 2, this.rad * 2, 2.04, 0.94);
    } else if (keyCode == LEFT_ARROW) {
      arc(0, 0, this.rad * 2, this.rad * 2, 3.77, 2.51);
    } else if (keyCode == RIGHT_ARROW) {
      arc(0, 0, this.rad * 2, this.rad * 2, 0.52, 5.76);
    }
    if (this.status == "super") {
      fill(random(200), random(255), random(200), 200);
      arc(0, 0, this.rad * 3, this.rad * 3, random(TWO_PI), random(TWO_PI));
    }

    if (keyIsPressed) {
      if (key == " ") {
        fill(255, 0, 0);
        arc(0, 0, 120, 120, random(TWO_PI), random(TWO_PI));
      }
    }

    pop();
  }
}

class Ghost {
  constructor(x, y, type) {
    this.type = type;
    //
    this.x = x;
    this.y = y;
    this.diameter = 400;
    this.size = random(0.1, 0.3);
    // color
    if (this.type == "A") {
      this.originR = 255;
      this.originG = 0;
      this.originB = 0;
    } else if (this.type == "B") {
      this.originR = 0;
      this.originG = 255;
      this.originB = 0;
    } else if (this.type == "C") {
      this.originR = 0;
      this.originG = 0;
      this.originB = 255;
    }
    this.r = this.originR;
    this.g = this.originG;
    this.b = this.originB;
    //
    this.xSpd = random(-0.01, 0.2);
    this.ySpd = random(-0.01, 0.2);
    this.speed = random(0.0, 0.2);
    //
    this.distance = random(-200, 300);
    this.anotherdistance = random(-200, 300);
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  slowDown() {
    this.xSpd = this.xSpd * 0.06;
    this.ySpd = this.ySpd * 0.06;
  }
  attractedTo(target) {
    let xAcc = (target.x - this.x - this.distance) * this.speed;
    let yAcc = (target.y - this.y - this.anotherdistance) * this.speed;
    this.xSpd += xAcc;
    this.ySpd += yAcc;
  }
  repelledFrom(target) {
    let distance = dist(this.x, this.y, target.x, target.y);
    if (distance < 500) {
      let xAcc = (target.x - this.x) * -0.9;
      let yAcc = (target.y - this.y) * -0.9;
      this.xSpd += xAcc;
      this.ySpd += yAcc;
    }
  }
  collideWith(target) {
    let distance = dist(this.x, this.y, target.x, target.y);
    //console.log(distance);
    let radius = (this.diameter * this.size) / 2;
    if (distance < target.rad + radius) {
      // collided!
      console.log("YES!");
      seq = 3;
    }
  }
  avoid(target) {
    if (keyIsPressed) {
      let amount = 30;
      if (this.type == "A") {
        if (keyCode == UP_ARROW || keyCode == LEFT_ARROW || key == " ") {
          this.repelledFrom(target);
          this.x += random(-amount, amount);
          this.y += random(-amount, amount);
        }
      } else if (this.type == "B") {
        if (keyCode == DOWN_ARROW || keyCode == RIGHT_ARROW || key == " ") {
          this.repelledFrom(target);
          this.x += random(-amount, amount);
          this.y += random(-amount, amount);
        }
      } else if (this.type == "C") {
        if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW || key == " ") {
          this.repelledFrom(target);
          this.x += random(-amount, amount);
          this.y += random(-amount, amount);
        }
      }
    }
  }
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
  ////////////////////////////////////
  display(target) {
    if (this.type == "A") {
      this.r = 255;
      this.g = 0;
      this.b = 0;
      if (keyIsPressed) {
        if (keyCode == UP_ARROW) {
          this.r = 251;
          this.g = 1;
          this.b = 154;
        } else if (keyCode == DOWN_ARROW) {
          this.r = 255;
          this.g = 0;
          this.b = 0;
        } else if (keyCode == LEFT_ARROW) {
          this.r = 251;
          this.g = 1;
          this.b = 154;
        } else if (keyCode == RIGHT_ARROW) {
          this.r = 255;
          this.g = 0;
          this.b = 0;
        }
      }
    }
    if (this.type == "B") {
      this.r = 0;
      this.g = 255;
      this.b = 0;
      if (keyIsPressed) {
        if (keyCode == UP_ARROW) {
          this.r = 0;
          this.g = 255;
          this.b = 0;
        } else if (keyCode == DOWN_ARROW) {
          this.r = 251;
          this.g = 1;
          this.b = 154;
        } else if (keyCode == LEFT_ARROW) {
          this.r = 0;
          this.g = 255;
          this.b = 0;
        } else if (keyCode == RIGHT_ARROW) {
          this.r = 251;
          this.g = 1;
          this.b = 154;
        }
      }
    }
    if (this.type == "C") {
      this.r = 0;
      this.g = 0;
      this.b = 255;
      if (keyIsPressed) {
        if (keyCode == UP_ARROW) {
          this.r = 0;
          this.g = 0;
          this.b = 255;
        } else if (keyCode == DOWN_ARROW) {
          this.r = 0;
          this.g = 0;
          this.b = 255;
        } else if (keyCode == LEFT_ARROW) {
          this.r = 251;
          this.g = 1;
          this.b = 154;
        } else if (keyCode == RIGHT_ARROW) {
          this.r = 251;
          this.g = 1;
          this.b = 154;
        }
      }
    }

    push();

    translate(this.x, this.y);
    scale(this.size);

    noStroke();
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

    if (this.type == "A") {
      if (keyIsPressed) {
        if (keyCode == UP_ARROW) {
          rect(-150, -60, 90, 90);
          rect(+10, -80, 90, 90);
        } else if (keyCode == DOWN_ARROW) {
          circle(-100, -30, this.diameter / 6);
          circle(+50, -30, this.diameter / 6);
        } else if (keyCode == LEFT_ARROW) {
          rect(-150, -60, 90, 90);
          rect(+10, -80, 90, 90);
        } else if (keyCode == RIGHT_ARROW) {
          circle(-100, -30, this.diameter / 6);
          circle(+50, -30, this.diameter / 6);
        }
      }
    }

    if (this.type == "B") {
      if (keyIsPressed) {
        if (keyCode == UP_ARROW) {
          circle(-100, -30, this.diameter / 6);
          circle(+50, -30, this.diameter / 6);
        } else if (keyCode == DOWN_ARROW) {
          rect(-150, -60, 90, 90);
          rect(+10, -80, 90, 90);
        } else if (keyCode == LEFT_ARROW) {
          circle(-100, -30, this.diameter / 6);
          circle(+50, -30, this.diameter / 6);
        } else if (keyCode == RIGHT_ARROW) {
          rect(-150, -60, 90, 90);
          rect(+10, -80, 90, 90);
        }
      }
    }

    if (this.type == "C") {
      if (keyIsPressed) {
        if (keyCode == UP_ARROW) {
          circle(-100, -30, this.diameter / 6);
          circle(+50, -30, this.diameter / 6);
        } else if (keyCode == DOWN_ARROW) {
          circle(-100, -30, this.diameter / 6);
          circle(+50, -30, this.diameter / 6);
        } else if (keyCode == LEFT_ARROW) {
          rect(-150, -60, 90, 90);
          rect(+10, -80, 90, 90);
        } else if (keyCode == RIGHT_ARROW) {
          rect(-150, -60, 90, 90);
          rect(+10, -80, 90, 90);
        }
      }
    }

    pop();

    strokeWeight(30);
    stroke(this.r - 20, this.g - 20, this.b - 20);
    let leftShoulderX = -180 + this.x;
    let leftShoulderY = 200 + this.y;
    let lefrArmX = target.x - 100 - leftShoulderX;
    let lefrArmY = target.y - leftShoulderY;

    push();
    translate(-180, 200);
    line(0, 0, lefrArmX, lefrArmY);
    pop();

    let rightShoulderX = 180 + this.x;
    let rightShoulderY = 200 + this.y;
    let rightArmX = target.x + 100 - rightShoulderX;
    let rightArmY = target.y - rightShoulderY;

    push();
    translate(180, 200);
    line(0, 0, rightArmX, rightArmY);
    pop();

    // stroke(0, 255, 0);
    // noFill();
    // circle(0, 0, this.diameter);

    pop();

    /*
    push();
    stroke(0, 255, 0);
    noFill();
    circle(this.x+lefrArmX, this.y+lefrArmY, 30);
    circle(this.x+rightArmX, this.y+rightArmY, 30);
    pop();
    */
  }
}

class Item {
  constructor(x, y, rad, type) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.rad = 10;
    this.isDone = false;
  }
  collideWith(target) {
    let distance = dist(this.x, this.y, target.x, target.y);
    if (distance < target.rad + this.rad) {
      // collided!
      target.status = this.type;
      target.duration = 180;
      this.isDone = true;
    }
  }
  display() {
    push();
    if (this.type == "super") {
      stroke(random(255), random(255), random(255));
      noFill();
      circle(this.x, this.y, this.rad * 2);
    } else {
      //
    }
    pop();
  }
}
