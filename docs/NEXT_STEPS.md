# Próximos pasos · DEPT.IA

Roadmap de las siguientes tareas para llevar el producto a producción.

## Backend y autenticación

### 1. Conectar Supabase (recomendado)
- [ ] Crear proyecto en Supabase
- [ ] Configurar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Crear las tablas:
  - `organizations` (id, name, plan, region, created_at)
  - `users` (id, email, organization_id, role)
  - `departments` (id, organization_id, slug, status, config)
  - `tasks` (id, department_id, title, status, priority, due_date)
  - `approvals` (id, task_id, type, status, requested_at, decided_at)
  - `audit_log` (id, organization_id, action, metadata, created_at)
- [ ] Reemplazar el `onSubmit` mock de los formularios con `supabase.auth.signUp` / `signIn`
- [ ] Crear middleware para proteger `/demo`, `/registro`, `/acceso`

### 2. Implementar provisioning real
- [ ] Crear endpoint en `/api/provisioning` que llama a la API de provisionamiento
- [ ] La pantalla de provisioning ya muestra los 5 pasos, solo falta conectarla
- [ ] Webhooks para notificar cuando la instancia está lista
- [ ] Cola de tareas (BullMQ o Inngest) para los pasos largos

### 3. Integrar Stripe
- [ ] Crear productos y precios en Stripe
- [ ] Configurar checkout para cada plan
- [ ] Webhook para actualizar la organización cuando cambia el plan
- [ ] Customer portal para gestionar suscripción

## Marketing y conversión

### 4. Analytics
- [ ] Decidir provider: PostHog (recomendado), Plausible o GA4
- [ ] Configurar `NEXT_PUBLIC_ANALYTICS_PROVIDER`
- [ ] Los eventos ya están definidos en `src/lib/analytics.ts`:
  - `hero_cta_clicked`
  - `department_viewed`
  - `pricing_plan_selected`
  - `demo_started`
  - `registration_started`
  - `integration_viewed`
  - `video_played`
  - `department_card_hovered`
  - `permission_changed`
  - `approval_clicked`
  - `menu_opened`
  - `section_viewed`

### 5. SEO avanzado
- [ ] Generar imágenes OG dinámicas con `@vercel/og`
- [ ] Añadir más entradas al sitemap si se introducen landings por industria
- [ ] Configurar Search Console
- [ ] Schema.org BreadcrumbList en páginas internas

### 6. Contenido
- [ ] Migrar contenido editorial a MDX si crece (blog, casos de éxito)
- [ ] Añadir vídeos reales de demo (reemplazar los placeholders animados)

## Producto

### 7. Panel demo → panel real
- [ ] Reemplazar `MOCK_TASKS` y `MOCK_APPROVALS` con queries a Supabase
- [ ] Implementar la lógica real de aprobaciones
- [ ] WebSockets / Server-Sent Events para actualizaciones en tiempo real
- [ ] Notificaciones push en el navegador

### 8. Integraciones
- [ ] OAuth con cada herramienta (Gmail, HubSpot, etc.)
- [ ] Webhooks entrantes
- [ ] Almacenamiento de credenciales cifradas por cliente
- [ ] Background jobs para sincronización periódica

### 9. Telegram
- [ ] Bot por instancia (multi-tenant)
- [ ] Sincronización del panel ↔ Telegram
- [ ] Comandos inline

## Internacionalización

### 10. i18n
- [ ] Mover datos a `dictionaries/{locale}/`
- [ ] Detección de idioma del navegador
- [ ] Selector de idioma en el header
- [ ] Mercados prioritarios: español de LATAM, inglés, portugués

## Operaciones

### 11. CI/CD
- [ ] GitHub Actions para typecheck, lint, build
- [ ] Playwright tests en CI
- [ ] Vercel preview deployments
- [ ] Sentry / Logtail para monitoring

### 12. Documentación
- [ ] Storybook para los componentes UI
- [ ] API docs (cuando exista la API real)
- [ ] Guías de usuario integradas en el panel

## Performance

### 13. Optimizaciones pendientes
- [ ] Comprimir y servir imágenes con `next/image` cuando se añadan
- [ ] Lazy load del demo panel hasta entrar en viewport
- [ ] Considerar Partytown para analytics
- [ ] Reducir el bundle del hero si se observa CLS

## Seguridad

### 14. Hardening
- [ ] Rate limiting en `/api/`
- [ ] CSRF tokens
- [ ] CSP estricto
- [ ] Auditoría de dependencias automática (Dependabot)
- [ ] Política de cookies funcional
- [ ] DPA público

## Testing

### 15. Playwright (preparado)
- [ ] Smoke test de todas las rutas
- [ ] Test de navegación esencial
- [ ] Test de formulario de contacto
- [ ] Test de onboarding completo
- [ ] Test de `prefers-reduced-motion`
- [ ] Tests visuales con Percy o Chromatic

## Lanzamiento

### 16. Pre-lanzamiento
- [ ] Auditoría Lighthouse (perf > 90, a11y > 95)
- [ ] Probar en Safari, Chrome, Firefox, Edge
- [ ] Probar en iOS y Android reales
- [ ] Configurar dominio `dept.ia`
- [ ] Configurar emails transaccionales (Resend, Postmark)
- [ ] Crear plantillas de email para bienvenida, provisioning, facturas, etc.

---

**Estado actual:** La web pública está lista para producción en lo que respecta a UI/UX, copy, estructura y SEO. Los puntos pendientes son integraciones de backend, lo cual se ha dejado intencionadamente desacoplado.
