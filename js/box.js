class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = width / cols;
    this.h = height / rows;
    this.colour = color(150);
    this.clicked = false;
    this.flag = false;
    this.hasBomb = false;
    this.noBombsSurrounding = 0;
    this.tilesSurrounding = [];
  }

  show() { //Draws each tile
    fill(this.colour);
    rect(this.x * this.w, this.y * this.h, this.w, this.h);
    fill(0)
    if (this.clicked) {
      if (this.noBombsSurrounding != 0) {
        textAlign(CENTER, CENTER);
        textSize(Math.min(this.w, this.h) / 2);
        text(this.noBombsSurrounding, this.w * (this.x + 1 / 2), this.h * (this.y + 1 / 2));
      }
    }

    if (this.flag) {
      image(flagImg, this.x * this.w + 1, this.y * this.h + 1, this.w - 2, this.h - 2)
    }
  }

  pressed() { //Checks collision detection
    return collidePointRect(mouseX, mouseY, this.x * this.w + 1, this.y * this.h + 1, this.w - 2, this.h - 2);
  }
}