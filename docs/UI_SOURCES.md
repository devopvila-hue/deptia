# Fuentes UI · Departify

Registro de las influencias y referencias utilizadas para construir los componentes. No copiamos páginas completas ni dependemos de ejecución remota de ningún servicio.

## Filosofía

> Construimos desde cero siguiendo patrones de calidad reconocidos. Cuando un componente nos recuerda a una referencia útil, lo anotamos aquí para mantener la trazabilidad.

## Inspiraciones por categoría

### Sistema de tokens y tipografía
- **Linear, Vercel, Stripe** — sistemas de tipografía editoriales con clamp() fluido
- **Editorial New** — fuentes display con peso ligero
- **Söhne, GT America** — sans-serif modernas con personalidad

### Hero cinematográfico
- **Linear (linear.app)** — organización espacial con grid sutil
- **Cursor (cursor.sh)** — tratamiento de luz y gradiente cálido
- **Vercel (vercel.com)** — texto monumental, animaciones medidas
- **Modularweb** — composición con elementos estructurales

### Cards interactivas
- **Stripe Pricing** — cards con borde iluminado en hover
- **Linear Pricing** — toggle mensual/anual con layoutId
- **Notion** — cards con jerarquía clara y esquinas suaves

### Visualizaciones
- **Stripe Atlas** — organigramas y diagramas
- **Figma** — nodos con estados y conexiones animadas
- **Vercel Observability** — gráficos con datos vivos
- **Linear Cycles** — representación de flujos de trabajo
- **Apple Vision Pro UI** — glassmorphism controlado
- **NASA Mission Control** — salas de control con datos en vivo

### Onboarding / Provisioning
- **Stripe Onboarding** — wizard paso a paso
- **Linear Setup** — configuración guiada con visualizaciones
- **Vercel Deploy** — vista de construcción con estados

### Permissions board
- **Notion Permissions** — niveles de permisos
- **Linear Roles** — gestión de roles
- **1Password Teams** — controles granulares

### Demo panel
- **Linear (interface)** — sidebar con búsqueda, navegación
- **Notion** — jerarquía de páginas
- **Stripe Dashboard** — KPIs y actividad

### Tabs animados
- **Radix UI** — comportamiento accesible
- **shadcn/ui** — implementación limpia
- **Linear** — indicador con layoutId

### FAQ
- **Linear** — acordeón sobrio
- **Stripe** — secciones con índice

### Empty states
- **Linear** — empty states con CTA
- **Vercel** — mensajes claros

## Componentes propios

Todos los componentes del proyecto están implementados en `src/components/`. No hay dependencias en tiempo de ejecución con servicios de UI externos.

## Licencias

- **Inter** — SIL Open Font License 1.1
- **Fraunces** — SIL Open Font License 1.1
- **JetBrains Mono** — SIL Open Font License 1.1
- **Lucide Icons** — ISC License
- **Motion** — MIT License
- **clsx / tailwind-merge** — MIT License

Todas las dependencias se cargan vía npm y respetan sus licencias originales.
