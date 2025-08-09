import express from 'express';
import cors from 'cors';
import { createUIResource } from '@mcp-ui/server';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tool/ui', (_req, res) => {
  const mode = (process.env.UI_MODE || 'remoteDom') as 'rawHtml' | 'externalUrl' | 'remoteDom';
  let resource;

  if (mode === 'rawHtml') {
    resource = createUIResource({
      uri: 'ui://demo/raw-html',
      content: {
        type: 'rawHtml',
        htmlString: `
          <section style="font-family: ui-sans-serif, system-ui; padding: 12px;">
            <h2>Rollback Preview</h2>
            <p>Select a version and confirm.</p>
            <label>Version:
              <select id="version">
                <option value="1.4.2">v1.4.2</option>
                <option value="1.4.1">v1.4.1</option>
              </select>
            </label>
            <button id="confirm">Confirm</button>
            <script>
              document.getElementById('confirm')?.addEventListener('click', () => {
                const v = (document.getElementById('version') as HTMLSelectElement).value;
                window.parent.postMessage({
                  type: 'tool',
                  payload: { toolName: 'performRollback', params: { version: v } }
                }, '*');
              });
            </script>
          </section>
        `
      },
      encoding: 'text'
    });
  } else if (mode === 'externalUrl') {
    resource = createUIResource({
      uri: 'ui://demo/external-url',
      content: {
        type: 'externalUrl',
        iframeUrl: 'https://example.org'
      },
      encoding: 'text'
    });
  } else {
    resource = createUIResource({
      uri: 'ui://demo/remote-dom',
      content: {
        type: 'remoteDom',
        framework: 'react',
        script: `
          const btn = document.createElement('ui-button');
          btn.setAttribute('label', 'Rollback v1.4.2');
          btn.addEventListener('press', () => {
            window.parent.postMessage({
              type: 'tool',
              payload: { toolName: 'performRollback', params: { version: '1.4.2' } }
            }, '*');
          });
          root.appendChild(btn);
        `
      },
      encoding: 'text'
    });
  }

  res.json({ type: 'resource', resource });
});

app.post('/tool/performRollback', (req, res) => {
  res.json({ ok: true, message: 'Rollback started', details: req.body || {} });
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
