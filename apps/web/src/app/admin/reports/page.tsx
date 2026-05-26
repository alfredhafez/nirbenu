'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/animations';

const mockReports = [
  { id: '1', reporter: 'User 100', donor: 'Farzana Akter', reason: 'Fake profile suspected. Phone number not working.', status: 'pending', date: '2026-05-22' },
  { id: '2', reporter: 'User 101', donor: 'Tanvir Ahmed', reason: 'Donor did not respond after accepting request.', status: 'pending', date: '2026-05-21' },
  { id: '3', reporter: 'User 102', donor: 'Shakil Hasan', reason: 'Resolved after donor contacted manually.', status: 'resolved', date: '2026-05-18' },
];

export default function AdminReportsPage() {
  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Report Management</h1>
        <p className="text-sm text-slate-500 mt-1">Review and resolve user reports</p>
      </div>
      <div className="space-y-3">
        {mockReports.map((report) => (
          <Card key={report.id} className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant={report.status === 'pending' ? 'warning' : 'success'}>{report.status}</Badge>
                  <span className="text-sm text-slate-500">by {report.reporter} about {report.donor}</span>
                </div>
                <p className="text-sm text-slate-700">{report.reason}</p>
                <p className="text-xs text-slate-400">{report.date}</p>
              </div>
              {report.status === 'pending' && (
                <div className="flex gap-2 ml-4">
                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">Resolve</Button>
                  <Button size="sm" variant="outline" className="text-red-500 border-red-200">Dismiss</Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </FadeIn>
  );
}
