class object {
  constructor(param) {
    this.x = param.x;
    this.y = param.y;
    this.vx = param.vx;
    this.vy = param.vy;
    this.width = param.width;
    this.height = param.height;
    this.color = param.color;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
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

  touch(rival) {
    let my_right = this.x + this.width;
    let my_left = this.x;
    let my_top = this.y;
    let my_bottom = this.y + this.width;
    let rival_right = rival.x + rival.width;
    let rival_left = rival.x;
    let rival_top = rival.y;
    let rival_bottom = rival.y + rival.width;
    if (my_right > rival_left &&
      my_left < rival_right &&
      my_bottom > rival_top &&
      my_top < rival_bottom) {
      return true;
    }
    else {
      return false;
    }

    //34行目〜50行目の書き換え↓
    // return this.x + this.width > rival.x &&
    //   this.x < rival.x + rival.width &&
    //   this.y + this.height > rival.y &&
    //   this.y + this.height < rival.y + rival.height;

  }
}