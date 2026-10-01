/* node scripts/verify-home-scenes.cjs [path-to-playwright] */
const { chromium } = require(process.argv[2] || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const output = 'output/home-scenes';

(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const reports = [];
  try {
    for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 568 }, { width: 1440, height: 720 }, { width: 2540, height: 1258 }, { width: 768, height: 1024 }]) {
      const page = await browser.newPage({ viewport });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(150);
      const readingDistance = await page.locator('.editorial-home').evaluate(el => parseFloat(el.style.getPropertyValue('--opening-read-distance')));
      const prefix = `${output}/${viewport.width}x${viewport.height}`;
      const scroll = async y => {
        await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y);
        await page.waitForTimeout(120);
      };
      const state = () => page.evaluate(() => {
        const visual = document.querySelector('[data-opening-visual]');
        const hero = document.getElementById('intro-title').closest('section');
        const panel = document.querySelector('[data-statement-panel]');
        const stage = document.querySelector('[data-opening-stage]');
        return {
          y: scrollY, clip: getComputedStyle(visual).clipPath,
          scale: getComputedStyle(visual.querySelector('img')).transform,
          heroOpacity: Number(getComputedStyle(hero).opacity),
          title: [...document.querySelectorAll('#intro-title > span > span')].map(el => Number(getComputedStyle(el).opacity)),
          panelTop: panel.getBoundingClientRect().top,
          stageTop: stage.getBoundingClientRect().top,
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      const shots = [];
      for (const [name, fraction] of [['blank', 0], ['title', .65], ['exit', 1.04], ['aperture', 1.22], ['image', 1.65], ['cover', 2.18], ['statement', 2.65], ['release', 3.05]]) {
        await scroll(viewport.height * fraction + (fraction > .65 ? readingDistance : 0));
        const shot = await state();
        assert.equal(shot.overflow, false, `${name}: horizontal overflow`);
        shots.push({ name, ...shot });
        await page.screenshot({ path: `${prefix}-${name}.png` });
      }
      assert(shots[0].title.every(value => value === 0), 'Opening remains blank');
      assert(shots[1].title.every(value => value === 1), 'Title fully readable before exit');
      assert(shots[2].heroOpacity > 0 && shots[2].heroOpacity < 1, 'Explicit outgoing scene');
      assert.equal(shots[4].heroOpacity, 0, 'Hero removed behind image');
      assert((shots[4].clip.match(/[\d.]+/g) || []).every(value => Number(value) === 0), 'Image fully open');
      assert(shots[5].panelTop > 80 && shots[5].panelTop < viewport.height - 50, 'Next screen covers image partway');
      assert(Math.abs(shots[6].panelTop - (viewport.width < 768 ? 78 : 80)) < 2, 'Statement lands under header');
      assert(shots[6].stageTop > 60, 'Outgoing stage holds its position through covering');
      assert(shots[7].stageTop < shots[6].stageTop - 100, 'Stage releases after scene transition');

      await scroll(viewport.height * 1.22 + readingDistance);
      const beforePause = await state();
      await page.waitForTimeout(750);
      assert.deepEqual(await state(), beforePause, 'No progress without scroll');
      await scroll(viewport.height * 2.65 + readingDistance);
      await scroll(viewport.height * 1.22 + readingDistance);
      assert.deepEqual(await state(), beforePause, 'Reverse returns to exactly the same transition');

      // Type never shrinks with viewport height. Read overflow before the exit starts.
      await scroll(viewport.height * .65);
      const heroTop = await page.locator('#intro-title').evaluate(title => title.getBoundingClientRect().top);
      assert(heroTop >= 64, 'Heading top must have breathing room');
      await scroll(viewport.height * .65 + readingDistance);
      await page.screenshot({ path: `${prefix}-read.png` });
      const heroFit = await page.locator('#intro-title').evaluate(title => {
        const link = title.closest('section').querySelector('a').getBoundingClientRect();
        return { size: parseFloat(getComputedStyle(title).fontSize), linkBottom: link.bottom };
      });
      assert(heroFit.linkBottom <= viewport.height + 1, `CTA clipping: ${JSON.stringify(heroFit)}`);
      if (viewport.width === 1440) assert(heroFit.size > 190, 'Desktop title must retain its scale on short screens');

      // A keyboard user can reach an outgoing link without landing on an invisible target.
      await scroll(viewport.height * 1.65 + readingDistance);
      await page.locator('#intro-title').locator('xpath=..').locator('a').focus();
      await page.waitForTimeout(120);
      assert.equal((await state()).heroOpacity, 1, 'Keyboard focus restores hero');
      await page.evaluate(() => document.activeElement.blur());

      // Long lists retain native scroll; covering is limited to the opening.
      await page.locator('#work').evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
      await page.waitForTimeout(120);
      const beforeWheel = await page.evaluate(() => scrollY);
      await page.screenshot({ path: `${prefix}-work-heading.png` });
      await page.mouse.wheel(0, 260);
      await page.waitForTimeout(200);
      assert(await page.evaluate(() => scrollY) > beforeWheel + 100, 'Gallery trapped by scene');
      await page.locator('#work article img').first().evaluate(img => img.decode());
      const grid = await page.locator('#work ol').evaluate(el => {
        const box = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return { left: box.left, columns: style.gridTemplateColumns.split(' ').length, gap: parseFloat(style.rowGap) };
      });
      assert.equal(grid.columns, viewport.width < 768 ? 1 : 2);
      assert(grid.left >= (viewport.width < 768 ? 24 : viewport.width > 1100 ? 96 : 48), 'Editorial side margins');
      assert(grid.gap >= 64, 'Cards require breathing room');
      await page.screenshot({ path: `${prefix}-work.png` });
      await page.locator('#work article a').last().focus();
      await page.waitForTimeout(120);
      assert.equal(await page.locator('#work [data-image]').last().evaluate(el => (getComputedStyle(el).clipPath.match(/[\d.]+/g) || []).every(value => Number(value) === 0)), true, 'Keyboard card visible');
      await page.evaluate(() => document.activeElement.blur());

      const footerTop = await page.locator('.home-footer').evaluate(el => el.getBoundingClientRect().top + scrollY);
      await scroll(footerTop - viewport.height * .6);
      await page.screenshot({ path: `${prefix}-footer-mid.png` });
      const footerMiddle = await page.locator('.home-footer > .container').evaluate(el => getComputedStyle(el).transform);
      await page.waitForTimeout(600);
      assert.equal(await page.locator('.home-footer > .container').evaluate(el => getComputedStyle(el).transform), footerMiddle);
      await scroll(await page.evaluate(() => document.documentElement.scrollHeight));
      await page.screenshot({ path: `${prefix}-footer-end.png` });
      const footerEnd = await page.locator('.back-top').evaluate(el => el.getBoundingClientRect().bottom);
      assert(footerEnd <= viewport.height, 'Footer links must not be clipped');
      assert.equal(await page.locator('.home-footer > .container').evaluate(el => getComputedStyle(el).transform), 'matrix(1, 0, 0, 1, 0, 0)', 'Footer must settle completely');

      await scroll(viewport.height * 1.22 + readingDistance);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(150);
      assert.equal(await page.locator('.editorial-home').getAttribute('data-scroll-intro'), null);
      assert.equal(await page.locator('[data-opening-stage]').evaluate(el => getComputedStyle(el).position), 'static');
      assert.equal(await page.locator('[data-opening-visual]').evaluate(el => getComputedStyle(el).clipPath), 'none');
      await page.screenshot({ path: `${prefix}-reduced.png` });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.waitForTimeout(150);
      await scroll(0);
      await page.mouse.wheel(0, viewport.height * 1.22);
      await page.waitForTimeout(220);
      assert.equal((await state()).overflow, false);
      // Client-side unmount must release footer and header animation state.
      await page.locator('.home-footer .footer-project-link').focus();
      await page.locator('.home-footer .footer-project-link').press('Enter');
      await page.waitForURL('**/contact');
      assert.equal(await page.locator('.editorial-home').count(), 0);
      assert.equal(await page.locator('.home-footer > .container').evaluate(el => getComputedStyle(el).transform), 'none');
      await page.goBack({ waitUntil: 'networkidle' });
      await page.waitForTimeout(150);
      assert.equal(await page.locator('[data-opening-visual]').count(), 1);
      assert.equal(errors.length, 0, errors.join('\n'));
      reports.push({ viewport, readingDistance, shots, heroFit, grid, footerMiddle, errors });
      await page.close();
    }
    const noJs = await browser.newPage({ javaScriptEnabled: false });
    await noJs.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
    assert.equal(await noJs.locator('[data-opening-stage]').evaluate(el => getComputedStyle(el).position), 'static');
    assert.equal(await noJs.locator('#intro-title').evaluate(el => getComputedStyle(el).opacity), '1');
    await noJs.close();
    await fs.writeFile(`${output}/results.json`, JSON.stringify(reports, null, 2));
    console.log(JSON.stringify(reports, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
