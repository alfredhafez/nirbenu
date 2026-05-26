'use client';

import { Droplets, MapPin, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/animations';

const history = [
  { date: '2026-02-15', hospital: 'Dhaka Medical College', bloodGroup: 'O+', recipient: 'Emergency Surgery Patient' },
  { date: '2025-11-20', hospital: 'Square Hospital', bloodGroup: 'O+', recipient: 'Cancer Patient' },
  { date: '2025-08-10', hospital: 'Birdem', bloodGroup: 'O+', recipient: 'Accident Victim' },
  { date: '2025-05-05', hospital: 'Apollo Hospital', bloodGroup: 'O+', recipient: 'Child Patient' },
  { date: '2025-02-01', hospital: 'LabAid', bloodGroup: 'O+', recipient: 'Mother in Labor' },
];

export default function HistoryPage() {
  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Donation History</h1>
        <p className="text-sm text-slate-500 mt-1">Your past blood donations</p>
      </div>

      <div className="space-y-3">
        {history.map((donation, i) => (
          <Card key={i} className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
              <Droplets className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-bold text-red-600 text-sm">{donation.bloodGroup}</span>
                <span className="text-sm font-medium text-slate-700">{donation.hospital}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(donation.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>{donation.recipient}</span>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              #{history.length - i}
            </div>
          </Card>
        ))}
      </div>
    </FadeIn>
  );
}
