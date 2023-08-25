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

  function calculateRangeStyle(day: number | null) {
    let style = ""
  
    if (startDate.getMonth() < endDate.getMonth()) {
      startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1)
    }
  
    if (day && day >= startDate.getDate() && day <= endDate.getDate()) style += 'bg-orange-300 '
    if (day === startDate.getDate() && startDate.getMonth() < endDate.getMonth()) style += 'bg-orange-500 rounded-bl-full rounded-tl-full '
    if (day === endDate.getDate()) style += 'rounded-br-full rounded-tr-full '

    return style
  }
  
  return (
    <div className="grid grid-cols-7 gap-y-5">
      <div className="grid grid-cols-7 col-span-7 font-bold text-xl">
        {weekdays.map((weekday, i) => <p className="text-center" key={`dashboard-calendar-weekday${i}`}>{weekday}</p>)}
      </div>
      {currDays.map((day, i) => {
        return (
          <div className={calculateRangeStyle(day) || ''} key={`dashboard-calendar-div${i}`}>
            <p className="text-center text-lg" key={`dashboard-calendar-day${i}`}>{day}</p>
          </div>
        )
      })}
    </div>
  )
}