import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UpcomingEvents } from "@/components/common/upcomingevent"
import { Award } from "lucide-react"
import eventsData from "@/data/module.json"

type EventType = "live" | "assignment" | "workshop"

type CalendarEvent = {
  id: string
  title: string
  date: Date
  type: EventType
  description?: string
}

const events: CalendarEvent[] = eventsData.map((event) => ({
  ...event,
  date: new Date(event.date),
  type: event.type as EventType,
}))


export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#0a0e17] text-white">
            <CardContent className="p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-yellow-500" />
                <h3 className="text-lg font-medium">Access All Your Earned Certificates</h3>
              </div>
              <Button variant="outline" className="bg-white text-black hover:bg-gray-100">
                View certificates
              </Button>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-xl font-bold mb-4">Recent Workshop</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-cyan-200 to-cyan-400">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-cyan-300 rounded-full transform rotate-45 absolute -right-10 -bottom-10"></div>
                    <div className="w-20 h-20 bg-cyan-200 rounded-full absolute left-10 bottom-5"></div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-gray-100 text-gray-800 hover:bg-gray-100">UPSKILLING</Badge>
                  <h3 className="text-lg font-bold">2 Day Generative AI Mastermind | 18th - 19th May&apos;25</h3>
                  <p className="text-sm text-muted-foreground mt-2">Mentors from GrowthSchool and Outskill</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-purple-200 to-purple-400">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-purple-300 rounded-full transform rotate-45 absolute -right-10 -bottom-10"></div>
                    <div className="w-20 h-20 bg-purple-200 rounded-full absolute left-10 bottom-5"></div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-gray-100 text-gray-800 hover:bg-gray-100">UPSKILLING</Badge>
                  <h3 className="text-lg font-bold">3 Day Generative AI Mastermind | 20th - 22th May&apos;25</h3>
                  <p className="text-sm text-muted-foreground mt-2">Mentors from GrowthSchool and Outskill</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-6">
              <Button variant="outline">See More</Button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <UpcomingEvents events={events} />
        </div>
      </div>
    </div>
  )
}
