import Link from 'next/link';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
                <Heart className="h-5 w-5 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-primary">Nir</span>
                <span className="text-slate-800">benu</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Modern Community Blood Donation Ecosystem. Connecting life savers across Bangladesh.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { href: '/donors', label: 'Find Donors' },
                { href: '/emergency', label: 'Emergency Requests' },
                { href: '/ranking', label: 'Donor Rankings' },
                { href: '/blog', label: 'Blog' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-slate-500 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-4">Support</h4>
            <div className="space-y-2">
              {[
                { href: '/register/donor', label: 'Become a Donor' },
                { href: '/about', label: 'About Us' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-slate-500 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Mail className="h-4 w-4 text-primary" />
                support@nirbenu.com
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Phone className="h-4 w-4 text-primary" />
                01710-000000
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="h-4 w-4 text-primary" />
                Dhaka, Bangladesh
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-400">
            © 2026 Nirbenu. All rights reserved. Made with ❤️ in Bangladesh.
          </p>
        </div>
      </div>
    </footer>
  );
}
