"use client"
import { useState } from "react"
import { BookOpen, Home, LayoutDashboard,} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import * as React from "react"
import DashBoardForEvent from "@/app/dashboardforevent/page"
import Link from "next/link"

const events = [
  {
    id: 1,
    title: "2 Day Generative AI Mastermind",
    date: "19th-20th April'25",
    category: "UpSkilling",
    image: "https://images.unsplash.com/photo-1669023414166-a4cc7c0fe1f5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    organizer: "Mentors from GrowthSchool and OutSkills",
  },
  {
    id: 2,
    title: "4 Day Generative AI Mastermind",
    date: "21th-25th April'25",
    category: "UpSkilling",
    image: "https://images.unsplash.com/photo-1669023414171-56f0740e34cd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    organizer: "Mentors from GrowthSchool and OutSkills",
  },
  {
    id: 3,
    title: "5 Day Generative AI Mastermind",
    date: "26th-30th April'25",
    category: "UpSkilling",
    image: "https://images.unsplash.com/photo-1669023414180-4dcf35d943e1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    organizer: "Mentors from GrowthSchool and OutSkills",
  },
]

export default function HomePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  
  const [activeSection, setActiveSection] = useState("home")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex h-16 items-center px-8">
              <div className="flex items-center gap-2 font-semibold">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://github.com/shadcn.png" /> 
                <AvatarFallback>TFS</AvatarFallback>
              </Avatar>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeSection === "home"} onClick={() => setActiveSection("home")}>
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "dashboard"}
                  onClick={() => setActiveSection("dashboard")}>
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "courses-events"}
                  onClick={() => setActiveSection("courses-events")}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Courses & Events</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 flex h-16 items-center border-b bg-background px-4">
            <SidebarTrigger className="-ml-2 mr-2" />
            <Separator orientation="vertical" className="mx-2 h-6" />
            <h1 className="text-xl font-semibold capitalize">{activeSection.replace("-", " & ")}</h1>
          </header>
          <main className="flex-1 p-6">
            {activeSection === "home" && (
              <div className="mx-auto max-w-4xl">
                <div className="rounded-lg border bg-card p-8 shadow">
                  <h2 className="text-2xl font-bold">Welcome to Techie School</h2>
                  <p className="mt-4 text-muted-foreground">
                  TechieSchool is an online tech education platform that offers industry-aligned, cohort-based programs designed to accelerate your tech career through hands-on learning and community support. Their courses are led by industry professionals and focus on building real-world projects to ensure job readiness.
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    Join us today and unlock your tech potential with TechieSchool! Choose your domain and start learning today.
                  </p>
                </div>
                <div className="px-0 py-6"><Button><Link href="/workshop1">Workshop</Link></Button></div>
              </div>
              
            )}
            {activeSection === "courses-events" && (
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-6 text-2xl font-bold"> Upcoming Courses & Events</h2>
                <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {events.map((event) => (
                    <Card
                      key={event.id}
                      className="relative overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-video relative">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                          {event.category}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-2 text-base sm:text-lg md:text-xl font-semibold">
                          {event.title}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">{event.date}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2 pb-4">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-gray-600">Organized by {event.organizer}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {activeSection === "dashboard" && (
              <div className="mx-auto max-w-6xl">
                <main>
                  <DashBoardForEvent />
                </main>
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
