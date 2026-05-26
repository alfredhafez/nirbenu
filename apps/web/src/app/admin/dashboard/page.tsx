'use client';

import { Users, Droplets, ClipboardList, AlertTriangle, BarChart3, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/animations';

export default function AdminDashboardPage() {
  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Platform overview and management</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Total Users', value: '41', sub: '+12 this month', color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: Droplets, label: 'Total Donors', value: '30', sub: '22 verified', color: 'text-red-600', bg: 'bg-red-50' },
          { icon: ClipboardList, label: 'Active Requests', value: '8', sub: '3 emergency', color: 'text-amber-600', bg: 'bg-amber-50' },
          { icon: BarChart3, label: 'Total Donations', value: '282', sub: 'All time', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-3">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.sub}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-slate-800 mb-4">Blood Group Distribution</h3>
          <div className="space-y-3">
            {[
              { group: 'O+', count: 8, color: 'bg-red-500' },
              { group: 'B+', count: 7, color: 'bg-blue-500' },
              { group: 'A+', count: 5, color: 'bg-green-500' },
              { group: 'AB+', count: 3, color: 'bg-purple-500' },
              { group: 'O-', count: 3, color: 'bg-pink-500' },
              { group: 'A-', count: 2, color: 'bg-teal-500' },
              { group: 'B-', count: 1, color: 'bg-indigo-500' },
              { group: 'AB-', count: 1, color: 'bg-orange-500' },
            ].map((bg) => (
              <div key={bg.group} className="flex items-center gap-3">
                <span className="w-8 text-xs font-bold text-slate-600">{bg.group}</span>
                <div className="flex-1 h-4 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full ${bg.color}`} style={{ width: `${(bg.count / 8) * 100}%` }} />
                </div>
                <span className="text-xs text-slate-500 w-6 text-right">{bg.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { text: 'New donor registered: Farzana Akter', time: '2h ago', type: 'user' },
              { text: 'Blood request fulfilled for O+ at DMCH', time: '4h ago', type: 'request' },
              { text: 'New blog post published', time: '6h ago', type: 'blog' },
              { text: 'Report received for donor #d45', time: '8h ago', type: 'report' },
              { text: 'Donor Rafiq Islam entered recovery mode', time: '12h ago', type: 'donor' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'request' ? 'bg-red-500' :
                    activity.type === 'donor' ? 'bg-amber-500' :
                    activity.type === 'report' ? 'bg-orange-500' : 'bg-purple-500'
                  }`} />
                  <span className="text-sm text-slate-600">{activity.text}</span>
                </div>
                <span className="text-xs text-slate-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </FadeIn>
  );
}
