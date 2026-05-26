'use client';

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const mockPosts = [
  {
    slug: 'why-blood-donation-is-a-gift-of-life',
    title: 'Why Blood Donation is a Gift of Life',
    excerpt: 'Discover how a single blood donation can save up to three lives and why community blood donation platforms are crucial for bridging the gap between demand and supply.',
    category: { name: 'Blood Awareness' },
    publishedAt: '2026-05-20T00:00:00.000Z',
  },
  {
    slug: 'science-behind-blood-groups',
    title: 'The Science Behind Blood Groups: A Complete Guide',
    excerpt: 'Learn about the ABO blood group system, universal donors, common blood types in Bangladesh, and why knowing your blood type matters.',
    category: { name: 'Blood Awareness' },
    publishedAt: '2026-05-18T00:00:00.000Z',
  },
  {
    slug: 'rafiqs-story-one-donation-saved-mother',
    title: 'Rafiq\'s Story: How One Donation Saved a Mother of Three',
    excerpt: 'Read how Rafiq Islam responded to an emergency notification and saved a mother of three with his rare B-negative blood donation.',
    category: { name: 'Donation Stories' },
    publishedAt: '2026-05-15T00:00:00.000Z',
  },
  {
    slug: 'nusrats-journey-first-time-to-gold',
    title: 'Nusrat\'s Journey: From First-Time Donor to Gold Rank',
    excerpt: 'Follow Nusrat Jahan\'s inspiring journey from a nervous first-time donor to a Gold-ranked donor who has saved countless lives.',
    category: { name: 'Donation Stories' },
    publishedAt: '2026-05-10T00:00:00.000Z',
  },
  {
    slug: 'what-to-eat-before-after-blood-donation',
    title: 'What to Eat Before and After Donating Blood',
    excerpt: 'A comprehensive guide on what to eat before and after blood donation, including iron-rich foods, hydration tips, and recovery nutrition advice.',
    category: { name: 'Health Tips' },
    publishedAt: '2026-05-05T00:00:00.000Z',
  },
  {
    slug: 'building-community-life-savers-bangladesh',
    title: 'Building a Community of Life Savers in Bangladesh',
    excerpt: 'How Nirbenu is building a nationwide community of blood donors across Bangladesh, connecting local heroes with those in need.',
    category: { name: 'Community' },
    publishedAt: '2026-04-28T00:00:00.000Z',
  },
  {
    slug: 'myths-facts-about-blood-donation',
    title: 'Myths and Facts About Blood Donation',
    excerpt: 'Debunking common myths about blood donation from pain concerns to eligibility questions with evidence-based facts.',
    category: { name: 'Blood Awareness' },
    publishedAt: '2026-04-22T00:00:00.000Z',
  },
  {
    slug: 'blood-donation-camp-dhaka-university-2026',
    title: 'Upcoming Blood Donation Camp: Dhaka University 2026',
    excerpt: 'Join us at Dhaka University on June 15, 2026 for a blood donation camp with free health checkups and certificates.',
    category: { name: 'Events' },
    publishedAt: '2026-04-15T00:00:00.000Z',
  },
];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container">
          <FadeIn className="text-center mb-12">
            <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
              Nirbenu <span className="text-primary">Blog</span>
            </h1>
            <p className="mt-3 text-slate-500 max-w-lg mx-auto">
              Stories, health tips, and community updates from our blood donation network
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {mockPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <Card hover className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-primary bg-primary-50 px-2.5 py-1 rounded-full">
                        {post.category.name}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="h-3 w-3" />
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-slate-500 mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center text-primary text-xs font-medium gap-1">
                      Read More <ArrowRight className="h-3 w-3" />
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
