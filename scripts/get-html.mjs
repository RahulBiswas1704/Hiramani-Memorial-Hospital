const res = await fetch('http://127.0.0.1:9222/json');
const targets = await res.json();
const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
ws.onopen = () => {
  ws.send(JSON.stringify({
    id: 3,
    method: 'Runtime.evaluate',
    params: {
      expression: 'document.querySelector(".grid.grid-cols-1.md\\\\:grid-cols-2.lg\\\\:grid-cols-3").firstElementChild.outerHTML',
      returnByValue: true
    }
  }));
};
ws.onmessage = (e) => {
  console.log(JSON.parse(e.data).result.result.value);
  process.exit(0);
};
