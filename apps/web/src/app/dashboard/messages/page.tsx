'use client';

import { Search, MessageSquare, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FadeIn } from '@/components/ui/animations';
import { formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';

const conversations = [
  { id: '1', name: 'Rafiq Islam', lastMessage: 'Thank you for reaching out!', lastMessageAt: new Date().toISOString(), unread: 2 },
  { id: '2', name: 'Nusrat Jahan', lastMessage: 'I can donate tomorrow morning', lastMessageAt: new Date(Date.now() - 3600000).toISOString(), unread: 0 },
];

export default function MessagesPage() {
  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Messages</h1>
        <p className="text-sm text-slate-500 mt-1">Your conversations with donors</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input className="pl-10" placeholder="Search conversations..." />
      </div>

      <div className="space-y-2">
        {conversations.map((conv) => (
          <Link key={conv.id} href={`/dashboard/messages/${conv.id}`}>
            <Card hover className="flex items-center gap-4 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold">
                {conv.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-800 text-sm">{conv.name}</h4>
                  <span className="text-xs text-slate-400">{formatRelativeTime(conv.lastMessageAt)}</span>
                </div>
                <p className="text-sm text-slate-500 truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white font-medium">
                  {conv.unread}
                </span>
              )}
            </Card>
          </Link>
        ))}

        {conversations.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600">No messages yet</h3>
            <p className="text-sm text-slate-400 mt-1">Contact a donor to start a conversation</p>
          </div>
        )}
      </div>
    </FadeIn>
  );
}
