'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/animations';

export default function EditBlogPostPage() {
  const params = useParams();
  return (
    <FadeIn className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog"><ArrowLeft className="h-5 w-5 text-slate-500" /></Link>
          <h1 className="text-2xl font-bold text-slate-800">Edit Blog Post</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Eye className="h-4 w-4" /> Preview</Button>
          <Button className="gap-2"><Save className="h-4 w-4" /> Update</Button>
        </div>
      </div>
      <Card className="p-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Title</label>
          <Input defaultValue="Why Blood Donation is a Gift of Life" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Slug</label>
            <Input defaultValue="why-blood-donation-is-a-gift-of-life" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Category</label>
            <Input defaultValue="Blood Awareness" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Excerpt</label>
          <Input defaultValue="Discover how a single blood donation can save up to three lives." />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Content</label>
          <textarea
            className="w-full rounded-lg border border-slate-200 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none font-mono"
            rows={20}
            defaultValue={'<p>Blood donation is one of the most selfless acts a person can perform...</p>'}
          />
        </div>
      </Card>
    </FadeIn>
  );
}
