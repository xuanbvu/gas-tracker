"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LuLayoutDashboard } from 'react-icons/lu'
import { BsBarChartLine, BsCalendar3, BsPlusCircle } from 'react-icons/bs'
import { TbGasStation } from 'react-icons/tb'

export function NavLinks() {
  const currRoute = usePathname()

  const navlinksStyle = 'flex items-center text-xl gap-2 font-semibold'
  const linkStyle = 'hover:text-orange-700'

  return (
    <div className="flex flex-col gap-5">
      <Link
        href='/'
        className={`${navlinksStyle} ${linkStyle} ${currRoute === '/' && 'text-orange-700'}`}
      >
        <LuLayoutDashboard size={24} />
        Dashboard
      </Link>
      <Link
        href='/charts'
        className={`${navlinksStyle} ${linkStyle} ${currRoute === '/charts' && 'text-orange-700'}`}
      >
        <BsBarChartLine size={24} />
        Charts
      </Link>
      <Link
        href='/refills'
        className={`${navlinksStyle} ${linkStyle} ${currRoute === '/refills' && 'text-orange-700'}`}
      >
        <TbGasStation size={24} />
        Refills
      </Link>
      <Link
        href='/calendar'
        className={`${navlinksStyle} ${linkStyle} ${currRoute === '/calendar' && 'text-orange-700'}`}
      >
        <BsCalendar3 size={24} />
        Calendar
      </Link>
      {/* <hr /> */}
      <Link
        href='/add'
        className={`
          ${navlinksStyle}
          ${currRoute === '/add' && 'bg-orange-700 border-orange-700 border-2 text-white'}
          justify-center py-2 border-black border-2 hover:border-orange-700 hover:text-white hover:bg-orange-700 rounded-lg
        `}
      >
        <BsPlusCircle size={24} />
        Add

        
      </Link>
    </div>
  )
}