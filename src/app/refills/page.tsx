import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getAllStats, getAvgPrice } from "@/functions/stats"
import { convertPrismaStatstoJSStats } from "@/functions/conversions"
import StatsItem from "@/components/stats"

export default async function Page() {
  const session = await getServerSession(authOptions)

  const userId = session?.user.id || ''
  const allStats = await getAllStats(userId)
  const avgPricePer = Number((await getAvgPrice(userId))._avg.pricePer)
  
  return (
    <>
      <h1>All Refills</h1>
      <p>Average Cost per Gallon: ${avgPricePer.toFixed(2)}</p>
      {allStats.map(item => 
        <StatsItem stat={convertPrismaStatstoJSStats(item)} avgPrice={avgPricePer}/>
      )}
    </>
  )
}