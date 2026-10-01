// Decode a local reference recording. No upload and no changes to the source video.
const { chromium } = require(process.argv[3] || 'playwright');
const { pathToFileURL } = require('node:url');
const fs = require('node:fs/promises');
const sharp = require('sharp');

(async () => {
  const output = 'output/motto-video-review';
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(process.argv[2]).href);
    await page.waitForFunction(() => document.querySelector('video')?.readyState >= 2);
    const metadata = await page.locator('video').evaluate(video => {
      video.pause();
      video.controls = false;
      return { duration: video.duration, width: video.videoWidth, height: video.videoHeight };
    });
    await page.setViewportSize({ width: metadata.width, height: metadata.height });
    await page.addStyleTag({ content: 'html,body{margin:0!important;padding:0!important;overflow:hidden!important}video{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;max-height:none!important}' });
    const times = process.argv[4] ? process.argv[4].split(',').map(Number)
      : Array.from({ length: Math.ceil(metadata.duration) }, (_, index) => index);
    const tiles = [];
    for (const time of times) {
      await page.locator('video').evaluate(async (video, time) => {
        await new Promise(resolve => {
          video.addEventListener('seeked', resolve, { once: true });
          video.currentTime = Math.max(0.001, time);
        });
      }, time);
      const frame = await page.locator('video').screenshot();
      const label = time.toFixed(2);
      await fs.writeFile(`${output}/frame-${label}.png`, frame);
      const thumb = await sharp(frame).resize({ width: 640 }).extend({ top: 28, bottom: 0, left: 0, right: 0, background: '#222' }).composite([
        { input: Buffer.from(`<svg width="640" height="28"><text x="12" y="20" fill="white" font-size="18" font-family="Arial">${label}s</text></svg>`), top: 0, left: 0 },
      ]).png().toBuffer();
      tiles.push(thumb);
    }
    const tileHeight = Math.round(640 * metadata.height / metadata.width) + 28;
    for (let start = 0; start < tiles.length; start += 9) {
      const group = tiles.slice(start, start + 9);
      await sharp({ create: { width: 1920, height: tileHeight * Math.ceil(group.length / 3), channels: 3, background: '#333' } }).composite(
        group.map((input, index) => ({ input, left: (index % 3) * 640, top: Math.floor(index / 3) * tileHeight })),
      ).png().toFile(`${output}/sheet-${times[start].toFixed(2)}.png`);
    }
    console.log(JSON.stringify({ ...metadata, times, output }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
