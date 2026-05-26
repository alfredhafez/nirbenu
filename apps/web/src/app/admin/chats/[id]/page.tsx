'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const mockMessages = [
  { id: '1', content: 'Hello, I need O+ blood for my father', sender: 'Karim Hossain', senderRole: 'user', time: '2:30 PM' },
  { id: '2', content: 'Hi, I can help. Which hospital?', sender: 'Rafiq Islam', senderRole: 'donor', time: '2:32 PM' },
  { id: '3', content: 'Dhaka Medical College Hospital, Ward 12', sender: 'Karim Hossain', senderRole: 'user', time: '2:35 PM' },
  { id: '4', content: 'I will be there in 30 minutes. Please wait.', sender: 'Rafiq Islam', senderRole: 'donor', time: '2:36 PM' },
  { id: '5', content: 'Thank you so much!', sender: 'Karim Hossain', senderRole: 'user', time: '2:38 PM' },
];

export default function AdminChatDetailPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}><ArrowLeft className="h-5 w-5 text-slate-500" /></button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold">K</div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Karim Hossain ↔ Rafiq Islam</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>12 messages</span>
              <Badge variant="secondary">O+ donor match</Badge>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="text-red-500 border-red-200 gap-1">
          <AlertTriangle className="h-3.5 w-3.5" /> Flag Conversation
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-4 max-h-[60vh] overflow-y-auto">
        {mockMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderRole === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
              msg.senderRole === 'user' ? 'bg-slate-100 rounded-bl-md' : 'bg-primary-50 rounded-br-md'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-slate-600">{msg.sender}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                  msg.senderRole === 'donor' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {msg.senderRole === 'donor' ? 'Donor' : 'User'}
                </span>
              </div>
              <p className="text-sm text-slate-700">{msg.content}</p>
              <span className="text-[10px] text-slate-400 mt-1 block">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <div className="flex items-center gap-2 text-sm text-amber-700">
          <Shield className="h-4 w-4" />
          Viewing as admin — this conversation is monitored
        </div>
        <Button variant="outline" size="sm" className="border-amber-300 text-amber-700">Send Warning</Button>
      </div>
    </div>
  );
}
