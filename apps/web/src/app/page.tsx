import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { StatsSection } from '@/components/home/stats-section';
import { LiveRequests } from '@/components/home/live-requests';
import { TopDonors } from '@/components/home/top-donors';
import { BlogPreview } from '@/components/home/blog-preview';
import { EmergencySearch } from '@/components/home/emergency-search';
import { HowItWorks } from '@/components/home/how-it-works';
import { CtaSection } from '@/components/home/cta-section';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <EmergencySearch />
        <StatsSection />
        <HowItWorks />
        <LiveRequests />
        <TopDonors />
        <BlogPreview />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
