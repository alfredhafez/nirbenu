'use client';

import { useState } from 'react';
import { Search, Save, Image, Globe, Mail, Phone, Palette } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/animations';

const initialSettings = {
  site_name: 'Nirbenu',
  site_description: 'Modern Community Blood Donation Ecosystem — Connecting life savers across Bangladesh',
  site_logo: '/logo.svg',
  site_favicon: '/favicon.ico',
  primary_color: '#2563eb',
  accent_color: '#3b82f6',
  hero_title: 'Every Drop Saves a Life',
  hero_subtitle: 'Join Bangladesh\'s largest community of blood donors. Find donors near you or register to become a life saver.',
  about_text: 'Nirbenu is a community-driven blood donation platform connecting donors and recipients across Bangladesh.',
  contact_email: 'support@nirbenu.com',
  contact_phone: '+880 1710-000000',
  facebook_url: 'https://facebook.com/nirbenu',
  twitter_url: 'https://twitter.com/nirbenu',
  instagram_url: 'https://instagram.com/nirbenu',
  footer_text: '© 2026 Nirbenu. All rights reserved. Made with ❤️ in Bangladesh.',
  emergency_hotline: '+880 1710-000999',
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const saveSettings = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <FadeIn className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Site Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Configure platform settings, branding, and more</p>
        </div>
        <Button onClick={saveSettings} className="gap-2">
          <Save className="h-4 w-4" />
          {saved ? 'Saved!' : 'Save All Changes'}
        </Button>
      </div>

      <Card className="p-6 space-y-6">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" /> General Settings
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Site Name</label>
            <Input value={settings.site_name} onChange={(e) => updateSetting('site_name', e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Hero Title</label>
            <Input value={settings.hero_title} onChange={(e) => updateSetting('hero_title', e.target.value)} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Site Description</label>
          <Input value={settings.site_description} onChange={(e) => updateSetting('site_description', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Hero Subtitle</label>
          <Input value={settings.hero_subtitle} onChange={(e) => updateSetting('hero_subtitle', e.target.value)} />
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Image className="h-4 w-4 text-primary" /> Branding
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Logo URL</label>
            <Input value={settings.site_logo} onChange={(e) => updateSetting('site_logo', e.target.value)} />
            <p className="text-xs text-slate-400 mt-1">Recommended: SVG, 200x50px</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Favicon URL</label>
            <Input value={settings.site_favicon} onChange={(e) => updateSetting('site_favicon', e.target.value)} />
            <p className="text-xs text-slate-400 mt-1">Recommended: ICO or PNG, 32x32px</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block flex items-center gap-2">
              <Palette className="h-3.5 w-3.5" /> Primary Color
            </label>
            <div className="flex gap-2">
              <Input type="color" className="w-12 h-10 p-1 cursor-pointer" value={settings.primary_color} onChange={(e) => updateSetting('primary_color', e.target.value)} />
              <Input value={settings.primary_color} onChange={(e) => updateSetting('primary_color', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block flex items-center gap-2">
              <Palette className="h-3.5 w-3.5" /> Accent Color
            </label>
            <div className="flex gap-2">
              <Input type="color" className="w-12 h-10 p-1 cursor-pointer" value={settings.accent_color} onChange={(e) => updateSetting('accent_color', e.target.value)} />
              <Input value={settings.accent_color} onChange={(e) => updateSetting('accent_color', e.target.value)} />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Phone className="h-4 w-4 text-primary" /> Contact Info
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Contact Email</label>
            <Input type="email" value={settings.contact_email} onChange={(e) => updateSetting('contact_email', e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Contact Phone</label>
            <Input value={settings.contact_phone} onChange={(e) => updateSetting('contact_phone', e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Emergency Hotline</label>
            <Input value={settings.emergency_hotline} onChange={(e) => updateSetting('emergency_hotline', e.target.value)} />
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" /> Social Links
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Facebook URL</label>
            <Input value={settings.facebook_url} onChange={(e) => updateSetting('facebook_url', e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Twitter URL</label>
            <Input value={settings.twitter_url} onChange={(e) => updateSetting('twitter_url', e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Instagram URL</label>
            <Input value={settings.instagram_url} onChange={(e) => updateSetting('instagram_url', e.target.value)} />
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="font-semibold text-slate-800">Other Settings</h3>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">About Text</label>
          <textarea
            className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            rows={3}
            value={settings.about_text}
            onChange={(e) => updateSetting('about_text', e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Footer Text</label>
          <Input value={settings.footer_text} onChange={(e) => updateSetting('footer_text', e.target.value)} />
        </div>
      </Card>
    </FadeIn>
  );
}
