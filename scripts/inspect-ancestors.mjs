// Inspect ancestors of overflowing element
const res = await fetch('http://127.0.0.1:9222/json');
const targets = await res.json();
const target = targets.find(t => t.type === 'page');

const ws = new WebSocket(target.webSocketDebuggerUrl);

ws.onopen = () => {
  const msg = {
    id: 2,
    method: 'Runtime.evaluate',
    params: {
      expression: `
        (() => {
          const el = Array.from(document.querySelectorAll('*')).find(e => Math.round(e.getBoundingClientRect().right) === 777);
          if (!el) return { error: 'Element not found' };
          
          const chain = [];
          let cur = el;
          while (cur && cur !== document.body) {
            chain.push({
              tag: cur.tagName,
              id: cur.id,
              className: cur.className?.toString().slice(0, 80),
              width: Math.round(cur.getBoundingClientRect().width),
              scrollWidth: cur.scrollWidth,
              right: Math.round(cur.getBoundingClientRect().right)
            });
            cur = cur.parentElement;
          }
          return { chain };
        })()
      `,
      returnByValue: true
    }
  };
  ws.send(JSON.stringify(msg));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.id === 2) {
    console.log(JSON.stringify(data.result.result.value, null, 2));
    process.exit(0);
  }
};

