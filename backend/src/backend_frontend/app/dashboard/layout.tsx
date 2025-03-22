'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Settings, 
  Users, 
  MessageSquare,
  Menu,
  X
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { icon: Briefcase, label: 'Work', href: '/dashboard/work' },
    { icon: GraduationCap, label: 'Learning', href: '/dashboard/learning' },
    { icon: FileText, label: 'Post Job', href: '/dashboard/post-job' },
    { icon: Users, label: 'Network', href: '/dashboard/network' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`bg-white border-r fixed h-full transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4 flex justify-between items-center">
          <h2 className={`font-bold ${!isSidebarOpen && 'hidden'}`}>Dashboard</h2>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 hover:bg-gray-100 transition-colors
                ${pathname === item.href ? 'bg-gray-100 text-blue-600' : ''}
              `}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="ml-4">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {children}
      </main>
    </div>
  );
}