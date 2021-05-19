let canvas, ctx;

class object {
  constructor(x, y, vx, vy, width, height, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    //描画開始の宣言
    ctx.fillStyle = this.color;  //描画塗りつぶしの色設定
    //塗りつぶしの範囲(margin-left, margin-top, width, height)
    ctx.fill();                 //描画の出力
    ctx.rect(
      this.x - this.width / 2,
      this.y,
      this.width,
      this.height);
    ctx.strokeStyle = this.color;  //描画の枠線色
    ctx.lineWidth = 2;        //枠線の太さ
  }

}

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

const MACHINE_WIDTH = 50;
const MACHINE_HEIGHT = 50;

let my_machine = new object(100, 100, 0, 0, MACHINE_WIDTH, MACHINE_HEIGHT, "blue");

let bullets = [];
const BULLET_WIDTH = 10;
const BULLET_HEIGHT = 10;


window.onload = function () {
  canvas = document.getElementById('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  ctx = canvas.getContext('2d');
  //.getContextはcanvas要素に与えられているメソッド
  //値を2dとすることで2次元の絵を描ける

  screen_drawing();
  animation();

  window.onkeydown = key_input;

}


function screen_drawing() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  my_machine.draw();

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].draw();
  }
}


function key_input(evt) {

  if (evt.key === "ArrowRight") { //もしキーが押されてそれが””の中と一致したら
    my_machine.x += 20;               //この動作を行ってください
  }
  if (evt.key === "ArrowLeft") {
    my_machine.x -= 20;
  }
  if (evt.key === "ArrowUp") {
    my_machine.y -= 20;
  }
  if (evt.key === "ArrowDown") {
    my_machine.y += 20;
  }

  if (evt.key === " ") {
    for (let i = 0; i < 12; i++) {
      let deg = i * 30;
      let vy = 10 * Math.cos(deg);
      let vx = 10 * Math.sin(deg);

      bullets.push(
        new object(my_machine.x, my_machine.y, vx, vy, BULLET_WIDTH, BULLET_HEIGHT, "red")
      );
    }
  }
  screen_drawing();
}


function animation() {
  let new_bullets = [];

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].move();

    if (0 <= bullets[i].x && bullets[i].x < canvas.width &&
      0 <= bullets[i].y && bullets[i].y < canvas.height) {
      new_bullets.push(bullets[i]);
    }
  }
  bullets = new_bullets;

  screen_drawing();
  requestAnimationFrame(animation);
}