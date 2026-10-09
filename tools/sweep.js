// 앱에서 모션을 하나씩 열어 데모 안의 런타임 오류를 모읍니다 (헤드리스 Chrome).
// 준비: npm i --no-save playwright && npx playwright install chromium
// 사용법: node tools/sweep.js [앱 주소] [스크린샷할 id,id,...]
//   예) node tools/sweep.js http://127.0.0.1:8790/ particle-wave,glitch-text
//   스크린샷은 tools/shots/<id>.png 에 저장됩니다 (git에서 제외됨).
const path = require('path');
const fs = require('fs');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (e) {
  console.error('playwright가 없습니다. 먼저 실행하세요: npm i --no-save playwright && npx playwright install chromium');
  process.exit(2);
}

const base = process.argv[2] || 'http://127.0.0.1:8790/';
const shots = (process.argv[3] || '').split(',').filter(Boolean);
const outDir = path.join(__dirname, 'shots');

(async () => {
  const browser = await chromium.launch();
  // 미리보기는 '동작 줄이기'와 관계없이 재생돼야 하므로 reduce 환경에서 검사합니다
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  page.on('pageerror', (e) => console.log('APP PAGEERR', e.message));
  page.on('console', (m) => { if (m.type() === 'error') console.log('APP CONSOLE', m.text()); });
  await page.goto(base);
  await page.waitForTimeout(800);
  const ids = await page.evaluate(() => Array.from(document.querySelectorAll('.item')).map((b) => b.dataset.id));
  console.log('items in list:', ids.length);
  if (shots.length) fs.mkdirSync(outDir, { recursive: true });
  for (const id of ids) {
    await page.evaluate((id) => { location.hash = id; }, id);
    const shoot = shots.includes(id);
    await page.waitForTimeout(shoot ? 2200 : 700);
    if (shoot) await page.screenshot({ path: path.join(outDir, id + '.png') });
  }
  await page.waitForTimeout(1000);
  const errs = await page.evaluate(() => window.__motionErrors);
  console.log('motion errors:', JSON.stringify(errs, null, 1));
  await browser.close();
  process.exit(errs.length ? 1 : 0);
})();
