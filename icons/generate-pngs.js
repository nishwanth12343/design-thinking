const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPng(width, height) {
    // 8-byte PNG signature
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

    // IHDR chunk
    const ihdrData = Buffer.alloc(13);
    ihdrData.writeUInt32BE(width, 0);
    ihdrData.writeUInt32BE(height, 4);
    ihdrData[8] = 8; // bit depth
    ihdrData[9] = 6; // color type (RGBA)
    ihdrData[10] = 0; // compression
    ihdrData[11] = 0; // filter
    ihdrData[12] = 0; // interlace

    const ihdrChunk = makeChunk('IHDR', ihdrData);

    // Raw image data with filter byte (0 = None) at start of each row
    const rowLength = width * 4;
    const rawBuffer = Buffer.alloc(height * (rowLength + 1));

    const cx = width / 2;
    const cy = height / 2;
    const r = width * 0.46;

    for (let y = 0; y < height; y++) {
        const rowOffset = y * (rowLength + 1);
        rawBuffer[rowOffset] = 0; // Filter type 0

        for (let x = 0; x < width; x++) {
            const pxOffset = rowOffset + 1 + (x * 4);
            const dx = x - cx;
            const dy = y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > r) {
                // Transparent outer border for rounded app icon
                rawBuffer[pxOffset] = 0;
                rawBuffer[pxOffset + 1] = 0;
                rawBuffer[pxOffset + 2] = 0;
                rawBuffer[pxOffset + 3] = 0;
            } else {
                // FarmDirect rich emerald gradient (top-left #059669 to bottom-right #04432b)
                const gradRatio = (x + y) / (width + height);
                const red = Math.round(5 + gradRatio * 15);
                const green = Math.round(180 - gradRatio * 115);
                const blue = Math.round(110 - gradRatio * 75);

                // Check if inside center sprout leaf shape
                const leafDist = Math.sqrt((x - cx) * (x - cx) + (y - (cy - height * 0.05)) * (y - (cy - height * 0.05)));
                if (leafDist < width * 0.22) {
                    // Sprout bright leaf (#86efac to #34d399)
                    rawBuffer[pxOffset] = 134;
                    rawBuffer[pxOffset + 1] = 239;
                    rawBuffer[pxOffset + 2] = 172;
                    rawBuffer[pxOffset + 3] = 255;
                } else {
                    rawBuffer[pxOffset] = red;
                    rawBuffer[pxOffset + 1] = green;
                    rawBuffer[pxOffset + 2] = blue;
                    rawBuffer[pxOffset + 3] = 255;
                }
            }
        }
    }

    const compressed = zlib.deflateSync(rawBuffer);
    const idatChunk = makeChunk('IDAT', compressed);

    // IEND chunk
    const iendChunk = makeChunk('IEND', Buffer.alloc(0));

    return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
    const len = data.length;
    const chunk = Buffer.alloc(12 + len);
    chunk.writeUInt32BE(len, 0);
    chunk.write(type, 4, 4, 'ascii');
    data.copy(chunk, 8);

    const crcVal = crc32(chunk.slice(4, 8 + len));
    chunk.writeUInt32BE(crcVal >>> 0, 8 + len);
    return chunk;
}

// CRC32 table & function
const crcTable = [];
for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
}

function crc32(buf) {
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
}

const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

fs.writeFileSync(path.join(iconsDir, 'icon-192.png'), createPng(192, 192));
fs.writeFileSync(path.join(iconsDir, 'icon-512.png'), createPng(512, 512));
console.log('✅ Generated icons/icon-192.png and icons/icon-512.png successfully!');
