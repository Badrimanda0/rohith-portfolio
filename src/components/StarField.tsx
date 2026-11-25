"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; base: number; speed: number; phase: number };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

// Sky drift in px per frame; bigger (closer) stars move faster for a parallax feel
const DRIFT_X = -0.12;
const DRIFT_Y = 0.05;

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let meteor: Meteor | null = null;
    let nextMeteor = performance.now() + 3000;
    let frame = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // ~1 star per 1300px², mostly small with a good share of brighter ones
      const count = Math.round((w * h) / 1300);
      stars = Array.from({ length: count }, () => {
        const bright = Math.random() < 0.12;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: bright ? Math.random() * 0.7 + 1.2 : Math.random() * 0.6 + 0.6,
          base: bright ? 1 : Math.random() * 0.4 + 0.55,
          speed: Math.random() * 0.002 + 0.0006,
          phase: Math.random() * Math.PI * 2,
        };
      });
      draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fff";
      for (const s of stars) {
        const twinkle = reduce ? 1 : 0.75 + 0.25 * Math.sin(t * s.speed + s.phase);
        ctx.globalAlpha = s.base * twinkle;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (meteor) {
        const tail = 14;
        const grad = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x - meteor.vx * tail, meteor.y - meteor.vy * tail);
        grad.addColorStop(0, `rgba(255,255,255,${meteor.life})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x - meteor.vx * tail, meteor.y - meteor.vy * tail);
        ctx.stroke();
      }
    };

    const update = (t: number) => {
      for (const s of stars) {
        s.x += DRIFT_X * s.r;
        s.y += DRIFT_Y * s.r;
        if (s.x < -2) s.x += w + 4;
        if (s.y > h + 2) s.y -= h + 4;
      }

      if (meteor) {
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;
        meteor.life -= 0.012;
        if (meteor.life <= 0 || meteor.x < -100 || meteor.y > h + 100) meteor = null;
      } else if (t > nextMeteor) {
        const speed = 9 + Math.random() * 5;
        meteor = { x: w * (0.3 + Math.random() * 0.7), y: Math.random() * h * 0.4, vx: -speed * 0.8, vy: speed * 0.6, life: 1 };
        nextMeteor = t + 4000 + Math.random() * 6000;
      }
    };

    const loop = (t: number) => {
      update(t);
      draw(t);
      frame = requestAnimationFrame(loop);
    };

    resize();
    if (!reduce) frame = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
