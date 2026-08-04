# FUNNEL AUDIT — DEPARTIFY Vending Machine P0

## Tabla de cambios

| # | CTA | Ubicación | URL anterior | URL nueva | Estado |
|---|-----|-----------|--------------|-----------|--------|
| 1 | Crear mi equipo (desktop) | header.tsx:103 | `/registro` | `https://app.departify.app/signup` | ✅ |
| 2 | Acceder (desktop) | header.tsx:99 | `/acceso` | `https://app.departify.app/login` | ✅ |
| 3 | Crear mi equipo (móvil menú) | header.tsx:265 | `/registro` | `https://app.departify.app/signup` | ✅ |
| 4 | Ya tengo cuenta (móvil menú) | header.tsx:273 | `/acceso` | `https://app.departify.app/login` | ✅ |
| 5 | Crear mi equipo (hero) | hero.tsx:65 | `/registro` | `https://app.departify.app/signup` | ✅ |
| 6 | Crear mi equipo (mid-cta) | mid-cta.tsx:53 | `/registro` | `https://app.departify.app/signup` | ✅ |
| 7 | Crear mi equipo (final-cta) | final-cta.tsx:65 | `/registro` | `https://app.departify.app/signup` | ✅ |
| 8 | Crear mi equipo (footer) | footer.tsx:29 | `/registro` | `https://app.departify.app/signup` | ✅ |
| 9 | Empezar (demo panel) | demo-panel.tsx:293 | `/registro` | `https://app.departify.app/signup` | ✅ |
| 10 | Crear mi equipo (como-funciona) | como-funciona/page.tsx:99 | `/registro` | `https://app.departify.app/signup` | ✅ |
| 11 | Crear mi equipo (hero departamento) | departamentos/[slug]:152 | `/registro` | `https://app.departify.app/signup` | ✅ |
| 12 | Crear mi equipo (footer departamento) | departamentos/[slug]:791 | `/registro` | `https://app.departify.app/signup` | ✅ |
| 13 | Crear tu equipo (en /acceso) | acceso/page.tsx:39 | `/registro` | `https://app.departify.app/signup` | ✅ |
| 14 | ¿Ya tienes cuenta? (en login-form) | login-form.tsx:120 | `/acceso` | `https://app.departify.app/login` | ✅ |
| 15 | ¿Olvidaste contraseña? (en login-form) | login-form.tsx:189 | `/acceso?recuperar=1` | `https://app.departify.app/login?recuperar=1` | ✅ |

## Páginas convertidas en redirect

| Ruta | Acción | Destino |
|------|--------|---------|
| `/acceso` | redirect 307 | `https://app.departify.app/login` |
| `/registro` | redirect 307 | `https://app.departify.app/signup` |

## Continuidad visual: Footer

Footer de la Vending Machine: `src/components/layout/footer.tsx` (4 columnas + columna de marca).
Footer del Portal: **no accesible desde este repo** (pertenece a otro proyecto).

Documentación: el footer actual se publica tal cual desde el repo de la landing. Cuando se unifiquen
repositorios o se cree un paquete `@departify/ui`, se sustituirá este archivo por la versión
compartida. Mientras tanto, **estructura idéntica** a la última referencia conocida del Portal:
- 4 columnas: marca + Producto + Empresa + Legal
- Logo cuadrado (2x2 grid de marca)
- Tagline + descripción corta
- 2 botones CTA
- Copyright + línea de país