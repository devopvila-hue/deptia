"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Gift, Loader2, Plus, X } from "lucide-react";
import { departmentIcons } from "@/components/departments/department-icons";
import { VOTE_DEPARTMENTS } from "@/data/department-roadmap";
import { localePrefixPath } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/config";
import "./department-vote.css";

const labels = {
  es: [
    "Recursos Humanos",
    "Transporte y logística",
    "Finanzas",
    "Legal",
    "Operaciones",
    "Analítica",
  ],
  en: [
    "Human Resources",
    "Transport & logistics",
    "Finance",
    "Legal",
    "Operations",
    "Analytics",
  ],
};
const STORAGE_KEY = "departify:department-vote:v1";

export function DepartmentVote({ locale, enabled = false }: { locale: Locale; enabled?: boolean }) {
  const es = locale === "es";
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [notified, setNotified] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const requestId = useRef<string | null>(null);
  const pendingRef = useRef(false);

  useEffect(() => {
    try {
      setSaved(localStorage.getItem(STORAGE_KEY) === "saved");
    } catch {
      /* Storage is optional. */
    }
  }, []);
  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const opener = trigger.current;
    modal?.showModal();
    title.current?.focus({ preventScroll: true });
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      modal?.close();
      document.body.style.overflow = previous;
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  function close() {
    if (pendingRef.current) return;
    setOpen(false);
    setError("");
  }
  async function submit(withContact: boolean) {
    if (pendingRef.current) return;
    if (withContact && (!email.trim() || !consent)) {
      setError(
        es
          ? "Indica tu correo y confirma que quieres recibir el aviso."
          : "Enter your email and confirm you would like a notification.",
      );
      return;
    }
    setError("");
    setPending(true);
    pendingRef.current = true;
    requestId.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/department-votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: requestId.current,
          departments: selected,
          locale,
          name: withContact ? name.trim() : "",
          email: withContact ? email.trim() : "",
          notify: withContact,
        }),
        signal: AbortSignal.timeout(12000),
      });
      if (response.status === 409) {
        setSaved(true);
        setNotified(false);
        try {
          localStorage.setItem(STORAGE_KEY, "saved");
        } catch {
          /* Optional. */
        }
        return;
      }
      if (!response.ok) throw new Error("vote_not_saved");
      const result = await response.json();
      setSaved(true);
      setNotified(result.notify === true);
      setName("");
      setEmail("");
      try {
        localStorage.setItem(STORAGE_KEY, "saved");
      } catch {
        /* Optional. */
      }
    } catch {
      setError(
        es
          ? "Ahora mismo no hemos podido guardar tu voto. Tu selección sigue aquí; inténtalo de nuevo en unos minutos."
          : "We could not save your vote right now. Your choices are still here; please try again in a few minutes.",
      );
    } finally {
      setPending(false);
      pendingRef.current = false;
    }
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit(Boolean(email.trim()));
  }

  return (
    <>
      <section className="p-roadmap" aria-labelledby="roadmap-heading">
        <div className="p-roadmap-heading">
          <span className="p-roadmap-mark" aria-hidden="true">
            <Plus size={19} strokeWidth={1.5} />
          </span>
          <div>
            <h3 id="roadmap-heading">
              {es
                ? "Más departamentos por llegar."
                : "More departments on the way."}
            </h3>
            <p>
              {es
                ? "¿Cuál te facilitaría más el día? Ayúdanos a decidir qué viene después."
                : "Which would make your day easier? Help us decide what comes next."}
            </p>
          </div>
        </div>
        {!enabled ? (
          <div className="p-roadmap-bottom">
            <span>{labels[locale].join(" · ")}</span>
            <a className="p-text-link" href="mailto:hola@departify.app?subject=Nuevo%20departamento">
              {es ? "Proponer un departamento" : "Suggest a department"}
              <ArrowUpRight size={17} />
            </a>
          </div>
        ) : saved ? (
          <p className="p-roadmap-thanks" role="status">
            <Check size={17} />
            {es
              ? "Gracias. Tu voto ya forma parte del próximo paso."
              : "Thank you. Your vote is part of our next step."}
          </p>
        ) : (
          <>
            <fieldset className="p-roadmap-options">
              <legend className="sr-only">
                {es
                  ? "Elige uno o varios departamentos"
                  : "Choose one or more departments"}
              </legend>
              {VOTE_DEPARTMENTS.map((slug, i) => {
                const Icon = departmentIcons(slug).main;
                return (
                  <label key={slug}>
                    <input
                      type="checkbox"
                      value={slug}
                      checked={selected.includes(slug)}
                      onChange={(event) => {
                        setSelected((previous) =>
                          event.target.checked
                            ? [...previous, slug]
                            : previous.filter((value) => value !== slug),
                        );
                        requestId.current = null;
                      }}
                    />
                    <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    <span>{labels[locale][i]}</span>
                  </label>
                );
              })}
            </fieldset>
            <div className="p-roadmap-bottom">
              <span>
                {es
                  ? "Puedes elegir más de uno. Dejar tus datos es opcional."
                  : "Choose more than one. Contact details are optional."}
              </span>
              <button
                ref={trigger}
                type="button"
                disabled={!selected.length}
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
              >
                {es ? "Votar mis prioridades" : "Vote for my priorities"}
                <ArrowUpRight size={17} />
              </button>
            </div>
          </>
        )}
      </section>
      {open && (
        <dialog
          ref={dialog}
          className="p-vote-dialog"
          aria-labelledby="vote-title"
          aria-describedby="vote-description"
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
          onClose={close}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="p-vote-card">
            <button
              type="button"
              className="p-vote-close"
              disabled={pending}
              aria-label={es ? "Cerrar" : "Close"}
              onClick={close}
            >
              <X size={19} />
            </button>
            <span className="p-vote-symbol" aria-hidden="true">
              {saved ? (
                <Check size={28} strokeWidth={1.5} />
              ) : (
                <Gift size={28} strokeWidth={1.5} />
              )}
            </span>
            <p className="p-eyebrow">
              {es ? "EL PRÓXIMO PASO, CONTIGO" : "THE NEXT STEP, WITH YOU"}
            </p>
        <h2 id="vote-title" ref={title} tabIndex={-1}>
              {saved
                ? es
                  ? "Gracias por ayudarnos."
                  : "Thank you for helping."
                : es
                  ? "¿Te avisamos cuando llegue?"
                  : "Shall we let you know?"}
            </h2>
            <p id="vote-description">
              {saved
                ? notified
                  ? es
                    ? "Tu voto está guardado. Te escribiremos cuando esté disponible para que disfrutes de tu mes de prueba gratis."
                    : "Your vote is saved. We will email you when it is available so you can enjoy your free trial month."
                  : es
                    ? "Tu voto está guardado. Nos ayudas a construir un equipo más útil para tu negocio."
                    : "Your vote is saved. You are helping us build a more useful team for your business."
                : es
                  ? "Si te apetece, déjanos tu nombre y correo. Te avisaremos cuando el departamento esté disponible y podrás probarlo un mes gratis. Es nuestra forma de agradecerte que nos ayudes a elegir."
                  : "If you like, leave your name and email. We will let you know when the department is available and give you a month to try it for free. Our way of thanking you for helping us choose."}
            </p>
            {saved ? (
              <button
                autoFocus
                type="button"
                className="p-button p-button-dark p-vote-done"
                onClick={close}
              >
                {es ? "Seguir explorando" : "Keep exploring"}
                <ArrowUpRight size={17} />
              </button>
            ) : (
              <form onSubmit={handleSubmit} aria-busy={pending}>
                <div className="p-vote-fields">
                  <label htmlFor="vote-name">
                    {es ? "Tu nombre · opcional" : "Your name · optional"}
                    <input
                  id="vote-name"
                      name="name"
                      autoComplete="given-name"
                      placeholder={
                        es ? "¿Cómo te llamas?" : "What should we call you?"
                      }
                      maxLength={100}
                      value={name}
                      disabled={pending}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </label>
                  <label htmlFor="vote-email">
                    {es ? "Tu correo · opcional" : "Your email · optional"}
                    <input
                      id="vote-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={
                        es
                          ? "Donde prefieras recibir el aviso"
                          : "Where should we send the news?"
                      }
                      maxLength={254}
                      value={email}
                      disabled={pending}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </label>
                </div>
                <label className="p-vote-consent">
                  <input
                    type="checkbox"
                    checked={consent}
                    disabled={pending}
                    onChange={(event) => setConsent(event.target.checked)}
                  />
                  <span>
                    {es
                      ? "Quiero recibir el aviso de disponibilidad y mi mes de prueba."
                      : "I would like the launch notification and my trial month."}{" "}
                    <Link
                      href={localePrefixPath(locale, "/privacidad")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {es ? "Privacidad" : "Privacy"}
                    </Link>
                  </span>
                </label>
                {error && (
                  <p className="p-vote-error" role="alert">
                    {error}
                  </p>
                )}
                <div className="p-vote-actions">
                  <button
                    type="submit"
                    className="p-button p-button-dark"
                    disabled={pending}
                  >
                    {pending
                      ? es
                        ? "Guardando…"
                        : "Saving…"
                      : email.trim()
                        ? es
                          ? "Votar y avisarme"
                          : "Vote and notify me"
                        : es
                          ? "Enviar mi voto"
                          : "Send my vote"}
                    {pending ? (
                      <Loader2 size={17} className="p-spinner" />
                    ) : (
                      <ArrowUpRight size={17} />
                    )}
                  </button>
                  <button
                    type="button"
                    className="p-vote-skip"
                    disabled={pending}
                    onClick={() => void submit(false)}
                  >
                    {es
                      ? "Votar sin dejar mis datos"
                      : "Vote without my details"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </dialog>
      )}
    </>
  );
}
