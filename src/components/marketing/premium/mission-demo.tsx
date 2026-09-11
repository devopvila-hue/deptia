"use client";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  FileText,
  Loader2,
  RotateCcw,
  Send,
} from "lucide-react";
import type { PremiumCopy } from "./content";
import { departmentIcons } from "@/components/departments/department-icons";

export function MissionDemo({ c }: { c: PremiumCopy }) {
  const [selected, setSelected] = useState(0);
  const [stage, setStage] = useState<"idle" | "working" | "ready" | "approved">(
    "idle",
  );
  const [step, setStep] = useState(0);
  const mission = c.missions[selected]!;
  const slugs = c.departments.map((d) => d.slug);
  const icons = departmentIcons(slugs[selected] ?? "marketing");
  const DepartmentIcon = icons.main;
  useEffect(() => {
    if (stage !== "working") return;
    const timer = window.setTimeout(() => {
      if (step < 3) setStep(step + 1);
      else setStage("ready");
    }, 650);
    return () => window.clearTimeout(timer);
  }, [stage, step]);
  function reset(index = selected) {
    setSelected(index);
    setStage("idle");
    setStep(0);
  }
  return (
    <div className="p-mission" id="demo">
      <div className="p-mission-top">
        <span className="p-tiny">
          <span className="p-live-dot" />
          {c.demoLabel}
        </span>
        <span className="p-mission-dots" aria-hidden="true">
          •••
        </span>
      </div>
      <div className="p-mission-content">
        <h3>{c.demoTitle}</h3>
        <p className="p-mission-hint">{c.demoHint}</p>
        <div className="p-demo-tabs" role="group" aria-label={c.demoHint}>
          {c.missions.map((m, i) => {
            const TabIcon = departmentIcons(slugs[i] ?? "marketing").main;
            return (
              <button
                type="button"
                aria-pressed={selected === i}
                key={m.name}
                onClick={() => reset(i)}
                className={selected === i ? "is-active" : ""}
              >
                <TabIcon size={16} aria-hidden="true" />
                {m.name}
              </button>
            );
          })}
        </div>
        <div className="p-user-message">
          <span>{mission.brief}</span>
          <span className="p-avatar">T</span>
        </div>
        <div className="p-agent-message">
          <div className="p-agent-icon">
            <DepartmentIcon size={21} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <div>
            <strong>
              Departify <span> / {mission.name}</span>
            </strong>
            <div className="p-task-list">
              {mission.tasks.map((task, i) => (
                <div
                  key={task}
                  className={
                    step > i || stage === "ready" || stage === "approved"
                      ? "is-done"
                      : ""
                  }
                >
                  {step > i || stage === "ready" || stage === "approved" ? (
                    <Check size={14} />
                  ) : stage === "working" && step === i ? (
                    <Loader2 size={14} className="p-spinner" />
                  ) : (
                    <span className="p-task-circle" />
                  )}
                  {task}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div aria-live="polite" aria-atomic="true" className="p-demo-result">
          {(stage === "ready" || stage === "approved") && (
            <>
              <div className="p-deliverable">
                <DepartmentIcon size={25} aria-hidden="true" />
                <div>
                  <span className="p-tiny">{c.resultLabel}</span>
                  <strong>{mission.file}</strong>
                  <small>{mission.detail}</small>
                </div>
                <Check size={17} />
              </div>
              <p>{stage === "approved" ? mission.done : mission.response}</p>
            </>
          )}
          {stage === "working" && (
            <span className="p-working-label">{c.preparing}</span>
          )}
        </div>
        <div className="p-demo-bottom">
          {stage === "idle" || stage === "working" ? (
            <button
              className="p-button p-button-dark"
              disabled={stage === "working"}
              onClick={() => setStage("working")}
            >
              {stage === "working" ? c.preparing : c.mission}
              {stage === "working" ? (
                <Loader2 className="p-spinner" size={16} />
              ) : (
                <Send size={16} />
              )}
            </button>
          ) : stage === "ready" ? (
            <button
              className="p-button p-button-lime"
              onClick={() => setStage("approved")}
            >
              {c.approve}
              <ArrowUpRight size={16} />
            </button>
          ) : (
            <span className="p-approved">
              <Check size={16} />
              {c.approved}
            </span>
          )}
          {stage !== "idle" && (
            <button
              type="button"
              className="p-reset"
              onClick={() => reset()}
              aria-label={c.reset}
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
        <p className="p-demo-disclaimer">{c.example}</p>
      </div>
    </div>
  );
}
