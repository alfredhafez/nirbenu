'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, Droplets, ClipboardList, MessageSquare,
  FileText, AlertTriangle, Settings, LogOut, Menu, X, BarChart3, Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/admin/users', icon: Users, label: 'Users' },
  { href: '/admin/donors', icon: Droplets, label: 'Donors' },
  { href: '/admin/requests', icon: ClipboardList, label: 'Requests' },
  { href: '/admin/chats', icon: MessageSquare, label: 'Chats' },
  { href: '/admin/blog', icon: FileText, label: 'Blog' },
  { href: '/admin/reports', icon: AlertTriangle, label: 'Reports' },
  { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50">
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transition-transform lg:relative lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      )}>
        <div className="flex items-center gap-2 h-16 px-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg">
              <span className="text-primary-400">Nir</span>
              <span className="text-white">benu</span>
            </span>
          </Link>
          <span className="text-[10px] bg-primary-600 px-2 py-0.5 rounded-full font-medium">Admin</span>
          <button className="lg:hidden ml-auto" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                pathname === link.href
                  ? 'bg-primary-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white',
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/login">
            <Button variant="ghost" className="w-full justify-start gap-2 text-slate-400 hover:text-white hover:bg-slate-800">
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5 text-slate-600" />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white font-semibold text-sm">
              A
            </div>
            <span className="text-sm font-medium text-slate-700">Admin</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
