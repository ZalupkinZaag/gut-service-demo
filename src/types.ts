export interface Service {
  name: string;
  price: number;
  duration: number;
  description: string;
}

export type Booking = {
  id: string;
  service: string;
  price: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  phone: string;
  createdAt: number;
};

/** Реальный рейтинг из карточки 2ГИС (факт выгрузки), не демо. */
export type Rating2gis = {
  score: number;
  count: number;
};
