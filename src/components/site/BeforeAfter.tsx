import { Car, CircleSlash2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Выразительный фото-плейсхолдер до/после (нет реальных фото — только демо-плейсхолдеры,
 * помеченные «демо»). Цвета/паттерн — из токенов дизайн-системы.
 */
export function BeforeAfter({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-2 sm:gap-3", className)}>
      <Panel label="ДО" tone="dim" />
      <Panel label="ПОСЛЕ" tone="bright" />
      <p className="col-span-2 flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
        <CircleSlash2 className="size-3.5" aria-hidden /> демо-заглушки фото,
        заменяются реальными работами студии
      </p>
    </div>
  );
}

function Panel({ label, tone }: { label: string; tone: "dim" | "bright" }) {
  return (
    <figure
      className={cn(
        "photo-grain relative flex aspect-[4/5] items-center justify-center overflow-hidden border",
        tone === "dim" ? "border-border bg-accent" : "border-ring/40 bg-card",
      )}
    >
      <span className="absolute left-3 top-3 font-display text-xs font-bold uppercase tracking-[0.3em] text-foreground/80">
        {label}
      </span>
      <span
        className="absolute inset-x-0 top-1/2 h-px bg-border"
        aria-hidden
      />
      <Car
        className={cn(
          "size-16 opacity-70 transition-transform duration-300",
          tone === "bright" ? "text-foreground" : "text-muted-foreground",
        )}
        aria-hidden
      />
      <span
        className="absolute bottom-3 right-3 font-display text-3xl font-extrabold leading-none text-foreground/10"
        aria-hidden
      >
        {tone === "dim" ? "01" : "02"}
      </span>
    </figure>
  );
}
