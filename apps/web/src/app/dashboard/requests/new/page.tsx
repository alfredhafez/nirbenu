'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplets, MapPin, Calendar, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FadeIn } from '@/components/ui/animations';
import { BLOOD_GROUPS, URGENCY_LEVELS } from '@nirbenu/shared';

export default function NewRequestPage() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [urgency, setUrgency] = useState('');

  return (
    <FadeIn className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/requests">
          <ArrowLeft className="h-5 w-5 text-slate-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">New Blood Request</h1>
          <p className="text-sm text-slate-500 mt-1">Submit a request to find matching donors</p>
        </div>
      </div>

      <Card className="p-6">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Blood Group Needed</label>
            <div className="flex flex-wrap gap-2">
              {BLOOD_GROUPS.map((bg) => (
                <button
                  key={bg}
                  type="button"
                  className={`px-4 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                    bloodGroup === bg
                      ? 'bg-red-500 text-white border-red-500 shadow-lg shadow-red-200'
                      : 'border-slate-200 text-slate-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600'
                  }`}
                  onClick={() => setBloodGroup(bg)}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Urgency Level</label>
            <div className="flex gap-2">
              {URGENCY_LEVELS.map((u) => (
                <button
                  key={u}
                  type="button"
                  className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-medium capitalize transition-all ${
                    urgency === u
                      ? u === 'emergency' ? 'bg-red-500 text-white border-red-500' :
                        u === 'urgent' ? 'bg-amber-500 text-white border-amber-500' :
                        'bg-blue-500 text-white border-blue-500'
                      : 'border-slate-200 text-slate-600 hover:border-primary-300'
                  }`}
                  onClick={() => setUrgency(u)}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Hospital Name</label>
            <Input placeholder="Enter hospital name" />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Location</label>
            <Input placeholder="Hospital location / city" />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Required Date (optional)</label>
            <Input type="date" />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Additional Notes</label>
            <textarea
              className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              rows={3}
              placeholder="Any additional information..."
            />
          </div>

          <Button type="submit" className="w-full h-11 gap-2" size="lg">
            <AlertTriangle className="h-4 w-4" /> Submit Blood Request
          </Button>
        </form>
      </Card>
    </FadeIn>
  );
}
