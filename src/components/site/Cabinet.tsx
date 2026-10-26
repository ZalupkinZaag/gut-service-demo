import type { Booking } from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArchiveX, Inbox, UserSquare2 } from "lucide-react";

/**
 * «Кабинет» — в мини-версии это локальный журнал записей владельца
 * (localStorage <business.id>.bookings.v1). Показывает записи и отмену.
 */
export function Cabinet({
  bookings,
  onCancel,
}: {
  bookings: Booking[];
  onCancel: (id: string) => void;
}) {
  return (
    <section id="cabinet" className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <header className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="flex items-center gap-3 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
            <UserSquare2 className="size-7 text-muted-foreground" aria-hidden />{" "}
            Кабинет
          </h2>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            журнал записей этой студии · демо-версия
          </p>
        </header>

        {bookings.length === 0 ? (
          <div className="flex flex-wrap items-center gap-3 border border-dashed border-border bg-muted px-5 py-6 text-sm text-muted-foreground">
            <Inbox className="size-5" aria-hidden />
            Пока нет записей. Любая созданная через витрину запись появится
            здесь — ей можно дать отмену.
          </div>
        ) : (
          <ul className="grid gap-2">
            {bookings
              .slice()
              .reverse()
              .map((b, i) => (
                <li
                  key={b.id}
                  className="flex flex-wrap items-center justify-between gap-3 border border-border bg-card px-4 py-3 text-sm transition-colors duration-200 hover:border-ring/50"
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-lg font-extrabold text-muted-foreground">
                      {String(bookings.length - i).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-medium">{b.service}</p>
                      <p className="tabular-nums text-muted-foreground">
                        {formatDate(b.date)} · {b.time} · {b.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="tabular-nums">
                      {formatPrice(b.price)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer gap-1.5 text-destructive hover:text-destructive"
                      onClick={() => onCancel(b.id)}
                    >
                      <ArchiveX className="size-4" aria-hidden /> Отменить
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
}
