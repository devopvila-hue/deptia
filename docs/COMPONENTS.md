# Componentes · Departify

Inventario de todos los componentes del proyecto, agrupados por responsabilidad.

## UI primitivos (`src/components/ui/`)

| Componente | Propósito | Props clave |
|------------|-----------|-------------|
| `Button` | Acción principal o secundaria | `variant`, `size`, `leftIcon`, `rightIcon`, `loading`, `href` |
| `LinkButton` | Botón estilizado que es un Link | `href`, `variant`, `size`, `external` |
| `Badge` | Etiqueta de estado | `variant`, `size` |
| `Card` | Contenedor con borde | `variant`, `interactive` |
| `Container` | Wrapper de max-width | `width`: narrow / wide / full |
| `Section` | Wrapper semántico con padding | `as`, `spacing` |
| `Eyebrow` | Etiqueta sobre títulos | `index`, `label` |
| `FAQ` | Acordeón animado y accesible | `items[]` |
| `Tabs` | Navegación con indicador animado | `items[]`, `defaultId`, `onChange` |

## Layout (`src/components/layout/`)

| Componente | Propósito |
|------------|-----------|
| `Header` | Sticky, responsive, con menú móvil fullscreen |
| `Footer` | Navegación + CTA + info legal |
| `LegalPage` | Plantilla para páginas legales (privacidad, términos…) |
| `OrganizationJsonLd` | Schema.org Organization en el root |
| `ProductJsonLd` | Schema.org Product por página |
| `FAQJsonLd` | Schema.org FAQPage por página |

## Marketing (`src/components/marketing/`)

| Componente | Sección de la home |
|------------|-------------------|
| `Hero` | Hero cinematográfico con `CompanyOrb` |
| `TrustStrip` | Datos clave: UE, 24/7, <1h, aislado |
| `CategoryStatement` | Chatbot vs Departamento |
| `DepartmentsCatalog` | Cards de los 3 departamentos disponibles |
| `HowItWorks` | Pasos + `InstanceBuild` |
| `DemoConversation` | `MissionChat` interactivo |
| `ControlPermissions` | `PermissionsBoard` |
| `Integrations` | `IntegrationsOrbit` con chips |
| `IntegrationsMarquee` | Marquee inferior |
| `PrivateInstance` | `IsolatedInstances` |
| `TelegramAccess` | `TelegramFlow` panel ↔ móvil |
| `UseCase` | Antes / después |
| `Pricing` | Tres planes con toggle mensual/anual |
| `FaqSection` | FAQ reutilizado |
| `FinalCta` | Cierre con tickers de departamentos |

## Departments (`src/components/departments/`)

| Componente | Propósito |
|------------|-----------|
| `DepartmentGrid` | Card de departamento para el catálogo |
| `DepartmentAgent` | Agente guía persistente (Director del depto.) que explica cada sección de la landing según el scroll. Burbuja flotante + panel lateral con scripts contextuales |
| `DepartmentImage` | Wrapper para imágenes Pro con hover zoom, corner ticks, badge opcional y lightbox integrado |

## Visualizaciones (`src/components/visualizations/`)

| Componente | Qué hace | Por qué |
|------------|----------|---------|
| `CompanyOrb` | Empresa central + 5 departamentos con tareas y aprobaciones | Hero principal |
| `ApprovalTray` | Bandeja de aprobaciones con tareas cambiando | Sección de control |
| `MissionChat` | Chat + tabs (plan / tareas / aprobaciones / resultado) | Demo de misión |
| `IsolatedInstances` | 3 instancias (ATLAS, NORTE, LUMEN) con sus módulos | Sección de privacidad |
| `IntegrationsOrbit` | 12 herramientas orbitando una instancia central | Sección de integraciones |
| `PermissionsBoard` | Drag & drop entre 3 columnas (puede / aprueba / nunca) | Sección de permisos |
| `InstanceBuild` | 5 pasos con un edificio construyéndose | Cómo funciona |
| `TelegramFlow` | Panel web ↔ iPhone con Telegram | Sección de Telegram |
| `MemberPattern` | 6 patrones SVG para representar roles | Catálogo y detail pages |
| `VideoPlaceholder` | Demo video card con play + timeline | Páginas de departamento |

## Demo (`src/components/demo/`)

| Componente | Qué hace |
|------------|----------|
| `DemoPanel` | Panel completo con 8 tabs (Resumen, Departamentos, Tareas, Aprobaciones, Calendario, Conexiones, Consumo, Ajustes) |

## Forms (`src/components/forms/`)

| Componente | Formulario |
|------------|-----------|
| `ContactForm` | Formulario de contacto con validación Zod |
| `LoginForm` | Login con email/password + SSO |
| `RegistrationFlow` | Onboarding en 5 pasos: cuenta → selección → provisioning → onboarding → listo |

## Convenciones de nombrado

- `*.tsx` para componentes, `*.ts` para lógica pura
- Un componente por archivo
- Export nombrado para componentes
- Server Components por defecto, `"use client"` solo si usan estado o motion
- Props tipadas con `interface`, no `type`
- `cn()` utility para combinar clases
- `forwardRef` solo cuando es estrictamente necesario (formularios, focus management)

## Server vs Client

| Componente | Tipo | Por qué |
|------------|------|---------|
| `Header` | Client | Estado del menú, scroll position |
| `Footer` | Server | Estático |
| `Hero` | Client | Animaciones de entrada |
| `CompanyOrb` | Client | Animaciones SVG y motion |
| `DemoPanel` | Client | Estado de tabs y aprobaciones |
| `PermissionsBoard` | Client | Drag & drop interactivo |
| `MissionChat` | Client | Tabs interactivos |
| `DepartmentHero` | Server | Estático + datos |
| `PricingPage` | Server | Estático + componente `Pricing` client para el toggle |
| `LegalPage` | Server | Estático puro |
