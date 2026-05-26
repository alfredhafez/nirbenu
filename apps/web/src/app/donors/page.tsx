import { Suspense } from 'react';
import { DonorsContent } from './donors-content';

export default function DonorsPage() {
  return (
    <Suspense fallback={<div className="container py-20 text-center text-slate-500">Loading donors...</div>}>
      <DonorsContent />
    </Suspense>
  );
}
