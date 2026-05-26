'use client';

import Link from 'next/link';
import { AlertTriangle, MapPin, Clock, Droplets, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations';
import { getUrgencyColor } from '@/lib/utils';
import { BLOOD_GROUPS } from '@nirbenu/shared';

const mockEmergencyRequests = [
  { id: '1', bloodGroup: 'O-', hospitalName: 'Dhaka Medical College', location: 'Dhaka', urgency: 'emergency', status: 'active', createdAt: new Date().toISOString() },
  { id: '2', bloodGroup: 'B+', hospitalName: 'Square Hospital', location: 'Dhaka', urgency: 'urgent', status: 'active', createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: '3', bloodGroup: 'A+', hospitalName: 'Chattogram Medical', location: 'Chattogram', urgency: 'emergency', status: 'active', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '4', bloodGroup: 'AB+', hospitalName: 'Apollo Hospital', location: 'Dhaka', urgency: 'urgent', status: 'active', createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: '5', bloodGroup: 'O+', hospitalName: 'Birdem Hospital', location: 'Dhaka', urgency: 'normal', status: 'active', createdAt: new Date(Date.now() - 14400000).toISOString() },
  { id: '6', bloodGroup: 'AB-', hospitalName: 'Rajshahi Medical', location: 'Rajshahi', urgency: 'emergency', status: 'active', createdAt: new Date(Date.now() - 21600000).toISOString() },
  { id: '7', bloodGroup: 'B-', hospitalName: 'LabAid Hospital', location: 'Dhaka', urgency: 'urgent', status: 'fulfilled', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '8', bloodGroup: 'A-', hospitalName: 'Sylhet MAG Osmani', location: 'Sylhet', urgency: 'urgent', status: 'active', createdAt: new Date(Date.now() - 43200000).toISOString() },
];

export default function EmergencyPage() {
  const activeRequests = mockEmergencyRequests.filter(r => r.status !== 'fulfilled');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container max-w-4xl">
          <FadeIn className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-200 px-4 py-1.5 text-sm font-medium text-red-600 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              {activeRequests.length} Active Requests
            </div>
            <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
              Emergency <span className="text-red-500">Blood Requests</span>
            </h1>
            <p className="mt-3 text-slate-500 max-w-lg mx-auto">
              These patients urgently need blood donors. Can you help save a life?
            </p>
          </FadeIn>

          <StaggerContainer className="space-y-4">
            {mockEmergencyRequests.map((req) => (
              <StaggerItem key={req.id}>
                <Card hover className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
                      <Droplets className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold text-red-600">{req.bloodGroup}</span>
                        <Badge variant={req.urgency === 'emergency' ? 'danger' : req.urgency === 'urgent' ? 'warning' : 'secondary'}>
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {req.urgency}
                        </Badge>
                        {req.status === 'fulfilled' && <Badge variant="success">Fulfilled</Badge>}
                      </div>
                      <h3 className="font-semibold text-slate-800">{req.hospitalName}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {req.location}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {Math.floor((Date.now() - new Date(req.createdAt).getTime()) / 3600000)}h ago</span>
                      </div>
                    </div>
                  </div>
                  {req.status !== 'fulfilled' && (
                    <Link href={`/donors?bloodGroup=${req.bloodGroup}`}>
                      <Button size="sm" className="gap-2">
                        Find Matching Donors <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3} className="mt-10 text-center">
            <div className="glass-card rounded-2xl p-8 text-center">
              <h3 className="font-semibold text-slate-800 mb-2">Need Blood Urgently?</h3>
              <p className="text-sm text-slate-500 mb-4">Create a blood request and we will notify matching donors in your area.</p>
              <Link href="/dashboard/requests/new">
                <Button variant="destructive" className="gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Create Emergency Request
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
