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

}