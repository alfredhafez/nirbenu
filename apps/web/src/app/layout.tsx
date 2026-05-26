import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: {
    default: 'Nirbenu — Blood Donation Community',
    template: '%s | Nirbenu',
  },
  description: 'Modern Community Blood Donation Ecosystem — Connecting life savers across Bangladesh',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
