import { cn } from "@/lib/utils";
import { gallery, heroBackdrop, type StudioPhoto } from "@/config/photos";
import { Camera } from "lucide-react";

/**
 * Фото студии — реальные снимки из открытой карточки 2ГИС (см. src/config/photos.ts).
 * Плейсхолдеры «до/после» не нужны: фото настоящие, подписи — нейтральные факты кадра.
 */

/** Правая колонка hero: коллаж из двух фото с честной подписью-источником. */
export function HeroPhotoWall({ className }: { className?: string }) {
  const [main, second] = gallery;
  return (
    <figure className={cn("relative", className)}>
      <span className="absolute -left-2 -top-2 z-10 h-10 w-10 border-l border-t border-ring/50" aria-hidden />
      <span className="absolute -bottom-2 -right-2 z-10 h-10 w-10 border-b border-r border-ring/50" aria-hidden />
      <div className="relative overflow-hidden border border-border">
        <img
          src={main.src}
          alt={main.tag}
          loading="eager"
          className="photo-grain aspect-[4/3] w-full object-cover"
        />
        <span className="absolute left-3 top-3 border border-border bg-background/80 px-2 py-1 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/90 backdrop-blur-sm">
          {main.tag}
        </span>
      </div>
      <div className="relative z-10 mt-[-12%] ml-[18%] w-[62%] overflow-hidden border border-border shadow-2xl shadow-black/60">
        <img
          src={second.src}
          alt={second.tag}
          loading="lazy"
          className="photo-grain aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
        />
      </div>
      <figcaption className="mt-3 flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
        <Camera className="size-3.5" aria-hidden />
        фото из открытой карточки студии в 2ГИС
      </figcaption>
    </figure>
  );
}

/** Секция «Работы»: редакторская галерея, первый кадр — крупный. */
export function Gallery() {
  const [lead, ...rest] = gallery;
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 sm:pb-16 md:pb-20">
      <ul className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
        <Tile photo={lead} className="col-span-2 aspect-[16/9] md:col-span-2 md:aspect-auto md:h-[420px]" priority />
        {rest.map((p, i) => (
          <Tile
            key={p.src}
            photo={p}
            index={i + 2}
            className="aspect-[4/3]"
          />
        ))}
      </ul>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
        <Camera className="size-3.5" aria-hidden />
        фотографии — открытая карточка студии в 2ГИС; свои работы заменяете сами
      </p>
    </div>
  );
}

function Tile({
  photo,
  index,
  className,
  priority,
}: {
  photo: StudioPhoto;
  index?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <li className={cn("group relative overflow-hidden border border-border", className)}>
      <img
        src={photo.src}
        alt={photo.tag}
        loading={priority ? "eager" : "lazy"}
        className="photo-grain h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <span className="absolute left-3 top-3 font-display text-xs font-bold uppercase tracking-[0.3em] text-foreground/70">
        {String(index ?? 1).padStart(2, "0")}
      </span>
      <span className="absolute bottom-3 left-3 translate-y-1 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {photo.tag}
      </span>
    </li>
  );
}

export { heroBackdrop };
