"use client";

export function ModeToggle({ mode, onToggle }: { mode: "modern" | "classic"; onToggle: () => void }) {
  return (
    <button
      type="button"
      className={`mode-toggle mode-toggle-${mode}`}
      onClick={onToggle}
      aria-label={`Switch to ${mode === "modern" ? "classic" : "modern"} view`}
    >
      <span className="mode-toggle-track">
        <span className="mode-toggle-opt" data-on={mode === "classic"}>Classic</span>
        <span className="mode-toggle-opt" data-on={mode === "modern"}>Modern</span>
      </span>
    </button>
  );
}
