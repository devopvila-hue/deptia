# Sistema de movimiento · DEPT.IA

El movimiento cuenta la historia del producto: **una organización viva, no un sitio estático**.

## Principios

1. **Nunca animar por animar.** Cada animación comunica algo sobre cómo trabaja el departamento.
2. **Conexión, no aparición.** Los elementos se organizan, no aparecen de la nada.
3. **Respuesta inmediata en microinteracciones.** Botones, hovers, focus.
4. **Narrativa de 1-2 segundos en secuencias.** No más.
5. **Respetar `prefers-reduced-motion`.** Motion lo hace por defecto.

## Curvas y duraciones

```ts
// Curva base — equivalente al "smooth" de Apple
const SMOOTH = [0.32, 0.72, 0, 1] as const;

// Para elementos que rebotan ligeramente
const SPRING = { type: "spring", stiffness: 500, damping: 35 } as const;
```

| Tipo | Duración | Curva | Ejemplo |
|------|----------|-------|---------|
| Micro | 150–250 ms | ease-out | Hover, focus |
| Estándar | 300–450 ms | SMOOTH | Tabs, panels, modal |
| Narrativa | 700–1200 ms | SMOOTH | Construcción de instancia |
| Pulso | 2–4 s loop | linear/ease | Indicadores vivos |
| Secuencia | 1.2–1.8 s total | SMOOTH | Onboarding |

## Lenguaje de movimiento por contexto

### Hero (`CompanyOrb`)
- Empresa central aparece con `scale 0.8 → 1` + fade (0.6 s)
- Departamentos aparecen escalonados con delay 0.4s + 0.12s × index
- Conexiones se dibujan con `pathLength: 0 → 1`
- Tareas fluyen con `cx/cy` interpolados
- Badge de aprobación aparece desde abajo con delay 2s

### Tabs
- Indicador activo se desliza con `layoutId` (spring)
- Contenido hace fade + Y pequeño

### Permissions Board
- Items se reordenan con `layout` automático de Motion
- Drag/drop nativo HTML5 + clases visuales
- Hover scale sutil 1.02

### Provisioning (`InstanceBuild`)
- Edificio crece capa a capa (delay 0.2s + i × 0.1s)
- Capas activas con gradient shimmer horizontal
- Corner ticks aparecen antes de la capa

### Hero CTAs
- Botones con `hover:-translate-y-px` y `active:scale-[0.985]`
- Sin transiciones largas

### Cards de departamento
- Hover eleva (`y: -2px`)
- Borde se ilumina de `border` a `border-foreground/30`
- Capabilities se expanden con `height: auto` + fade

### Mission chat
- Burbujas aparecen con fade + Y (0.4s)
- Steps buttons se activan con `layoutId`

### Integrations orbit
- Pulsos de datos viajan del centro a las herramientas
- `cx/cy` interpolados en bucle

## Patrones prohibidos

- ❌ Word-by-word reveals en el hero (molestan la lectura)
- ❌ Bounce exagerado en CTAs
- ❌ Spinners que no comunican
- ❌ Animaciones de carga que duran más de 4 s
- ❌ Cualquier `infinite` que afecte a la lectura

## Accesibilidad

Motion respeta automáticamente:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Implementado en `src/styles/globals.css` y por defecto en Motion (que detecta el media query).

## Performance

- Usar `transform` y `opacity` siempre que sea posible (GPU compositor)
- Evitar animar `width`, `height`, `top`, `left`
- `will-change-transform` solo en elementos que se animan frecuentemente
- `viewport={{ once: true }}` en animaciones que no se repiten
- `useReducedMotion()` de Motion para saltar animaciones complejas
