// Connect to Chrome DevTools Protocol and find all elements causing horizontal overflow
const res = await fetch('http://127.0.0.1:9222/json');
const targets = await res.json();
const target = targets.find(t => t.type === 'page');

if (!target) {
  console.error('No page target found');
  process.exit(1);
}

const ws = new WebSocket(target.webSocketDebuggerUrl);

ws.onopen = () => {
  // Evaluate javascript to detect overflowing elements
  const msg = {
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `
        (() => {
          const docWidth = document.documentElement.clientWidth;
          const elements = Array.from(document.querySelectorAll('*'));
          const overflowing = [];
          for (const el of elements) {
            const rect = el.getBoundingClientRect();
            if (rect.right > docWidth + 1) {
              overflowing.push({
                tag: el.tagName,
                id: el.id,
                className: el.className?.toString().slice(0, 100),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                overflowDiff: Math.round(rect.right - docWidth)
              });
            }
          }
          return {
            docWidth,
            scrollWidth: document.documentElement.scrollWidth,
            bodyScrollWidth: document.body.scrollWidth,
            topOverflowing: overflowing.sort((a,b) => b.overflowDiff - a.overflowDiff).slice(0, 15)
          };
        })()
      `,
      returnByValue: true
    }
  };
  ws.send(JSON.stringify(msg));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.id === 1) {
    console.log(JSON.stringify(data.result.result.value, null, 2));
    process.exit(0);
  }
};
