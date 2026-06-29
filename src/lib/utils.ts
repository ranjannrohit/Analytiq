import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { DATE_FORMAT, DATETIME_FORMAT } from '@/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, DATE_FORMAT);
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, DATETIME_FORMAT);
}

export function timeAgo(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 10_000_000) return `${(num / 10_000_000).toFixed(1)}Cr`;
  if (num >= 100_000)    return `${(num / 100_000).toFixed(1)}L`;
  if (num >= 1_000)      return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function percentage(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export function truncate(text: string, length = 50): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}…`;
}

export function downloadFile(data: string, filename: string, type = 'text/csv'): void {
  const blob = new Blob([data], { type });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
