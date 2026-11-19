export function fromBase64Url(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
}

export async function importAccessKey(code) {
  if (!/^[A-Za-z0-9_-]{43}$/.test(code)) throw new Error('Invalid access key.');
  return crypto.subtle.importKey('raw', fromBase64Url(code), 'AES-GCM', false, ['encrypt', 'decrypt']);
}

export function accessParameters(locale, iv) {
  return {
    name: 'AES-GCM',
    iv,
    additionalData: new TextEncoder().encode(`Saga.CV access v1 ${locale}`),
  };
}
