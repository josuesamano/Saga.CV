import { readdir, readFile } from 'node:fs/promises';
import { contactSourceRevision } from './public-revision.mjs';

const dist = new URL('../dist/', import.meta.url);
for (const file of await readdir(dist, { recursive: true })) {
  if (/\.pdf$|access-key|\.env/i.test(file)) throw new Error(`Private file found in public build: ${file}`);
}

const revision = await contactSourceRevision();
for (const [locale, route] of [['es', 'index.html'], ['en', 'en/index.html']]) {
  const html = await readFile(new URL(route, dist), 'utf8');
  if (/\bhref\s*=\s*["'](?:mailto:|tel:|https:\/\/wa\.me\/)/i.test(html)) {
    throw new Error(`Private contact link found in public build: ${route}`);
  }
  const envelope = JSON.parse(await readFile(new URL(`access/cv-${locale}.json`, dist), 'utf8'));
  const validFields = Object.keys(envelope).sort().join() === 'data,iv,revision' &&
    /^[A-Za-z0-9_-]{16}$/.test(envelope.iv) && /^[A-Za-z0-9_-]{100,}$/.test(envelope.data);
  if (!validFields || envelope.revision !== revision) {
    throw new Error(`Encrypted CV is invalid or out of date (${locale}). Run npm run protect.`);
  }
}
