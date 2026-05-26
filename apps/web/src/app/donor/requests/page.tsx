'use client';

import { Check, X, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/animations';

const requests = [
  { id: '1', name: 'Karim Hossain', bloodGroup: 'O+', message: 'My father needs blood at DMCH', status: 'pending', createdAt: '2026-05-20T00:00:00Z' },
  { id: '2', name: 'Fatima Akter', bloodGroup: 'O+', message: 'Urgent blood needed for surgery', status: 'pending', createdAt: '2026-05-19T00:00:00Z' },
  { id: '3', name: 'Shahid Khan', bloodGroup: 'A+', message: 'Please help, it\'s emergency', status: 'accepted', createdAt: '2026-05-18T00:00:00Z' },
];

export default function DonorRequestsPage() {
  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Contact Requests</h1>
        <p className="text-sm text-slate-500 mt-1">People who want to contact you</p>
      </div>

      <div className="space-y-3">
        {requests.map((req) => (
          <Card key={req.id} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold">
                  {req.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-slate-800">{req.name}</h4>
                    <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-600 text-[10px] font-bold">{req.bloodGroup}</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-3">{req.message}</p>
                  {req.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="gap-1 bg-emerald-500 hover:bg-emerald-600">
                        <Check className="h-3.5 w-3.5" /> Accept
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 text-red-500 border-red-200 hover:bg-red-50">
                        <X className="h-3.5 w-3.5" /> Reject
                      </Button>
                    </div>
                  )}
                  {req.status === 'accepted' && (
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      Accepted — Number shared
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </FadeIn>
  );
}
