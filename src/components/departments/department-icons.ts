import {
  Megaphone,
  Search,
  BriefcaseBusiness,
  MessagesSquare,
  Files,
  Code2,
  Network,
  Target,
  PenLine,
  MousePointer2,
  Mail,
  ChartNoAxesCombined,
  UsersRound,
  ContactRound,
  ListChecks,
  Handshake,
  FileSearch,
  Link2,
  Globe2,
  CalendarDays,
  FolderCheck,
  Receipt,
  ShieldCheck,
  Bot,
  Send,
  CircleCheck,
  Workflow,
  Boxes,
  Route,
  MapPin,
  Truck,
  PackageCheck,
  Lightbulb,
  FlaskConical,
  TrendingUp,
  Database,
  Filter,
  ChartColumn,
  Bell,
  Wallet,
  Landmark,
  Calculator,
  Headphones,
  Wrench,
  Bug,
  Scale,
  FileText,
  Signature,
  KeyRound,
  ClipboardCheck,
  HeartHandshake,
  Video,
  Share2,
  type LucideIcon,
} from "lucide-react";

type DepartmentIconSet = { main: LucideIcon; tasks: readonly LucideIcon[] };
export const DEPARTMENT_ICONS: Record<string, DepartmentIconSet> = {
  marketing: {
    main: Megaphone,
    tasks: [Target, PenLine, MousePointer2, Mail, ChartNoAxesCombined],
  },
  seo: {
    main: Search,
    tasks: [FileSearch, Search, PenLine, Link2, ChartNoAxesCombined],
  },
  ventas: {
    main: BriefcaseBusiness,
    tasks: [Search, ContactRound, ListChecks, Mail, Handshake],
  },
  "atencion-cliente": {
    main: MessagesSquare,
    tasks: [MessagesSquare, FileSearch, Send, UsersRound, CircleCheck],
  },
  administracion: {
    main: Files,
    tasks: [Receipt, CalendarDays, FolderCheck, ContactRound, ClipboardCheck],
  },
  developer: {
    main: Code2,
    tasks: [FileText, Network, Code2, Bug, PackageCheck],
  },
  direccion: {
    main: Network,
    tasks: [Target, UsersRound, Workflow, ClipboardCheck, ChartColumn],
  },
  contenido: {
    main: PenLine,
    tasks: [Target, PenLine, Lightbulb, Video, Share2],
  },
  operaciones: {
    main: Boxes,
    tasks: [Workflow, ShieldCheck, Receipt, Network, ListChecks],
  },
  rrhh: {
    main: UsersRound,
    tasks: [Search, Handshake, UsersRound, HeartHandshake, TrendingUp],
  },
  logistica: { main: Route, tasks: [MapPin, Boxes, Truck, PackageCheck, Bell] },
  growth: {
    main: TrendingUp,
    tasks: [Lightbulb, FlaskConical, Globe2, ChartColumn, TrendingUp],
  },
  analitica: {
    main: ChartColumn,
    tasks: [Database, Network, Filter, ChartColumn, Bell],
  },
  finanzas: {
    main: Landmark,
    tasks: [Wallet, Receipt, Calculator, TrendingUp, FileText],
  },
  soporte: {
    main: Headphones,
    tasks: [MessagesSquare, Search, Wrench, ShieldCheck, CircleCheck],
  },
  legal: {
    main: Scale,
    tasks: [FileText, FileSearch, ShieldCheck, ClipboardCheck, Signature],
  },
  gobierno: {
    main: ShieldCheck,
    tasks: [FileText, KeyRound, FileSearch, ShieldCheck, ClipboardCheck],
  },
};

export function departmentIcons(slug: string): DepartmentIconSet {
  return (
    DEPARTMENT_ICONS[slug] ?? {
      main: Bot,
      tasks: [FileText, Workflow, CircleCheck],
    }
  );
}
