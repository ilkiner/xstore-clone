'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type HeroSection = { title: string; subtitle: string; imgUrl: string };
type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function ManageHomePage() {
  const router = useRouter();
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [form, setForm] = useState<HeroSection>({ title: '', subtitle: '', imgUrl: '' });
  const [loadingHero, setLoadingHero] = useState(true);
  const [heroError, setHeroError] = useState<string | null>(null);
  const [savingHero, setSavingHero] = useState(false);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loadingArrivals, setLoadingArrivals] = useState(true);
  const [arrivalsError, setArrivalsError] = useState<string | null>(null);
  const [savingArrivals, setSavingArrivals] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    const fetchHero = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/home/hero', {
          headers: { ...getAuthHeader() },
        });
        setHero(res.data);
        setForm(res.data);
      } catch (err: any) {
        setHeroError(err.response?.data?.message || err.message);
      } finally {
        setLoadingHero(false);
      }
    };

    const fetchArrivals = async () => {
      try {
        const [productsRes, configRes] = await Promise.all([
          axios.get('http://localhost:5000/api/products'),
          axios.get('http://localhost:5000/api/new-arrivals', {
            headers: { ...getAuthHeader() },
          }),
        ]);
        setAllProducts(productsRes.data);
        const ids: string[] = (configRes.data.productIds || []).map((p: any) => p._id);
        setSelectedIds(ids);
      } catch (err: any) {
        setArrivalsError(err.response?.data?.message || err.message);
      } finally {
        setLoadingArrivals(false);
      }
    };

    fetchHero();
    fetchArrivals();
  }, [router]);

  const saveHero = async () => {
    if (savingHero) return;
    setSavingHero(true);
    try {
      const res = await axios.put('http://localhost:5000/api/home/hero', form, {
        headers: { ...getAuthHeader() },
      });
      setHero(res.data);
      alert('Hero updated');
    } catch (err: any) {
      setHeroError(err.response?.data?.message || err.message);
    } finally {
      setSavingHero(false);
    }
  };

  const toggleArrival = (id: string) => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
  };

  const saveArrivals = async () => {
    if (savingArrivals) return;
    setSavingArrivals(true);
    try {
      await axios.put(
        'http://localhost:5000/api/new-arrivals',
        { productIds: selectedIds },
        { headers: { ...getAuthHeader() } }
      );
      alert('New Arrivals updated');
    } catch (err: any) {
      setArrivalsError(err.response?.data?.message || err.message);
    } finally {
      setSavingArrivals(false);
    }
  };

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-xl font-semibold mb-4">Hero Section</h1>
        {loadingHero ? (
          <p>Loading hero...</p>
        ) : heroError ? (
          <div className="text-red-600 mb-2">Error: {heroError}</div>
        ) : (
          <div className="space-y-3 max-w-lg">
            <input
              className="w-full border p-2"
              placeholder="Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <input
              className="w-full border p-2"
              placeholder="Subtitle"
              value={form.subtitle}
              onChange={e => setForm({ ...form, subtitle: e.target.value })}
            />
            <input
              className="w-full border p-2"
              placeholder="Image URL"
              value={form.imgUrl}
              onChange={e => setForm({ ...form, imgUrl: e.target.value })}
            />
            <button
              onClick={saveHero}
              disabled={savingHero}
              className="px-4 py-2 bg-primaryGreen text-white rounded disabled:opacity-50"
            >
              {savingHero ? 'Saving...' : 'Save Hero'}
            </button>
          </div>
        )}
      </section>

      <section>
        <h1 className="text-xl font-semibold mb-4">Manage New Arrivals</h1>
        {loadingArrivals ? (
          <p>Loading products...</p>
        ) : arrivalsError ? (
          <div className="text-red-600 mb-2">Error: {arrivalsError}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
              {allProducts.map(p => (
                <div
                  key={p._id}
                  className="flex items-center gap-3 border p-3 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(p._id)}
                    onChange={() => toggleArrival(p._id)}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm">${p.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={saveArrivals}
              disabled={savingArrivals}
              className="mt-6 px-4 py-2 bg-primaryGreen text-white rounded disabled:opacity-50"
            >
              {savingArrivals ? 'Saving...' : 'Save New Arrivals'}
            </button>
          </>
        )}
      </section>
    </div>
  );
}
