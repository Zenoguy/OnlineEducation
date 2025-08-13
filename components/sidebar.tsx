"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Calendar,
  Users,
  Settings,
  X
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['teacher', 'student']
  },
  {
    title: 'My Classes',
    href: '/classes',
    icon: BookOpen,
    roles: ['teacher', 'student']
  },
  {
    title: 'Notes',
    href: '/notes',
    icon: FileText,
    roles: ['teacher', 'student']
  },
  {
    title: 'Homework',
    href: '/homework',
    icon: Calendar,
    roles: ['teacher', 'student']
  },
  {
    title: 'Students',
    href: '/students',
    icon: Users,
    roles: ['teacher']
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['teacher', 'student']
  }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(user?.role || 'student')
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 z-40 transform transition-transform duration-300 ease-in-out",
        "glass glass-dark border-r backdrop-blur-md",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="flex flex-col space-y-1 p-4">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href} onClick={onClose}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start space-x-3 h-12 transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "hover:bg-primary/10 hover:translate-x-1"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}