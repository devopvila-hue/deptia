-- Public voting is mediated by the server route. Contact data is never public.
create table public.department_interest_votes (
  id uuid primary key,
  created_at timestamptz not null default now(),
  departments text[] not null,
  locale text not null check (locale in ('es', 'en')),
  name text check (char_length(name) <= 100),
  email text check (char_length(email) <= 254),
  notify boolean not null default false,
  consent_version text,
  offer text,
  constraint valid_departments check (
    cardinality(departments) between 1 and 6
    and departments <@ array['rrhh', 'logistica', 'finanzas', 'legal', 'operaciones', 'analitica']::text[]
    and array_position(departments, null) is null
  ),
  constraint notification_contact check (
    (notify and email is not null and consent_version = 'department-launch-v1' and offer = 'launch-one-month-free')
    or (not notify and email is null and name is null and consent_version is null and offer is null)
  )
);

alter table public.department_interest_votes enable row level security;
revoke all on table public.department_interest_votes from public, anon, authenticated;
revoke all on table public.department_interest_votes from service_role;
grant select, insert on table public.department_interest_votes to service_role;
comment on table public.department_interest_votes is
  'Department priorities and optional launch notification opt-ins. Offer redemption is handled at launch; no marketing subscription.';
