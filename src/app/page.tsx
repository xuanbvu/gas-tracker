import { getServerSession } from 'next-auth'
import { authOptions } from "./api/auth/[...nextauth]/route"
import { LoginButton, LogoutButton } from '../components/auth'
import { prisma } from '@/db'
import StatsItem from '@/components/stats'
import StandardizedMileageLineChart from '@/components/charts'
import { convertPrismaStatstoJSStats, getQuarterDates, getPrevQuarterDates } from '@/functions'
import Link from 'next/link'

function getRecentStats(id: string, num: number) {
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

function getAvgPrice(id: string) {
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

function getCurrQuarterStats(id: string) {
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

function getPrevQuarterStats(id: string) {
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

export default async function Home() {
  const session = await getServerSession(authOptions)

  const userId = session?.user.id || ''
  const recentStats = await getRecentStats(userId, 5)
  const avgPricePer = Number((await getAvgPrice(userId))._avg.pricePer)
  const currQuarterStats = await getCurrQuarterStats(userId)
  const prevQuarterStats = await getPrevQuarterStats(userId)

  if (!session) return (
    <LoginButton />
  )

  return (
    <>
      <h3>Hello {session?.user.username}</h3>
      <LogoutButton />
      <StandardizedMileageLineChart
        currStats={currQuarterStats.map((stat) => convertPrismaStatstoJSStats(stat))}
        prevStats={prevQuarterStats.map((stat) => convertPrismaStatstoJSStats(stat))}
      />
      <h1>Recent Fills</h1>
      { recentStats.length > 0 ?
        <>
          {recentStats.map(item => 
            <StatsItem stat={convertPrismaStatstoJSStats(item)} avgPrice={avgPricePer}/>
          )}
          <Link href='/all'>
            <button>See More</button>
          </Link>
        </>
        :
        <p>Looks like you have no records. Add some</p>
      }
    </>
  )
}
