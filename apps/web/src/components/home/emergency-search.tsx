'use client';

import Link from 'next/link';
import { Search, MapPin, Droplets, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FadeIn } from '@/components/ui/animations';
import { BLOOD_GROUPS } from '@nirbenu/shared';

export function EmergencySearch() {
  return (
    <section className="py-12">
      <div className="container">
        <FadeIn>
          <div className="glass-card rounded-3xl p-8 md:p-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                <Droplets className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Quick Donor Search</h3>
                <p className="text-sm text-slate-500">Find available donors by blood group and location</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {BLOOD_GROUPS.map((bg) => (
                <Link key={bg} href={`/donors?bloodGroup=${bg}`}>
                  <button className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary transition-all">
                    {bg}
                  </button>
                </Link>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input className="pl-10 h-12" placeholder="Enter your area or district..." />
              </div>
              <Link href="/donors">
                <Button size="lg" className="h-12 px-8 w-full sm:w-auto">
                  <Search className="h-4 w-4 mr-2" />
                  Search Donors
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 mt-4 text-xs text-slate-400">
              <span>Popular:</span>
              {['Dhaka', 'Mirpur', 'Chattogram', 'Sylhet', 'O+', 'B+'].map((term) => (
                <Link key={term} href={`/donors?search=${term}`} className="hover:text-primary transition-colors">
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
