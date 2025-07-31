'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateProductPage() {
  const [form, setForm] = useState({
    name: '',
    image: '',
    hoverImage: '',
    price: '',
    categoryId: '',
    rating: 0,
    color: '',
    inStock: true,
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(
        'http://localhost:5000/api/products',
        {
          name: form.name,
          image: form.image,
          hoverImage: form.hoverImage,
          price: parseFloat(form.price),
          categoryId: form.categoryId,
          rating: form.rating,
          color: form.color,
          inStock: form.inStock,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      router.push('/admin/shop');
    } catch (e: any) {
      setError(e.response?.data?.message || 'Creation failed');
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Create New Product</h1>
      {error && <div className="text-red-600">{error}</div>}
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border p-2" />
      <input placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full border p-2" />
      <input placeholder="Hover Image URL" value={form.hoverImage} onChange={e => setForm({ ...form, hoverImage: e.target.value })} className="w-full border p-2" />
      <input placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full border p-2" />
      <input placeholder="Category ID" value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} className="w-full border p-2" />
      <div className="flex gap-2">
        <input placeholder="Rating" type="number" min={0} max={5} value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className="w-full border p-2" />
        <input placeholder="Color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} className="w-full border p-2" />
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={form.inStock} onChange={e => setForm({ ...form, inStock: e.target.checked })} />
        In Stock
      </label>
      <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">
        Create Product
      </button>
    </div>
  );
}
