'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search, MapPin, Filter, X, Shield, Droplets, Star,
  ChevronLeft, ChevronRight, Users,
} from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, getRankingColor, getAvailabilityColor, getAvailabilityLabel } from '@/lib/utils';
import { BLOOD_GROUPS, DISTRICTS, AVAILABILITY_OPTIONS } from '@nirbenu/shared';

const mockDonors = Array.from({ length: 24 }, (_, i) => ({
  id: `d${i + 1}`,
  bloodGroup: BLOOD_GROUPS[i % 8],
  district: DISTRICTS[i % 8],
  area: ['Mirpur', 'Gulshan', 'Dhanmondi', 'Agrabad', 'Zindabazar', 'Uposhohor'][i % 6],
  donationCount: Math.floor(Math.random() * 30) + 1,
  ranking: ['new', 'bronze', 'silver', 'gold', 'hero', 'life_saver'][Math.floor(i / 4)],
  verified: i < 16,
  availability: AVAILABILITY_OPTIONS[i % 3],
  gender: i % 3 === 0 ? 'female' : 'male',
  user: {
    name: ['Rafiq Islam', 'Nusrat Jahan', 'Tanvir Ahmed', 'Farzana Akter', 'Shakil Hasan', 'Sadia Islam', 'Masud Rana', 'Rafia Sultana', 'Arif Hossain', 'Maliha Tabassum', 'Kabir Uddin', 'Tasnim Rahman', 'Nayeem Rahman', 'Fabiha Noor', 'Sajid Khan'][i % 15],
    avatarUrl: null,
  },
}));

export default function DonorsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selBlood, setSelBlood] = useState(searchParams.get('bloodGroup') || '');
  const [selDistrict, setSelDistrict] = useState(searchParams.get('district') || '');
  const [selAvailability, setSelAvailability] = useState(searchParams.get('availability') || '');
  const page = Number(searchParams.get('page') || 1);

  const filtered = mockDonors.filter((d) => {
    if (selBlood && d.bloodGroup !== selBlood) return false;
    if (selDistrict && d.district !== selDistrict) return false;
    if (selAvailability && d.availability !== selAvailability) return false;
    if (search && !d.user.name.toLowerCase().includes(search.toLowerCase()) && !d.area.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const perPage = 12;
  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v); else params.delete(k);
    });
    params.set('page', '1');
    router.push(`/donors?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Find Donors</h1>
              <p className="text-sm text-slate-500 mt-1">{filtered.length} donors found</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {(selBlood || selDistrict || selAvailability) && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  {[selBlood, selDistrict, selAvailability].filter(Boolean).length}
                </span>
              )}
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {showFilters && (
              <aside className="lg:w-64 shrink-0">
                <div className="glass-card rounded-2xl p-5 space-y-4 sticky top-20">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-700 text-sm">Filters</h3>
                    <button
                      onClick={() => { setSelBlood(''); setSelDistrict(''); setSelAvailability(''); updateParams({ bloodGroup: '', district: '', availability: '' }); }}
                      className="text-xs text-primary hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-2 block">Blood Group</label>
                    <div className="flex flex-wrap gap-1.5">
                      {BLOOD_GROUPS.map((bg) => (
                        <button
                          key={bg}
                          onClick={() => { setSelBlood(selBlood === bg ? '' : bg); updateParams({ bloodGroup: selBlood === bg ? '' : bg }); }}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                            selBlood === bg
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300',
                          )}
                        >
                          {bg}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-2 block">District</label>
                    <div className="flex flex-wrap gap-1.5">
                      {DISTRICTS.slice(0, 8).map((d) => (
                        <button
                          key={d}
                          onClick={() => { setSelDistrict(selDistrict === d ? '' : d); updateParams({ district: selDistrict === d ? '' : d }); }}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                            selDistrict === d
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300',
                          )}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-2 block">Availability</label>
                    <div className="space-y-1">
                      {AVAILABILITY_OPTIONS.map((a) => (
                        <button
                          key={a}
                          onClick={() => { setSelAvailability(selAvailability === a ? '' : a); updateParams({ availability: selAvailability === a ? '' : a }); }}
                          className={cn(
                            'w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
                            selAvailability === a
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300',
                          )}
                        >
                          {getAvailabilityLabel(a)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            )}

            <div className="flex-1">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  className="pl-10"
                  placeholder="Search by name or area..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); }}
                  onKeyDown={(e) => { if (e.key === 'Enter') updateParams({ search }); }}
                />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pageData.map((donor) => (
                  <Link key={donor.id} href={`/donors/${donor.id}`}>
                    <Card hover className="h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold">
                          {donor.user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-semibold text-slate-800 text-sm truncate">{donor.user.name}</h4>
                            {donor.verified && <Shield className="h-3.5 w-3.5 text-emerald-500 shrink-0" />}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <MapPin className="h-3 w-3" /> {donor.area}, {donor.district}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md bg-red-50 text-red-600 text-xs font-bold border border-red-200">
                          {donor.bloodGroup}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getRankingColor(donor.ranking)}`}>
                          {donor.ranking.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-slate-500">
                          <Droplets className="h-3 w-3 text-primary" />
                          {donor.donationCount} donations
                        </div>
                        <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-medium', getAvailabilityColor(donor.availability))}>
                          {getAvailabilityLabel(donor.availability)}
                        </span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>

              {pageData.length === 0 && (
                <div className="text-center py-20">
                  <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600">No donors found</h3>
                  <p className="text-sm text-slate-400 mt-1">Try adjusting your filters</p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => updateParams({ page: String(page - 1) })}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i}
                      variant={page === i + 1 ? 'default' : 'outline'}
                      size="sm"
                      className="w-9"
                      onClick={() => updateParams({ page: String(i + 1) })}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => updateParams({ page: String(page + 1) })}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
