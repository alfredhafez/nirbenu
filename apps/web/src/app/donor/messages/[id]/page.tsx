'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, formatRelativeTime } from '@/lib/utils';

const mockMessages = [
  { id: '1', content: 'Hello, I need O+ blood for my father', senderId: 'user', createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: '2', content: 'Hi, I can help. Which hospital?', senderId: 'donor', createdAt: new Date(Date.now() - 7000000).toISOString() },
  { id: '3', content: 'Dhaka Medical College Hospital, Ward 12', senderId: 'user', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '4', content: 'I will be there in 30 minutes.', senderId: 'donor', createdAt: new Date(Date.now() - 3500000).toISOString() },
];

export default function DonorChatPage() {
  const params = useParams();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const currentUserId = 'donor';

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: String(messages.length + 1), content: message, senderId: currentUserId, createdAt: new Date().toISOString() }]);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}><ArrowLeft className="h-5 w-5 text-slate-500" /></button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold">K</div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Karim Hossain</h3>
            <span className="text-xs text-slate-500">Online</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 p-2">
        {messages.map((msg) => (
          <div key={msg.id} className={cn('flex', msg.senderId === currentUserId ? 'justify-end' : 'justify-start')}>
            <div className={cn('max-w-[75%] rounded-2xl px-4 py-2.5', msg.senderId === currentUserId ? 'bg-primary text-white rounded-br-md' : 'bg-slate-100 text-slate-800 rounded-bl-md')}>
              <p className="text-sm">{msg.content}</p>
              <div className={cn('flex items-center gap-1 mt-1', msg.senderId === currentUserId ? 'justify-end text-primary-200' : 'text-slate-400')}>
                <span className="text-[10px]">{formatRelativeTime(msg.createdAt)}</span>
                {msg.senderId === currentUserId && <Check className="h-3 w-3" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
        />
        <Button size="icon" className="h-11 w-11 rounded-xl" onClick={sendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
