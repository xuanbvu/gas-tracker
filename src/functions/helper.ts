export function calculateDaysBetween(start: Date, end: Date) {
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24))
}

// format to YYYY-MM-DD
export function formatYMDDateString(date: Date) {
  const year = date.toLocaleDateString('default', { year: 'numeric' })
  const month = date.toLocaleDateString('default', { month: '2-digit' })
  const day = date.toLocaleDateString('default', { day: '2-digit' })

  return `${year}-${month}-${day}`
}