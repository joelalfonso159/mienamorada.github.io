const canvas = document.getElementById('tulipCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Create tulips
const colors = ['#FF69B4', '#FF1493', '#FF0000'];
const tulips = colors.map((color, index) => {
    const x = canvas.width * (index + 1) / 4;
    const y = canvas.height * 0.7;
    return new Tulip(ctx, x, y, color);
});

// Animation loop
let time = 0;
function animate() {
    // Clear canvas
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw name
    ctx.font = '48px Arial';
    ctx.fillStyle = 'purple';
    ctx.textAlign = 'center';
    ctx.fillText('Jeydy', canvas.width / 2, canvas.height * 0.8);

    // Update and draw tulips
    tulips.forEach((tulip, index) => {
        tulip.update(time + index);
        tulip.draw();
    });

    time += 0.05;
    requestAnimationFrame(animate);
}

animate();