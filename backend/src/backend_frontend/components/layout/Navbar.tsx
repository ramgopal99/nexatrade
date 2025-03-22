'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import SignInModal from '../auth/SignInModal';
import { Briefcase, Users, HelpCircle, PlusCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              NexaTrade
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/jobs" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Find Work
            </Link>
            <Link href="/talents" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Hire Talents
            </Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              How it Works
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <SignInModal />
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Post a Job
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}