import { getServerSession } from 'next-auth'
import { authOptions } from "./api/auth/[...nextauth]/route"
import { LoginButton, LogoutButton } from '../components/auth'
import { convertPrismaStatstoJSStats } from '@/functions/conversions'
import { getRecentStats, getAvgPrice, getCurrQuarterStats, getPrevQuarterStats } from '@/functions/stats'
import StatsItem from '@/components/stats'
import StandardizedMileageLineChart from '@/components/charts'
import Link from 'next/link'

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
