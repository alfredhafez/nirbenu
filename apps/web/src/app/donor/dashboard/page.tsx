'use client';

import { ClipboardList, Heart, Star, Droplets, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/animations';
import { getRecoveryDaysLeft, getRecoveryProgress } from '@/lib/utils';
import Link from 'next/link';

export default function DonorDashboardPage() {
  const recoveryEnd = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString();
  const recoveryLeft = getRecoveryDaysLeft(recoveryEnd);
  const recoveryProgress = getRecoveryProgress(recoveryEnd);

  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Donor Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome back, Hero!</p>
      </div>

      <Card className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-amber-800">Recovery Mode Active</h3>
            <p className="text-sm text-amber-600 mt-1">{recoveryLeft} days until you can donate again</p>
            <div className="mt-3 w-48 h-2 bg-amber-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${recoveryProgress}%` }} />
            </div>
          </div>
          <Link href="/donor/recovery">
            <span className="text-sm font-medium text-amber-700 hover:underline">View Details</span>
          </Link>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Heart, value: '28', label: 'Total Donations', color: 'text-red-600', bg: 'bg-red-50' },
          { icon: Star, value: '4.8', label: 'Rating', color: 'text-amber-600', bg: 'bg-amber-50' },
          { icon: ClipboardList, value: '3', label: 'Pending Requests', color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: Droplets, value: 'Life Saver', label: 'Rank', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-3">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </FadeIn>
  );
}
