'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Heart, MapPin, Droplets, Shield, Star, Calendar, Clock,
  Award, MessageCircle, Phone, AlertTriangle, ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, getRankingColor, getAvailabilityColor, getAvailabilityLabel, getRecoveryDaysLeft, getRecoveryProgress, formatDate } from '@/lib/utils';

const mockDonor = {
  id: 'd1',
  bloodGroup: 'O+',
  district: 'Dhaka',
  area: 'Mirpur',
  gender: 'male',
  donationCount: 28,
  lastDonationDate: '2026-05-10',
  recoveryEndDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
  availability: 'recovery',
  verified: true,
  ranking: 'life_saver',
  responseRate: 96,
  bio: 'Regular blood donor since 2018. Always ready to help in emergencies. Donated 28 times and counting!',
  isAvailableForEmergency: true,
  user: {
    id: 'u1',
    name: 'Rafiq Islam',
    phone: '0171-1234567',
    avatarUrl: null,
  },
};

const mockReviews = [
  { id: '1', rating: 5, comment: 'Very responsive and helpful donor. Came to the hospital within 30 minutes!', createdAt: '2026-05-15T00:00:00Z', user: { name: 'Karim H.' } },
  { id: '2', rating: 5, comment: 'Great person, donated blood for my father without any hesitation.', createdAt: '2026-04-20T00:00:00Z', user: { name: 'Fatima A.' } },
  { id: '3', rating: 4, comment: 'Responded quickly to our emergency request. Forever grateful.', createdAt: '2026-03-10T00:00:00Z', user: { name: 'Shahid K.' } },
];

export default function DonorProfilePage() {
  const params = useParams();
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  const donor = mockDonor;
  const recoveryLeft = getRecoveryDaysLeft(donor.recoveryEndDate);
  const recoveryProgress = getRecoveryProgress(donor.recoveryEndDate);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          <Link href="/donors" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to search
          </Link>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-4xl font-bold mx-auto">
                  {donor.user.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-slate-800 mt-4">{donor.user.name}</h2>

                <div className="flex items-center justify-center gap-2 mt-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-sm text-slate-500">{donor.area}, {donor.district}</span>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold text-lg border border-red-200">
                    {donor.bloodGroup}
                  </span>
                  {donor.verified && (
                    <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-xs font-medium">
                      <Shield className="h-3 w-3" /> Verified
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs font-medium', getRankingColor(donor.ranking))}>
                    <Award className="h-3 w-3 mr-1" /> {donor.ranking.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="text-center p-3 rounded-xl bg-slate-50">
                    <div className="text-lg font-bold text-slate-800">{donor.donationCount}</div>
                    <div className="text-xs text-slate-500">Donations</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-slate-50">
                    <div className="text-lg font-bold text-slate-800">{donor.responseRate}%</div>
                    <div className="text-xs text-slate-500">Response</div>
                  </div>
                </div>

                {donor.availability === 'recovery' && (
                  <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-amber-700 font-medium">Recovery Mode</span>
                      <span className="text-amber-600">{recoveryLeft} days left</span>
                    </div>
                    <div className="h-2 rounded-full bg-amber-200 overflow-hidden">
                      <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${recoveryProgress}%` }} />
                    </div>
                  </div>
                )}

                <div className="mt-4 space-y-2">
                  {donor.isAvailableForEmergency && (
                    <div className="flex items-center gap-2 text-xs text-red-500 justify-center">
                      <AlertTriangle className="h-3 w-3" />
                      Available for emergencies
                    </div>
                  )}
                </div>

                <div className="mt-5 space-y-2">
                  <Button
                    className="w-full gap-2"
                    onClick={() => setShowContactForm(!showContactForm)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Request Contact
                  </Button>
                  <p className="text-[11px] text-slate-400">Number will unlock after donor approval</p>
                </div>

                {showContactForm && (
                  <div className="mt-3 space-y-3">
                    <textarea
                      className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                      rows={3}
                      placeholder="Introduce yourself and explain why you need blood..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                    />
                    <Button size="sm" className="w-full">Send Request</Button>
                  </div>
                )}
              </Card>

              <div className="mt-4 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  Last donation: {formatDate(donor.lastDonationDate)}
                </div>
                {donor.bio && (
                  <p className="leading-relaxed mt-2">{donor.bio}</p>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
                Reviews ({mockReviews.length})
              </h3>
              <div className="space-y-3">
                {mockReviews.map((review) => (
                  <Card key={review.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{review.user.name}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn('h-3 w-3', i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300')}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                    <p className="text-xs text-slate-400 mt-2">{formatDate(review.createdAt)}</p>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-slate-800 mb-4">Donation History</h3>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3">
                        <Droplets className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium text-slate-700">Blood Donation #{donor.donationCount - i}</div>
                          <div className="text-xs text-slate-500">Dhaka Medical College</div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">{formatDate(new Date(Date.now() - i * 90 * 24 * 60 * 60 * 1000).toISOString())}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
