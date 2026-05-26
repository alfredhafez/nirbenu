export const runtime = 'edge';

'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/ui/animations';

const posts: Record<string, { title: string; content: string; excerpt: string; category: string; publishedAt: string; author: string }> = {
  'why-blood-donation-is-a-gift-of-life': {
    title: 'Why Blood Donation is a Gift of Life',
    category: 'Blood Awareness',
    publishedAt: '2026-05-20',
    author: 'Admin Nirbenu',
    excerpt: 'Discover how a single blood donation can save up to three lives and why community blood donation platforms are crucial.',
    content: `<p>Blood donation is one of the most selfless acts a person can perform. Every few seconds, someone somewhere needs blood. It could be a mother giving birth, a child fighting cancer, or a victim of an accident. Your single donation can save up to three lives.</p>
<p>In Bangladesh, the demand for blood is constant and growing. Hospitals need blood daily for surgeries, emergencies, and treatments. Yet, less than 1% of the eligible population donates blood. This gap between demand and supply is where community platforms like Nirbenu make a difference.</p>
<p>When you donate blood, you're not just giving a biological substance — you're giving someone more time with their family, another birthday, another chance. Blood cannot be manufactured; it can only come from generous donors like you.</p>
<h3>The Impact of One Donation</h3>
<p>One unit of blood can be separated into:</p>
<ul><li>Red blood cells — for anemia and surgery patients</li><li>Plasma — for burn victims and clotting disorders</li><li>Platelets — for cancer patients undergoing chemotherapy</li></ul>
<p>This means one donation can help three different patients. The process takes only about 10-15 minutes, and your body replaces the donated plasma within 24 hours.</p>
<h3>Why Community Platforms Matter</h3>
<p>Traditional blood banks face challenges with inventory management and donor outreach. Community platforms like Nirbenu bridge the gap by:</p>
<ul><li>Connecting donors directly with recipients</li><li>Providing real-time availability information</li><li>Building trust through verification and reviews</li><li>Creating a culture of regular donation</li></ul>
<p>Join Nirbenu today and become part of the solution.</p>`,
  },
  'science-behind-blood-groups': {
    title: 'The Science Behind Blood Groups: A Complete Guide',
    category: 'Blood Awareness',
    publishedAt: '2026-05-18',
    author: 'Admin Nirbenu',
    excerpt: 'Learn about the ABO blood group system, universal donors, and common blood types in Bangladesh.',
    content: `<p>Understanding blood groups is essential for both donors and recipients. The ABO blood group system, discovered by Karl Landsteiner in 1901, categorizes blood into four main types: A, B, AB, and O.</p>
<p>Each type can be either Rh-positive or Rh-negative, giving us the eight blood groups we recognize today. Blood group O-negative is known as the universal donor because it can be given to patients of any blood type in emergencies.</p>
<p>In Bangladesh, the most common blood groups are B-positive and O-positive, while AB-negative is the rarest. Knowing your blood type is the first step toward becoming an informed donor.</p>`,
  },
  'rafiqs-story-one-donation-saved-mother': {
    title: "Rafiq's Story: How One Donation Saved a Mother of Three",
    category: 'Donation Stories',
    publishedAt: '2026-05-15',
    author: 'Admin Nirbenu',
    excerpt: 'Read how Rafiq Islam responded to an emergency notification and saved a mother of three.',
    content: `<p>Last December, Rafiq Islam received an emergency notification on the Nirbenu app. A mother of three in Dhaka Medical College Hospital needed B-negative blood urgently — a rare blood type in Bangladesh. Without hesitation, Rafiq rushed to the hospital.</p>
<p>"I didn't think twice," Rafiq recalls. "I saw the notification and knew I had to help. When I arrived, the family was desperate."</p>
<p>Rafiq donated one unit of blood. The surgery was successful, and the mother recovered fully. Today, Rafiq has donated blood 15 times and continues to be an active donor on the platform.</p>`,
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = posts[slug] || {
    title: 'Post Not Found',
    category: '',
    publishedAt: '',
    author: '',
    excerpt: '',
    content: '<p>This blog post could not be found.</p>',
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container max-w-3xl">
          <FadeIn>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to blog
            </Link>

            <Badge variant="secondary">{post.category}</Badge>
            <h1 className="text-3xl font-bold text-slate-800 mt-4 mb-4 sm:text-4xl">{post.title}</h1>

            <div className="flex items-center gap-4 text-sm text-slate-500 mb-8">
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" /> {post.author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            <div
              className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
