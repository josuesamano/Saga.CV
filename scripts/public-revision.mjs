import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

export async function contactSourceRevision() {
  const hash = createHash('sha256');
  for (const path of ['../src/data/resume.ts', '../src/lib/resume-pdf.ts', '../src/lib/cv-crypto.mjs']) {
    const source = await readFile(new URL(path, import.meta.url), 'utf8');
    hash.update(source.replace(/\r\n/g, '\n')).update('\0');
  }
  return hash.digest('hex');
}
