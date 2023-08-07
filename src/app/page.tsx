import { getServerSession } from 'next-auth'
import { authOptions } from "./api/auth/[...nextauth]/route"
import { LoginButton, LogoutButton } from '../components/auth'
import { prisma } from '@/db'
import StatsItem from '@/components/stats'

function getStats(id: string) {
  return prisma.stats.findMany({
    where: {
      user: {
        equals: id
      }
    }
  })
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  const stats = await getStats(session?.user.id || '')

  return (
    <>
      <h3>Hello {session?.user.username}</h3>
      { !session && <LoginButton />}
      { session && <LogoutButton /> }
      <h1>Records</h1>
      <table>
        <tr>
          <th>Date</th>
          <th>Mileage</th>
          <th>Gallons</th>
          <th>Total</th>
        </tr>
        {stats.map(item => 
          <StatsItem
            createdAt={item.createdAt}
            gallons={Number(item.gallons)}
            total={Number(item.total)}
            mileage={item.mileage}
          />
        )}
      </table>
    </>
  )
}
