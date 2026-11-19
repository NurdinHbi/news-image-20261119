// news-image-20261119: copy the day's front page to the make.fun output directory
// and verify it byte-for-byte. Node standard library only.
//
// The image is a newspaper front page — "THE WORLD TODAY", Thursday 19 November
// 2026 — summing up the day's world news: the Trump–Xi–Putin trilateral summit in
// Shenzhen, the ICJ's Rohingya verdict, the Crimean Bridge strike, COP31 in
// Antalya, the Gulf/Hormuz crisis, unrest in Bangladesh, and a record Van Gogh
// sale, plus a ticker of the day's other stories. It is a PNG, 1024x1024, under
// 1 MiB, and the program refuses to hand over anything else.
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const source = join(scriptDir, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dest = join(outputDir, "entry.png");

const MAX_BYTES = 1048576;
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const srcBytes = readFileSync(source);
if (!srcBytes.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error(`PNG magic-byte guard FAILED: ${source} does not start with 89 50 4E 47 0D 0A 1A 0A`);
}
// PNG IEND: the last 12 bytes must be the IEND chunk (length 0, "IEND", CRC
// AE 42 60 82) — a whole image, not a truncated one (RULES.txt: every PNG chunk
// with its checksum and the image data its header describes).
const IEND = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);
if (!srcBytes.subarray(srcBytes.length - 12).equals(IEND)) {
  throw new Error(`IEND trailer guard FAILED: ${source} does not end with a whole PNG IEND chunk`);
}
if (srcBytes.length > MAX_BYTES) {
  throw new Error(`size guard FAILED: ${source} is ${srcBytes.length} bytes, over the 1 MiB cap`);
}
// PNG IHDR: width and height are big-endian uint32 at offsets 16 and 20.
const width = srcBytes.readUInt32BE(16);
const height = srcBytes.readUInt32BE(20);
if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
  throw new Error(
    `dimension guard FAILED: ${source} is ${width}x${height}, expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`,
  );
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, dest);

const dstBytes = readFileSync(dest);
if (statSync(dest).size !== srcBytes.length) {
  throw new Error(
    `byte-length check FAILED: ${source} is ${srcBytes.length} bytes but ${dest} is ${statSync(dest).size} bytes`,
  );
}
if (!srcBytes.equals(dstBytes)) {
  throw new Error(
    `byte-for-byte verification FAILED: ${source} (${srcBytes.length} bytes) != ${dest} (${dstBytes.length} bytes)`,
  );
}

console.log(
  `copied ${source} -> ${dest} (${dstBytes.length} bytes, ${width}x${height} PNG, verified byte-for-byte)`,
);
