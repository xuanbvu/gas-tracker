import { PrismaStats, Stats } from "./types"

export function convertPrismaStatstoJSStats(stat: PrismaStats) {
  return {
    id: stat.id,
    user: stat.user,
    createdAt: stat.createdAt,
    gallons: Number(stat.gallons),
    pricePer: Number(stat.pricePer),
    total: Number(stat.total),
    mileage: stat.mileage,
    location: stat.location
  }
}

export function getQuarterDates(date: Date) {
  const currYear = date.getFullYear()
  const quarter = Math.ceil((date.getMonth() + 1) / 3)

  let startDate
  let endDate
  switch (quarter) {
    case 1:
      startDate = new Date(`${currYear}-01-01`)
      endDate = new Date(`${currYear}-03-31`)
      break
    case 2:
      startDate = new Date(`${currYear}-04-01`)
      endDate = new Date(`${currYear}-06-30`)
      break
    case 3:
      startDate = new Date(`${currYear}-07-01`)
      endDate = new Date(`${currYear}-09-30`)
      break
    case 4:
      startDate = new Date(`${currYear}-10-01`)
      endDate = new Date(`${currYear}-12-31`)
      break
  }

  return { startDate, endDate }
}

export function getPrevQuarterDates(date: Date) {
  const currYear = date.getFullYear()
  const quarter = Math.ceil((date.getMonth() + 1) / 3) - 1

  let startDate
  let endDate
  switch (quarter) {
    case 1:
      startDate = new Date(`${currYear}-01-01`)
      endDate = new Date(`${currYear}-03-31`)
      break
    case 2:
      startDate = new Date(`${currYear}-04-01`)
      endDate = new Date(`${currYear}-06-30`)
      break
    case 3:
      startDate = new Date(`${currYear}-07-01`)
      endDate = new Date(`${currYear}-09-30`)
      break
    case 0:
      startDate = new Date(`${currYear-1}-10-01`)
      endDate = new Date(`${currYear-1}-12-31`)
      break
  }

  return { startDate, endDate }
}

export function standardizeMileagesPerQuarter(stats: Stats[]) {
  const startMileage = stats[0].mileage
  const { startDate = new Date() } = getQuarterDates(stats[0].createdAt)

  return stats.map((stat) => {
    return {
      y: stat.mileage - startMileage,
      x: Math.floor((stat.createdAt.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
    }
  })
}