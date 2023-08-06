"use client"

type StatsItemProps = {
  createdAt: Date,
  gallons: Number,
  total: Number,
  mileage: Number
}

export default function StatsItem({ createdAt, gallons, total, mileage }: StatsItemProps) {
  return (
    <tr>
      <td>{createdAt.toLocaleDateString()}</td>
      <td>{mileage.toString()}</td>
      <td>{gallons.toFixed(3).toString()}</td>
      <td>${total.toFixed(2).toString()}</td>
    </tr>
  )
}