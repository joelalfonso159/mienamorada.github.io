export class Sparkle {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3;
        this.alpha = Math.random();
        this.fadeSpeed = 0.02 + Math.random() * 0.02;
    }

    draw() {
        this.ctx.save();
        this.ctx.globalAlpha = this.alpha;
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }

    update() {
        this.alpha -= this.fadeSpeed;
        this.size -= 0.1;
        return this.alpha > 0 && this.size > 0;
    }
}