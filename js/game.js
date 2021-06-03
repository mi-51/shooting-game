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
      width: MACHINE_WIDTH,
      height: MACHINE_HEIGHT,
      color: "blue"
    });

    this.bullets = [];
    this.enemies = [];

    // this.draw_canvas();

    this.key_status = {};

    this.framecount = 0;

    window.addEventListener("keydown", function (evt) {
      this.key_status[evt.code] = true;
    }.bind(this));
    window.addEventListener("keyup", function (evt) {
      this.key_status[evt.code] = false;
    }.bind(this));

    this.init();

    this.animation();
  }

  init() {
    this.my_machine = new object({
      x: 100,
      y: 100,
      width: MACHINE_WIDTH,
      height: MACHINE_HEIGHT,
      color: "blue"
    });

    this.bullets = new Set();
    this.enemies = new Set();
    this.framecount = 0;
  }

  draw_canvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


    // for (let i = 0; i < this.bullets.length; i++) {
    for (let bullet of this.bullets){
      bullet.draw(this.ctx);
    }
    for (let enemy of this.enemies) {
      enemy.draw(this.ctx);
    }

    this.my_machine.draw(this.ctx);
  }

  animation() {
    this.keyfunc();

    if (this.framecount % 60 === 0) {

      this.enemies.add(
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

    for (let bullet of this.bullets) {
      bullet.move();

      if (!this.isinside(bullet)) {
        this.bullets.delete(bullet);
      }
    }

    for (let enemy of this.enemies) {
      enemy.move();

      if (!this.isinside(enemy)) {
        this.enemies.delete(enemy);
      }
    }


    //衝突判定
    for (let bullet of this.bullets) {
      for (let enemy of this.enemies) {
        if (bullet.touch(enemy)) {
          this.bullets.delete(bullet);
          this.enemies.delete(enemy);
        }
      }
    }


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

        this.bullets.add(
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