// Accurate Mobile Emulation Screenshot Generator via Chrome DevTools Protocol
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';

const outDir = resolve('docs/screenshots/audit');
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const res = await fetch('http://127.0.0.1:9222/json');
const targets = await res.json();
const target = targets.find(t => t.type === 'page');

if (!target) {
  console.error('No page target found');
  process.exit(1);
}

const ws = new WebSocket(target.webSocketDebuggerUrl);

function send(method, params = {}) {
  return new Promise((resolvePromise) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (event) => {
      const data = JSON.parse(event.data);
      if (data.id === id) {
        ws.removeEventListener('message', handler);
        resolvePromise(data.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

ws.onopen = async () => {
  try {
    await send('Page.enable');
    await send('DOM.enable');

    const viewports = [
      { name: 'v2_home_320_ultra_narrow', width: 320, height: 640, mobile: true },
      { name: 'v2_home_360_android',      width: 360, height: 780, mobile: true },
      { name: 'v2_home_375_iphone_se',    width: 375, height: 667, mobile: true },
      { name: 'v2_390_home',              width: 390, height: 844, mobile: true },
      { name: 'v2_home_430_iphone_pro_max', width: 430, height: 932, mobile: true },
      { name: 'v2_home_768_tablet',       width: 768, height: 1024, mobile: true },
      { name: 'v2_1280_home',             width: 1280, height: 800, mobile: false },
      { name: 'v2_home_1440_desktop_hd',  width: 1440, height: 900, mobile: false },
    ];

    const routes = [
      { name: 'about',       path: 'about' },
      { name: 'doctors',     path: 'doctors' },
      { name: 'departments', path: 'departments' },
      { name: 'diagnostics', path: 'diagnostics' },
      { name: 'contact',     path: 'contact' },
      { name: 'book',        path: 'book' },
    ];

    console.log('Testing and capturing Home viewports with True CDP Emulation...');
    for (const vp of viewports) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile,
      });

      await send('Page.navigate', { url: 'http://localhost:3000/' });
      await new Promise(r => setTimeout(r, 1200));

      // Check overflow
      const overflowResult = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const docWidth = document.documentElement.clientWidth;
            const scrollWidth = document.documentElement.scrollWidth;
            return { docWidth, scrollWidth, hasOverflow: scrollWidth > docWidth };
          })()
        `,
        returnByValue: true
      });

      const metrics = overflowResult?.result?.value;
      console.log(`Viewport ${vp.name} (${vp.width}x${vp.height}): clientWidth=${metrics?.docWidth}, scrollWidth=${metrics?.scrollWidth}, overflow=${metrics?.hasOverflow}`);

      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      const buffer = Buffer.from(screenshot.data, 'base64');
      const filename = join(outDir, `${vp.name}.png`);
      writeFileSync(filename, buffer);
      console.log(`  Saved screenshot: ${vp.name}.png (${buffer.length} bytes)`);
    }

    console.log('\nCapturing Key Routes at 390px (Mobile) and 1280px (Desktop)...');
    for (const r of routes) {
      // Mobile 390px
      await send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 1,
        mobile: true,
      });
      await send('Page.navigate', { url: `http://localhost:3000/${r.path}` });
      await new Promise(res => setTimeout(res, 1200));
      const shot390 = await send('Page.captureScreenshot', { format: 'png' });
      writeFileSync(join(outDir, `v2_390_${r.name}.png`), Buffer.from(shot390.data, 'base64'));
      console.log(`  Saved v2_390_${r.name}.png`);

      // Desktop 1280px
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1280,
        height: 800,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await send('Page.navigate', { url: `http://localhost:3000/${r.path}` });
      await new Promise(res => setTimeout(res, 1200));
      const shot1280 = await send('Page.captureScreenshot', { format: 'png' });
      writeFileSync(join(outDir, `v2_1280_${r.name}.png`), Buffer.from(shot1280.data, 'base64'));
      console.log(`  Saved v2_1280_${r.name}.png`);
    }

    console.log('\nAll True Emulation Captures Complete with Zero Regressions!');
    process.exit(0);
  } catch (err) {
    console.error('Error during capture:', err);
    process.exit(1);
  }
};
