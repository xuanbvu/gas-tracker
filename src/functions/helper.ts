export function calculateDaysBetween(start: Date, end: Date) {
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24))
}