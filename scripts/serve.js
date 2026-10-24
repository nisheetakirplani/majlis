// Tiny static server for the demo (icons use CSS masks, which browsers block on file://).
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const ROOT = new URL('../demo/', import.meta.url).pathname;
const PORT = Number(process.env.PORT) || 4173;
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' };

createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  try {
    const body = await readFile(join(ROOT, path.endsWith('/') ? `${path}index.html` : path));
    res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'text/html' }).end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(PORT, () => console.log(`Demo: http://localhost:${PORT}`));
