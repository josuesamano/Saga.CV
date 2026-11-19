# Saga.CV

Currículum web bilingüe de Josué Daniel Sámano García. Astro genera un perfil público en español (`/`) e inglés (`/en/`).

## Desarrollo

```sh
npm ci
npm run dev
npm run build
```

## Clave de acceso al CV

En el repositorio local, `npm run protect` genera los PDF y cifra ambos CV junto con el contacto. En la primera ejecución crea una clave aleatoria en `.private/access-key.txt`. Las siguientes ejecuciones reutilizan esa clave. El archivo local `.env.private` proporciona `CV_EMAIL`, `CV_PHONE` y `CV_WHATSAPP_URL`.

Para consultar la clave en PowerShell:

```powershell
Get-Content -LiteralPath '.private/access-key.txt'
```

Guarda una copia privada de la clave y compártela directamente con las personas que elijas. GitHub solo recibe `public/access/cv-es.json` y `public/access/cv-en.json`, que contienen los archivos cifrados. El navegador descifra el contenido al introducir la clave. Una persona que ya tenga la clave y haya guardado los archivos cifrados de una versión puede seguir abriéndolos.

Al cambiar el contenido del CV, ejecuta `npm run protect` antes de abrir tu pull request. El build comprueba que los archivos cifrados correspondan a la versión actual y que no se publiquen PDF ni enlaces de contacto en claro.

## GitHub Pages

El flujo de GitHub Actions publica `dist/` al integrar cambios a `main` o al ejecutarlo manualmente. La configuración toma el origen y la ruta base de GitHub Pages para resolver los recursos del sitio. Los cambios a `main` se hacen mediante pull requests.
