"use client"

import * as React from "react"
import { type CalendarEvent, EventCalendar } from "@/components/common/eventcalander"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UpcomingEventsProps {
  events: CalendarEvent[]
  className?: string
}

export function UpcomingEvents({ events, className }: UpcomingEventsProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date())

    
  const selectedDateEvents = React.useMemo(() => {
    if (!selectedDate) return []

    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear()
      )
    })
  }, [events, selectedDate])

  return (
    <div className={className}>
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      <Card>
        <CardContent className="p-4">
          <EventCalendar events={events} onDateSelect={setSelectedDate} />

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Today</h3>

            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          {event.description && (
                            <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                          )}
                        </div>
                        <Badge
                          className={
                            event.type === "live"
                              ? "bg-orange-100 text-orange-800 hover:bg-orange-100"
                              : event.type === "assignment"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : event.type === "workshop"
                                  ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {event.type === "live"
                            ? "Live Session"
                            : event.type === "assignment"
                              ? "Assignment"
                              : event.type === "workshop"
                                ? "Workshop"
                                : "Event"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-6">
                Looks like there are no events scheduled for upcoming days
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
