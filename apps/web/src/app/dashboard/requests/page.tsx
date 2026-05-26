'use client';

import Link from 'next/link';
import { Plus, MapPin, Clock, Droplets, ArrowRight, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/ui/animations';

const requests = [
  { id: '1', bloodGroup: 'O+', hospitalName: 'Dhaka Medical College', location: 'Dhaka', urgency: 'urgent', status: 'active', createdAt: new Date().toISOString() },
  { id: '2', bloodGroup: 'B+', hospitalName: 'Square Hospital', location: 'Dhaka', urgency: 'normal', status: 'pending', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', bloodGroup: 'A-', hospitalName: 'Apollo Hospital', location: 'Dhaka', urgency: 'urgent', status: 'fulfilled', createdAt: new Date(Date.now() - 172800000).toISOString() },
];

export default function RequestsPage() {
  return (
    <FadeIn className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Requests</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your blood donation requests</p>
        </div>
        <Link href="/dashboard/requests/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Request
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {requests.map((req) => (
          <Link key={req.id} href={`/dashboard/requests/${req.id}`}>
            <Card hover className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                  <Droplets className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-lg font-bold text-red-600">{req.bloodGroup}</span>
                    <Badge variant={req.status === 'active' ? 'success' : req.status === 'fulfilled' ? 'secondary' : 'warning'}>
                      {req.status}
                    </Badge>
                    <Badge variant={req.urgency === 'emergency' ? 'danger' : req.urgency === 'urgent' ? 'warning' : 'secondary'}>
                      {req.urgency}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">{req.hospitalName}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {req.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {Math.floor((Date.now() - new Date(req.createdAt).getTime()) / 3600000)}h ago</span>
                  </div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-300" />
            </Card>
          </Link>
        ))}
      </div>
    </FadeIn>
  );
}
