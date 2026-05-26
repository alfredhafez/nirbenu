'use client';

import { Search, Shield, ShieldOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/ui/animations';
import { getRankingColor } from '@/lib/utils';

const mockDonors = [
  { id: 'd1', name: 'Rafiq Islam', bloodGroup: 'O+', district: 'Dhaka', donationCount: 28, ranking: 'life_saver', verified: true },
  { id: 'd2', name: 'Nusrat Jahan', bloodGroup: 'B+', district: 'Dhaka', donationCount: 22, ranking: 'life_saver', verified: true },
  { id: 'd3', name: 'Tanvir Ahmed', bloodGroup: 'A+', district: 'Chattogram', donationCount: 18, ranking: 'hero', verified: true },
  { id: 'd4', name: 'Farzana Akter', bloodGroup: 'AB+', district: 'Sylhet', donationCount: 15, ranking: 'hero', verified: false },
  { id: 'd5', name: 'Shakil Hasan', bloodGroup: 'O-', district: 'Rajshahi', donationCount: 14, ranking: 'hero', verified: true },
];

export default function AdminDonorsPage() {
  return (
    <FadeIn className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Donor Management</h1>
          <p className="text-sm text-slate-500 mt-1">Verify and manage donor accounts</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input className="pl-10" placeholder="Search donors..." />
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Donor</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Blood</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Location</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Donations</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Rank</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Verified</th>
                <th className="text-right text-xs font-medium text-slate-500 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockDonors.map((donor) => (
                <tr key={donor.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold text-xs">
                        {donor.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{donor.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-600 text-xs font-bold">{donor.bloodGroup}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{donor.district}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-700">{donor.donationCount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getRankingColor(donor.ranking)}`}>
                      {donor.ranking.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {donor.verified ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-600"><Shield className="h-3 w-3" /> Verified</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-slate-400"><ShieldOff className="h-3 w-3" /> Unverified</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant={donor.verified ? 'outline' : 'default'}>
                      {donor.verified ? 'Unverify' : 'Verify'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </FadeIn>
  );
}
