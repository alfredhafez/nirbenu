'use client';

import Link from 'next/link';
import { Trophy, Droplets, Shield, Star, Medal, Crown, Heart, MapPin } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations';
import { getRankingColor } from '@/lib/utils';

const rankingIcons: Record<string, React.ElementType> = {
  new: Medal,
  bronze: Medal,
  silver: Star,
  gold: Trophy,
  hero: Shield,
  life_saver: Crown,
};

const mockRankings = [
  { id: '1', name: 'Rafiq Islam', bloodGroup: 'O+', district: 'Dhaka', area: 'Mirpur', donationCount: 28, ranking: 'life_saver', verified: true },
  { id: '2', name: 'Nusrat Jahan', bloodGroup: 'B+', district: 'Dhaka', area: 'Gulshan', donationCount: 22, ranking: 'life_saver', verified: true },
  { id: '3', name: 'Tanvir Ahmed', bloodGroup: 'A+', district: 'Chattogram', area: 'Agrabad', donationCount: 18, ranking: 'hero', verified: true },
  { id: '4', name: 'Farzana Akter', bloodGroup: 'AB+', district: 'Sylhet', area: 'Zindabazar', donationCount: 15, ranking: 'hero', verified: false },
  { id: '5', name: 'Shakil Hasan', bloodGroup: 'O-', district: 'Rajshahi', area: 'Uposhohor', donationCount: 14, ranking: 'hero', verified: true },
  { id: '6', name: 'Sadia Islam', bloodGroup: 'B-', district: 'Khulna', area: 'Sonadanga', donationCount: 12, ranking: 'gold', verified: true },
  { id: '7', name: 'Masud Rana', bloodGroup: 'A-', district: 'Dhaka', area: 'Dhanmondi', donationCount: 10, ranking: 'gold', verified: false },
  { id: '8', name: 'Rafia Sultana', bloodGroup: 'AB-', district: 'Sylhet', area: 'Ambarkhana', donationCount: 8, ranking: 'silver', verified: true },
  { id: '9', name: 'Arif Hossain', bloodGroup: 'O+', district: 'Chattogram', area: 'Nasirabad', donationCount: 6, ranking: 'silver', verified: true },
  { id: '10', name: 'Maliha Tabassum', bloodGroup: 'B+', district: 'Dhaka', area: 'Bashundhara', donationCount: 4, ranking: 'bronze', verified: false },
];

export default function RankingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container max-w-4xl">
          <FadeIn className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-sm font-medium text-amber-600 mb-4">
              <Trophy className="h-4 w-4" />
              Leaderboard
            </div>
            <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
              Donor <span className="text-primary">Rankings</span>
            </h1>
            <p className="mt-3 text-slate-500 max-w-lg mx-auto">
              Our top life savers ranked by donations, response rate, and community trust
            </p>
          </FadeIn>

          <div className="grid grid-cols-3 gap-4 mb-10">
            {[mockRankings[1], mockRankings[0], mockRankings[2]].map((donor, i) => (
              <FadeIn key={donor.id} delay={i * 0.15}>
                <Link href={`/donors/${donor.id}`}>
                  <Card hover className="text-center">
                    <div className={i === 0 ? 'text-amber-500' : i === 1 ? 'text-primary' : 'text-amber-600'}>
                      <Trophy className="h-8 w-8 mx-auto" fill="currentColor" />
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-xl font-bold mx-auto mt-3">
                      {donor.name.charAt(0)}
                    </div>
                    <h3 className="font-bold text-slate-800 mt-2 text-sm">{donor.name}</h3>
                    <div className="text-xs text-slate-500 mt-1">
                      <span className="font-semibold text-red-600">{donor.bloodGroup}</span> · {donor.donationCount} donations
                    </div>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-medium ${getRankingColor(donor.ranking)}`}>
                      {donor.ranking.replace('_', ' ')}
                    </span>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="space-y-3">
            <StaggerContainer>
              {mockRankings.slice(3).map((donor, i) => (
                <StaggerItem key={donor.id}>
                  <Link href={`/donors/${donor.id}`}>
                    <Card hover className="flex items-center gap-4 px-5 py-4">
                      <span className="text-lg font-bold text-slate-300 w-8">{i + 4}</span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold text-sm">
                        {donor.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-slate-800 text-sm">{donor.name}</h4>
                          {donor.verified && <Shield className="h-3.5 w-3.5 text-emerald-500" />}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <MapPin className="h-3 w-3" />
                          {donor.area}, {donor.district}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-red-50 text-red-600 text-xs font-bold border border-red-200">
                        {donor.bloodGroup}
                      </span>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
                          <Droplets className="h-3.5 w-3.5 text-primary" />
                          {donor.donationCount}
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getRankingColor(donor.ranking)}`}>
                          {donor.ranking.replace('_', ' ')}
                        </span>
                      </div>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
