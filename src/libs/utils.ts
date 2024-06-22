import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function digitsFromString(value: string) {
  return value.replace(/[^0-9]/g, '');
}

export function dateFromString(value: string) {
  const [date, month, year] = value.split('/');

  return new Date(+year, +month - 1, +date);
}

export function addCents(value: string | number): string {
  return String(value)
    .padStart(3, '0')
    .replace(/(.+)(.{2})/, '$1.$2');
}
