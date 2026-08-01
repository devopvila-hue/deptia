-- =====================================================================
-- DEPT.IA · Migración inicial
-- =====================================================================
-- Tablas: profiles, companies, departments, company_departments,
--         roles, company_members, plans, subscriptions, department_content,
--         audit_log.
--
-- Convenciones:
--   * `id` siempre uuid v4 (gen_random_uuid()).
--   * `created_at` / `updated_at` con default now().
--   * Enums modelados como text + check constraint para mantener
--     flexibilidad en futuras migraciones.
--
-- IMPORTANTE:
--   * Esta migración es NO destructiva — no cambia ni borra tablas
--     existentes con datos de producción.
--   * Las políticas RLS están activas por defecto. Cada política se
--     documenta inline.
--   * Los seeds de `departments` reemplazan los 7 departamentos
--     canónicos (slug = mismo slug que en src/data/departments.ts).
-- =====================================================================

create extension if not exists "pgcrypto";

-- ============================== ENUMS =================================
-- Implementados como check constraints para evitar migraciones adicionales.

-- ============================== TABLES ================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  avatar_url text,
  company_id uuid,
  role text not null default 'member'
    check (role in ('super_admin','company_owner','company_admin','department_manager','member','viewer')),
  status text not null default 'active'
    check (status in ('invited','active','disabled')),
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists profiles_company_id_idx on public.profiles(company_id);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  plan_id uuid,
  status text not null default 'active'
    check (status in ('active','paused','churned')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price_monthly int,
  price_yearly int,
  currency text not null default 'EUR',
  billing_interval text not null default 'monthly'
    check (billing_interval in ('monthly','yearly')),
  features text[] not null default '{}',
  status text not null default 'active'
    check (status in ('active','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
    check (name in ('super_admin','company_owner','company_admin','department_manager','member','viewer')),
  description text,
  permissions text[] not null default '{}',
  is_system boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_name text not null,
  tagline text,
  short_description text,
  full_description text,
  icon text,
  image_url text,
  video_url text,
  video_thumbnail_url text,
  category text,
  price_from int,
  color_base text,
  color_accent text,
  status text not null default 'published'
    check (status in ('draft','published','archived')),
  is_public boolean not null default true,
  sort_order int not null default 100,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists departments_status_sort_idx on public.departments(status, sort_order);

create table if not exists public.company_departments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  department_id uuid not null references public.departments(id) on delete cascade,
  is_enabled boolean not null default true,
  enabled_at timestamptz,
  configuration jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(company_id, department_id)
);
create index if not exists company_departments_company_idx on public.company_departments(company_id);

create table if not exists public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member'
    check (role in ('super_admin','company_owner','company_admin','department_manager','member','viewer')),
  status text not null default 'invited'
    check (status in ('invited','active','disabled')),
  invited_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(company_id, user_id)
);
create index if not exists company_members_user_idx on public.company_members(user_id);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  plan_id uuid references public.plans(id),
  status text not null default 'trialing'
    check (status in ('trialing','active','past_due','canceled','incomplete','incomplete_expired','unpaid')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  provider text,
  provider_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists subscriptions_company_idx on public.subscriptions(company_id);

create table if not exists public.department_content (
  id uuid primary key default gen_random_uuid(),
  department_id uuid not null references public.departments(id) on delete cascade,
  locale text not null default 'es-ES',
  hero jsonb,
  sections jsonb,
  capabilities text[],
  deliverables text[],
  problems jsonb,
  use_cases jsonb,
  benefits text[],
  faq jsonb,
  cta jsonb,
  seo jsonb,
  status text not null default 'draft'
    check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(department_id, locale)
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete set null,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity text,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);
create index if not exists audit_log_company_idx on public.audit_log(company_id, created_at desc);

-- ========================== updated_at trigger ========================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
declare t text;
begin
  for t in
    select unnest(array[
      'profiles','companies','plans','departments',
      'company_departments','company_members','subscriptions','department_content'
    ])
  loop
    execute format(
      'drop trigger if exists trg_%I_updated_at on public.%I;', t, t);
    execute format(
      'create trigger trg_%I_updated_at before update on public.%I
       for each row execute function public.set_updated_at();', t, t);
  end loop;
end $$;

-- ============================== RLS ===================================
-- Habilitamos RLS y definimos políticas por tabla.

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.departments enable row level security;
alter table public.company_departments enable row level security;
alter table public.company_members enable row level security;
alter table public.roles enable row level security;
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.department_content enable row level security;
alter table public.audit_log enable row level security;

-- ----- helpers ---------------------------------------------------------
create or replace function public.is_super_admin(uid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(
    select 1 from public.profiles
    where id = uid and role = 'super_admin'
  );
$$;

create or replace function public.current_company_id(uid uuid)
returns uuid language sql stable security definer set search_path = public as $$
  select company_id from public.profiles where id = uid;
$$;

create or replace function public.has_role(uid uuid, allowed text[])
returns boolean language sql stable security definer set search_path = public as $$
  select exists(
    select 1 from public.profiles
    where id = uid and role = any(allowed)
  );
$$;

-- ----- profiles --------------------------------------------------------
-- Un usuario solo puede ver/editar su propio profile. super_admin todo.
create policy profiles_self_select on public.profiles
  for select using (auth.uid() = id or public.is_super_admin(auth.uid()));
create policy profiles_self_update on public.profiles
  for update using (auth.uid() = id or public.is_super_admin(auth.uid()));
-- Insert lo gestiona Supabase Auth → profile trigger (ver abajo).

-- ----- companies -------------------------------------------------------
-- Solo miembros de la empresa pueden verla; super_admin ve todas.
create policy companies_member_select on public.companies
  for select using (
    public.is_super_admin(auth.uid())
    or id = public.current_company_id(auth.uid())
  );
create policy companies_owner_update on public.companies
  for update using (
    public.is_super_admin(auth.uid())
    or (id = public.current_company_id(auth.uid())
        and public.has_role(auth.uid(), array['company_owner']))
  );
create policy companies_superadmin_write on public.companies
  for insert with check (public.is_super_admin(auth.uid()));

-- ----- departments (catálogo) -----------------------------------------
-- Cualquiera puede leer los publicados. Escritura solo super_admin.
create policy departments_public_select on public.departments
  for select using (
    is_public = true and status = 'published'
    or public.is_super_admin(auth.uid())
  );
create policy departments_admin_write on public.departments
  for insert with check (public.is_super_admin(auth.uid()));
create policy departments_admin_update on public.departments
  for update using (public.is_super_admin(auth.uid()));
create policy departments_admin_delete on public.departments
  for delete using (public.is_super_admin(auth.uid()));

-- ----- company_departments (activación por empresa) -------------------
-- Miembros de la empresa ven los suyos. super_admin todo.
-- Escritura: company_owner / company_admin / super_admin.
create policy cd_select on public.company_departments
  for select using (
    public.is_super_admin(auth.uid())
    or company_id = public.current_company_id(auth.uid())
  );
create policy cd_write on public.company_departments
  for insert with check (
    public.is_super_admin(auth.uid())
    or (
      company_id = public.current_company_id(auth.uid())
      and public.has_role(auth.uid(),
        array['company_owner','company_admin','department_manager'])
    )
  );
create policy cd_update on public.company_departments
  for update using (
    public.is_super_admin(auth.uid())
    or (
      company_id = public.current_company_id(auth.uid())
      and public.has_role(auth.uid(),
        array['company_owner','company_admin','department_manager'])
    )
  );

-- ----- company_members -------------------------------------------------
-- Miembros de la empresa los ven. super_admin todo.
create policy cm_select on public.company_members
  for select using (
    public.is_super_admin(auth.uid())
    or company_id = public.current_company_id(auth.uid())
  );
create policy cm_invite on public.company_members
  for insert with check (
    public.is_super_admin(auth.uid())
    or (
      company_id = public.current_company_id(auth.uid())
      and public.has_role(auth.uid(),
        array['company_owner','company_admin'])
    )
  );
create policy cm_update on public.company_members
  for update using (
    public.is_super_admin(auth.uid())
    or (
      company_id = public.current_company_id(auth.uid())
      and public.has_role(auth.uid(),
        array['company_owner','company_admin'])
    )
  );

-- ----- roles -----------------------------------------------------------
create policy roles_select on public.roles
  for select using (auth.role() = 'authenticated' or public.is_super_admin(auth.uid()));
create policy roles_admin_write on public.roles
  for insert with check (public.is_super_admin(auth.uid()));
create policy roles_admin_update on public.roles
  for update using (public.is_super_admin(auth.uid()));

-- ----- plans -----------------------------------------------------------
-- Lectura pública (planes comercializables). Escritura solo super_admin.
create policy plans_public_select on public.plans
  for select using (status = 'active' or public.is_super_admin(auth.uid()));
create policy plans_admin_write on public.plans
  for insert with check (public.is_super_admin(auth.uid()));
create policy plans_admin_update on public.plans
  for update using (public.is_super_admin(auth.uid()));

-- ----- subscriptions ---------------------------------------------------
-- Una empresa ve solo su suscripción actual; super_admin todas.
create policy subs_company_select on public.subscriptions
  for select using (
    public.is_super_admin(auth.uid())
    or company_id = public.current_company_id(auth.uid())
  );
create policy subs_admin_write on public.subscriptions
  for insert with check (public.is_super_admin(auth.uid()));
create policy subs_admin_update on public.subscriptions
  for update using (public.is_super_admin(auth.uid()));

-- ----- department_content ---------------------------------------------
-- Lectura pública para contenido publicado; admin todo.
create policy dc_public_select on public.department_content
  for select using (
    status = 'published' or public.is_super_admin(auth.uid())
    or exists (
      select 1 from public.company_departments cd
      join public.profiles p on p.company_id = cd.company_id
      where p.id = auth.uid()
        and cd.department_id = department_content.department_id
        and cd.is_enabled = true
    )
  );
create policy dc_admin_write on public.department_content
  for insert with check (public.is_super_admin(auth.uid()));
create policy dc_admin_update on public.department_content
  for update using (public.is_super_admin(auth.uid()));

-- ----- audit_log -------------------------------------------------------
-- Solo super_admin puede leer. Cualquier usuario autenticado puede insertar
-- filas de su propia empresa (a través de Server Actions con service_role).
create policy audit_admin_select on public.audit_log
  for select using (public.is_super_admin(auth.uid()));
create policy audit_insert_any_authenticated on public.audit_log
  for insert with check (auth.role() = 'authenticated');

-- ========================== TRIGGER: profile al signup ================
-- Cuando un usuario se registra en auth.users, creamos automáticamente
-- un profile vacío para evitar errores de RLS por falta de fila.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role, status)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', null),
    'member',
    'active'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ========================== SEED CATALOG =============================
-- Siembra los 7 departamentos canónicos si la tabla está vacía.
-- Mantener coherente con src/data/departments.ts.

insert into public.departments
  (slug, name, short_name, tagline, sort_order, category, color_base, color_accent, is_public, status)
values
  ('marketing',         'Departamento de Marketing',         'Marketing',         'Estrategia, campañas y crecimiento en un solo equipo.', 1,  'Crecimiento',   '#d8ff62', 'rgba(216,255,98,0.18)',  true, 'published'),
  ('ventas',            'Departamento de Ventas',            'Ventas',            'Pipeline activo, seguimiento constante, propuestas listas.', 2, 'Comercial',     '#7ce5a3', 'rgba(124,229,163,0.16)', true, 'published'),
  ('contenido',         'Departamento de Contenido',         'Contenido',         'Dirección creativa, guiones, creatividades y producción coordinada.', 3, 'Creatividad', '#ffbd59', 'rgba(255,189,89,0.14)',  true, 'published'),
  ('operaciones',       'Departamento de Operaciones',       'Operaciones',       'Procesos, datos y optimización de la operativa diaria.', 4, 'Operaciones', '#69b4ff', 'rgba(105,180,255,0.16)', true, 'published'),
  ('atencion-cliente',  'Departamento de Atención al Cliente','Atención al cliente','Soporte consistente, con memoria y tono de marca.', 5, 'Soporte',    '#c4a3ff', 'rgba(196,163,255,0.16)', true, 'published'),
  ('seo',               'Departamento SEO',                  'SEO',               'Auditorías, contenidos y autoridad construida a largo plazo.', 6, 'Crecimiento','#6ed3a0', 'rgba(110,211,160,0.14)', true, 'published'),
  ('administracion',    'Departamento Administrativo',       'Administración',    'Facturación, conciliaciones y reporting financiero controlado.', 7, 'Finanzas','#f08775', 'rgba(240,135,117,0.16)', true, 'published'),
  ('rrhh',              'Departamento de Recursos Humanos',  'Recursos Humanos', 'Personas, selección, onboarding y cultura, ejecutados con tu voz.', 8, 'Personas', '#f5a866', 'rgba(245,168,102,0.16)', true, 'published'),
  ('logistica',         'Departamento de Logística',         'Logística',        'Inventario, rutas y proveedores coordinados bajo control humano.', 9, 'Operaciones', '#7adcb5', 'rgba(122,220,181,0.16)', true, 'published')
on conflict (slug) do nothing;

-- ========================== SEED ROLES ================================
insert into public.roles (name, description, permissions, is_system)
values
  ('super_admin',       'Acceso total a la plataforma',                 array['*'], true),
  ('company_owner',     'Propietario de la empresa cliente',            array[
      'companies.read','companies.manage',
      'members.read','members.invite','members.manage','members.deactivate',
      'departments.read','departments.toggle_for_company',
      'department_content.read',
      'plans.read','subscriptions.read','subscriptions.manage',
      'audit.read'
    ], true),
  ('company_admin',     'Administrador dentro de la empresa',           array[
      'companies.read',
      'members.read','members.invite','members.manage','members.deactivate',
      'departments.read','departments.toggle_for_company',
      'department_content.read',
      'plans.read','subscriptions.read'
    ], true),
  ('department_manager','Gestiona uno o varios departamentos',            array[
      'companies.read','members.read',
      'departments.read','departments.toggle_for_company',
      'department_content.read','department_content.manage',
      'plans.read','subscriptions.read'
    ], true),
  ('member',            'Miembro estándar con acceso de lectura',        array[
      'companies.read','members.read',
      'departments.read','department_content.read'
    ], true),
  ('viewer',            'Solo lectura',                                  array[
      'companies.read','departments.read','department_content.read'
    ], true)
on conflict (name) do update set
  description = excluded.description,
  permissions = excluded.permissions;

-- ========================== SEED PLANS =================================
insert into public.plans (name, slug, description, price_monthly, price_yearly, features)
values
  ('Starter',  'starter',  'Instancia privada con un departamento.',            99,  999,  array['1 instancia privada','1 departamento','Panel web + Telegram','Borradores y aprobaciones']),
  ('Business',  'business', 'Hasta 3 departamentos coordinados.',               249, 2499, array['Todo Starter','Hasta 3 departamentos','Informes operativos','Memoria compartida']),
  ('Company',   'company',  'Equipo completo de departamentos.',                599, 5999, array['Todo Business','Departamentos ilimitados','SLA dedicado','Auditoría trimestral'])
on conflict (slug) do nothing;
