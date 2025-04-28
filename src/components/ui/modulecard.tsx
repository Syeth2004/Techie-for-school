"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Module } from '@/app/workshop/types';

type ModuleCardProps = {
  module: Module;
  isSelected?: boolean;
  onClick?: () => void;
};

export function ModuleCard({ module, isSelected = false, onClick }: ModuleCardProps) {
  return (
    <Card 
      className={`mb-4 cursor-pointer transition-all hover:border-primary ${
        isSelected ? 'border-primary ring-2 ring-primary/10 0' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle>{module.title}</CardTitle>
        {module.subtitle && (
          <CardDescription>{module.subtitle}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className={`text-sm px-2 py-1 rounded-full ${
            module.status === 'completed' ? 'bg-green-100 text-green-800' :
            module.status === 'in progress' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {module.status}
          </span>
          <Button variant="ghost" size="sm">→</Button>
        </div>
      </CardContent>
    </Card>
  );
}