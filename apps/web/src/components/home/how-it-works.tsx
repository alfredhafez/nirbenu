'use client';

import { Search, Send, Phone, ArrowRight } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Search Donors',
    description: 'Find verified blood donors near you by blood group and location in seconds.',
  },
  {
    step: '02',
    icon: Send,
    title: 'Send Request',
    description: 'Send a contact request to the donor. Your privacy is protected — numbers stay hidden.',
  },
  {
    step: '03',
    icon: Phone,
    title: 'Connect & Save',
    description: 'Once the donor accepts, unlock their contact details and coordinate the donation.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container">
        <FadeIn className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto">
            Simple, secure, and privacy-first blood donation workflow
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((step) => (
            <StaggerItem key={step.step}>
              <div className="relative p-8 rounded-2xl border border-slate-200/60 bg-white hover:shadow-lg hover:shadow-primary-50 transition-all duration-300 group">
                <div className="text-5xl font-black text-slate-100 group-hover:text-primary-50 transition-colors">
                  {step.step}
                </div>
                <div className="mt-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 group-hover:bg-primary-100 transition-colors mb-4">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
                <ArrowRight className="absolute top-8 right-8 h-5 w-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
