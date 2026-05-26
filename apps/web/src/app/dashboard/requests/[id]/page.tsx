'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, Droplets, Phone, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/ui/animations';

export default function RequestDetailPage() {
  const params = useParams();

  return (
    <FadeIn className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/requests"><ArrowLeft className="h-5 w-5 text-slate-500" /></Link>
        <h1 className="text-2xl font-bold text-slate-800">Request Details</h1>
      </div>

      <Card className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
              <Droplets className="h-7 w-7 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold text-red-600">O+</span>
                <Badge variant="warning">urgent</Badge>
                <Badge variant="success">active</Badge>
              </div>
              <h3 className="font-semibold text-slate-800">Dhaka Medical College Hospital</h3>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4 text-slate-400" /> Dhaka
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock className="h-4 w-4 text-slate-400" /> 2 hours ago
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 space-y-2">
          <h4 className="text-sm font-semibold text-slate-700">Notes</h4>
          <p className="text-sm text-slate-600">Patient needs blood for emergency surgery. Please respond quickly.</p>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1 gap-2 text-red-500 border-red-200 hover:bg-red-50">Cancel Request</Button>
        </div>
      </Card>
    </FadeIn>
  );
}
