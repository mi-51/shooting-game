class Game{

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

    this.my_machine = new object(100, 100, 0, 0, 50, 50, "blue");


    this.draw_canvas();
    this.animation();

    window.addEventListener("keydown", this.keyfunc.bind(this));
  }

  draw_canvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
      this.my_machine.draw(this.ctx);
    
      // for (let i = 0; i < bullets.length; i++) {
      //   bullets[i].draw();
      // }
    
  }

  animation() {
    this.draw_canvas();
    requestAnimationFrame(this.animation.bind(this));
  
  }

  keyfunc(evt) {
    console.log(evt.key);
    if (evt.key === "ArrowRight") { //もしキーが押されてそれが””の中と一致したら
      this.my_machine.x += 20;               //この動作を行ってください
    }
    if (evt.key === "ArrowLeft") {
      this.my_machine.x -= 20;
    }
    if (evt.key === "ArrowUp") {
      this.my_machine.y -= 20;
    }
    if (evt.key === "ArrowDown") {
      this.my_machine.y += 20;
    }
  
  }
}