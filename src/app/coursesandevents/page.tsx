"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Event } from './types';

export default function CoursesAndEvents({ events = [] }: { events?: Event[] }) {
    if (!events.length) {
      return (
        <div className="mx-auto max-w-6xl py-8">
          <h2 className="mb-6 text-2xl font-bold">Upcoming Courses & Events</h2>
          <p className="text-center text-gray-500">No upcoming events scheduled</p>
        </div>
      );
    }
    return (
      <div className="mx-auto max-w-6xl py-8">
        <h2 className="mb-6 text-2xl font-bold">Upcoming Courses & Events</h2>
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (

          <Card
            key={event.id}
            className="relative overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-video relative bg-gradient-to-r from-blue-500 to-purple-600">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-white">
                  <span className="text-xl font-bold">{event.title}</span>
                </div>
              )}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {event.category}
              </div>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2 text-base sm:text-lg md:text-xl font-semibold">
                {event.title}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {event.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4">
              <p className="text-xs sm:text-sm text-gray-600">
                Organized by {event.organizer}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/workshop/${event.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
