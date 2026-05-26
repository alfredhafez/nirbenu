'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Heart, Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft,
  MapPin, Calendar, Droplets,
} from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/animations';
import { BLOOD_GROUPS, DISTRICTS, GENDER_OPTIONS } from '@nirbenu/shared';

export default function DonorRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(0);

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
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 mb-4">
                  <Droplets className="h-7 w-7 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800">Become a Donor</h1>
                <p className="text-sm text-slate-500 mt-1">Register to start saving lives</p>
              </div>

              <div className="flex items-center gap-1 mb-6">
                {['Account', 'Donor Info'].map((s, i) => (
                  <div key={s} className="flex-1 flex items-center">
                    <div className={`flex-1 h-1.5 rounded-full ${i <= step ? 'bg-primary' : 'bg-slate-200'}`} />
                    <span className={`text-[10px] mt-1 px-2 ${i <= step ? 'text-primary font-medium' : 'text-slate-400'}`}>{s}</span>
                  </div>
                ))}
              </div>

              {step === 0 ? (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(1); }}>
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
                  <Button type="submit" className="w-full h-11" size="lg">Continue</Button>
                </form>
              ) : (
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Blood Group</label>
                    <div className="flex flex-wrap gap-2">
                      {BLOOD_GROUPS.map((bg) => (
                        <button key={bg} type="button" className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:border-primary-400 hover:bg-primary-50 hover:text-primary transition-all">
                          {bg}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">District</label>
                    <div className="flex flex-wrap gap-2">
                      {DISTRICTS.map((d) => (
                        <button key={d} type="button" className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-primary-400 hover:bg-primary-50 hover:text-primary transition-all">
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Area</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input className="pl-10" placeholder="e.g., Mirpur, Gulshan" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Gender</label>
                    <div className="flex gap-2">
                      {GENDER_OPTIONS.map((g) => (
                        <button key={g} type="button" className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:border-primary-400 hover:bg-primary-50 hover:text-primary transition-all capitalize">
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Last Donation Date (optional)</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input type="date" className="pl-10" />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(0)}>Back</Button>
                    <Button type="submit" className="flex-1 h-11" size="lg">Complete Registration</Button>
                  </div>
                </form>
              )}
            </Card>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
