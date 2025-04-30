"use client"
import { useState } from "react"
import { BookOpen, Home, LayoutDashboard } from "lucide-react"
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
import CoursesAndEvents from "./coursesandevents/page"



export default function HomePage() {
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
                  <AvatarFallback>TS</AvatarFallback>
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
                    TechieSchool is an online tech education platform that offers industry-aligned, cohort-based
                    programs designed to accelerate your tech career through hands-on learning and community support.
                    Their courses are led by industry professionals and focus on building real-world projects to ensure
                    job readiness.
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    Join us today and unlock your tech potential with TechieSchool! Choose your domain and start
                    learning today.
                  </p>
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
            {activeSection === "courses-events" && (
              <div className="mx-auto max-w-6xl">
                <main>
                <CoursesAndEvents events={[
                {
                  id: "2-day-generative-ai",
                  title: "2 Day Generative AI Mastermind",
                  date: "19th-20th June 25",
                  organizer: "Mentors from Techie School and OutSkills",
                  category: "Workshop"
                },
                {
                  id: "3-day-generative-ai",
                  title: "3 Day Generative AI Mastermind",
                  date: "21th-23th June 25",
                  organizer: "Mentors from Techie School and OutSkills",
                  category: "Workshop"
                },
                {
                  id: "5-day-generative-ai",
                  title: "5 Day Generative AI Mastermind",
                  date: "26th-30th June 25",
                  organizer: "Mentors from Techie School and OutSkills",
                  category: "Workshop"
                }
                ]} />
                </main>
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
