// Run with: node scripts/generate-og.mjs
// Requires: npm install --save-dev @napi-rs/canvas

import { createCanvas } from "@napi-rs/canvas";
import { writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const W = 1200;
const H = 630;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#0D0F14";
ctx.fillRect(0, 0, W, H);

ctx.strokeStyle = "rgba(36, 52, 71, 0.6)";
ctx.lineWidth = 1;
for (let x = 0; x < W; x += 60) {
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, H);
  ctx.stroke();
}
for (let y = 0; y < H; y += 60) {
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(W, y);
  ctx.stroke();
}

ctx.fillStyle = "#E8873A";
ctx.fillRect(80, 80, 4, 120);

ctx.fillStyle = "#E8EDF4";
ctx.font = "bold 72px sans-serif";
ctx.fillText("Moksh Buddhadev", 112, 160);

ctx.fillStyle = "#E8873A";
ctx.font = "32px monospace";
ctx.fillText("AI/ML Engineer", 114, 210);

ctx.fillStyle = "#8896AA";
ctx.font = "22px sans-serif";
ctx.fillText("Building AI that earns its keep.", 114, 270);

ctx.fillStyle = "#243447";
ctx.fillRect(80, H - 100, W - 160, 1);
ctx.fillStyle = "#8896AA";
ctx.font = "18px monospace";
ctx.fillText("RAG · LLM Evaluation · NL-to-SQL · CUDA · FastAPI", 80, H - 64);

ctx.fillStyle = "#E8873A";
ctx.beginPath();
ctx.arc(W - 120, 120, 40, 0, Math.PI * 2);
ctx.fill();
ctx.fillStyle = "#0D0F14";
ctx.beginPath();
ctx.arc(W - 120, 120, 28, 0, Math.PI * 2);
ctx.fill();

mkdirSync(join(__dirname, "../public"), { recursive: true });
const buffer = canvas.toBuffer("image/png");
writeFileSync(join(__dirname, "../public/og-image.png"), buffer);
console.log("✓ OG image generated at public/og-image.png");
