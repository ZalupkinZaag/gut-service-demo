import { Quote, TriangleAlert } from "lucide-react";
import { Reveal } from "@/lib/reveal";

/**
 * Демо-отзывы. Это НЕ реальные отзывы — фиксированные заглушки,
 * явно помеченные как демо (маркер «demo» в данных компонента).
 */
const DEMO_REVIEWS = [
  {
    id: "demo-1",
    author: "Владелец KIA Rio (демо)",
    text: "Записался через сайт за минуту, без звонков. Приехал — время совпало, машину приняли сразу.",
    span: "md:col-span-2",
  },
  {
    id: "demo-2",
    author: "Владелец VW Tiguan (демо)",
    text: "Полировка закрыла соры на дверях. Слот забронировал на воскресенье вперёд.",
    span: "",
  },
  {
    id: "demo-3",
    author: "Владелец BMW 3 (демо)",
    text: "Понравилось, что прайс виден до записи — без уточнений по телефону.",
    span: "",
  },
] as const;

export function Reviews() {
  return (
    <section id="reviews" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 md:py-20">
        <Reveal className="mb-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
            Отзывы
          </h2>
          <p className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
            <TriangleAlert className="size-3.5" aria-hidden /> демо-контент:
            отзывы сгенерированы для витрины, не реальны
          </p>
        </Reveal>
        <div className="grid gap-3 sm:gap-4 md:grid-cols-4">
          {DEMO_REVIEWS.map((r, i) => (
            <Reveal key={r.id} delayMs={i * 60} className={r.span}>
              <figure className="mb-0 flex h-full flex-col justify-between bg-card p-6 transition-colors duration-200 hover:bg-secondary">
                <blockquote className="text-sm leading-relaxed text-foreground/90">
                  {r.text}
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Quote className="size-3.5" aria-hidden /> {r.author}
                  </span>
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    demo
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
