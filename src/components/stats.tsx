"use client"

import { getAvgPrice } from "@/functions/stats"
import { type Stats } from "@/types"
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi'

type StatsItemProps = {
  stat: Stats
  avgPrice: number
}

export default function StatsItem({ stat, avgPrice }: StatsItemProps) {
  const gallons = Number(stat.gallons)
  const pricePer = Number(stat.pricePer)
  const total = Number(stat.total)

  const lteAvg = pricePer > Number(avgPrice.toFixed(2))

  return (
    <div className="flex items-center gap-5 border-b-2 py-2 px-5">
      <p className="text-xl font-bold">{stat.mileage}</p>
      <div>
        <p className="text-lg"><span className="font-semibold">{gallons.toFixed(3)}</span> gal @ <span className="font-semibold">${total.toFixed(2)}</span></p>
        <p>{stat.createdAt.toLocaleDateString('default', { month: 'long', day: 'numeric' })}</p>
      </div>
      <div className="flex items-center gap-1">
        <p className={`${lteAvg ? 'text-red-500' : 'text-green-500'} text-xl font-bold`}>${pricePer.toFixed(2)}/gal</p>
        <p>{lteAvg ? <BiSolidUpArrow color="red" /> : <BiSolidDownArrow color="limegreen" />}</p>
      </div>
    </div>
  )
}