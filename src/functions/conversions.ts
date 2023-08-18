import { PrismaStats } from "../types"

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