"use client";

import { useEffect, useRef, useState, useId } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "motion/react";

import { departmentIcons } from "./department-icons";

type VisualKind = "hero" | "team" | "output";
type Scene =
  | "orbit"
  | "pipeline"
  | "network"
  | "ledger"
  | "route"
  | "messages"
  | "terminal";

type VisualConfig = {
  short: string;
  title: string;
  scene: Scene;
  color: string;
  nodes: [string, string, string, string, string];
  output: string;
};

const CONFIGS: Record<string, VisualConfig> = {
  marketing: {
    short: "MKT",
    title: "Marketing",
    scene: "orbit",
    color: "#D8FF62",
    nodes: ["Estrategia", "Textos", "Anuncios", "Correos", "Resultados"],
    output: "Campaña lista",
  },
  ventas: {
    short: "VTA",
    title: "Ventas",
    scene: "pipeline",
    color: "#FF9D78",
    nodes: ["Análisis", "Contactos", "Propuestas", "Seguimiento", "Cierre"],
    output: "Seguimientos preparados",
  },
  contenido: {
    short: "CNT",
    title: "Contenido",
    scene: "orbit",
    color: "#C8A8FF",
    nodes: ["Dirección", "Guion", "Diseño", "Vídeo", "Distribución"],
    output: "Pieza aprobada",
  },
  operaciones: {
    short: "OPS",
    title: "Operaciones",
    scene: "pipeline",
    color: "#70D6B5",
    nodes: ["Procesos", "Calidad", "Compras", "Sistemas", "Control"],
    output: "Flujo optimizado",
  },
  "atencion-cliente": {
    short: "CX",
    title: "Atención al cliente",
    scene: "messages",
    color: "#73C7FF",
    nodes: ["Entrada", "Contexto", "Respuesta", "Escalado", "Cierre"],
    output: "Caso resuelto",
  },
  seo: {
    short: "SEO",
    title: "SEO",
    scene: "network",
    color: "#6ED3A0",
    nodes: ["Revisión", "Búsquedas", "Contenido", "Enlaces", "Resultados"],
    output: "Oportunidad detectada",
  },
  administracion: {
    short: "ADM",
    title: "Administración",
    scene: "ledger",
    color: "#F0C96B",
    nodes: ["Facturas", "Agenda", "Archivo", "Proveedores", "Control"],
    output: "Gestión conciliada",
  },
  rrhh: {
    short: "RRHH",
    title: "Recursos Humanos",
    scene: "orbit",
    color: "#ECA8C9",
    nodes: ["Selección", "Onboarding", "Personas", "Cultura", "Desarrollo"],
    output: "Equipo acompañado",
  },
  logistica: {
    short: "LOG",
    title: "Logística",
    scene: "route",
    color: "#F5B66D",
    nodes: ["Origen", "Almacén", "Ruta", "Entrega", "Incidencias"],
    output: "Entrega coordinada",
  },
  growth: {
    short: "GRO",
    title: "Growth",
    scene: "network",
    color: "#B8F36B",
    nodes: ["Hipótesis", "Experimento", "Canal", "Métrica", "Escala"],
    output: "Experimento validado",
  },
  analitica: {
    short: "DAT",
    title: "Analítica",
    scene: "network",
    color: "#68C6E8",
    nodes: ["Fuentes", "Modelo", "Calidad", "Dashboard", "Alertas"],
    output: "Insight verificado",
  },
  finanzas: {
    short: "FIN",
    title: "Finanzas",
    scene: "ledger",
    color: "#8ED9A8",
    nodes: ["Tesorería", "Cobros", "Gastos", "Forecast", "Reporting"],
    output: "Cierre preparado",
  },
  soporte: {
    short: "SUP",
    title: "Soporte",
    scene: "messages",
    color: "#8BB8FF",
    nodes: ["Ticket", "Diagnóstico", "Solución", "Validación", "Cierre"],
    output: "Ticket resuelto",
  },
  legal: {
    short: "LEG",
    title: "Legal",
    scene: "ledger",
    color: "#D4B98C",
    nodes: ["Contrato", "Cláusulas", "Riesgo", "Revisión", "Firma"],
    output: "Documento revisado",
  },
  gobierno: {
    short: "GOV",
    title: "Gobierno",
    scene: "ledger",
    color: "#B4A9FF",
    nodes: ["Política", "Permisos", "Auditoría", "Riesgos", "Control"],
    output: "Decisión registrada",
  },
  developer: {
    short: "DEV",
    title: "Developer",
    scene: "terminal",
    color: "#79E6B3",
    nodes: ["Brief", "Arquitectura", "Código", "Pruebas", "Deploy"],
    output: "Versión desplegada",
  },
};

const SCENE_ICONS = Object.fromEntries(
  Object.entries(CONFIGS).map(([slug, config]) => [
    config.short,
    departmentIcons(slug),
  ]),
);

function SceneIcon({
  config,
  index,
  x,
  y,
  size = 24,
}: {
  config: VisualConfig;
  index?: number;
  x: number;
  y: number;
  size?: number;
}) {
  const icons = SCENE_ICONS[config.short]!;
  const Icon =
    index === undefined ? icons.main : icons.tasks[index % icons.tasks.length]!;
  return (
    <Icon
      x={x - size / 2}
      y={y - size / 2}
      width={size}
      height={size}
      color={config.color}
      strokeWidth={1.5}
      aria-hidden="true"
    />
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;
const STORIES: Record<string, [string, string, string]> = {
  marketing: ["Una idea.", "Todos los canales.", "Una sola voz."],
  ventas: ["La oportunidad.", "La conversación.", "El siguiente paso."],
  contenido: ["El concepto.", "La pieza.", "La publicación."],
  operaciones: ["Cada proceso.", "Todo conectado.", "Sin fricción."],
  "atencion-cliente": ["Una pregunta.", "Todo el contexto.", "La respuesta."],
  seo: ["La búsqueda.", "La oportunidad.", "Tu contenido, visible."],
  administracion: ["Cada documento.", "Todo en orden.", "Control recuperado."],
  rrhh: ["El talento.", "La conexión.", "Un equipo mejor."],
  logistica: ["El origen.", "La mejor ruta.", "El destino."],
  growth: ["La hipótesis.", "El experimento.", "La siguiente escala."],
  analitica: ["Los datos.", "La señal.", "Una decisión clara."],
  finanzas: ["Cada movimiento.", "La conciliación.", "Las cuentas claras."],
  soporte: ["La incidencia.", "El diagnóstico.", "La solución."],
  legal: ["El documento.", "La revisión.", "El criterio."],
  gobierno: ["La política.", "La supervisión.", "La trazabilidad."],
  developer: ["La especificación.", "La construcción.", "La entrega."],
};

function Label({
  x,
  y,
  children,
  muted = false,
  size = 15,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  muted?: boolean;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={muted ? "#87908d" : "#e9ede8"}
      fontSize={size}
      fontFamily="var(--font-mono), monospace"
    >
      {children}
    </text>
  );
}

function Tick({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={"translate(" + x + " " + y + ")"}>
      <circle r="12" fill={color} fillOpacity=".12" />
      <path
        d="m-5 0 3 3 7-7"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** Each discipline has its own visual grammar; the timeline is shared. */
function WorkScene({
  config: c,
  phase,
  id,
}: {
  config: VisualConfig;
  phase: number;
  id: string;
}) {
  const a = c.color;
  if (c.scene === "orbit")
    return (
      <g>
        <defs>
          <linearGradient id={id + "-sphere"} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={a} />
            <stop offset=".45" stopColor={a} stopOpacity=".35" />
            <stop offset="1" stopColor="#101512" />
          </linearGradient>
        </defs>
        <g transform="translate(410 278)">
          {[145, 184, 222].map((r, i) => (
            <ellipse
              key={r}
              rx={r}
              ry={r * 0.47}
              fill="none"
              stroke={a}
              strokeOpacity={0.13 + i * 0.06}
              transform={"rotate(" + (-35 + i * 38) + ")"}
            />
          ))}
          <motion.g
            animate={{ rotate: phase * 30 }}
            transition={{ duration: 2.4, ease: EASE }}
          >
            <circle
              r="103"
              fill={"url(#" + id + "-sphere)"}
              stroke={a}
              strokeOpacity=".6"
            />
            {[-60, -30, 0, 30, 60].map((x) => (
              <ellipse
                key={x}
                rx={Math.sqrt(10609 - x * x)}
                ry="22"
                cy={x}
                fill="none"
                stroke="#ecffd8"
                strokeOpacity=".18"
                transform="rotate(-25)"
              />
            ))}
            <ellipse
              rx="46"
              ry="103"
              fill="none"
              stroke="#edffdf"
              strokeOpacity=".24"
              transform="rotate(-25)"
            />
          </motion.g>
          <circle
            r="37"
            fill="#152017"
            fillOpacity=".94"
            stroke={a}
            strokeOpacity=".3"
          />
          <SceneIcon config={c} x={0} y={0} size={36} />
          <circle cx="-172" cy="97" r="6" fill={a} />
          <circle cx="165" cy="-108" r="4" fill={a} />
        </g>
        {[0, 1, 2].map((i) => (
          <motion.g
            key={i}
            animate={{ x: phase >= i ? 0 : 18, opacity: phase >= i ? 1 : 0.26 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <path
              d={"M510 " + (225 + i * 40) + " H580 L620 " + (154 + i * 120)}
              fill="none"
              stroke={a}
              strokeOpacity=".25"
            />
            <rect
              x="620"
              y={119 + i * 120}
              width="235"
              height="72"
              rx="12"
              fill="#121916"
              stroke={a}
              strokeOpacity=".23"
            />
            <Label x={641} y={149 + i * 120} muted size={12}>
              {"0" + (i + 1) + " / CANAL"}
            </Label>
            <SceneIcon
              config={c}
              index={i + 1}
              x={650}
              y={168 + i * 120}
              size={20}
            />
            <Label x={670} y={174 + i * 120} size={19}>
              {c.nodes[i + 1]}
            </Label>
            {phase >= i && <Tick x={828} y={155 + i * 120} color={a} />}
          </motion.g>
        ))}
        <Label x={115} y={472} muted size={13}>
          UNA ESTRATEGIA · MÚLTIPLES ESPECIALISTAS
        </Label>
      </g>
    );
  if (c.scene === "pipeline")
    return (
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect
              x={96 + i * 264}
              y="104"
              width="246"
              height="338"
              rx="14"
              fill="#111715"
              stroke="#26322b"
            />
            <circle
              cx={117 + i * 264}
              cy="134"
              r="4"
              fill={a}
              opacity={0.4 + i * 0.3}
            />
            <SceneIcon
              config={c}
              index={i + 1}
              x={137 + i * 264}
              y={134}
              size={18}
            />
            <Label x={154 + i * 264} y={139} size={14}>
              {c.nodes[i + 1]}
            </Label>
            <path d={"M" + (112 + i * 264) + " 157 h214"} stroke="#28322b" />
            {[0, 1, 2].map((j) => (
              <motion.g
                key={j}
                animate={{
                  y: phase === i ? -5 : 0,
                  opacity: phase >= i ? 1 : 0.32,
                }}
                transition={{ duration: 0.8, delay: j * 0.08, ease: EASE }}
              >
                <rect
                  x={110 + i * 264}
                  y={176 + j * 78}
                  width="218"
                  height="65"
                  rx="8"
                  fill="#1b2420"
                  stroke={phase === i ? a : "#344238"}
                  strokeOpacity=".35"
                />
                <rect
                  x={126 + i * 264}
                  y={192 + j * 78}
                  width={90 + j * 24}
                  height="5"
                  rx="2.5"
                  fill="#c0c9bd"
                  opacity=".6"
                />
                <rect
                  x={126 + i * 264}
                  y={206 + j * 78}
                  width="65"
                  height="4"
                  rx="2"
                  fill="#68776c"
                />
                <circle
                  cx={307 + i * 264}
                  cy={209 + j * 78}
                  r="7"
                  fill={a}
                  fillOpacity={phase >= i ? 0.8 : 0.15}
                />
                <Label x={126 + i * 264} y={229 + j * 78} size={10} muted>
                  {"OP-" + (i + 1) + "0" + (j + 1)}
                </Label>
              </motion.g>
            ))}
          </g>
        ))}
        <motion.path
          d="M215 476 H744"
          stroke={a}
          strokeWidth="2"
          initial={false}
          animate={{ pathLength: (phase + 1) / 3 }}
          transition={{ duration: 1.5, ease: EASE }}
        />
        {[215, 480, 744].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy="476"
            r="5"
            fill={phase >= i ? a : "#344238"}
          />
        ))}
      </g>
    );
  if (c.scene === "network")
    return (
      <g>
        {[150, 220, 290, 360, 430].map((y) => (
          <path
            key={y}
            d={"M100 " + y + " H860"}
            stroke="#222e27"
            strokeDasharray="3 7"
          />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <motion.rect
            key={i}
            x={112 + i * 62}
            y={430 - (45 + ((i * 37) % 90) + i * 15)}
            width="28"
            height={45 + ((i * 37) % 90) + i * 15}
            rx="3"
            fill={a}
            initial={false}
            animate={{ opacity: i < 4 + phase * 4 ? 0.15 + i * 0.025 : 0.07 }}
            transition={{ duration: 1, delay: i * 0.03 }}
          />
        ))}
        <motion.path
          d="M125 389 C200 389 215 330 280 342 S380 300 435 308 S550 194 615 220 S740 98 820 119"
          fill="none"
          stroke={a}
          strokeWidth="3"
          initial={false}
          animate={{ pathLength: [0.3, 0.65, 1][phase] }}
          transition={{ duration: 2, ease: EASE }}
        />
        <motion.g
          animate={{ x: [280, 615, 820][phase], y: [342, 220, 119][phase] }}
          transition={{ duration: 2, ease: EASE }}
        >
          <circle r="18" fill={a} fillOpacity=".1" />
          <circle r="5" fill={a} />
        </motion.g>
        <rect
          x="116"
          y="83"
          width="251"
          height="88"
          rx="10"
          fill="#152019"
          stroke={a}
          strokeOpacity=".3"
        />
        <SceneIcon config={c} index={phase} x={140} y={108} size={20} />
        <Label x={160} y={113} muted size={12}>
          {c.nodes[phase]?.toUpperCase()}
        </Label>
        <Label x={136} y={145} size={23}>
          {
            ["Explorar la señal", "Conectar los datos", "Detectar el patrón"][
              phase
            ]
          }
        </Label>
        <Label x={112} y={472} muted size={13}>
          EXPLORACIÓN
        </Label>
        <Label x={690} y={472} muted size={13}>
          OPORTUNIDAD
        </Label>
      </g>
    );
  if (c.scene === "route")
    return (
      <g>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <g key={i}>
            <path d={"M" + (110 + i * 90) + " 90 v370"} stroke="#243027" />
            <path d={"M90 " + (100 + i * 45) + " h780"} stroke="#243027" />
          </g>
        ))}
        <path
          d="M185 359 H310 Q345 359 345 324 V230 Q345 200 375 200 H540 Q575 200 575 230 V280 Q575 310 605 310 H745 V159"
          fill="none"
          stroke={a}
          strokeOpacity=".14"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <motion.path
          d="M185 359 H310 Q345 359 345 324 V230 Q345 200 375 200 H540 Q575 200 575 230 V280 Q575 310 605 310 H745 V159"
          fill="none"
          stroke={a}
          strokeWidth="3"
          initial={false}
          animate={{ pathLength: (phase + 1) / 3 }}
          transition={{ duration: 2, ease: EASE }}
        />
        {(
          [
            [185, 359],
            [460, 200],
            [745, 159],
          ] as const
        ).map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="17" fill="#17231b" stroke={a} />
            <SceneIcon config={c} index={i} x={x} y={y} size={19} />
            <rect
              x={x - 52}
              y={y + 30}
              width="125"
              height="37"
              rx="6"
              fill="#162019"
            />
            <Label x={x - 39} y={y + 54} size={14}>
              {c.nodes[i]}
            </Label>
          </g>
        ))}
        <Label x={105} y={481} muted size={13}>
          ORIGEN → COORDINACIÓN → ENTREGA
        </Label>
      </g>
    );
  if (c.scene === "messages")
    return (
      <g>
        <rect
          x="146"
          y="88"
          width="670"
          height="382"
          rx="18"
          fill="#111915"
          stroke="#304035"
        />
        <circle cx="183" cy="124" r="6" fill={a} />
        <SceneIcon config={c} x={210} y={124} size={22} />
        <Label x={231} y={130} size={15}>
          {c.title}
        </Label>
        <Label x={688} y={130} muted size={12}>
          EJEMPLO
        </Label>
        <path d="M146 153 H816" stroke="#2b362e" />
        <rect x="346" y="179" width="434" height="68" rx="12" fill="#263329" />
        <Label x={370} y={207} size={15}>
          {c.scene === "messages" && c.short === "SUP"
            ? "No puedo acceder a mi cuenta."
            : "¿Podéis ayudarme con mi solicitud?"}
        </Label>
        <Label x={370} y={231} muted size={11}>
          SOLICITUD RECIBIDA
        </Label>
        <motion.g
          animate={{ opacity: phase >= 1 ? 1 : 0.3, y: phase >= 1 ? 0 : 6 }}
          transition={{ duration: 0.7 }}
        >
          <rect
            x="182"
            y="268"
            width="440"
            height="54"
            rx="10"
            fill={a}
            fillOpacity=".06"
            stroke={a}
            strokeOpacity=".22"
          />
          <Label x={206} y={300} size={14}>
            {c.nodes[1]} · Historial · Base de conocimiento
          </Label>
        </motion.g>
        <motion.g
          animate={{ opacity: phase === 2 ? 1 : 0.18, y: phase === 2 ? 0 : 8 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <rect
            x="182"
            y="342"
            width="514"
            height="89"
            rx="12"
            fill="#1b2b20"
          />
          <Label x={206} y={371} size={16}>
            Ya tengo el contexto. Vamos a resolverlo.
          </Label>
          <Label x={206} y={401} muted size={12}>
            RESPUESTA PREPARADA PARA REVISIÓN
          </Label>
          <Tick x={666} y={388} color={a} />
        </motion.g>
      </g>
    );
  if (c.scene === "terminal")
    return (
      <g>
        <rect
          x="108"
          y="86"
          width="744"
          height="388"
          rx="14"
          fill="#101713"
          stroke="#2e3c32"
        />
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={134 + i * 18}
            cy="111"
            r="4"
            fill={["#8e605b", "#9b895d", "#659675"][i]}
          />
        ))}
        <SceneIcon config={c} x={207} y={111} size={21} />
        <Label x={230} y={116} muted size={12}>
          workspace / implementation.ts
        </Label>
        <path d="M108 134 H852" stroke="#27342b" />
        {[
          "const mission = await receive(brief);",
          "",
          "const solution = await team.build({",
          "  context: mission.requirements,",
          "  permissions: 'review-required',",
          "  checks: ['types', 'tests', 'security']",
          "});",
          "",
          "await deliver(solution);",
        ].map((line, i) => (
          <motion.g
            key={i}
            animate={{ opacity: i < 3 + phase * 3 ? 1 : 0.18 }}
            transition={{ duration: 0.6, delay: i * 0.035 }}
          >
            <Label x={131} y={168 + i * 25} muted size={12}>
              {String(i + 1).padStart(2, "0")}
            </Label>
            <text
              x="172"
              y={168 + i * 25}
              fontFamily="var(--font-mono),monospace"
              fontSize="16"
              fill={i === 0 || i === 8 ? a : "#b5c4b7"}
            >
              {line}
            </text>
          </motion.g>
        ))}
        <path d="M108 409 H852" stroke="#27342b" />
        <Tick x={139} y={442} color={a} />
        <Label x={164} y={447} size={14}>
          {
            [
              "Especificación recibida",
              "Construcción en curso",
              "Entrega lista para revisión",
            ][phase]
          }
        </Label>
      </g>
    );
  return (
    <g>
      <rect
        x="183"
        y="100"
        width="570"
        height="385"
        rx="12"
        fill="#111713"
        stroke="#29392d"
        transform="rotate(-5 468 292)"
      />
      <rect
        x="209"
        y="78"
        width="570"
        height="385"
        rx="12"
        fill="#19201b"
        stroke="#455144"
      />
      <Label x={240} y={119} muted size={12}>
        DEPARTIFY / {c.short} / DOCUMENTO DE EJEMPLO
      </Label>
      <Label x={240} y={165} size={29}>
        {c.nodes[phase]}
      </Label>
      <path d="M240 189 H747" stroke="#354333" />
      {c.nodes.slice(0, 4).map((node, i) => (
        <g key={node}>
          <SceneIcon config={c} index={i} x={253} y={221 + i * 53} size={22} />
          <Label x={284} y={227 + i * 53} size={16}>
            {node}
          </Label>
          <path d={"M240 " + (245 + i * 53) + " H747"} stroke="#2b372c" />
          <motion.g
            animate={{ opacity: i <= phase + 1 ? 1 : 0.12 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Tick x={719} y={221 + i * 53} color={a} />
          </motion.g>
        </g>
      ))}
      <motion.g
        animate={{ y: phase === 2 ? 0 : 10, opacity: phase === 2 ? 1 : 0.4 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <rect x="574" y="389" width="253" height="66" rx="10" fill={a} />
        <text
          x="595"
          y="418"
          fontSize="12"
          fill="#182017"
          fontFamily="var(--font-mono),monospace"
        >
          REVISIÓN COMPLETADA
        </text>
        <text x="595" y="441" fontSize="17" fill="#182017">
          Tu aprobación, el último paso.
        </text>
      </motion.g>
    </g>
  );
}

function TeamScene({
  config: c,
  phase,
}: {
  config: VisualConfig;
  phase: number;
}) {
  const positions = [
    [110, 115],
    [610, 115],
    [110, 330],
    [610, 330],
    [360, 410],
  ] as const;
  return (
    <g>
      {positions.map(([x, y], i) => (
        <g key={c.nodes[i]}>
          <motion.path
            d={"M480 260 Q" + (x + 100) + " 260 " + (x + 100) + " " + (y + 39)}
            fill="none"
            stroke={c.color}
            initial={false}
            animate={{ pathLength: 1, opacity: i <= phase + 2 ? 0.6 : 0.12 }}
            transition={{ duration: 1.2, ease: EASE }}
          />
          <motion.g
            animate={{
              opacity: i <= phase + 2 ? 1 : 0.35,
              y: i <= phase + 2 ? 0 : 5,
            }}
            transition={{ duration: 0.7, delay: i * 0.05 }}
          >
            <rect
              x={x}
              y={y}
              width="240"
              height="78"
              rx="12"
              fill="#172019"
              stroke={c.color}
              strokeOpacity=".28"
            />
            <Label x={x + 18} y={y + 26} size={11} muted>
              {"ESPECIALISTA / 0" + (i + 1)}
            </Label>
            <SceneIcon config={c} index={i} x={x + 28} y={y + 48} size={24} />
            <Label x={x + 51} y={y + 54} size={18}>
              {c.nodes[i]}
            </Label>
            <circle cx={x + 213} cy={y + 25} r="3" fill={c.color} />
          </motion.g>
        </g>
      ))}
      <circle
        cx="480"
        cy="260"
        r="69"
        fill="#0d140f"
        stroke={c.color}
        strokeOpacity=".2"
      />
      <circle
        cx="480"
        cy="260"
        r="57"
        fill="#19251b"
        stroke={c.color}
        strokeOpacity=".7"
      />
      <SceneIcon config={c} x={480} y={246} size={30} />
      <text
        x="480"
        y="275"
        textAnchor="middle"
        fill={c.color}
        fontSize="22"
        fontFamily="var(--font-mono),monospace"
      >
        {c.short}
      </text>
      <text
        x="480"
        y="295"
        textAnchor="middle"
        fill="#97a48f"
        fontSize="10"
        letterSpacing="2"
      >
        COORDINACIÓN
      </text>
    </g>
  );
}

function OutputScene({
  config: c,
  phase,
}: {
  config: VisualConfig;
  phase: number;
}) {
  return (
    <g>
      <rect
        x="145"
        y="104"
        width="630"
        height="351"
        rx="14"
        fill="#141c16"
        stroke="#34422f"
        transform="rotate(-4 460 279)"
      />
      <rect x="175" y="79" width="630" height="351" rx="14" fill="#e9ece0" />
      <text
        x="207"
        y="118"
        fill="#68705e"
        fontSize="12"
        letterSpacing="2"
        fontFamily="var(--font-mono),monospace"
      >
        DEPARTIFY / {c.short} — ENTREGA 001
      </text>
      <path d="M207 138 H772" stroke="#c6cbbb" />
      <text x="207" y="185" fill="#1b2619" fontSize="31" letterSpacing="-1">
        {c.output}
      </text>
      <text x="207" y="215" fill="#68705e" fontSize="16">
        Preparado por tu equipo. La decisión es tuya.
      </text>
      {c.nodes.slice(0, 3).map((node, i) => (
        <motion.g
          key={node}
          animate={{ opacity: phase >= i ? 1 : 0.22, x: phase >= i ? 0 : 8 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <circle cx="220" cy={253 + i * 45} r="10" fill="#d7ddc9" />
          <path
            d={"m215 " + (253 + i * 45) + " 3 3 6-7"}
            fill="none"
            stroke="#445c32"
            strokeWidth="1.5"
          />
          <text x="246" y={259 + i * 45} fill="#394733" fontSize="17">
            {node}
          </text>
          <path d={"M207 " + (275 + i * 45) + " H772"} stroke="#cdd2c3" />
        </motion.g>
      ))}
      <motion.g
        animate={{ y: phase === 2 ? 0 : 12, opacity: phase === 2 ? 1 : 0.35 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <rect
          x="553"
          y="377"
          width="286"
          height="80"
          rx="12"
          fill={c.color}
          stroke="#0d160d"
          strokeOpacity=".1"
        />
        <text
          x="576"
          y="408"
          fill="#29391f"
          fontSize="11"
          letterSpacing="1.8"
          fontFamily="var(--font-mono),monospace"
        >
          SIGUIENTE PASO
        </text>
        <text x="576" y="436" fill="#1c2917" fontSize="23">
          Tu aprobación <tspan dx="25">↗</tspan>
        </text>
      </motion.g>
    </g>
  );
}

export function DepartmentMotionGraphic({
  slug,
  kind,
  paused = false,
}: {
  slug: string;
  kind: VisualKind;
  paused?: boolean;
}) {
  const config = CONFIGS[slug] ?? CONFIGS.developer!;
  const MainIcon = departmentIcons(slug).main;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.2 });
  const [phase, setPhase] = useState(0);
  const [foreground, setForeground] = useState(true);
  const remaining = useRef(3600);
  const id = useId().replace(/:/g, "");
  useEffect(() => {
    const update = () => setForeground(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (paused || reduced || !visible || !foreground) return;
    const started = performance.now();
    let finished = false;
    const timer = window.setTimeout(() => {
      finished = true;
      remaining.current = 3600;
      setPhase((p) => (p + 1) % 3);
    }, remaining.current);
    return () => {
      window.clearTimeout(timer);
      if (!finished) {
        remaining.current = Math.max(
          0,
          remaining.current - (performance.now() - started),
        );
      }
    };
  }, [paused, reduced, visible, foreground, phase]);
  const step = reduced ? 2 : phase;
  const story =
    kind === "team"
      ? ["Cinco especialidades.", "Un mismo contexto.", "Un equipo coordinado."]
      : kind === "output"
        ? [
            "El trabajo, reunido.",
            "Cada detalle, revisado.",
            "Tú das el visto bueno.",
          ]
        : (STORIES[slug] ?? STORIES.developer!);
  return (
    <div
      ref={ref}
      className="department-cinema"
      style={{ "--visual-accent": config.color } as React.CSSProperties}
      data-paused={paused || reduced || !visible || !foreground}
    >
      <div className="department-cinema-heading">
        <span className="department-cinema-code">
          <MainIcon size={18} strokeWidth={1.5} aria-hidden="true" />
          {config.short}
          <span>
            {" "}
            /{" "}
            {kind === "hero"
              ? "EN ACCIÓN"
              : kind === "team"
                ? "EQUIPO"
                : "ENTREGA"}
          </span>
        </span>
        <span className="department-cinema-example">Ejemplo ilustrativo</span>
      </div>
      <div className="department-cinema-story">
        <span className="department-cinema-number">0{step + 1}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={step}
            initial={reduced ? false : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? undefined : { y: -8, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
          >
            {story[step]}
          </motion.p>
        </AnimatePresence>
      </div>
      <motion.svg
        initial={false}
        viewBox="0 0 960 540"
        role="img"
        aria-label={
          config.title +
          ": " +
          (kind === "team"
            ? config.nodes.join(", ") + ". Equipo coordinado."
            : kind === "output"
              ? config.output + ". Pendiente de aprobación."
              : story.join(" "))
        }
        className="department-cinema-stage"
      >
        <defs>
          <radialGradient id={id + "-ambient"}>
            <stop stopColor={config.color} stopOpacity=".08" />
            <stop offset="1" stopColor={config.color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="480"
          cy="275"
          rx="455"
          ry="255"
          fill={"url(#" + id + "-ambient)"}
        />
        <g style={reduced ? { transition: "none" } : undefined}>
          {kind === "hero" ? (
            <WorkScene config={config} phase={step} id={id} />
          ) : kind === "team" ? (
            <TeamScene config={config} phase={step} />
          ) : (
            <OutputScene config={config} phase={step} />
          )}
        </g>
      </motion.svg>
      <div className="department-cinema-timeline" aria-hidden="true">
        {["Tu encargo", "El trabajo", "Tu revisión"].map((label, i) => (
          <div key={label} data-active={step === i} data-done={step > i}>
            <span>
              <i />
            </span>
            <p>
              0{i + 1}
              <b>{label}</b>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
