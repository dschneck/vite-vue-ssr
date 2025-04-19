import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const resolve = (p: string) => path.resolve(__dirname, '..', p);
const app = express();

let vite: any;

// Create Vite server in development mode
if (!isProd) {
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root: resolve('.')
  });
  app.use(vite.middlewares);
}

// Serve client assets in production
if (isProd) {
  app.use(express.static(resolve('dist/client')));
}

app.get('*', async (req, res) => {
  try {
    let render: () => Promise<string>;

    if (isProd) {
      const { render: prodRender } = await import('../dist/entry-server.js');
      render = prodRender;
    } else {
      const { render: devRender } = await vite.ssrLoadModule('/src/entry-server.ts');
      render = devRender;
    }

    const appHtml = await render();

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Vite Vue SSR</title>
      </head>
      <body>
        <div id="app">${appHtml}</div>
        <script type="module" src="/src/main.ts"></script>
      </body>
      </html>
    `;

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (err) {
    console.error(err);
    res.status(500).end('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
}); 