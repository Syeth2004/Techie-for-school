"use client";

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModuleCard } from '@/components/ui/modulecard';
import { ModuleDetails } from '@/components/ui/moduledetails';
import modulesData from '@/data/modules.json';
import { Module } from './types';
import { Button } from '@/components/ui/button';
import { ChevronRight, Menu } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
export default function WorkshopsPage() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  return (
    <>
    <header className="border-b space-y-4 px-10 py-5 static">
        <div className="text-left space-x-2">
            <h1 className="text-3xl font-semibold">
            <Button variant="ghost" size="icon" className="mr-2 h-6 w-4"><Menu /></Button>Workshops</h1>
        </div>
    </header>

    <div className="container mx-auto px-10 py-5">
      <h1 className="text-xl text-gray font-semibold mb-6"><Button variant="ghost" size="icon" className="mr-1 h-2 w-4"><ChevronRight /></Button>2 Day Generative AI Mastermind | 15th - 16th Mar '25</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        
        <div className="w-full md:w-1/3 space-y-4">
        <Separator />
          <h2 className="text-xl font-bold">Modules</h2>
          <Separator />
          <ScrollArea className="h-[600px] pr-4">
            {modulesData.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                isSelected={selectedModule?.id === module.id}
                onClick={() => setSelectedModule(module)}
              />
            ))}
          </ScrollArea>
        </div>
        

        {/* Module Details */}
        <div className="w-full md:w-2/3">
          <ModuleDetails module={selectedModule} />
        </div>
      </div>
      <div className='px-2 py-6'><Button><Link href="/">Return</Link></Button></div>
    </div>
    </>
  );
}