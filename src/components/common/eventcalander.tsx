"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { addMonths, format, getDay, getDaysInMonth, isSameDay, subMonths } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export type EventType = "live" | "assignment" | "workshop" | "other"

export interface CalendarEvent {
  id: string
  title: string
  date: Date
  type: EventType
  description?: string
}

interface EventCalendarProps {
  events?: CalendarEvent[]
  onDateSelect?: (date: Date) => void
  className?: string
}

export function EventCalendar({ events = [], onDateSelect, className }: EventCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date())

    const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date))
  }

  
  const hasEvents = (date: Date) => {
    return getEventsForDate(date).length > 0
  }

  
  const getDominantEventType = (date: Date): EventType | null => {
    const dateEvents = getEventsForDate(date)
    if (dateEvents.length === 0) return null

    
    const typeCounts = dateEvents.reduce(
      (acc, event) => {
        acc[event.type] = (acc[event.type] || 0) + 1
        return acc
      },
      {} as Record<EventType, number>,
    )

    
    return Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0][0] as EventType
  }

 
  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    if (onDateSelect) {
      onDateSelect(date)
    }
  }

  
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const startingDayOfWeek = getDay(firstDayOfMonth) // 0 for Sunday, 1 for Monday, etc.

    const days = []

    
    const prevMonthDate = subMonths(currentMonth, 1)
    const prevMonthDays = getDaysInMonth(prevMonthDate)

    for (let i = 0; i < startingDayOfWeek; i++) {
      const day = prevMonthDays - startingDayOfWeek + i + 1
      const date = new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), day)
      days.push({ date, isCurrentMonth: false })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      days.push({ date, isCurrentMonth: true })
    }

    
    const totalDaysToShow = Math.ceil((daysInMonth + startingDayOfWeek) / 7) * 7
    const nextMonthDaysToShow = totalDaysToShow - (daysInMonth + startingDayOfWeek)

    for (let day = 1; day <= nextMonthDaysToShow; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day)
      days.push({ date, isCurrentMonth: false })
    }

    return days
  }

  const calendarDays = renderCalendarDays()

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
        <div className="flex space-x-1">
          <Button variant="outline" size="icon" onClick={prevMonth} className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-xs">Live / Webniar</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-xs">Assignment</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}

        {calendarDays.map(({ date, isCurrentMonth }, index) => {
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false
          const dateEvents = getEventsForDate(date)
          const hasDateEvents = dateEvents.length > 0
          const dominantType = getDominantEventType(date)

          return (
            <button
              key={index}
              className={cn(
                "h-12 text-center relative rounded-md hover:bg-accent transition-colors",
                !isCurrentMonth && "text-muted-foreground opacity-50",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary",
                hasDateEvents && !isSelected && dominantType === "live" && "bg-orange-100",
                hasDateEvents && !isSelected && dominantType === "assignment" && "bg-blue-100",
                hasDateEvents && !isSelected && dominantType === "workshop" && "bg-purple-100",
              )}
              onClick={() => handleDateClick(date)}
            >
              <span className="absolute top-1 right-1 text-xs">{format(date, "d")}</span>

              {hasDateEvents && (
                <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-1">
                  {dateEvents.slice(0, 3).map((event, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        event.type === "live" && "bg-orange-500",
                        event.type === "assignment" && "bg-blue-500",
                        event.type === "workshop" && "bg-purple-500",
                        event.type === "other" && "bg-gray-500",
                      )}
                    />
                  ))}
                  {dateEvents.length > 3 && (
                    <Badge variant="outline" className="text-[0.6rem] h-3 px-1">
                      +{dateEvents.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}



