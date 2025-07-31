'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin/login');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-3">
  <Link href="/admin" className="block hover:underline">
    Dashboard
  </Link>
  <Link href="/admin/home" className="block hover:underline">
    Manage Home
    </Link>
    <Link href="/admin/shop" className="block hover:underline">
    Manage Shop
      </Link>
       <Link href="/admin/add-blog" className="block hover:underline">
    Add Blog
       </Link>
</nav>

        <button
          onClick={() => {
            localStorage.removeItem('adminToken');
            router.replace('/admin/login');
          }}
          className="mt-4 text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-6 bg-white">{children}</main>
    </div>
  );
}

