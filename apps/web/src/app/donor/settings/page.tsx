'use client';

import { User, Phone, MapPin, Camera, Save } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FadeIn } from '@/components/ui/animations';

export default function DonorSettingsPage() {
  return (
    <FadeIn className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Donor Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your donor profile</p>
      </div>
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100 text-red-500 text-3xl font-bold">D</div>
            <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-lg">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Profile Picture</h3>
            <p className="text-xs text-slate-500">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input className="pl-10" defaultValue="Rafiq Islam" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input type="tel" className="pl-10" defaultValue="0171-1234567" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Area</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input className="pl-10" defaultValue="Mirpur, Dhaka" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Bio</label>
            <textarea
              className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              rows={3}
              defaultValue="Regular blood donor since 2018. Always ready to help in emergencies."
            />
          </div>
          <Button type="submit" className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
        </form>
      </Card>
    </FadeIn>
  );
}
