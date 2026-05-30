import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const logoPath = path.join(root, "public", "logo.png");
const iconPath = path.join(root, "app", "icon.png");
const verifyDir = path.join(root, "scripts", "logo-verify");

async function analyzeImage(filePath, label) {
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const total = info.width * info.height;
  let fullyTransparent = 0;
  let fullyOpaque = 0;
  let opaqueWhite = 0;
  let opaqueBlack = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a === 0) fullyTransparent++;
    if (a === 255) fullyOpaque++;
    if (a > 240 && r > 240 && g > 240 && b > 240) opaqueWhite++;
    if (a > 240 && r < 15 && g < 15 && b < 15) opaqueBlack++;
  }

  const corners = [
    [0, 0],
    [info.width - 1, 0],
    [0, info.height - 1],
    [info.width - 1, info.height - 1],
  ].map(([x, y]) => {
    const i = (y * info.width + x) * 4;
    return { x, y, rgba: [data[i], data[i + 1], data[i + 2], data[i + 3]] };
  });

  console.log(`\n=== ${label} ===`);
  console.log(`Size: ${info.width}x${info.height}, channels: ${info.channels}`);
  console.log(`Fully transparent: ${fullyTransparent} (${((100 * fullyTransparent) / total).toFixed(1)}%)`);
  console.log(`Fully opaque: ${fullyOpaque} (${((100 * fullyOpaque) / total).toFixed(1)}%)`);
  console.log(`Opaque near-white bg pixels: ${opaqueWhite}`);
  console.log(`Opaque near-black bg pixels: ${opaqueBlack}`);
  console.log("Corner pixels:", corners);

  return { data, info };
}

async function cleanLogoHalos(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let cleaned = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a === 0 || a === 255) continue;

    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const isNeutral = Math.abs(r - g) < 35 && Math.abs(g - b) < 35;

    // Remove leftover white or black matte fringing without touching logo colors.
    if (isNeutral && (lum > 170 || lum < 45)) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 0;
      cleaned++;
    }
  }

  console.log(`\nCleaned ${cleaned} fringe pixels.`);

  const buffer = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  fs.writeFileSync(inputPath, buffer);
  fs.writeFileSync(iconPath, buffer);

  return buffer;
}

async function createVerificationImages(logoBuffer) {
  fs.mkdirSync(verifyDir, { recursive: true });

  const meta = await sharp(logoBuffer).metadata();
  const pad = 40;
  const canvasW = meta.width + pad * 2;
  const canvasH = meta.height + pad * 2;

  const lightBg = await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([{ input: logoBuffer, top: pad, left: pad }])
    .png()
    .toFile(path.join(verifyDir, "on-light-background.png"));

  const darkBg = await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 3,
      background: { r: 15, g: 23, b: 42 },
    },
  })
    .composite([{ input: logoBuffer, top: pad, left: pad }])
    .png()
    .toFile(path.join(verifyDir, "on-dark-background.png"));

  console.log("\nVerification images written to scripts/logo-verify/");
  return { lightBg, darkBg };
}

console.log("Inspecting public/logo.png...");
await analyzeImage(logoPath, "BEFORE");

const cleanedBuffer = await cleanLogoHalos(logoPath);
await analyzeImage(logoPath, "AFTER");
await createVerificationImages(cleanedBuffer);

console.log("\nUpdated public/logo.png and app/icon.png");
