"use client"

type CalendarProps = {
  startDate: Date
  endDate: Date
}

function populateDays() {
  const today = new Date()
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  const weekdayOfFirstDay = firstDayOfMonth.getDay()
  let currDays = []

  for (let day=0; day<weekdayOfFirstDay; day++) {
    currDays.push(null)
  }

  for (let day=0; day<lastDayOfMonth.getDate(); day++) {
    if (day === 0) {
      currDays.push(firstDayOfMonth.getDate())
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1)
      currDays.push(firstDayOfMonth.getDate())
    }
  }
  return currDays
}

export function Calendar({ startDate, endDate } : CalendarProps) {
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const currDays = populateDays()
  
  return (
    <div className="grid grid-cols-7 gap-y-5">
      <div className="grid grid-cols-7 col-span-7 font-bold text-xl">
        {weekdays.map((day) => <p className="text-center">{day}</p>)}
      </div>
      {currDays.map((day) => {
        return (
          <div className={`
            ${day && day >= startDate.getDate() && day <= endDate.getDate() && 'bg-orange-300 '}
            ${day === startDate.getDate() && 'bg-orange-500 rounded-bl-full rounded-tl-full'}
            ${day === endDate.getDate() && 'rounded-br-full rounded-tr-full'}
          `}>
            <p className="text-center text-lg">{day}</p>
          </div>
        )
      })}
    </div>
  )
}