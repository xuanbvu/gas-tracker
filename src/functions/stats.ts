import { prisma } from "@/db"
import { getPrevQuarterDates, getQuarterDates } from "./charts"

export function getRecentStats(id: string, num: number) {
  return prisma.stats.findMany({
    where: {
      user: {
        equals: id
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: num
  })
}

export function getAllStats(id: string) {
  return prisma.stats.findMany({
    where: {
      user: {
        equals: id
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export function getAvgPrice(id: string) {
  return prisma.stats.aggregate({
    _avg: {
      pricePer: true
    },
    where: {
      user: {
        equals: id
      }
    },
  })
}

export function getCurrQuarterStats(id: string) {
  const { startDate, endDate } = getQuarterDates(new Date())
  
  return prisma.stats.findMany({
    where: {
      user: {
        equals: id
      },
      createdAt: {
        lte: endDate,
        gte: startDate
      }
    }
  })
}

export function getPrevQuarterStats(id: string) {
  const { startDate, endDate } = getPrevQuarterDates(new Date())

  return prisma.stats.findMany({
    where: {
      user: {
        equals: id
      },
      createdAt: {
        lte: endDate,
        gte: startDate
      }
    }
  })
}