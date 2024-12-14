export function setupCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return ctx;
}

export function clearCanvas(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function drawText(ctx, text, options = {}) {
    const {
        x = ctx.canvas.width / 2,
        y = ctx.canvas.height * 0.8,
        font = '48px Arial',
        color = 'purple',
        align = 'center'
    } = options;

    ctx.save();
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    
    // Draw text shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    ctx.fillText(text, x, y);
    ctx.restore();
}