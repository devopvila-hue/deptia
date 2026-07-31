# Modelo de contenido · DEPT.IA

Cómo se estructura el contenido para que sea fácil de mantener, traducir y evolucionar.

## Fuente de verdad

El contenido vive en **TypeScript**, no en CMS. Esto se decide por:

1. Volumen bajo-medio: hay < 50 entradas de datos
2. El contenido es **estructurado**, no editorial largo
3. Necesitamos **tipado fuerte** para que el catálogo de departamentos no rompa el build
4. Facilita el versionado con Git
5. Permite reusar el mismo dato en UI, JSON-LD y metadata SEO

Si en el futuro el contenido editorial crece, podemos migrar a MDX para guías largas y mantener TS para datos estructurados.

## Estructura de datos

### Departamento (`Department`)

```ts
export interface Department {
  slug: string;          // 'marketing', 'ventas', 'contenido'
  name: string;          // 'Departamento de Marketing'
  shortName: string;     // 'Marketing'
  promise: string;       // Propuesta en una línea
  description: string;   // Descripción larga
  tagline: string;       // Tagline para hero
  category: string;      // 'Crecimiento', 'Comercial', 'Creatividad'
  status: 'available' | 'coming-soon';
  priceFrom: number;     // 99
  priceCurrency: string; // 'EUR'
  metrics: { label: string; value: string }[];

  members: DepartmentMember[];  // 6 miembros visibles
  capabilities: string[];       // 6 bullet points
  deliverables: string[];       // 5 entregables
  problems: { title: string; description: string }[];
  integrations: string[];       // Referencias a integraciones

  workflow: WorkflowStep[];     // 4 pasos del proceso
  permissions: PermissionItem[];// Acciones y nivel
  faq: FAQItem[];               // 4 preguntas

  mission: {                    // Ejemplo de misión real
    brief: string;
    response: string;
    tasks: string[];
  };

  color: {                      // Identidad visual
    base: string;
    accent: string;
  };
  ordering: number;             // 1, 2, 3...
}
```

### Integración (`IntegrationRef`)

```ts
export interface IntegrationRef {
  name: string;
  category: 'communication' | 'productivity' | 'crm' | 'social' | 'design' | 'storage';
  color: string;
  reads: string;            // Qué puede leer el equipo
  prepares: string;         // Qué puede preparar
  requiresApproval: string; // Qué necesita tu OK
}
```

### Plan de precios (`PricingPlan`)

```ts
export interface PricingPlan {
  slug: 'starter' | 'business' | 'company';
  name: string;
  description: string;
  price: { monthly: number; yearly: number };
  currency: 'EUR';
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
  badge?: string;
}
```

## Dónde vive cada cosa

| Dato | Archivo | Notas |
|------|---------|-------|
| Departamentos disponibles | `src/data/departments.ts` | `departments` |
| Departamentos próximos | `src/data/departments.ts` | `comingSoonDepartments` |
| Integraciones | `src/data/departments.ts` | `integrations` |
| Planes de precios | `src/data/pricing.ts` | `pricingPlans` |
| FAQ home | `src/data/home-faq.ts` | Duplicado en componente para que sea fácil de reusar |
| FAQ departamentos | `src/data/departments.ts` (dentro de cada `Department`) | |

## Cómo añadir un departamento nuevo

1. Abre `src/data/departments.ts`
2. Añade un objeto al array `departments` siguiendo `Department` interface
3. Si va a estar "próximamente", añade a `comingSoonDepartments` con un objeto más simple
4. La página `/departamentos/[slug]` se genera automáticamente (`generateStaticParams`)

```ts
export const departments: Department[] = [
  // ... existentes
  {
    slug: "atencion-cliente",
    name: "Departamento de Atención al Cliente",
    shortName: "Atención al cliente",
    promise: "...",
    // resto de campos
    status: "available",
    color: { base: "#7ce5a3", accent: "..." },
    ordering: 5,
  },
];
```

## Cómo añadir una integración

Edita `src/data/departments.ts` → array `integrations`.

```ts
{
  name: "Notion",
  category: "productivity",
  color: "#000000",
  reads: "Páginas y bases de datos conectadas",
  prepares: "Resúmenes, documentación y borradores",
  requiresApproval: "Publicar páginas en espacios compartidos",
}
```

## Cómo añadir un plan

Edita `src/data/pricing.ts` → array `pricingPlans`.

## Cómo añadir un FAQ

Edita el array correspondiente en el archivo de datos. Los FAQs aparecen automáticamente en la página y en el JSON-LD.

## i18n (preparado)

La estructura soporta internacionalización futura:

- `lang` ya está en el HTML
- Metadata usa `es-ES` por defecto
- Hay `alternates.languages` configurado en el root metadata
- El copy está en `src/config/` y `src/data/`, listo para mover a `dictionaries/`

Para añadir otro idioma:
1. Crear `dictionaries/en.ts` con la misma forma que `src/config/site.ts`
2. Usar `getDictionary(locale)` en cada Server Component
3. Mover los datos de `data/` a `data/{locale}/`

## SEO por página

Cada página define su `metadata` con:
- `title` (será sufijado con `· DEPT.IA` por el template)
- `description`
- Open Graph (heredado del root)
- Twitter (heredado del root)
- canonical (heredado)

Las páginas dinámicas de departamento también generan metadata en `generateMetadata`.
