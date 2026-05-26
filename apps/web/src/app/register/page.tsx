'use client';

import Link from 'next/link';
import { Heart, Droplets, User, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/animations';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-lg">
          <FadeIn>
            <div className="text-center mb-10">
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
                  <Heart className="h-5 w-5 text-white" fill="currentColor" />
                </div>
                <span className="text-xl font-bold">
                  <span className="text-primary">Nir</span>
                  <span className="text-slate-800">benu</span>
                </span>
              </Link>
              <h1 className="text-2xl font-bold text-slate-800">Join Nirbenu</h1>
              <p className="text-sm text-slate-500 mt-2">Choose how you want to join our community</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/register/user">
                <Card hover className="text-center p-8 h-full">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 mb-4">
                    <User className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Register as User</h3>
                  <p className="text-sm text-slate-500 mb-4">Search donors, create blood requests, and connect with life savers</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                    Get Started <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Card>
              </Link>

              <Link href="/register/donor">
                <Card hover className="text-center p-8 h-full">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 mb-4">
                    <Droplets className="h-7 w-7 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Register as Donor</h3>
                  <p className="text-sm text-slate-500 mb-4">Become a life saver, track donations, and earn community recognition</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-red-500">
                    Become a Donor <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Card>
              </Link>
            </div>

            <p className="text-center text-sm text-slate-500 mt-8">
              Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </p>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
