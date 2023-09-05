import { prisma } from "@/db"
import { getPrevQuarterDates, getQuarterDates } from "../charts"
import { redirect } from "next/navigation"

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

export function getMostRecentStat(id: string) {
  return prisma.stats.findMany({
    where: {
      user: {
        equals: id
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 1
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

export async function postStats(userId: string, data: FormData) {
  "use server"

  const INPUTS_NUM = 4
  const dataArr = Array.from(data.entries())
  const formData = dataArr.slice(dataArr.findIndex((elem) => elem[0] === 'createdAt-0'))
  
  const numEntries = formData.length / INPUTS_NUM
  for (let i=0; i<numEntries; i++) {
    const startIndex = i * INPUTS_NUM
    const createdAt = new Date(formData[startIndex][1].toString())
    const mileage = Number(formData[startIndex+1][1])
    const gallons = Number(formData[startIndex+2][1])
    const total = Number(formData[startIndex+3][1])

    await prisma.stats.create({
      data: {
        user: userId,
        createdAt,
        mileage,
        gallons,
        total,
        pricePer: total/gallons,
      }
    })
  }
  redirect("/")
}