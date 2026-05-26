'use client';

import { ClipboardList, Heart, MessageSquare, Clock, Droplets, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/animations';

export default function DashboardPage() {
  const stats = [
    { icon: ClipboardList, value: '5', label: 'Total Requests', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Heart, value: '3', label: 'Favorites', color: 'text-rose-600', bg: 'bg-rose-50' },
    { icon: MessageSquare, value: '2', label: 'Messages', color: 'text-violet-600', bg: 'bg-violet-50' },
    { icon: Droplets, value: '1', label: 'Fulfilled', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome back! Here&apos;s your activity summary.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-3">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Recent Requests</h3>
            <Link href="/dashboard/requests" className="text-xs text-primary font-medium">View All</Link>
          </div>
          <div className="space-y-3">
            {[
              { bg: 'O+', hospital: 'Dhaka Medical College', status: 'active', urgency: 'urgent' },
              { bg: 'B+', hospital: 'Square Hospital', status: 'pending', urgency: 'normal' },
              { bg: 'A-', hospital: 'Apollo Hospital', status: 'fulfilled', urgency: 'urgent' },
            ].map((req, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-red-600 text-sm">{req.bg}</span>
                  <div>
                    <div className="text-sm font-medium text-slate-700">{req.hospital}</div>
                    <div className="text-xs text-slate-500 capitalize">{req.urgency}</div>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  req.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                  req.status === 'fulfilled' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
          <Link href="/dashboard/requests/new">
            <Button className="w-full mt-4 gap-2">
              <Droplets className="h-4 w-4" /> New Blood Request
            </Button>
          </Link>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Favorite Donors</h3>
            <Link href="/dashboard/favorites" className="text-xs text-primary font-medium">View All</Link>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Rafiq Islam', bg: 'O+', area: 'Mirpur, Dhaka' },
              { name: 'Nusrat Jahan', bg: 'B+', area: 'Gulshan, Dhaka' },
              { name: 'Tanvir Ahmed', bg: 'A+', area: 'Agrabad, Chattogram' },
            ].map((donor, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold text-sm">
                    {donor.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-700">{donor.name}</div>
                    <div className="text-xs text-slate-500">{donor.area}</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-600 text-xs font-bold border border-red-200">{donor.bg}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </FadeIn>
  );
}
