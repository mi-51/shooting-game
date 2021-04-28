let canvas, ctx;

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

let machine_x = 300;
let machine_y = 430;
const MACHINE_WIDTH = 50;
const MACHINE_HEIGHT = 50;

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
  ctx.beginPath();          //描画開始の宣言
  ctx.fillStyle = "black";  //描画塗りつぶしの色設定
  ctx.rect(machine_x, machine_y, MACHINE_WIDTH, MACHINE_HEIGHT);
  //塗りつぶしの範囲(margin-left, margin-top, width, height)
  ctx.fill();                 //描画の出力
  ctx.strokeStyle = "blue"  //描画の枠線色
  ctx.lineWidth = 2;        //枠線の太さ
  ctx.stroke();             //枠線の出力

  for (let i = 0; i < bullets.length; i++) {

    ctx.beginPath();          //描画開始の宣言
    ctx.fillStyle = "red";  //描画塗りつぶしの色設定
    ctx.rect(bullets[i].x + 20, bullets[i].y - 5, BULLET_WIDTH, BULLET_HEIGHT);
    //塗りつぶしの範囲(margin-left, margin-top, width, height)
    ctx.fill();                 //描画の出力
    ctx.strokeStyle = "red"  //描画の枠線色
    ctx.lineWidth = 2;        //枠線の太さ
    // ctx.stroke();             //枠線の出力
  }
}


function key_input(evt) {

  if (evt.key === "ArrowRight") { //もしキーが押されてそれが””の中と一致したら
    machine_x += 20;               //この動作を行ってください
  }
  if (evt.key === "ArrowLeft") {
    machine_x -= 20;
  }
  if (evt.key === "ArrowUp") {
    machine_y -= 20;
  }
  if (evt.key === "ArrowDown") {
    machine_y += 20;
  }

  if (evt.key === " ") {
    for (let i = 0; i < 12; i++) {
      let deg = i * 30;
      let vy = 10 * Math.cos(deg);
      let vx = 10 * Math.sin(deg);

      bullets.push({
        x: machine_x,
        y: machine_y,
        vx: vx,
        vy: vy,
      });
    }
  }
  screen_drawing();
}


function animation() {
  let new_bullets = [];

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].x -= bullets[i].vx;   //弾が動く早さ
    bullets[i].y -= bullets[i].vy;   //弾が動く早さ

    if (0 <= bullets[i].x && bullets[i].x < canvas.width &&
      0 <= bullets[i].y && bullets[i].y < canvas.height) {
      new_bullets.push(bullets[i]);
    }
  }
  bullets = new_bullets;

  screen_drawing();
  requestAnimationFrame(animation);
}