'use client';

import { Droplets, Users, Hospital, Star } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const stats = [
  {
    icon: Users,
    value: '3,200+',
    label: 'Registered Donors',
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Droplets,
    value: '15,400+',
    label: 'Successful Donations',
    gradient: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Hospital,
    value: '850+',
    label: 'Partner Hospitals',
    gradient: 'from-violet-500 to-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Star,
    value: '98%',
    label: 'Response Rate',
    gradient: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50',
  },
];

export function StatsSection() {
  return (
    <section className="py-16 gradient-blue-subtle">
      <div className="container">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="text-center p-6 rounded-2xl bg-white border border-slate-200/60 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} mb-3`}>
                  <stat.icon className="h-6 w-6 text-slate-700" />
                </div>
                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
