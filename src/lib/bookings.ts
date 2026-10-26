import type { Booking } from "@/types";
import business from "@/config/business.json";

const KEY = `${business.id}.bookings.v1`;

export function loadBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

export function saveBookings(bookings: Booking[]): void {
  localStorage.setItem(KEY, JSON.stringify(bookings));
}

export function makeId(): string {
  return crypto.randomUUID();
}
