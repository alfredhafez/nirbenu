'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/animations';

const mockRequests = [
  { id: '1', bloodGroup: 'O-', hospital: 'Dhaka Medical College', requester: 'User 100', urgency: 'emergency', status: 'active' },
  { id: '2', bloodGroup: 'B+', hospital: 'Square Hospital', requester: 'User 101', urgency: 'urgent', status: 'active' },
  { id: '3', bloodGroup: 'A+', hospital: 'Chattogram Medical', requester: 'User 102', urgency: 'emergency', status: 'pending' },
  { id: '4', bloodGroup: 'AB+', hospital: 'Apollo Hospital', requester: 'User 103', urgency: 'normal', status: 'fulfilled' },
];

export default function AdminRequestsPage() {
  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Blood Request Management</h1>
        <p className="text-sm text-slate-500 mt-1">Monitor and manage all blood requests</p>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Blood</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Hospital</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Requester</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Urgency</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockRequests.map((req) => (
                <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-md bg-red-50 text-red-600 text-xs font-bold">{req.bloodGroup}</span></td>
                  <td className="px-4 py-3 text-sm text-slate-700">{req.hospital}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{req.requester}</td>
                  <td className="px-4 py-3">
                    <Badge variant={req.urgency === 'emergency' ? 'danger' : req.urgency === 'urgent' ? 'warning' : 'secondary'}>{req.urgency}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={req.status === 'active' ? 'success' : req.status === 'fulfilled' ? 'secondary' : 'warning'}>{req.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </FadeIn>
  );
}
