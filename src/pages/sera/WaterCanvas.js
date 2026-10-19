import React, { useEffect, useRef } from "react";
import "./WaterCanvas.css";

const WaterCanvas = () => {
  const canvasRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const waves = useRef([]);
  const heightField = useRef([]);
  const velocityField = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    // Initialize wave fields
    const gridWidth = 80;
    const gridHeight = 60;
    const cellWidth = canvas.width / gridWidth;
    const cellHeight = canvas.height / gridHeight;

    heightField.current = new Float32Array(gridWidth * gridHeight);
    velocityField.current = new Float32Array(gridWidth * gridHeight);

    class WaveRipple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.age = 0;
        this.lifetime = 80;
      }

      update() {
        this.age++;
      }

      draw(ctx) {
        // Distortion effect instead of visible circles
        const progress = this.age / this.lifetime;
        const radius = progress * 160;
        const strength = (1 - progress) * 0.6;

        ctx.save();
        ctx.globalAlpha = strength;
        ctx.fillStyle = "rgba(180, 200, 230, 1)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      isDone() {
        return this.age >= this.lifetime;
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX.current = e.clientX - rect.left;
      mouseY.current = e.clientY - rect.top;

      // Create ripple
      if (Math.random() > 0.6) {
        waves.current.push(new WaveRipple(mouseX.current, mouseY.current));
      }

      // Add water disturbance at grid level
      const gridX = Math.floor(mouseX.current / cellWidth);
      const gridY = Math.floor(mouseY.current / cellHeight);

      for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
          const x = gridX + i;
          const y = gridY + j;
          if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
            const idx = y * gridWidth + x;
            const dist = Math.sqrt(i * i + j * j);
            const influence = Math.max(0, 1 - dist / 3);
            heightField.current[idx] += influence * 0.4;
          }
        }
      }
    };

    const handleMouseLeave = () => {
      mouseX.current = -1000;
      mouseY.current = -1000;
    };

    const animate = () => {
      // Clear canvas completely
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update height field physics
      for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
          const idx = j * gridWidth + i;
          const centerHeight = heightField.current[idx];

          let avgHeight = 0;
          let count = 0;

          // Get neighbors
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di;
              const nj = j + dj;
              if (ni >= 0 && ni < gridWidth && nj >= 0 && nj < gridHeight) {
                avgHeight += heightField.current[nj * gridWidth + ni];
                count++;
              }
            }
          }

          avgHeight /= count;
          velocityField.current[idx] += (avgHeight - centerHeight) * 0.25;
          velocityField.current[idx] *= 0.98;
          heightField.current[idx] += velocityField.current[idx];
          heightField.current[idx] *= 0.99;
        }
      }

      // Create distortion by drawing semi-transparent color shifts that suggest light bending
      ctx.globalCompositeOperation = "multiply"; // Changed to multiply for actual color effect

      for (let i = 0; i < gridWidth; i += 2) {
        for (let j = 0; j < gridHeight; j += 2) {
          const idx = j * gridWidth + i;
          const height = heightField.current[idx];

          if (Math.abs(height) > 0.005) {
            const x = i * cellWidth;
            const y = j * cellHeight;
            const distortion = Math.abs(height) * 100;
            const opacity = Math.min(0.8, Math.abs(height) * 2);

            ctx.save();
            ctx.globalAlpha = opacity;
            // Use darker overlay for peaks, lighter for valleys to create refraction look
            ctx.fillStyle =
              height > 0 ? "rgba(150, 180, 220, 1)" : "rgba(100, 120, 150, 1)";
            ctx.beginPath();
            ctx.arc(x, y, distortion, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      ctx.globalCompositeOperation = "source-over"; // Reset

      // Update and draw ripples
      waves.current = waves.current.filter((w) => !w.isDone());
      waves.current.forEach((wave) => {
        wave.update();
        wave.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="water-canvas" />;
};

export default WaterCanvas;
