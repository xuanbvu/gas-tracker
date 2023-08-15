"use client"

import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { Line } from 'react-chartjs-2'
import { ChartProps } from '@/types'
import { standardizeMileagesPerQuarter } from '@/functions'

ChartJS.register(
  TimeScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const options = {
  responsive: true,
  legend: {
    position: 'top' as const,
  },
  title: {
    display: true,
    text: 'Line Chart'
  },
  // scales: {
  //   x: {
  //     type: 'time',
  //     time: {
  //       unit: 'month'
  //     }
  //   }
  // }
} as const

export default function StandardizedMileageLineChart({ currStats, prevStats }: ChartProps) {
  const data = {
    labels: Array.from(Array(90).keys()),
    datasets: [
      {
        label: 'Current Quarter',
        data: standardizeMileagesPerQuarter(currStats),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Previous Quarter',
        data: standardizeMileagesPerQuarter(prevStats),
        borderColor: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        tension: 0.4,
        fill: true
      }
    ]
  }

  return (
    <Line options={options} data={data} />
  )
}