/**
 * Servicios de autenticación con Supabase.
 *
 * Funciones server-side (Server Actions / Route Handlers) que el
 * LoginForm y el RegistrationFlow consumen. NUNCA llamar desde
 * el cliente directamente — siempre a través de Server Actions.
 *
 * Mientras Supabase no esté configurado, las funciones devuelven un
 * error tipado `not_configured` para que la UI pueda ofrecer un
 * fallback claro al usuario.
 */
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export type AuthError =
  | { kind: "not_configured"; message: string }
  | { kind: "invalid_credentials"; message: string }
  | { kind: "rate_limited"; message: string }
  | { kind: "validation"; message: string; field?: string }
  | { kind: "unknown"; message: string };

const NOT_CONFIGURED: AuthError = {
  kind: "not_configured",
  message:
    "La autenticación aún no está conectada. El equipo de Deptify activará Supabase en breve.",
};

function notConfigured(): AuthError {
  return NOT_CONFIGURED;
}

export interface SignInInput {
  email: string;
  password: string;
  next?: string;
}

export async function signIn(
  input: SignInInput
): Promise<{ ok: true; redirectTo: string } | { ok: false; error: AuthError }> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: notConfigured() };

  const { error } = await supabase.auth.signInWithPassword({
    email: input.email.trim().toLowerCase(),
    password: input.password,
  });
  if (error) {
    if (error.message.toLowerCase().includes("credentials")) {
      return {
        ok: false,
        error: {
          kind: "invalid_credentials",
          message: "Email o contraseña incorrectos.",
        },
      };
    }
    return { ok: false, error: { kind: "unknown", message: error.message } };
  }

  const target = input.next && input.next.startsWith("/") ? input.next : "/panel";
  revalidatePath("/", "layout");
  return { ok: true, redirectTo: target };
}

export async function signOut(): Promise<void> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/acceso");
}

export interface SignUpInput {
  email: string;
  password: string;
  fullName: string;
  companyName?: string;
}

export async function signUp(
  input: SignUpInput
): Promise<
  { ok: true; needsEmailConfirmation: boolean } | { ok: false; error: AuthError }
> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: notConfigured() };

  const email = input.email.trim().toLowerCase();

  const { data, error } = await supabase.auth.signUp({
    email,
    password: input.password,
    options: {
      data: {
        full_name: input.fullName,
        company_name: input.companyName ?? null,
      },
    },
  });

  if (error) {
    if (error.message.toLowerCase().includes("registered")) {
      return {
        ok: false,
        error: {
          kind: "validation",
          message: "Este email ya está registrado. Prueba a iniciar sesión.",
        },
      };
    }
    return { ok: false, error: { kind: "unknown", message: error.message } };
  }

  // Aseguramos que exista un profile + company si el signup fue confirmado
  // automáticamente (por ejemplo, en entorno dev sin confirmación de email).
  const userId = data.user?.id;
  if (userId && input.companyName) {
    await ensureProfileAndCompany(userId, email, input.fullName, input.companyName);
  }

  return {
    ok: true,
    needsEmailConfirmation: !data.session,
  };
}

export async function requestPasswordRecovery(
  email: string
): Promise<{ ok: true } | { ok: false; error: AuthError }> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: notConfigured() };

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://deptify.com";
  const { error } = await supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase(),
    { redirectTo: `${siteUrl}/acceso?reset=true` }
  );
  if (error) return { ok: false, error: { kind: "unknown", message: error.message } };

  return { ok: true };
}

/**
 * Garantiza que existan `profile` y `company` cuando el signup ocurre
 * sin confirmación de email (entornos locales, magic link, etc.).
 * Solo se ejecuta desde el servidor.
 */
async function ensureProfileAndCompany(
  userId: string,
  email: string,
  fullName: string,
  companyName: string
): Promise<void> {
  try {
    const admin = getSupabaseAdminClient();
    const slug = makeSlug(companyName);

    const { data: company } = await admin
      .from("companies")
      .insert({ name: companyName, slug })
      .select()
      .single();

    if (company) {
      await admin.from("profiles").upsert({
        id: userId,
        email,
        full_name: fullName,
        company_id: company.id,
        role: "company_owner",
        status: "active",
      });
    }
  } catch {
    // Si las tablas aún no existen, lo gestionamos en un segundo paso.
    // No bloqueamos el signup por esto.
  }
}

function makeSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}
