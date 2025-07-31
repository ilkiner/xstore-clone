'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin/login');
    }
  }, [router]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, Admin!</h1>
      <p className="mb-6">
        Use the menu to manage Home or Shop content.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg">
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/admin/home" className="text-primaryGreen hover:underline">
                Manage Home
              </Link>
            </li>
            <li>
              <Link href="/admin/shop" className="text-primaryGreen hover:underline">
                Manage Shop
              </Link>
            </li>
              <li>
               <Link href="/admin/add-blog" className="text-primaryGreen hover:underline">
                 Add Blog
               </Link>
  </li>
          </ul>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold">Overview</h2>
          <p className="text-sm mt-2">Placeholder for stats: recent changes, product count, etc.</p>
        </div>
      </div>
    </div>
  );
}
