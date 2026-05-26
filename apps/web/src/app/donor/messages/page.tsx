'use client';

import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FadeIn } from '@/components/ui/animations';
import { formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';

const conversations = [
  { id: '1', name: 'Karim Hossain', lastMessage: 'My father needs O+ blood', lastMessageAt: new Date().toISOString(), unread: 1 },
  { id: '2', name: 'Fatima Akter', lastMessage: 'Thank you so much!', lastMessageAt: new Date(Date.now() - 86400000).toISOString(), unread: 0 },
];

export default function DonorMessagesPage() {
  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Messages</h1>
        <p className="text-sm text-slate-500 mt-1">Conversations with people requesting blood</p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input className="pl-10" placeholder="Search conversations..." />
      </div>
      <div className="space-y-2">
        {conversations.map((conv) => (
          <Link key={conv.id} href={`/donor/messages/${conv.id}`}>
            <Card hover className="flex items-center gap-4 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold">{conv.name.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-800 text-sm">{conv.name}</h4>
                  <span className="text-xs text-slate-400">{formatRelativeTime(conv.lastMessageAt)}</span>
                </div>
                <p className="text-sm text-slate-500 truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white font-medium">{conv.unread}</span>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </FadeIn>
  );
}
