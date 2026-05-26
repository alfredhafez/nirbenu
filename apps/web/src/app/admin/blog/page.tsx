'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/ui/animations';

const posts = [
  { id: '1', title: 'Why Blood Donation is a Gift of Life', slug: 'why-blood-donation-is-a-gift-of-life', category: 'Blood Awareness', published: true, publishedAt: '2026-05-20' },
  { id: '2', title: 'The Science Behind Blood Groups', slug: 'science-behind-blood-groups', category: 'Blood Awareness', published: true, publishedAt: '2026-05-18' },
  { id: '3', title: "Rafiq's Story: How One Donation Saved a Mother", slug: 'rafiqs-story-one-donation-saved-mother', category: 'Donation Stories', published: true, publishedAt: '2026-05-15' },
  { id: '4', title: "Nusrat's Journey: First-Time to Gold", slug: 'nusrats-journey-first-time-to-gold', category: 'Donation Stories', published: true, publishedAt: '2026-05-10' },
  { id: '5', title: 'What to Eat Before and After Donating Blood', slug: 'what-to-eat-before-after-blood-donation', category: 'Health Tips', published: false, publishedAt: null },
];

export default function AdminBlogPage() {
  return (
    <FadeIn className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Blog Management</h1>
          <p className="text-sm text-slate-500 mt-1">Create and manage blog posts</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="gap-2"><Plus className="h-4 w-4" /> New Post</Button>
        </Link>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Title</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Category</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Published</th>
                <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Date</th>
                <th className="text-right text-xs font-medium text-slate-500 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-700">{post.title}</td>
                  <td className="px-4 py-3"><Badge variant="secondary">{post.category}</Badge></td>
                  <td className="px-4 py-3">
                    {post.published ? (
                      <span className="text-xs text-emerald-600 font-medium">Published</span>
                    ) : (
                      <span className="text-xs text-amber-600 font-medium">Draft</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{post.publishedAt || '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/blog/${post.id}/edit`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3.5 w-3.5" /></Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
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
