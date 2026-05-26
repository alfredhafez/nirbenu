'use client';

import { MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/animations';
import Link from 'next/link';

const mockChats = [
  { id: '1', user: 'Karim Hossain', donor: 'Rafiq Islam', lastMessage: 'Thank you for your help!', time: '2h ago', messages: 12 },
  { id: '2', user: 'Fatima Akter', donor: 'Nusrat Jahan', lastMessage: 'On my way to the hospital', time: '4h ago', messages: 8 },
  { id: '3', user: 'User 100', donor: 'Tanvir Ahmed', lastMessage: 'Which ward are you in?', time: '6h ago', messages: 5 },
];

export default function AdminChatsPage() {
  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Chat Monitoring</h1>
        <p className="text-sm text-slate-500 mt-1">View and monitor all conversations</p>
      </div>
      <div className="space-y-3">
        {mockChats.map((chat) => (
          <Link key={chat.id} href={`/admin/chats/${chat.id}`}>
            <Card hover className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium text-slate-800">{chat.user} ↔ {chat.donor}</div>
                  <div className="text-xs text-slate-500">{chat.lastMessage}</div>
                </div>
              </div>
              <div className="text-right text-xs text-slate-400">
                <div>{chat.time}</div>
                <div>{chat.messages} messages</div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </FadeIn>
  );
}
