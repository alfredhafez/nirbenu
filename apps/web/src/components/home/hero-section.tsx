'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Heart, Users, Shield, ArrowRight, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(59,130,246,0.06),transparent_50%)]" />

      <div className="container relative py-20 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50/80 px-4 py-1.5 text-sm font-medium text-primary-700 mb-6">
              <Droplets className="h-4 w-4" />
              Every Drop Saves a Life
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl text-balance"
          >
            Find Blood Donors in
            <span className="relative ml-3">
              <span className="gradient-primary bg-clip-text text-transparent">Seconds</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M1 5.5C50 2 150 2 199 5.5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" className="opacity-40" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Join Bangladesh&apos;s largest community blood donation network. Search verified donors nearby, respond to emergencies, and become a life saver today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/donors">
              <Button size="xl" className="shadow-xl shadow-primary/30">
                <Search className="h-5 w-5 mr-2" />
                Find Donors Now
              </Button>
            </Link>
            <Link href="/register/donor">
              <Button variant="outline" size="xl" className="border-slate-300">
                <Heart className="h-5 w-5 mr-2" />
                Become a Donor
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {[
              { icon: Users, label: '3,000+', sub: 'Active Donors' },
              { icon: Droplets, label: '15,000+', sub: 'Lives Saved' },
              { icon: Shield, label: '100%', sub: 'Verified System' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl px-5 py-4 text-center">
                <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">{stat.label}</div>
                <div className="text-sm text-slate-500">{stat.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
