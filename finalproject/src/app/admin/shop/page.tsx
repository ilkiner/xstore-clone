'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

type Category = {
  _id: string;
  name: string;
};

export default function ManageShop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    hoverImage: '',
    categoryId: '',
    rating: '5',
    color: '#000000',
    inStock: 'true',
  });

  const fetchAll = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        axios.get('http://localhost:5000/api/products'),
        axios.get('http://localhost:5000/api/categories'),
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Load failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(p => p.filter(x => x._id !== id));
    } catch (e) {
      console.error('Delete failed', e);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const payload = {
        name: form.name,
        price: parseFloat(form.price),
        image: form.image,
        hoverImage: form.hoverImage || undefined,
        categoryId: form.categoryId || undefined,
        rating: parseInt(form.rating, 10),
        color: form.color,
        inStock: form.inStock === 'true',
      };
      const res = await axios.post('http://localhost:5000/api/products', payload);
      setProducts(p => [res.data, ...p]);
      
      setForm({
        ...form,
        name: '',
        price: '',
        image: '',
      });
      alert('Product created');
    } catch (e: any) {
      console.error('Create error', e);
      setError(e.response?.data?.message || 'Create failed');
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600 mb-4">Error: {error}</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold mb-4">Shop Product Management</h1>

        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mb-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Name</label>
            <input
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="border p-2"
              placeholder="Product name"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Price</label>
            <input
              required
              type="number"
              step="0.01"
              value={form.price}
              onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              className="border p-2"
              placeholder="199.99"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Image URL</label>
            <input
              required
              value={form.image}
              onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
              className="border p-2"
              placeholder="/images/products/iphone14.jpg"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Hover Image URL</label>
            <input
              value={form.hoverImage}
              onChange={e => setForm(f => ({ ...f, hoverImage: e.target.value }))}
              className="border p-2"
              placeholder="/images/products/iphonehover.jpg"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Category</label>
            <select
              value={form.categoryId}
              onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
              className="border p-2"
            >
              <option value="">Select</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Rating</label>
            <input
              type="number"
              min={0}
              max={5}
              value={form.rating}
              onChange={e => setForm(f => ({ ...f, rating: e.target.value }))}
              className="border p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Color</label>
            <input
              type="text"
              value={form.color}
              onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
              className="border p-2"
              placeholder="#ffffff"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">In Stock</label>
            <select
              value={form.inStock}
              onChange={e => setForm(f => ({ ...f, inStock: e.target.value }))}
              className="border p-2"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="col-span-full">
            <button
              type="submit"
              disabled={creating}
              className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {creating ? 'Creating...' : 'Create New Product'}
            </button>
          </div>
        </form>

        <div className="space-y-2">
          {products.map(p => (
            <div key={p._id} className="flex justify-between items-center border p-2 rounded">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm">${p.price.toFixed(2)}</div>
              </div>
              <button
                onClick={() => deleteProduct(p._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
