'use client';

import Link from 'next/link';
import { Clock, MapPin, Droplets, AlertTriangle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/animations';

const mockRequests = [
  {
    id: '1',
    bloodGroup: 'O-',
    hospitalName: 'Dhaka Medical College',
    location: 'Dhaka',
    urgency: 'emergency',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    bloodGroup: 'B+',
    hospitalName: 'Square Hospital',
    location: 'Dhaka',
    urgency: 'urgent',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    bloodGroup: 'A+',
    hospitalName: 'Chattogram Medical',
    location: 'Chattogram',
    urgency: 'urgent',
    status: 'active',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '4',
    bloodGroup: 'AB+',
    hospitalName: 'Apollo Hospital',
    location: 'Dhaka',
    urgency: 'normal',
    status: 'active',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

export function LiveRequests() {
  return (
    <section className="py-20 bg-slate-50/50">
      <div className="container">
        <FadeIn className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-200 px-4 py-1.5 text-sm font-medium text-red-600 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            Live Requests
          </div>
          <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">
            Blood Requests <span className="text-red-500">In Progress</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto">
            These patients need blood right now. Can you help?
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {mockRequests.map((req) => (
            <FadeIn key={req.id}>
              <Link href={`/emergency`}>
                <Card hover className="h-full flex flex-col group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-black text-primary">{req.bloodGroup}</span>
                    <Badge variant={req.urgency === 'emergency' ? 'danger' : req.urgency === 'urgent' ? 'warning' : 'secondary'}>
                      {req.urgency}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-2 line-clamp-1">{req.hospitalName}</h4>
                  <div className="space-y-1.5 text-xs text-slate-500 mb-4 flex-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" /> {req.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {req.createdAt ? 'Just now' : '1h ago'}
                    </div>
                  </div>
                  <div className="flex items-center text-primary text-xs font-medium group-hover:gap-2 transition-all">
                    View Details <ArrowRight className="h-3 w-3 ml-1" />
                  </div>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="text-center mt-8">
          <Link href="/emergency">
            <Button variant="outline" size="lg">
              <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
              View All Emergency Requests
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
