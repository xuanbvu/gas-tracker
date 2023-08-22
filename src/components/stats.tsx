"use client"

import { type Stats } from "@/types"
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi'

type StatsItemProps = {
  stat: Stats
  avgPrice: number
}

function formatDate(date: Date) {
  const currYear = new Date().getFullYear()
  const year = date.getFullYear()

  if (currYear === year) {
    return date.toLocaleDateString('default', { month: 'numeric', day: 'numeric' })
  } else {
    return date.toLocaleDateString('default', { month: 'numeric', day: 'numeric', year: '2-digit' })
  }
}

export default function StatsItem({ stat, avgPrice }: StatsItemProps) {
  const gallons = Number(stat.gallons)
  const pricePer = Number(stat.pricePer)
  const total = Number(stat.total)

  const lteAvg = pricePer > Number(avgPrice.toFixed(2))

  return (
    <div className="grid grid-cols-5 items-center justify-between border-b-2 py-3 px-5">
      <p className="font-medium">{formatDate(stat.createdAt)}</p>
      <p className="text-xl font-bold">{stat.mileage} mi</p>
      <p className="text-lg">{gallons.toFixed(3)} gal</p>
      <p className="text-lg">${total.toFixed(2)}</p>
      <div className="flex items-center gap-2 justify-end">
        <p className='text-xl font-bold text-gray-500'>${pricePer.toFixed(2)}/gal</p>
        <p>{lteAvg ? <BiSolidUpArrow color="#EF4444" /> : <BiSolidDownArrow color="#22C55E" />}</p>
      </div>
    </div>
  )
}