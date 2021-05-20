let canvas, ctx;

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

const MACHINE_WIDTH = 50;
const MACHINE_HEIGHT = 50;

let my_machine = new object(100, 100, 0, 0, MACHINE_WIDTH, MACHINE_HEIGHT, "blue");

let bullets = [];
const BULLET_WIDTH = 10;
const BULLET_HEIGHT = 10;

let game, game2;

window.onload = function () {
  game = new Game("canvas2", CANVAS_WIDTH, CANVAS_HEIGHT);
  game2 = new Game("canvas3", CANVAS_WIDTH, CANVAS_HEIGHT);

  canvas = document.getElementById('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  ctx = canvas.getContext('2d');
  //.getContextはcanvas要素に与えられているメソッド
  //値を2dとすることで2次元の絵を描ける

  screen_drawing();
  animation();

  window.addEventListener("keydown", key_input);

}


function screen_drawing() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  my_machine.draw(ctx);

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].draw(ctx);
  }
}


function key_input(evt) {
  console.log(evt.key);
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