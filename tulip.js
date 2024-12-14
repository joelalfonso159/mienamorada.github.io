class Tulip {
    constructor(ctx, x, y, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;
        this.baseY = y;
    }

    draw() {
        // Draw stem
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'green';
        this.ctx.lineWidth = 4;
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x, this.y - 100);
        this.ctx.stroke();

        // Draw flower
        this.ctx.fillStyle = this.color;
        
        // Draw petals
        for (let i = 0; i < 3; i++) {
            this.drawPetal(this.x, this.y - 100);
            this.ctx.translate(this.x, this.y - 100);
            this.ctx.rotate((120 * Math.PI) / 180);
            this.ctx.translate(-this.x, -(this.y - 100));
        }
    }

    drawPetal(x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.bezierCurveTo(
            x + 20, y - 20,
            x + 20, y - 40,
            x, y - 40
        );
        this.ctx.bezierCurveTo(
            x - 20, y - 40,
            x - 20, y - 20,
            x, y
        );
        this.ctx.fill();
    }

    update(time) {
        this.y = this.baseY + Math.sin(time) * 20;
    }
}