# SEO Fixes — Paquete listo para commit

**Fecha:** 2026-08-20
**Alcance:** SEO técnico crítico (🅰️). No incluye rebranding completo.
**Build:** ✅ `next build` pasa (42 páginas, TypeScript verde).

---

## 📦 Archivos en este paquete

### Modificados (3)

| Archivo | Qué cambia | Por qué |
|---|---|---|
| `src/config/brand.ts` | `name` "Departify", `tagline` "Te devolvemos tiempo", `url` departify.app, descripción en español, emails en departify.app, legalName "Departify, S.L.", social corregido | El repo apuntaba a `deptify.com` con copy en inglés ("DEPARTIFY", "Business Operating System"). El sitio en producción `departify.app` muestra otra marca. Sin este cambio, **cada deploy generaba HTML con marca incorrecta**. |
| `src/app/sitemap.ts` | `/demo` quitado del sitemap, `comingSoonDepartments` excluidos | Robots.txt bloquea `/demo` pero el sitemap lo incluía → señal contradictoria para Google. `comingSoonDepartments` indexaba funcionalidades no entregadas (riesgo de Helpful Content penalty). |
| `src/lib/metadata.ts` | `openGraph.images` y `twitter.images` apuntan a `/og.png` (con comentario). Añadido `alternates.languages.x-default: "/"` | Next 14 sirve `/og.png` desde `src/app/opengraph-image.tsx`. Sin esto, el HTML referenciaba `/og-default.png` (404 confirmado en producción). |

### Nuevos (2)

| Archivo | Qué hace | Por qué |
|---|---|---|
| `src/app/opengraph-image.tsx` | Genera OG image 1200×630 dinámico con marca "Departify" | Antes el sitio dependía de `/og-default.png` que **no existía**. Cualquier share en redes sociales (Twitter, LinkedIn, Slack) salía sin imagen o con 404. |
| `src/app/twitter-image.tsx` | Twitter card que reutiliza el OG image | Coherencia visual entre OG y Twitter. |

---

## ⚠️ Cambios tuyos que NO toqué (16 modificados + 3 nuevos)

Estos ya estaban sin commitear cuando llegué. **No los he modificado**:

```
M  src/app/admin/layout.tsx
M  src/app/como-funciona/page.tsx
M  src/app/contacto/page.tsx
M  src/app/cookies/page.tsx
M  src/app/demo/page.tsx
M  src/app/departamentos/[slug]/page.tsx     ← tiene /og-default.png en líneas 55 y 61
M  src/app/departamentos/page.tsx
M  src/app/panel/layout.tsx
M  src/app/precios/page.tsx
M  src/app/privacidad/page.tsx               ← dice "Deptify Technologies, S.L." y "privacidad@deptify.com"
M  src/app/recursos/page.tsx
M  src/app/robots.ts
M  src/app/seguridad/page.tsx
M  src/app/terminos/page.tsx
M  src/components/layout/json-ld.tsx
?? public/llms-full.txt
?? public/llms.txt
?? src/app/departamentos/[slug]/opengraph-image.tsx
```

**Recomendación:** revisa cada uno antes de hacer commit. Los que dicen "DEPARTIFY" / "deptify.com" / "Deptify Technologies" son rebranding pendiente (próxima sesión).

---

## 🔧 Recomendación específica: arreglar `/og-default.png` en `[slug]/page.tsx`

Líneas 55 y 61 de `src/app/departamentos/[slug]/page.tsx`:

```diff
- images: [{ url: "/og-default.png", width: 1200, height: 630, alt: `${d.name} · ${brand.name}` }],
+ images: [{ url: `/departamentos/${slug}/opengraph-image`, width: 1200, height: 630, alt: `${d.name} · ${brand.name}` }],
```

Esto hace que cada página de departamento use el OG dinámico que **ya tienes** (`src/app/departamentos/[slug]/opengraph-image.tsx`) en vez del 404.

**No lo aplico yo** porque es tu código sin commitear. Hazlo tú cuando hagas commit, o pídemelo y lo hago.

---

## 🚀 Plan de commit + deploy

### Opción A — Commit limpio (recomendado)

```bash
cd /home/node/.openclaw/workspace/agents/main/repos/deptia

# Stage solo MIS cambios (los SEO puros)
git add src/config/brand.ts \
        src/app/sitemap.ts \
        src/lib/metadata.ts \
        src/app/opengraph-image.tsx \
        src/app/twitter-image.tsx

git commit -m "fix(seo): align brand config with departify.app and ship dynamic OG images

- brand.ts: Departify + departify.app + Spanish copy
- sitemap.ts: drop /demo (blocked in robots) and comingSoonDepartments
- metadata.ts: point og/twitter images to /og.png (auto-generated)
- opengraph-image.tsx: 1200x630 dynamic OG with current brand
- twitter-image.tsx: reuses OG renderer

Build: next build OK, 42 pages, TypeScript green"

# Verifica que solo van MIS archivos
git show --stat HEAD
```

Después, revisa los16 cambios tuyos por separado y haz otro commit.

### Opción B — Un solo commit con todo

```bash
git add -A
git commit -m "feat(seo+rebrand-prep): SEO fixes and pending changes"
```

**No recomendado** porque mezcla mis cambios SEO con tus cambios sin revisar.

---

## ✅ Validación post-deploy (5 minutos)

Una vez en producción, comprueba:

```bash
# 1. OG image existe y se ve bien
curl -sSI https://departify.app/og.png
# Esperado: HTTP 200, Content-Type: image/png

# 2. Twitter image existe
curl -sSI https://departify.app/twitter-image.png
# Esperado: HTTP 200

# 3. El HTML referencia /og.png (no /og-default.png)
curl -sSL https://departify.app/ | grep -oE 'og:image[^>]*content="[^"]*"'
# Esperado: ... content="https://departify.app/og.png"

# 4. El sitemap NO incluye /demo
curl -sSL https://departify.app/sitemap.xml | grep -c "/demo"
# Esperado: 0

# 5. La marca es Departify (no DEPARTIFY)
curl -sSL https://departify.app/ | grep -oE '<title>[^<]+</title>'
# Esperado: <title>Departify — Te devolvemos tiempo.</title>
```

Y abrir en navegador para validar visualmente:
- https://departify.app/og.png — debe verse el OG con marca Departify

---

## 📊 Lo que YA estaba bien (no tocar)

Para que quede claro qué **no** se ha roto:

- ✅ Headers de seguridad (HSTS, X-Frame, X-Content-Type, Referrer-Policy)
- ✅ `robots.txt` bloqueando rutas privadas
- ✅ Sitemap.xml formato válido
- ✅ JSON-LD Organization + Product + FAQPage + BreadcrumbList
- ✅ Lang="es-ES"
- ✅ Skip-link accesible
- ✅ OG/Twitter metadata estructura
- ✅ Next.js 14 App Router
- ✅ Edge runtime para OG images
- ✅ Middleware Supabase SSR
- ✅ TypeScript verde

---

## 🟡 Pendiente para otra sesión (no incluido aquí)

1. **Rebranding completo** — referencias a "DEPARTIFY" / "deptify.com" / emails viejos en footer, brand-mark, páginas, formularios, llms.txt, etc.
2. **Core Web Vitals reales** — correr Lighthouse en producción (LCP, CLS, INP).
3. **Schema Markup Validator** — validar JSON-LD en https://validator.schema.org/
4. **Lighthouse CI** — añadir al pipeline de Netlify.
5. **OG image específica para páginas de departamento** — opcional, ahora apuntan a un OG genérico. Tu archivo `src/app/departamentos/[slug]/opengraph-image.tsx` ya está, solo hay que referenciarlo en `generateMetadata`.
6. **favicon.ico fallback** — navegadores antiguos piden `/favicon.ico`. Tienes `favicon.svg` pero no `.ico`. Opcional.
