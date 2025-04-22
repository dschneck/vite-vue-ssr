# Server Implementation (`server/index.ts`)

## Overview
This is the Express.js server implementation that handles both development and production environments. It's responsible for serving your Vue.js application with Server-Side Rendering (SSR) support.

## Code Breakdown

### 1. Imports and Setup
```typescript
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
```
- Sets up Express.js server
- Configures path resolution for both development and production
- Creates helper functions for file paths
- Initializes the Express application

### 2. Development Mode Setup
```typescript
if (!isProd) {
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root: resolve('.')
  });
  app.use(vite.middlewares);
}
```
- Creates a Vite development server
- Enables middleware mode for integration with Express
- Sets up hot module replacement (HMR) for development
- Mounts Vite's middleware to handle development requests

### 3. Production Mode Setup
```typescript
if (isProd) {
  app.use(express.static(resolve('dist/client')));
}
```
- Serves static files from the built client directory
- Handles all client-side assets (JS, CSS, images, etc.)

### 4. Request Handling
```typescript
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
```
- Catches all routes (`*`)
- Loads the appropriate render function based on environment
- In production: imports from built files
- In development: uses Vite's SSR module loader
- Renders the application to HTML

### 5. HTML Template
```typescript
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
```
- Creates the HTML document
- Inserts the server-rendered content
- Includes the client-side entry point script
- The `#app` div matches where the client will mount

### 6. Server Start
```typescript
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```
- Starts the server on port 3000
- Logs the server URL

## Key Concepts

### Development vs Production
- Development:
  - Uses Vite's development server
  - Enables hot module replacement
  - Loads modules directly from source
- Production:
  - Serves built files
  - Uses optimized code
  - Better performance

### SSR Flow
1. Request comes to server
2. Server renders Vue app to HTML
3. Sends complete HTML with client script
4. Client takes over (hydration)

### Error Handling
- Catches and logs errors
- Returns 500 status on errors
- Prevents server crashes

## Next Steps
To enhance this server, you might want to:
1. Add error pages
2. Implement caching
3. Add security headers
4. Configure HTTPS
5. Add logging
6. Implement rate limiting 