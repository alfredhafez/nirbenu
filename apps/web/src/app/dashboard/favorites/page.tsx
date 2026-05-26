'use client';

import { Heart, MapPin, Droplets, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/animations';

const favorites = [
  { id: 'd1', name: 'Rafiq Islam', bloodGroup: 'O+', area: 'Mirpur, Dhaka', donationCount: 28, ranking: 'life_saver' },
  { id: 'd2', name: 'Nusrat Jahan', bloodGroup: 'B+', area: 'Gulshan, Dhaka', donationCount: 22, ranking: 'life_saver' },
  { id: 'd3', name: 'Tanvir Ahmed', bloodGroup: 'A+', area: 'Agrabad, Chattogram', donationCount: 18, ranking: 'hero' },
];

export default function FavoritesPage() {
  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Favorite Donors</h1>
        <p className="text-sm text-slate-500 mt-1">Your saved donor list</p>
      </div>

      <div className="space-y-3">
        {favorites.map((donor) => (
          <Card key={donor.id} hover className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold">
                {donor.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm">{donor.name}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {donor.area}</span>
                  <span className="flex items-center gap-1"><Droplets className="h-3 w-3" /> {donor.donationCount} donations</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-red-50 text-red-600 text-xs font-bold border border-red-200">
                {donor.bloodGroup}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </FadeIn>
  );
}
