"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LuLayoutDashboard } from 'react-icons/lu'
import { BsBarChartLine, BsCalendar3 } from 'react-icons/bs'
import { TbGasStation } from 'react-icons/tb'

export function NavLinks() {
  const currRoute = usePathname()

  const linkStyle = 'flex items-center text-xl gap-2 font-semibold hover:text-orange-700'

  return (
    <div className="flex flex-col gap-5">
      <Link
        href='/'
        className={`${linkStyle} ${currRoute === '/' && 'text-orange-700'}`}
      >
        <LuLayoutDashboard size={24} />
        Dashboard
      </Link>
      <Link
        href='/charts'
        className={`${linkStyle} ${currRoute === '/charts' && 'text-orange-700'}`}
      >
        <BsBarChartLine size={24} />
        Charts
      </Link>
      <Link
        href='/refills'
        className={`${linkStyle} ${currRoute === '/refills' && 'text-orange-700'}`}
      >
        <TbGasStation size={24} />
        Refills
      </Link>
      <Link
        href='/calendar'
        className={`${linkStyle} ${currRoute === '/calendar' && 'text-orange-700'}`}
      >
        <BsCalendar3 size={24} />
        Calendar
      </Link>
    </div>
  )
}