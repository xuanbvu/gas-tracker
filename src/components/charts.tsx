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
import { standardizeMileagesPerQuarter } from '@/functions/charts'

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
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  },
  scales: {
    x: {
      display: false,
      type: 'linear'
    },
    y: { position: 'right' }
  }
} as const

export default function StandardizedMileageLineChart({ currStats, prevStats }: ChartProps) {
  const data = {
    datasets: [
      {
        data: standardizeMileagesPerQuarter(currStats),
        borderColor: '#0369A1',
        backgroundColor: '#0369A1',
        tension: 0.5,
      },
      {
        data: standardizeMileagesPerQuarter(prevStats),
        borderColor: '#E0F2FE',
        backgroundColor: '#E0F2FE',
        tension: 0.5,
        fill: true,
        pointRadius: 0
      }
    ]
  }

  return (
    <Line options={options} data={data} />
  )
}