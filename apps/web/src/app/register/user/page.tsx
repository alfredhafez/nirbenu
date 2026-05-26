'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/animations';

export default function UserRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md">
          <FadeIn>
            <Link href="/register" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>

            <Card className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 mb-4">
                  <User className="h-7 w-7 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
                <p className="text-sm text-slate-500 mt-1">Register to search and connect with donors</p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input className="pl-10" placeholder="Your full name" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input type="email" className="pl-10" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input type="tel" className="pl-10" placeholder="01XXXXXXXXX" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input type={showPassword ? 'text' : 'password'} className="pl-10 pr-10" placeholder="Min. 8 characters" />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full h-11" size="lg">Create Account</Button>
              </form>

              <p className="text-center text-sm text-slate-500 mt-6">
                Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
              </p>
            </Card>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
