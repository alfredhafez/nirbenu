'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/animations';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md">
          <FadeIn>
            <Card className="p-8">
              <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center gap-2 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
                    <Heart className="h-5 w-5 text-white" fill="currentColor" />
                  </div>
                  <span className="text-xl font-bold">
                    <span className="text-primary">Nir</span>
                    <span className="text-slate-800">benu</span>
                  </span>
                </Link>
                <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
                <p className="text-sm text-slate-500 mt-1">Sign in to your account</p>
              </div>

              <Button variant="outline" className="w-full mb-4 gap-2 h-11" size="lg">
                <Chrome className="h-5 w-5" />
                Continue with Google
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-slate-400">or continue with email</span>
                </div>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input type="email" className="pl-10" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input type={showPassword ? 'text' : 'password'} className="pl-10 pr-10" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full h-11" size="lg">Sign In</Button>
              </form>

              <p className="text-center text-sm text-slate-500 mt-6">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-primary font-medium hover:underline">Create one</Link>
              </p>
            </Card>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
