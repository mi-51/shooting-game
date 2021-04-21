let canvas, ctx;

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

let machine_x = 300;
let machine_y = 450;
const MACHINE_WIDTH = 50;
const MACHINE_HEIGHT = 50;

window.onload = function () {
  canvas = document.getElementById('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  ctx = canvas.getContext('2d');
  //.getContextはcanvas要素に与えられているメソッド
  //値を2dとすることで2次元の絵を描ける

  screen_drawing();

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
}

function key_input(evt) {
  // console.log(evt.key);
  if (evt.key === "ArrowRight") {
    machine_x += 7;
  }
  if (evt.key === "ArrowLeft") {
    machine_x -= 7;
  }
  if (evt.key === "ArrowUp") {
    machine_y -= 7;
  }
  if (evt.key === "ArrowDown") {
    machine_y += 7;
  }
  screen_drawing();
}