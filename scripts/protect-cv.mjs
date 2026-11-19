import { randomBytes } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resume } from '../src/data/resume.ts';
import { accessParameters, importAccessKey } from '../src/lib/cv-crypto.mjs';
import { renderResumePdf } from '../src/lib/resume-pdf.ts';
import { contactSourceRevision } from './public-revision.mjs';

const { CV_EMAIL: email, CV_PHONE: phone, CV_WHATSAPP_URL: whatsapp } = process.env;
if (!email || !phone || !whatsapp || !/^https:\/\/wa\.me\/\d+$/.test(whatsapp)) {
  throw new Error('Set CV_EMAIL, CV_PHONE and CV_WHATSAPP_URL in .env.private.');
}

const privateFolder = new URL('../.private/', import.meta.url);
const publicFolder = new URL('../public/access/', import.meta.url);
const keyFile = new URL('access-key.txt', privateFolder);
await mkdir(privateFolder, { recursive: true });
await mkdir(publicFolder, { recursive: true });

let code;
try {
  code = (await readFile(keyFile, 'utf8')).trim();
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  for (const locale of Object.keys(resume)) {
    const existing = await readFile(new URL(`cv-${locale}.json`, publicFolder)).catch((readError) => {
      if (readError.code !== 'ENOENT') throw readError;
    });
    if (existing) throw new Error('Restore .private/access-key.txt before regenerating existing encrypted files.');
  }
  code = randomBytes(32).toString('base64url');
  await writeFile(keyFile, code + '\n', { flag: 'wx', mode: 0o600 });
}

const key = await importAccessKey(code);
const revision = await contactSourceRevision();
for (const [locale] of Object.entries(resume)) {
  const pdf = await renderResumePdf(locale, { email, phone, whatsapp });
  const payload = JSON.stringify({ email, phone, whatsapp, pdf: Buffer.from(pdf).toString('base64url') });
  const iv = randomBytes(12);
  const encrypted = await crypto.subtle.encrypt(
    accessParameters(locale, iv), key, new TextEncoder().encode(payload),
  );
  const envelope = { revision, iv: iv.toString('base64url'), data: Buffer.from(encrypted).toString('base64url') };
  await writeFile(new URL(`cv-${locale}.json`, publicFolder), JSON.stringify(envelope) + '\n');
}
console.log('Encrypted both CVs. The access key is in .private/access-key.txt.');
