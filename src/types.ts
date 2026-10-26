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
