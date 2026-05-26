'use client';

import Link from 'next/link';
import { Heart, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/animations';

export function CtaSection() {
  return (
    <section className="py-20 gradient-blue-subtle">
      <div className="container">
        <FadeIn className="max-w-3xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-10 md:p-14">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 mb-6">
              <Heart className="h-7 w-7 text-primary" fill="currentColor" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">
              Ready to <span className="text-primary">Save a Life</span>?
            </h2>
            <p className="mt-4 text-slate-500 max-w-md mx-auto leading-relaxed">
              Join our community of 3,000+ blood donors across Bangladesh. Register today and become someone&apos;s hero.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register/donor">
                <Button size="lg" className="px-8 shadow-xl shadow-primary/30">
                  <Heart className="h-4 w-4 mr-2" />
                  Register as Donor
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg" className="px-8">
                  <Users className="h-4 w-4 mr-2" />
                  Create Account
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-xs text-slate-400">
              Already registered? <Link href="/login" className="text-primary hover:underline font-medium">Sign in</Link> to your account
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
