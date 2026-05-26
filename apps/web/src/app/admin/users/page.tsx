'use client';

import { useState } from 'react';
import { Search, Shield, UserCog, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/ui/animations';

const mockUsers = [
  { id: '1', name: 'Admin Nirbenu', email: 'admin@nirbenu.com', role: 'admin', createdAt: '2026-01-01' },
  { id: 'd1', name: 'Rafiq Islam', email: 'rafiq@example.com', role: 'donor', createdAt: '2026-01-05' },
  { id: 'd2', name: 'Nusrat Jahan', email: 'nusrat@example.com', role: 'donor', createdAt: '2026-01-08' },
  { id: 'u1', name: 'User 100', email: 'user1@example.com', role: 'user', createdAt: '2026-02-01' },
  { id: 'u2', name: 'User 101', email: 'user2@example.com', role: 'user', createdAt: '2026-02-10' },
];

export default function AdminUsersPage() {
  return (
    <FadeIn className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage all platform users</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input className="pl-10" placeholder="Search users..." />
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Name</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Email</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Role</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Joined</th>
                <th className="text-right text-xs font-medium text-slate-500 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{user.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={user.role === 'admin' ? 'danger' : user.role === 'donor' ? 'success' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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
