import { useMemo, useState } from "react";
import business from "@/config/business.json";
import type { Booking, Service } from "@/types";
import { formatPrice, formatDate, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarDays, Clock, ShieldCheck } from "lucide-react";

export type Draft = { service: Service; date: string; time: string } | null;

/** Рабочие дни вперёд (или выходной в начале — чтобы пометить его). */
export function nextDates(count: number): string[] {
  const out: string[] = [];
  const d = new Date();
  while (out.length < count) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) out.push(d.toISOString().slice(0, 10));
    if (out.length === 0 && (day === 0 || day === 6))
      out.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return out.slice(0, count);
}

/** Слоты из рабочих часов и длительности услуги (инвариант AGENTS.md №2). */
export function slotsFor(service: Service, date: string): string[] {
  const day = new Date(date + "T00:00:00").getDay();
  if (day === 0 || day === 6) return [];
  const hours = business.workingHours;
  const step = service.duration <= 180 ? 3 : 5;
  const out: string[] = [];
  for (let h = hours.start; h + service.duration / 60 <= hours.end; h += step) {
    out.push(`${String(h).padStart(2, "0")}:00`);
  }
  return out;
}

/** Занятость: точное совпадение слота или длинная (>4 ч) услуга-blocker на день. */
export function takenSlot(
  bookings: Booking[],
  services: Service[],
  date: string,
  time: string,
): boolean {
  return bookings.some((b) => {
    if (b.date !== date) return false;
    if (b.time === time) return true;
    const svc = services.find((s) => s.name === b.service)!;
    return svc.duration > 240;
  });
}

export function BookingDialog({
  open,
  draft,
  dates,
  bookings,
  onDraftChange,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  draft: Draft;
  dates: string[];
  bookings: Booking[];
  onDraftChange: (d: Draft) => void;
  onOpenChange: (open: boolean) => void;
  onConfirm: (phone: string) => string | null; // возвращает текст ошибки или null
}) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const slots = useMemo(
    () => (draft ? slotsFor(draft.service, draft.date) : []),
    [draft],
  );
  const freeSlots = useMemo(
    () =>
      draft
        ? slots.filter((t) => !takenSlot(bookings, business.services, draft.date, t))
        : [],
    [draft, slots, bookings],
  );

  const isWeekend = (date: string) => {
    const day = new Date(date + "T00:00:00").getDay();
    return day === 0 || day === 6;
  };

  function submit() {
    if (!draft) return;
    const err = onConfirm(phone);
    if (err) {
      setError(err);
    } else {
      setPhone("");
      setError(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => onOpenChange(v)}>
      <DialogContent className="max-w-md bg-card p-0 sm:rounded-none">
        <div className="border-b border-border bg-secondary px-6 py-5">
          <DialogHeader className="space-y-1">
            <DialogTitle className="font-display text-xl font-bold uppercase tracking-tight">
              {draft?.service.name}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {draft && formatPrice(draft.service.price)} ·{" "}
              {draft && (draft.service.duration % 60 === 0
                ? `${draft.service.duration / 60} ч`
                : `${draft.service.duration} мин`)}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div>
            <Label className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
              <CalendarDays className="size-3.5" aria-hidden /> Дата
            </Label>
            <div className="flex flex-wrap gap-2">
              {dates.map((d) => (
                <button
                  key={d}
                  onClick={() => onDraftChange({ ...draft!, date: d, time: "" })}
                  className={cn(
                    "cursor-pointer border px-3 py-2 text-xs transition-colors duration-200",
                    draft?.date === d
                      ? "border-ring bg-primary text-primary-foreground"
                      : "border-border bg-background text-secondary-foreground hover:border-ring/60",
                    isWeekend(d) && "line-through decoration-destructive",
                  )}
                >
                  {formatDate(d)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
              <Clock className="size-3.5" aria-hidden /> Время
            </Label>
            {draft && slots.length === 0 ? (
              <p className="border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                На этот день слотов нет — выходной (пн–пт 10:00–19:00).
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {draft &&
                  slots.map((t) => {
                    const taken = !freeSlots.includes(t);
                    return (
                      <button
                        key={t}
                        disabled={taken}
                        onClick={() =>
                          onDraftChange({ ...draft, time: t })
                        }
                        className={cn(
                          "min-w-16 cursor-pointer border px-3 py-2 text-xs tabular-nums transition-colors duration-200",
                          taken
                            ? "cursor-not-allowed border-border bg-muted text-muted-foreground line-through"
                            : draft?.time === t
                              ? "border-ring bg-primary text-primary-foreground"
                              : "border-border bg-background text-secondary-foreground hover:border-ring/60",
                        )}
                      >
                        {t}
                      </button>
                    );
                  })}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              Телефон для подтверждения
            </Label>
            <Input
              id="phone"
              inputMode="tel"
              placeholder="+7 900 000-00-00"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-background"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter className="flex-row border-t border-border px-6 py-4 sm:justify-between">
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <ShieldCheck className="size-3.5" aria-hidden /> слот закрывается сразу
          </span>
          <Button
            className="cursor-pointer font-display font-bold uppercase tracking-wide"
            onClick={submit}
          >
            Подтвердить запись
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
