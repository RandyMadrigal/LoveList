// Renders art/hero.svg into the raster images the app ships (hero background + social preview).
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const svg = await readFile(new URL("../art/hero.svg", import.meta.url));

await sharp(svg, { density: 96 })
  .resize(1920, 1080)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(new URL("../public/hero.jpg", import.meta.url).pathname.replace(/^\/(\w:)/, "$1"));

await sharp(svg, { density: 96 })
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(new URL("../public/og.jpg", import.meta.url).pathname.replace(/^\/(\w:)/, "$1"));

console.log("hero.jpg and og.jpg written to public/");
