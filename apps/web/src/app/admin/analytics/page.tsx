'use client';

import { BarChart3, TrendingUp, Users, Droplets } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/animations';

export default function AdminAnalyticsPage() {
  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Platform statistics and insights</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Monthly Registrations', value: '45', trend: '+12%', up: true },
          { icon: Droplets, label: 'Monthly Donations', value: '28', trend: '+8%', up: true },
          { icon: BarChart3, label: 'Request Fulfillment', value: '72%', trend: '+5%', up: true },
          { icon: TrendingUp, label: 'Response Rate', value: '94%', trend: '+2%', up: true },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="h-5 w-5 text-primary" />
              <span className={`text-xs font-medium ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>{stat.trend}</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
            <div className="text-xs text-slate-500">{stat.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-slate-800 mb-4">District Distribution</h3>
          <div className="space-y-3">
            {[
              { district: 'Dhaka', donors: 12, percent: 40 },
              { district: 'Chattogram', donors: 5, percent: 17 },
              { district: 'Sylhet', donors: 4, percent: 13 },
              { district: 'Rajshahi', donors: 3, percent: 10 },
              { district: 'Khulna', donors: 3, percent: 10 },
              { district: 'Others', donors: 3, percent: 10 },
            ].map((d) => (
              <div key={d.district} className="flex items-center gap-3">
                <span className="w-24 text-xs text-slate-600">{d.district}</span>
                <div className="flex-1 h-5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${d.percent}%` }} />
                </div>
                <span className="text-xs text-slate-500 w-10 text-right">{d.donors}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-800 mb-4">Donations Over Time</h3>
          <div className="flex items-end justify-between h-40 gap-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month, i) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-primary-200 rounded-t-lg transition-all hover:bg-primary-400"
                  style={{ height: `${[40, 55, 35, 70, 60][i]}%` }}
                />
                <span className="text-xs text-slate-500">{month}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </FadeIn>
  );
}
