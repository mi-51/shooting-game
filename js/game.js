const MACHINE_WIDTH = 50;
const MACHINE_HEIGHT = 50;

const BULLET_WIDTH = 10;
const BULLET_HEIGHT = 10;


class Game {

  /**
   * コンストラクタ
   * @param {*} id - canvasのid
   * @param {*} width - canvasの幅
   * @param {*} height - canvasの長さ
   */
  constructor(id, width, height) {
    this.canvas = document.getElementById(id);
    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx = this.canvas.getContext("2d");

    this.my_machine = new object({
      x: 100,
      y: 100,
      vx: 0,
      vy: 0,
      width: MACHINE_WIDTH,
      height: MACHINE_HEIGHT,
      color: "blue"
    });

    this.bullets = [];
    this.enemies = [];

    this.draw_canvas();

    this.key_status = {};

    this.framecount = 0;

    window.addEventListener("keydown", function (evt) {
      this.key_status[evt.code] = true;
    }.bind(this));
    window.addEventListener("keyup", function (evt) {
      this.key_status[evt.code] = false;
    }.bind(this));

    this.animation();
  }

  draw_canvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(this.ctx);
    }
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw(this.ctx);
    }

    this.my_machine.draw(this.ctx);
  }

  animation() {
    this.keyfunc();

    if (this.framecount % 60 === 0) {

      this.enemies.push(
        new object({
          x: 300,
          y: 100 + this.framecount,
          vx: 2,
          vy: 0,
          width: 30,
          height: 30,
          color: "red"
        }));
    }
    this.framecount++;

    // console.log(this.a_down);
    let new_bullets = [];

    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move();

      if (this.isinside(this.bullets[i])) {
        new_bullets.push(this.bullets[i]);
      }
    }
    this.bullets = new_bullets;


    let new_enemies = [];

    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].move();

      if (this.isinside(this.enemies[i])) {
        new_enemies.push(this.enemies[i]);
      }
    }
    this.enemies = new_enemies;


    this.draw_canvas();
    requestAnimationFrame(this.animation.bind(this));

  }

  isinside(object) {
    if (0 <= object.x && object.x < this.canvas.width &&
      0 <= object.y && object.y < this.canvas.height) {
      return true;
    }
    else {
      return false;
    }
  }

  keyfunc() {
    // console.log(evt.key);
    if (this.key_status["ArrowRight"]) { //もしキーが押されてそれが””の中と一致したら
      this.my_machine.x += 10;               //この動作を行ってください
    }
    if (this.key_status["ArrowLeft"]) {
      this.my_machine.x -= 10;
    }
    if (this.key_status["ArrowUp"]) {
      this.my_machine.y -= 10;
    }
    if (this.key_status["ArrowDown"]) {
      this.my_machine.y += 10;
    }

    if (this.framecount % 10 === 0 && this.key_status["Space"]) {
      for (let i = 0; i < 12; i++) {
        let deg = i * 30;
        let vy = 10 * Math.cos(deg);
        let vx = 10 * Math.sin(deg);

        this.bullets.push(
          new object({
            x: this.my_machine.x,
            y: this.my_machine.y,
            vx: vx,
            vy: vy,
            width: BULLET_WIDTH,
            height: BULLET_HEIGHT,
            color: "black"
          })
        );
      }
    }

  }
}