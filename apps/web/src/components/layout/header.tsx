'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Heart, LogIn, UserPlus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/donors', label: 'Find Donors' },
  { href: '/emergency', label: 'Emergency' },
  { href: '/ranking', label: 'Rankings' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
            <Heart className="h-5 w-5 text-white" fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-primary">Nir</span>
            <span className="text-slate-800">benu</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary rounded-lg hover:bg-primary-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="shadow-lg shadow-primary/25">
              <UserPlus className="h-4 w-4 mr-2" />
              Register
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-slate-600 hover:text-primary rounded-lg hover:bg-primary-50"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2 border-t border-slate-100">
            <Link href="/login" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">Sign In</Button>
            </Link>
            <Link href="/register" className="flex-1">
              <Button size="sm" className="w-full">Register</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
