# mcp-ui-demo (Render + Vercel)

This is a minimal end-to-end demo for **mcp-ui**:
- **Server** (Node + TypeScript) exposes a mock MCP UI tool that returns a `UIResource` and handles an action (`performRollback`).
- **Client** (Web Component) renders the resource using `<ui-resource-renderer>` from `@mcp-ui/client` and sends actions back.

## Local quickstart

```bash
# Server
cd server
npm i
npm run dev   # http://localhost:8787

# Client (separate terminal)
cd ../client
npm i
npm run dev   # http://localhost:5173
```

Open http://localhost:5173 — the UI renders; clicking the button posts to the server.

---

## Cloud deploy (zero code changes)

### 1) Deploy server to Render (Docker blueprint)
1. Push this repo to GitHub.
2. Go to https://render.com, click **New +** → **Blueprint** and point it to your repo.
3. Confirm the blueprint. Render will create the **server** web service from `render.yaml`.
4. After deploy, note the server URL (e.g. `https://mcp-ui-demo-server.onrender.com`).

### 2) Deploy client to Vercel
1. Go to https://vercel.com and **Import Project** from the same GitHub repo.
2. Set **Root Directory** to `client`.
3. In **Environment Variables**, add:
   - `SERVER_ORIGIN` = your Render URL from step 1 (e.g. `https://mcp-ui-demo-server.onrender.com`)
4. Build command: leave empty. Output directory: leave empty (static).
5. Deploy.

Open your Vercel URL — it will fetch the UI resource from `SERVER_ORIGIN` and render it.

---

## Switching UI modes
Set Render service env var `UI_MODE` to one of `remoteDom` (default), `rawHtml`, or `externalUrl` and redeploy.

## Notes
- CORS is enabled on the server for demo purposes.
- The client uses the **Web Component** build: `@mcp-ui/client/dist/ui-resource-renderer.wc.js`.
- In production, put both behind your own domain(s) and restrict CORS appropriately.
