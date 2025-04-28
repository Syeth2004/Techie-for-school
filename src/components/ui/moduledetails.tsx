"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Module } from '@/app/workshop1/types';

type ModuleDetailsProps = {
  module: Module | null;
};

export function ModuleDetails({ module }: ModuleDetailsProps) {
  if (!module) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="py-16 text-center">
          <div className="text-gray-500">
            <p className="text-lg">Select a module to view details</p>
            <p className="text-sm mt-2">Click on any module card on the left</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{module.title}</CardTitle>
        {module.subtitle && (
          <CardDescription>{module.subtitle}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            <p className="text-l text-gray-700 font-bold">{module.description}</p>
            
            {module.resources && module.resources.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Resources:</h3>
                <ul className="space-y-2">
                  {module.resources.map((resource, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">•</span>
                      {resource}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-2 mt-8">
            {module.status !== 'completed' && (
                <Button>Start Module</Button>
              )}
              <Button variant="outline">View Resources</Button>
            </div> 
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}