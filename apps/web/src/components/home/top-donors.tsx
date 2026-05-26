'use client';

import Link from 'next/link';
import { MapPin, Droplets, Star, Shield, ArrowRight, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/animations';
import { getRankingColor, getAvailabilityColor, getAvailabilityLabel } from '@/lib/utils';

const mockDonors = [
  {
    id: 'd1', name: 'Rafiq Islam', bloodGroup: 'O+', district: 'Dhaka', area: 'Mirpur',
    donationCount: 28, ranking: 'life_saver', verified: true, availability: 'available',
    user: { avatarUrl: null },
  },
  {
    id: 'd2', name: 'Nusrat Jahan', bloodGroup: 'B+', district: 'Dhaka', area: 'Gulshan',
    donationCount: 22, ranking: 'life_saver', verified: true, availability: 'available',
    user: { avatarUrl: null },
  },
  {
    id: 'd3', name: 'Tanvir Ahmed', bloodGroup: 'A+', district: 'Chattogram', area: 'Agrabad',
    donationCount: 18, ranking: 'hero', verified: true, availability: 'recovery',
    user: { avatarUrl: null },
  },
  {
    id: 'd4', name: 'Farzana Akter', bloodGroup: 'AB+', district: 'Sylhet', area: 'Zindabazar',
    donationCount: 15, ranking: 'hero', verified: false, availability: 'available',
    user: { avatarUrl: null },
  },
];

export function TopDonors() {
  return (
    <section className="py-20">
      <div className="container">
        <FadeIn className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-sm font-medium text-amber-600 mb-4">
            <Trophy className="h-4 w-4" />
            Community Heroes
          </div>
          <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">
            Top <span className="text-primary">Life Savers</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto">
            Our most active and dedicated blood donors making a difference every day
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {mockDonors.map((donor) => (
            <FadeIn key={donor.id}>
              <Link href={`/donors/${donor.id}`}>
                <Card hover className="h-full flex flex-col group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold text-lg">
                      {donor.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 text-sm truncate">{donor.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3 w-3" /> {donor.area}, {donor.district}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-red-50 text-red-600 text-xs font-bold border border-red-200">
                      {donor.bloodGroup}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getRankingColor(donor.ranking)}`}>
                      {donor.ranking.replace('_', ' ')}
                    </span>
                    {donor.verified && (
                      <Shield className="h-3.5 w-3.5 text-emerald-500" />
                    )}
                  </div>

                  <div className="space-y-2 mt-auto text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Droplets className="h-3 w-3 text-primary" />
                      {donor.donationCount} donations
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`inline-block w-2 h-2 rounded-full ${donor.availability === 'available' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {getAvailabilityLabel(donor.availability)}
                    </div>
                  </div>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="text-center mt-8">
          <Link href="/ranking">
            <div className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              View Full Rankings <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
