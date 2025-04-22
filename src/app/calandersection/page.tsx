"use client"

import * as React from "react"
import link from "next/link"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"




export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-8 md:px-12 lg:px-60">
      Calander Section
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
    <SidebarProvider>
      <Sidebar>
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
    </Sidebar>
    </SidebarProvider>
    </div>
  )
}
