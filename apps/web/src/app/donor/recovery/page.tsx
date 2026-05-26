'use client';

import { Clock, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/animations';
import { getRecoveryDaysLeft, getRecoveryProgress } from '@/lib/utils';

export default function RecoveryPage() {
  const recoveryEnd = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString();
  const recoveryLeft = getRecoveryDaysLeft(recoveryEnd);
  const recoveryProgress = getRecoveryProgress(recoveryEnd);

  return (
    <FadeIn className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Recovery Mode</h1>
        <p className="text-sm text-slate-500 mt-1">Your body needs time to recover after donation</p>
      </div>

      <Card className="p-8 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-100 mb-6">
          <Heart className="h-10 w-10 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{recoveryLeft} Days Remaining</h2>
        <p className="text-slate-500 mb-6">Your next donation is safe after the recovery period</p>

        <div className="max-w-xs mx-auto mb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Day 0</span>
            <span>Day 90</span>
          </div>
          <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-1000"
              style={{ width: `${recoveryProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">{Math.round(recoveryProgress)}% complete</p>
        </div>

        <div className="space-y-3 text-left bg-slate-50 rounded-xl p-4">
          <h4 className="font-semibold text-slate-700 text-sm">Recovery Tips:</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span> Drink plenty of water (8-10 glasses daily)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span> Eat iron-rich foods (spinach, red meat, legumes)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span> Get adequate rest and avoid strenuous exercise
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span> Include Vitamin C to boost iron absorption
            </li>
          </ul>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200">
          <div className="flex items-center gap-2 text-sm">
            <span className="flex h-3 w-3 rounded-full bg-red-400" />
            <span className="font-medium text-red-700">Emergency Availability: ON</span>
          </div>
          <p className="text-xs text-red-600 mt-1">
            You&apos;re still visible for emergency blood requests during recovery.
          </p>
          <Button variant="outline" size="sm" className="mt-3 border-red-200 text-red-600 hover:bg-red-50">
            Turn Off Emergency Availability
          </Button>
        </div>
      </Card>
    </FadeIn>
  );
}
