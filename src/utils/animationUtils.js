import { COLORS } from './colors.js';
import { ANIMATION, TULIP } from './constants.js';
import { Sparkle } from '../models/Sparkle.js';

export function createSparkles(ctx, x, y, count = 5) {
    const sparkles = [];
    for (let i = 0; i < count; i++) {
        sparkles.push(new Sparkle(
            ctx,
            x + (Math.random() - 0.5) * 50,
            y + (Math.random() - 0.5) * 50
        ));
    }
    return sparkles;
}

export function drawBackground(ctx) {
    // Create gradient sky
    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradient.addColorStop(0, COLORS.SKY_BLUE);
    gradient.addColorStop(1, COLORS.SKY_LIGHT);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function drawHearts(ctx, time) {
    ctx.save();
    ctx.fillStyle = COLORS.HEART_PINK;
    
    for (let i = 0; i < ANIMATION.HEART_COUNT; i++) {
        const x = Math.sin(time + i) * 100 + ctx.canvas.width * (i / ANIMATION.HEART_COUNT);
        const y = Math.cos(time + i) * 50 + ctx.canvas.height * 0.3;
        const size = 10 + Math.sin(time + i) * 5;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(
            x - size, y - size,
            x - size, y - size * 2,
            x, y - size * 2
        );
        ctx.bezierCurveTo(
            x + size, y - size * 2,
            x + size, y - size,
            x, y
        );
        ctx.fill();
    }
    ctx.restore();
}