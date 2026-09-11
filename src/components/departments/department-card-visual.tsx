import { departmentIcons } from "./department-icons";

export function DepartmentCardVisual({ slug }: { slug: string }) {
  const { main: MainIcon, tasks } = departmentIcons(slug);
  return (
    <div className={"p-task-art p-task-art--" + slug} aria-hidden="true">
      <svg className="p-task-connections" viewBox="0 0 320 180" fill="none">
        <path d="M62 54 H103 Q123 54 123 74 V90 H160 M62 133 H103 Q123 133 123 113 V90 H160 M258 54 H217 Q197 54 197 74 V90 H160 M258 133 H217 Q197 133 197 113 V90 H160" />
      </svg>
      <span className="p-task-core">
        <MainIcon size={38} strokeWidth={1.35} />
      </span>
      {tasks.slice(0, 4).map((Icon, i) => (
        <span className={"p-task-satellite p-task-satellite--" + i} key={i}>
          <Icon size={23} strokeWidth={1.5} />
        </span>
      ))}
      <span className="p-task-art-index">01 — 02 — 03</span>
    </div>
  );
}
