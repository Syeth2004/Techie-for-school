"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight, Lock, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import CoursesData from '@/data/courses.json';

// Define types for our data
type Module = {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'not started';
  content: string;
  duration?: number;
  resources?: {
    title: string;
    url: string;
  }[];
};

type Course = {
  courseId: string;
  title: string;
  date: string;
  description: string;
  organizer: string;
  modules: Module[];
};

// Type assertion for CoursesData to ensure it matches the expected structure
const coursesData = CoursesData as Record<string, Course>;

// Default module to use when no valid module exists
const defaultModule: Module = {
  id: 'default',
  title: 'Default Module',
  description: 'Please select a module to view its details.',
  status: 'not started',
  content: 'No content available for this module.',
};

// Default course to use when no valid course exists
const defaultCourse: Course = {
  courseId: 'default',
  title: 'Unknown Course',
  date: 'N/A',
  description: 'No course data available.',
  organizer: 'N/A',
  modules: [defaultModule],
};

export default function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  // Unwrap the params Promise
  const { courseId } = React.use(params);

  // Get the course data or use default if not found
  const course = coursesData[courseId] || defaultCourse;

  // Initialize selectedModule with the first module or defaultModule
  const [selectedModule, setSelectedModule] = useState<Module>(
    course.modules.length > 0 ? course.modules[0] : defaultModule
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b px-6 py-4 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Workshops</h1>
            <div className="space-y-4">
              <h2 className="text-gray-600 text-xl">{course.title} | {course.date}</h2>
              <p className="text-sm text-gray-500">{course.description}</p>
            </div>
          </div>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        {/* Modules List - Left Side (1/4 width) */}
        <div className="md:col-span-1 space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">Course Modules</h2>
            <p className="text-sm text-gray-500 mb-4">Organized by {course.organizer}</p>
          </div>
          <Separator />
          <div className="space-y-4">
            {course.modules.length > 0 ? (
              course.modules.map((module: Module) => (
                <Card
                  key={module.id}
                  className={`p-6 cursor-pointer transition-colors ${
                    selectedModule.id === module.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedModule(module)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-sm text-gray-600">{module.description}</p>
                      {module.duration && (
                        <p className="text-xs text-gray-500 mt-2">{module.duration} minutes</p>
                      )}
                    </div>
                    {module.status === 'completed' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {module.status === 'not started' && (
                      <Lock className="h-5 w-5 text-gray-400" />
                    )}
                    {module.status === 'active' && (
                      <div className="h-5 w-5 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{defaultModule.title}</h3>
                    <p className="text-sm text-gray-600">{defaultModule.description}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Module Details - Right Side (3/4 width) */}
        <div className="md:col-span-3">
          <Card className="h-full p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedModule.title}</h2>
                <p className="text-lg text-gray-600">{selectedModule.description}</p>
                <div className="flex gap-2 mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedModule.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : selectedModule.status === 'active'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {selectedModule.status}
                  </span>
                  {selectedModule.duration && (
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                      {selectedModule.duration} minutes
                    </span>
                  )}
                </div>
              </div>

              <div className="prose max-w-none">
                <p>{selectedModule.content}</p>

                {/* Resources Section */}
                {selectedModule.resources && selectedModule.resources.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Resources</h3>
                    <div className="space-y-3">
                      {selectedModule.resources.map((resource, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start"
                          asChild
                        >
                          <Link href={resource.url}>
                            <ChevronRight className="h-4 w-4 mr-2" />
                            {resource.title}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button based on status */}
                <div className="mt-8">
                  {selectedModule.status === 'not started' && (
                    <Button size="lg">Start Module</Button>
                  )}
                  {selectedModule.status === 'active' && (
                    <Button size="lg">Continue Module</Button>
                  )}
                  {selectedModule.status === 'completed' && (
                    <div className="flex gap-4">
                      <Button size="lg" variant="outline">
                        Review Content
                      </Button>
                      <Button size="lg">Get Certificate</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}