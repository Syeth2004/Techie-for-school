"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Define Event type with strict id values matching coursesData keys
type Event = {
  id: '2-day-generative-ai' | '3-day-generative-ai' | '5-day-generative-ai';
  title: string;
  date: string;
  organizer: string;
  category: string;
  image?: string;
};

// Mapping for invalid/legacy IDs to valid course IDs
const idMapping: Record<string, Event['id']> = {
  '1': '2-day-generative-ai', // Map '1' to 2-day course
  '2': '3-day-generative-ai', // Map '2' to 3-day course
  '3': '5-day-generative-ai', // Map '3' to 5-day course
  // Add more mappings as needed
};

// Utility to normalize event.id to match coursesData keys
const normalizeEventId = (id: string): Event['id'] => {
  const normalized = id
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ''); // Remove special characters

  // Map to valid course IDs
  const validIds = ['2-day-generative-ai', '3-day-generative-ai', '5-day-generative-ai'] as const;

  // If normalized ID is valid, return it
  if (validIds.includes(normalized as any)) {
    return normalized as Event['id'];
  }

  // Check if normalized ID has a mapping
  if (normalized in idMapping) {
    return idMapping[normalized];
  }

  // Fallback or throw error for unmapped IDs
  throw new Error(`Invalid course ID: ${normalized}. Must be one of ${validIds.join(', ')}`);
  // Alternatively, return a default: return '2-day-generative-ai';
};

// Mock events data aligned with coursesData
const mockEvents: Event[] = [
  {
    id: '2-day-generative-ai',
    title: '2 Day Generative AI Mastermind',
    date: '18th - 19th june 25',
    organizer: 'Mentors from Techie School and OutSkills',
    category: 'Workshop',
    image: '/images/2-day-generative-ai.jpg', // Example image path
  },
  {
    id: '3-day-generative-ai',
    title: '3 Day Generative AI Mastermind',
    date: '21st - 23rd June 25',
    organizer: 'Mentors from Techie School and OutSkills',
    category: 'Workshop',
    image: '/images/3-day-generative-ai.jpg',
  },
  {
    id: '5-day-generative-ai',
    title: '5 Day Generative AI Mastermind',
    date: '26th - 30th June 25',
    organizer: 'Mentors from Techie School and OutSkills',
    category: 'Workshop',
    image: '/images/5-day-generative-ai.jpg',
  },
];

// Example: Test with an invalid ID
// const testEvent = { id: '1', title: 'Test', date: 'Test', organizer: 'Test', category: 'Test' };
// console.log(normalizeEventId(testEvent.id)); // Outputs: '2-day-generative-ai'

export default function CoursesAndEvents({ events = mockEvents }: { events?: Event[] }) {
  return (
    <div className="mx-auto max-w-6xl py-8">
      <h2 className="mb-6 text-2xl font-bold">Courses & Events</h2>
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => {
          // Normalize event.id to ensure it matches coursesData
          const normalizedId = normalizeEventId(event.id);

          // Debug: Log event.id and normalizedId
          // console.log(`Event: ${event.title}, Original ID: ${event.id}, Normalized ID: ${normalizedId}`);

          return (
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
                  <Link href={`/coursesandevents/${normalizedId}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}