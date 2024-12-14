import { COLORS } from '../utils/colors.js';

export class Butterfly {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.wingAngle = 0;
        this.speed = 1 + Math.random();
        this.amplitude = 50 + Math.random() * 50;
        this.timeOffset = Math.random() * Math.PI * 2;
    }

    draw(time) {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        
        // Wing flapping animation
        const wingBeat = Math.sin(time * 8 + this.timeOffset) * 0.5;
        
        // Draw wings
        this.drawWing(wingBeat, 1, COLORS.BUTTERFLY_BLUE);
        this.drawWing(wingBeat, -1, COLORS.BUTTERFLY_PURPLE);
        
        // Draw body
        this.ctx.beginPath();
        this.ctx.fillStyle = '#333';
        this.ctx.ellipse(0, 0, 2, 8, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
    }

    drawWing(wingBeat, direction, color) {
        this.ctx.save();
        this.ctx.rotate(wingBeat * direction);
        
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        
        // Create heart-shaped wing
        this.ctx.moveTo(0, 0);
        this.ctx.bezierCurveTo(
            10 * direction, -15,
            20 * direction, -20,
            0, -25
        );
        this.ctx.bezierCurveTo(
            -20 * direction, -20,
            -10 * direction, -15,
            0, 0
        );
        
        this.ctx.fill();
        this.ctx.restore();
    }

    update(time) {
        // Butterfly movement pattern
        this.x += Math.sin(time + this.timeOffset) * 2 * this.speed;
        this.y = this.y + Math.sin(time * 2 + this.timeOffset) * 1.5;
        
        // Keep butterfly within canvas bounds
        const canvas = this.ctx.canvas;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.y > canvas.height - 100) this.y = canvas.height - 100;
        if (this.y < 100) this.y = 100;
    }
}