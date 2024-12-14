import { setupCanvas, drawText } from './utils/canvas.js';
import { COLORS } from './utils/colors.js';
import { ANIMATION, MESSAGES, TULIP } from './utils/constants.js';
import { Tulip } from './models/Tulip.js';
import { Butterfly } from './models/Butterfly.js';
import { createSparkles, drawBackground, drawHearts } from './utils/animationUtils.js';

const canvas = document.getElementById('tulipCanvas');
const ctx = setupCanvas(canvas);

// Create tulips with different colors
const tulips = [
    new Tulip(ctx, canvas.width * 0.25, canvas.height * 0.7, COLORS.TULIP_PINK),
    new Tulip(ctx, canvas.width * 0.5, canvas.height * 0.7, COLORS.TULIP_RED),
    new Tulip(ctx, canvas.width * 0.75, canvas.height * 0.7, COLORS.TULIP_DEEP_RED)
];

// Create butterflies
const butterflies = Array.from({ length: ANIMATION.BUTTERFLY_COUNT }, () => 
    new Butterfly(
        ctx,
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.6 + 100
    )
);

// Sparkle effects
let sparkles = [];

// Animation state
let time = 0;
let messageIndex = 0;
let lastMessageChange = 0;

function animate() {
    // Draw background and hearts
    drawBackground(ctx);
    drawHearts(ctx, time);

    // Update and draw butterflies
    butterflies.forEach(butterfly => {
        butterfly.update(time);
        butterfly.draw(time);
    });

    // Update and draw tulips
    tulips.forEach((tulip, index) => {
        tulip.update(time + index * 0.5);
        tulip.draw();
        
        // Add sparkles around tulips
        if (Math.random() < 0.1) {
            sparkles.push(...createSparkles(
                ctx,
                tulip.x,
                tulip.y - TULIP.STEM_LENGTH,
                2
            ));
        }
    });

    // Update and draw sparkles
    sparkles = sparkles.filter(sparkle => {
        sparkle.draw();
        return sparkle.update();
    });

    // Draw name with enhanced styling
    drawText(ctx, 'Jeydy', {
        y: canvas.height * 0.85,
        font: 'bold 52px "Brush Script MT", cursive',
        color: COLORS.TEXT_PURPLE
    });

    // Cycle through romantic messages
    if (time - lastMessageChange > 3) {
        messageIndex = (messageIndex + 1) % MESSAGES.length;
        lastMessageChange = time;
    }

    // Draw current romantic message
    drawText(ctx, MESSAGES[messageIndex], {
        y: canvas.height * 0.92,
        font: '24px Arial',
        color: COLORS.TULIP_RED
    });

    time += ANIMATION.WAVE_SPEED;
    requestAnimationFrame(animate);
}

// Add interactivity
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    sparkles.push(...createSparkles(ctx, x, y, 2));
});

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    sparkles.push(...createSparkles(ctx, x, y, 10));
});

// Start animation
animate();