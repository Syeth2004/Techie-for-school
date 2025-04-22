"use client"
import { Calendar } from "@/components/ui/calendar"
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"




const events = [
  {
    id: 1,
    title: "2 Day Generative AI Mastermind",
    date: "19th-20th April'25",
    category: "UpSkilling",
    image:
      "https://images.unsplash.com/photo-1669023414166-a4cc7c0fe1f5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    organizer: "Mentors from GrowthSchool and OutSkills",
  },
  {
    id: 2,
    title: "4 Day Generative AI Mastermind",
    date: "21th-25th April'25",
    category: "UpSkilling",
    image:
      "https://images.unsplash.com/photo-1669023414171-56f0740e34cd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    organizer: "Mentors from GrowthSchool and OutSkills",
  },
  {
    id: 3,
    title: "5 Day Generative AI Mastermind",
    date: "26th-30th April'25",
    category: "UpSkilling",
    image:
      "https://images.unsplash.com/photo-1669023414180-4dcf35d943e1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
                <SidebarMenuButton isActive={activeSection === "home"} onClick={() => setActiveSection("dashboard")}>
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
                <SidebarMenuButton isActive={activeSection === "courses"} onClick={() => setActiveSection("courses")}>
                  <BookOpen className="h-5 w-5" />
                  <span>Courses</span>
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
                  <h2 className="text-2xl font-bold">Welcome to the Platform</h2>
                  <p className="mt-4 text-muted-foreground">
                    This is the home section of your application. The sidebar navigation allows you to switch between
                    different sections without changing pages.
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    Try clicking on the different menu items in the sidebar to see the content change.
                  </p>
                </div>
                <Sheet>
                  <SheetTrigger>
                     Open
                  </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Your Course schdule </SheetTitle>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-lg border shadow"
                          />
                      </SheetHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                          </div>
                        </div>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                </Sheet>
              </div>
            )}
            {activeSection === "courses-events" && (
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-6 text-2xl font-bold">Courses & Events</h2>
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
                <h2 className="mb-6 text-2xl font-bold">Dashboard</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-8">
                      <CardTitle>Total Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">12</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-8">
                      <CardTitle>Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">5</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-8">
                      <CardTitle>Enrolled Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">248</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
