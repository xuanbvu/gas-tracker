import { Decimal } from "@prisma/client/runtime/library";

export type PrismaStats = {
  id: string,
  user: string,
  createdAt: Date,
  gallons: Decimal,
  pricePer: Decimal,
  total: Decimal,
  mileage: number,
  location: string | null,
}

export type Stats = {
  id: string,
  user: string,
  createdAt: Date,
  gallons: number,
  pricePer: number,
  total: number,
  mileage: number,
  location: string | null,
}

export type ChartProps = {
  currStats: Stats[]
  prevStats: Stats[]
}