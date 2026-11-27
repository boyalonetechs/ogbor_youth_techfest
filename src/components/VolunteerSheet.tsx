"use client";

import { useMemo, useState } from "react";
import type { VolunteerRegistration } from "@/lib/volunteer-registrations";

export type VolunteerSortKey =
  | "created_desc"
  | "created_asc"
  | "name_asc"
  | "team_asc"
  | "shirt_asc";

export const VOLUNTEER_SORT_OPTIONS: { value: VolunteerSortKey; label: string }[] = [
  { value: "created_desc", label: "Newest first" },
  { value: "created_asc", label: "Oldest first" },
  { value: "name_asc", label: "Name A–Z" },
  { value: "team_asc", label: "Team A–Z" },
  { value: "shirt_asc", label: "T-shirt size" },
];

export const VOLUNTEER_COLUMNS: {
  key: keyof VolunteerRegistration;
  label: string;
}[] = [
  { key: "full_name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "shirt_size", label: "T-shirt" },
  { key: "team", label: "Team" },
  { key: "skills", label: "Skills" },
  { key: "skill_level", label: "Skill level" },
  { key: "previous_volunteering", label: "Experience" },
  { key: "previous_details", label: "Experience details" },
  { key: "reassignment", label: "Team flexibility" },
  { key: "other_skill", label: "Other skill" },
  { key: "created_at", label: "Applied" },
];

export function displayVolunteerValue(
  value: VolunteerRegistration[keyof VolunteerRegistration],
): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.join("; ");
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleString();
  }
  return String(value);
}

export function filterVolunteerRows(
  rows: VolunteerRegistration[],
  search: string,
): VolunteerRegistration[] {
  const term = search.trim().toLowerCase();
  if (!term) return rows;
  return rows.filter((row) =>
    [
      row.full_name,
      row.email,
      row.whatsapp,
      row.team,
      row.skills.join(" "),
    ].some((value) => value.toLowerCase().includes(term)),
  );
}

export function sortVolunteerRows(
  rows: VolunteerRegistration[],
  sortBy: VolunteerSortKey,
): VolunteerRegistration[] {
  const sorted = [...rows];
  switch (sortBy) {
    case "created_asc":
      return sorted.sort((a, b) => a.created_at.localeCompare(b.created_at));
    case "name_asc":
      return sorted.sort((a, b) => a.full_name.localeCompare(b.full_name));
    case "team_asc":
      return sorted.sort((a, b) => a.team.localeCompare(b.team));
    case "shirt_asc":
      return sorted.sort((a, b) => a.shirt_size.localeCompare(b.shirt_size));
    case "created_desc":
    default:
      return sorted.sort((a, b) => b.created_at.localeCompare(a.created_at));
  }
}

function csvCell(value: VolunteerRegistration[keyof VolunteerRegistration]): string {
  return `"${displayVolunteerValue(value).replace(/"/g, '""')}"`;
}

export function downloadVolunteerCsv(
  rows: VolunteerRegistration[],
  search: string,
  sortBy: VolunteerSortKey,
): void {
  const visible = sortVolunteerRows(filterVolunteerRows(rows, search), sortBy);
  const header = VOLUNTEER_COLUMNS.map((column) => csvCell(column.label)).join(",");
  const body = visible.map((row) =>
    VOLUNTEER_COLUMNS.map((column) => csvCell(row[column.key])).join(","),
  );
  const blob = new Blob([[header, ...body].join("\n")], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "oytf-volunteer-applications.csv";
  link.click();
  URL.revokeObjectURL(url);
}

type VolunteerSheetProps = {
  volunteers: VolunteerRegistration[];
  search: string;
  sortBy: VolunteerSortKey;
  onSortChange: (sortBy: VolunteerSortKey) => void;
};

export default function VolunteerSheet({
  volunteers,
  search,
  sortBy,
  onSortChange,
}: VolunteerSheetProps) {
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  const rows = useMemo(
    () => sortVolunteerRows(filterVolunteerRows(volunteers, search), sortBy),
    [volunteers, search, sortBy],
  );

  const selected = volunteers.find((row) => row.id === selectedId) ?? null;

  return (
    <>
      <div className="oytf-admin-sheet">
        <div className="oytf-admin-sheet-bar">
          <span>VOLUNTEER SHEET</span>
          <label className="oytf-admin-sort">
            Sort by
            <select
              value={sortBy}
              aria-label="Sort volunteer applications"
              onChange={(event) => onSortChange(event.target.value as VolunteerSortKey)}
            >
              {VOLUNTEER_SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <span>
            {rows.length} row{rows.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="oytf-admin-sheet-scroll">
          <table>
            <thead>
              <tr>
                {VOLUNTEER_COLUMNS.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className={row.id === selectedId ? "is-active" : ""}
                  onClick={() => setSelectedId(row.id)}
                >
                  {VOLUNTEER_COLUMNS.map((column) => (
                    <td key={column.key}>{displayVolunteerValue(row[column.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <p className="oytf-admin-empty">No volunteer applications yet.</p>
          )}
        </div>
      </div>

      {selected && (
        <div
          className="oytf-admin-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="oytf-admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="volunteer-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="oytf-admin-modal-close"
              aria-label="Close volunteer details"
              onClick={() => setSelectedId(null)}
            >
              ×
            </button>
            <span className="oytf-admin-eyebrow">VOLUNTEER APPLICATION</span>
            <h2 id="volunteer-detail-title">{selected.full_name}</h2>
            <p className="oytf-admin-modal-code">{selected.email}</p>
            <dl className="oytf-admin-modal-grid">
              <div>
                <dt>WhatsApp</dt>
                <dd>{selected.whatsapp}</dd>
              </div>
              <div>
                <dt>T-shirt</dt>
                <dd>{selected.shirt_size}</dd>
              </div>
              <div>
                <dt>Team</dt>
                <dd>{selected.team}</dd>
              </div>
              <div>
                <dt>Team flexibility</dt>
                <dd>{selected.reassignment}</dd>
              </div>
              <div>
                <dt>Skills</dt>
                <dd>{selected.skills.join("; ")}</dd>
              </div>
              {selected.other_skill && (
                <div>
                  <dt>Other skill</dt>
                  <dd>{selected.other_skill}</dd>
                </div>
              )}
              <div>
                <dt>Skill level</dt>
                <dd>{selected.skill_level}</dd>
              </div>
              <div>
                <dt>Previous volunteering</dt>
                <dd>{selected.previous_volunteering}</dd>
              </div>
              <div>
                <dt>Applied</dt>
                <dd>{new Date(selected.created_at).toLocaleString()}</dd>
              </div>
            </dl>
            {selected.previous_details && (
              <p className="oytf-admin-modal-note">{selected.previous_details}</p>
            )}
            <button
              type="button"
              className="oytf-button oytf-button--outline"
              onClick={() => setSelectedId(null)}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
