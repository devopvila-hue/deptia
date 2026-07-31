# Sistema de diseño · DEPT.IA

Sistema visual creado para que la web se sienta como una **organización viva**, no como una landing más. Inspirado en organigramas, salas de control, señalética corporativa y software de nueva generación.

## Principios

1. **Lenguaje editorial, no publicitario.** Tipografía con carácter, sin frases vacías.
2. **El sistema se siente vivo.** Estados en movimiento, conexiones, aprobaciones. Nada plano.
3. **Precisión suiza.** Grid, coordenadas, índices, numeración. No decoración gratuita.
4. **Acento como señal.** El verde lima se usa para indicar estado, conexión, selección, acción. No para decorar.
5. **Privacidad por defecto.** Fondo oscuro cálido, no el típico azul-morado de SaaS.

## Tokens

Definidos en `src/styles/globals.css` y expuestos en `tailwind.config.ts`.

### Color

```css
--background:        #080908;   /* Fondo base */
--background-elevated: #101210; /* Paneles sobre fondo */
--surface:           #151815;   /* Cards */
--surface-soft:      #1b1f1b;   /* Hover, chips */
--foreground:        #f2f0e9;   /* Texto principal */
--muted:             #989b94;   /* Texto secundario */
--muted-foreground:  #c2c4bc;   /* Texto medio */
--border:            rgba(242,240,233,0.12);
--border-strong:     rgba(242,240,233,0.22);
--accent:            #d8ff62;   /* Lima · acción / estado */
--accent-soft:       rgba(216,255,98,0.14);
--accent-foreground: #0a0c08;   /* Texto sobre accent */
--warning:           #ffbd59;
--danger:            #ff6961;
--success:           #7ce5a3;
```

**Regla de uso del accent:** máximo 3-5 elementos visibles a la vez en lima. Si todo brilla, nada importa.

### Tipografía

| Familia | Uso | Tamaños |
|---------|-----|---------|
| `Inter` (`--font-sans`) | UI, body, listas | body-xl 18px, body 16px, body-sm 15px |
| `Fraunces` (`--font-display`) | Títulos editoriales, números | display-2xl 120px, display-xl 88px, display-lg 64px |
| `JetBrains Mono` (`--font-mono`) | Etiquetas, datos, estados | micro 11px, caption 13px |

Escala fluida con `clamp()` en `tailwind.config.ts`. No hay saltos entre breakpoints.

### Radii

```ts
xs:  4px
sm:  6px
md:  10px
lg:  14px   /* default para cards */
xl:  20px
2xl: 28px
```

### Espaciado

Sección vertical fluido:
```css
.section-y    { padding: clamp(4rem, 8vw, 8rem) 0; }
.section-y-lg { padding: clamp(5rem, 10vw, 11rem) 0; }
```

## Componentes

### Botón (`Button`)

Variantes:
- `primary` — fondo accent, texto oscuro, hover aclara
- `secondary` — fondo surface-soft, borde fuerte
- `ghost` — transparente, hover surface-soft
- `outline` — borde, hover oscurece el borde
- `subtle` — fondo accent-soft, ideal para CTAs secundarios
- `danger` — fondo danger/15

Tamaños: `sm` (36px), `md` (44px), `lg` (48px), `xl` (56px), `icon` (40×40).

Microinteracciones:
- `hover:-translate-y-px` sutil (1px)
- `active:translate-y-0 active:scale-[0.985]` para respuesta física
- `focus-visible:ring-2 ring-accent` con offset

### Card (`Card`)

Variantes: `default`, `elevated` (con gradient), `soft`, `outline`.
Bordes finos (1px), radio lg (14px).

### Badge (`Badge`)

Tamaños `sm` (24px) y `md` (28px). Variantes: default, success, warning, danger, accent, outline.
Tipografía mono uppercase tracking-[0.1em].

### Eyebrow

Etiqueta sobre los títulos. Estructura `[index] · label` con línea decorativa.
Mono uppercase tracking-[0.18em].

### FAQ

Acordeón accesible. Botón con `aria-expanded` y `aria-controls`. Animación con `AnimatePresence`.

### Tabs

Navegación con `LayoutGroup` para animación fluida del indicador activo.

### Container

- `narrow` (920px) — páginas legales, contacto
- `wide` (1320px) — páginas generales
- `full` — sin máximo

## Patrones visuales

### Grid pattern

```css
.grid-pattern {
  background-image:
    linear-gradient(rgba(242, 240, 233, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(242, 240, 233, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}
```

Usado en hero, secciones destacadas. Enmascarado con `mask-radial-fade` para que se desvanezca en los bordes.

### MemberPattern

Para los miembros del equipo. 6 patrones SVG diferentes (`wave`, `grid`, `orbit`, `spiral`, `bars`, `dots`) que representan distintos roles sin recurrir a fotos humanas.

### CompanyOrb

Visualización principal del hero. Empresa central con 3-5 departamentos alrededor, conexiones animadas, tareas fluyendo, aprobación humana visible. SVG + DOM, no canvas.

## Estados

| Estado | Cómo se comunica |
|--------|------------------|
| Activo | Color accent + animación de pulso |
| Aprovisionando | Patrón dashed + opacidad reducida + label "En preparación" |
| Pendiente de aprobación | Badge warning + parpadeo suave |
| Aprobado | Color success + check |
| Bloqueado | Color danger + candado |
| En curso | Color warning + animación de puntos suspensivos |

## Responsive

Breakpoints (Tailwind):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1200px
- `2xl`: 1320px

En móvil se mantienen:
- Botones ≥ 44px de alto
- Hero se simplifica: el visual del orb pasa a estar encima del texto
- Menú se convierte en panel fullscreen accesible
- Tablas se transforman en listas verticales

## Accesibilidad

- `prefers-reduced-motion` desactiva animaciones (Motion lo respeta automáticamente)
- `prefers-color-scheme` forzado a `dark`
- Focus visible con outline de 2px en accent
- Labels y mensajes de error asociados a inputs
- Botones con `aria-expanded` cuando abren menús
- HTML semántico
- Texto alternativo en visualizaciones (`aria-label` cuando no es decorativo)

## Anti-patrones que evitamos

- ❌ Gradientes azul → morado → rosa
- ❌ Cerebros digitales o robots humanoides
- ❌ Iconos de circuitos / partículas aleatorias
- ❌ Glassmorphism exagerado
- ❌ Estética de criptomoneda o videojuego
- ❌ Neón saturado
- ❌ Tarjetas flotantes idénticas copiadas de shadcn
- ❌ Secciones sin narrativa
- ❌ Texto centrado en pantallas grandes
