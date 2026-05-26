'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const mockPosts = [
  {
    slug: 'why-blood-donation-is-a-gift-of-life',
    title: 'Why Blood Donation is a Gift of Life',
    excerpt: 'Discover how a single blood donation can save up to three lives and why community blood donation platforms are crucial.',
    category: { name: 'Blood Awareness' },
    publishedAt: '2026-01-15T00:00:00.000Z',
  },
  {
    slug: 'science-behind-blood-groups',
    title: 'The Science Behind Blood Groups: A Complete Guide',
    excerpt: 'Learn about the ABO blood group system, universal donors, and common blood types in Bangladesh.',
    category: { name: 'Blood Awareness' },
    publishedAt: '2026-01-20T00:00:00.000Z',
  },
  {
    slug: 'rafiqs-story-one-donation-saved-mother',
    title: 'Rafiq\'s Story: How One Donation Saved a Mother',
    excerpt: 'Read how Rafiq Islam responded to an emergency notification and saved a mother of three.',
    category: { name: 'Donation Stories' },
    publishedAt: '2026-02-01T00:00:00.000Z',
  },
];

export function BlogPreview() {
  return (
    <section className="py-20 bg-slate-50/50">
      <div className="container">
        <FadeIn className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">
            Latest from <span className="text-primary">Blog</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto">
            Stories, awareness, and health tips from our community
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {mockPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <Card hover className="h-full flex flex-col">
                  <div className="mb-4">
                    <span className="text-xs font-medium text-primary bg-primary-50 px-2.5 py-1 rounded-full">
                      {post.category?.name}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}
                    </div>
                    <span className="text-primary font-medium flex items-center gap-1">
                      Read More <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.2} className="text-center mt-8">
          <Link href="/blog">
            <div className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              Read All Articles <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
