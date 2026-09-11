# Departify — sistema visual y revisión local

Actualizado: 9 de septiembre de 2026.

## Identidad oficial

Logo descargado de https://docs.departify.app/manual-assets/departify-d-symbol.png.
Se conserva el PNG original sin filtros ni alteraciones. El lockup compartido aplica el manual de https://docs.departify.app/: símbolo a la izquierda, DEPARTIFY en mayúsculas, semibold y tracking 0.16em. Inter y JetBrains Mono son las tipografías de la web pública.

El símbolo aparece en la cabecera, pie, portada, favicon y tarjetas sociales. La imagen social generada en la primera propuesta ha dejado de referenciarse porque no representaba correctamente la marca.

## Un sistema para todas las páginas públicas

- Tema claro: marfil, superficies blancas y acentos lima.
- Tema oscuro: carbón y verde bosque, superficies escalonadas, diagramas adaptados y contraste propio.
- Selector de sol/luna en la cabecera de todas las rutas, también en móvil.
- Preferencia conservada al navegar, recargar y entre pestañas. Se aplica antes de hidratar la página; funciona también si el navegador bloquea el almacenamiento.
- Cabecera, navegación activa, pie, títulos, tarjetas, formularios y bordes compartidos entre portada, catálogo, fichas, precios, funcionamiento, demo, recursos, contacto, seguridad y páginas legales.
- Siete departamentos: Marketing, SEO, Ventas, Atención al cliente, Administración, Developer y Dirección. Dirección figura como coordinador incluido.
- Portada y catálogo reutilizan el componente DepartmentCards.
- Se conservan las animaciones, la demo de siete misiones y la opción de movimiento reducido.

Los colores de Tailwind usan variables RGB para que sus variantes de opacidad funcionen correctamente en ambos temas. Los fondos de interfaz que antes estaban fijados a negro se han sustituido por variables del sistema.

## Vista previa

http://localhost:3001

```sh
corepack pnpm build
corepack pnpm start --hostname localhost --port 3001
```

Para desarrollo con recarga automática, detener esa vista previa y ejecutar:

```sh
corepack pnpm dev --hostname localhost --port 3001
```

Usar `localhost` por el comportamiento de normalización del middleware de idiomas de esta configuración. Las dependencias y caché están en `/Volumes/MiDisco/codex-departify-local` por falta de espacio en el disco principal. Mantener MiDisco conectado. `.next` es un enlace local excluido de Git; el código no depende de esa ruta para su despliegue en otros entornos. Se conservan el manifiesto y el lockfile originales.

## Comprobaciones

```sh
corepack pnpm typecheck
corepack pnpm lint
node --test tests/unit/site-theme.test.cjs
corepack pnpm build
```

Las seis pruebas de tema cubren selección, persistencia, arranque, valores inválidos, almacenamiento bloqueado, sincronización/limpieza de eventos y contraste AA de los textos principales y secundarios sobre las superficies compartidas. Son pruebas de componentes y variables: no sustituyen una revisión visual en navegador.

Las comprobaciones HTTP locales verifican las rutas públicas de ambos idiomas y que todas reciban la cabecera, el selector, el pie y los recursos de tema. La autenticación y los envíos de formularios no se prueban contra servicios externos.

No se ha desplegado, publicado ni enviado cambios al repositorio remoto.

## Megamenú, funcionamiento y conectores

Se recupera `DepartmentsDropdown` en escritorio y móvil: siete departamentos, Dirección incluida, acceso al catálogo y a Cómo funciona. Soporta puntero, clic, navegación por Tab, ArrowDown, Escape, cierre fuera del desplegable y cierre al navegar. No se usa el rol ARIA de menú de aplicación para enlaces de navegación normales.

`/como-funciona` y `/en/como-funciona` se refactorizan con una introducción clara, cuatro pasos seleccionables (contexto, misión, aprobación, seguimiento), explicación de aportaciones/entregables, ejemplos, demo de siete especialidades y reglas de permisos. Se elimina el vídeo de relleno del recorrido.

La franja de herramientas es un carrusel continuo con pausa, pausa al interactuar y desplazamiento manual con movimiento reducido. Los SVG son archivos de marca descargados, no aproximaciones. Fuentes en `public/brands/connectors/SOURCES.md`.

**Pendiente de información del propietario:** confirmar los nombres de los 14 conectores implementados. El repositorio declara 16 integraciones sin estado de implementación; el carrusel mantiene por ahora las cinco marcas que ya se mostraban, con sus recursos reales. La lista se concentra en `src/data/home-connectors.ts` para ampliarla sin tocar el componente.

Pruebas adicionales: `node --test tests/unit/marketing-navigation.test.cjs` (apertura/cierre del megamenú, siete destinos, selección móvil, recorrido de pasos y reinicio).
