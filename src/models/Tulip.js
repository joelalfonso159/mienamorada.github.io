import { TULIP } from '../utils/constants.js';

export class Tulip {
    constructor(ctx, x, y, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;
        this.baseY = y;
        this.rotation = 0;
    }

    drawStem() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#228B22';
        this.ctx.lineWidth = 4;
        
        // Draw curved stem
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.bezierCurveTo(
            this.x, this.y - TULIP.STEM_LENGTH / 2,
            this.x + Math.sin(this.rotation) * 20, this.y - TULIP.STEM_LENGTH / 2,
            this.x, this.y - TULIP.STEM_LENGTH
        );
        this.ctx.stroke();
        
        // Draw leaves
        this.drawLeaf(this.y - TULIP.STEM_LENGTH * 0.3, -1);
        this.drawLeaf(this.y - TULIP.STEM_LENGTH * 0.6, 1);
        this.ctx.restore();
    }

    drawLeaf(yPos, direction) {
        this.ctx.save();
        this.ctx.fillStyle = '#32CD32';
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, yPos);
        this.ctx.bezierCurveTo(
            this.x + (20 * direction), yPos - 10,
            this.x + (30 * direction), yPos - 5,
            this.x + (40 * direction), yPos - 15
        );
        this.ctx.bezierCurveTo(
            this.x + (30 * direction), yPos + 5,
            this.x + (20 * direction), yPos + 10,
            this.x, yPos
        );
        this.ctx.fill();
        this.ctx.restore();
    }

    drawPetal(x, y) {
        this.ctx.save();
        
        // Draw petal shadow
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        this.ctx.shadowBlur = 5;
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;

        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        
        // Enhanced petal shape with more curves
        this.ctx.bezierCurveTo(
            x + TULIP.PETAL_SIZE, y - TULIP.PETAL_SIZE,
            x + TULIP.PETAL_SIZE * 1.2, y - TULIP.PETAL_SIZE * 2,
            x, y - TULIP.PETAL_SIZE * 2.2
        );
        this.ctx.bezierCurveTo(
            x - TULIP.PETAL_SIZE * 1.2, y - TULIP.PETAL_SIZE * 2,
            x - TULIP.PETAL_SIZE, y - TULIP.PETAL_SIZE,
            x, y
        );

        // Create gradient for more realistic coloring
        const gradient = this.ctx.createRadialGradient(x, y - TULIP.PETAL_SIZE, 0, x, y - TULIP.PETAL_SIZE, TULIP.PETAL_SIZE * 2);
        gradient.addColorStop(0, this.color);
        
        // Calculate darker shade for gradient
        const darker = this.adjustColor(this.color, -30);
        gradient.addColorStop(1, darker);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        // Add petal details
        this.ctx.strokeStyle = this.adjustColor(this.color, -20);
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
        
        this.ctx.restore();
    }

    adjustColor(hex, percent) {
        // Convert hex to RGB
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);

        // Adjust each component
        r = Math.max(0, Math.min(255, r + (r * percent / 100)));
        g = Math.max(0, Math.min(255, g + (g * percent / 100)));
        b = Math.max(0, Math.min(255, b + (b * percent / 100)));

        // Convert back to hex
        const rHex = Math.round(r).toString(16).padStart(2, '0');
        const gHex = Math.round(g).toString(16).padStart(2, '0');
        const bHex = Math.round(b).toString(16).padStart(2, '0');

        return `#${rHex}${gHex}${bHex}`;
    }

    draw() {
        this.ctx.save();
        
        // Draw stem and leaves
        this.drawStem();
        
        // Draw flower at the top of stem
        this.ctx.translate(this.x, this.y - TULIP.STEM_LENGTH);
        
        // Draw multiple layers of petals for fuller appearance
        for (let layer = 0; layer < 3; layer++) {
            for (let i = 0; i < 3; i++) {
                this.drawPetal(0, 0);
                this.ctx.rotate((120 * Math.PI) / 180);
            }
            this.ctx.scale(0.8, 0.8);
        }
        
        this.ctx.restore();
    }

    update(time) {
        // Complex movement combining wave and slight rotation
        this.y = this.baseY + Math.sin(time) * 25;
        this.rotation = Math.sin(time * 0.5) * 0.1;
    }
}