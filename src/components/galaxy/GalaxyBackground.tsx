import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speedX: number;
  speedY: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  speedX: number;
  speedY: number;
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Stars
    const stars: Star[] = Array.from({ length: 160 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.08,
      speedY: (Math.random() - 0.5) * 0.08,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Nebula blobs
    const nebulae: Nebula[] = [
      { x: 0.15, y: 0.2, radius: 220, color: '192,148,44', opacity: 0.035, speedX: 0.00012, speedY: 0.00008 },
      { x: 0.8, y: 0.6, radius: 280, color: '192,148,44', opacity: 0.025, speedX: -0.0001, speedY: 0.00006 },
      { x: 0.5, y: 0.85, radius: 180, color: '160,120,30', opacity: 0.03, speedX: 0.00008, speedY: -0.0001 },
      { x: 0.9, y: 0.1, radius: 150, color: '200,160,60', opacity: 0.02, speedX: -0.00012, speedY: 0.00009 },
    ];

    const draw = () => {
      timeRef.current += 1;
      const t = timeRef.current;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Draw nebulae
      for (const n of nebulae) {
        const nx = ((n.x + n.speedX * t) % 1.4 - 0.2) * W;
        const ny = ((n.y + n.speedY * t) % 1.2 - 0.1) * H;
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.radius);
        grad.addColorStop(0, `rgba(${n.color},${n.opacity})`);
        grad.addColorStop(0.5, `rgba(${n.color},${n.opacity * 0.4})`);
        grad.addColorStop(1, `rgba(${n.color},0)`);
        ctx.beginPath();
        ctx.arc(nx, ny, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Draw stars
      for (const s of stars) {
        s.x += s.speedX;
        s.y += s.speedY;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.3 + 0.7;
        const alpha = s.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 190, 120, ${alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="galaxy-canvas"
      aria-hidden="true"
    />
  );
}
