/**
 * Фотографии студии — фактические снимки из открытой карточки 2ГИС
 * (альбом «common», выгрузка leads-2gis/perm.json, инфраструктура 2ГИС CDN).
 * Список — единственный вход для hero и галереи; названия бизнесов здесь не нужны.
 */
const B = import.meta.env.BASE_URL;

export type StudioPhoto = {
  src: string;
  /** нейтральная подпись по факту кадра, без интерпретаций */
  tag: string;
};

/** Фон hero-блока: фасад студии (видна вывеска). */
export const heroBackdrop: string = `${B}photos/p1.jpg`;

/** Кадры галереи. */
export const gallery: StudioPhoto[] = [
  { src: `${B}photos/p3.jpg`, tag: "В боксе студии" },
  { src: `${B}photos/p5.jpg`, tag: "Процесс мойки" },
  { src: `${B}photos/p2.jpg`, tag: "В моечном боксе" },
  { src: `${B}photos/p4.jpg`, tag: "В боксе студии" },
  { src: `${B}photos/p6.jpg`, tag: "В боксе студии" },
];
