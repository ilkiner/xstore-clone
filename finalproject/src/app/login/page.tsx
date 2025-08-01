'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      router.push('/');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Login failed');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="grid grid-cols-2 border-b border-gray-300">
        <button
          className={`py-2 text-center font-medium ${
            activeTab === 'login' ? 'text-black border-b-2 border-black' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('login')}
        >
          LOGIN
        </button>

        <Link href="/register">
          <span className="py-2 text-center font-medium text-blue-600 hover:underline">
            REGISTER
          </span>
        </Link>
      </div>

      {activeTab === 'login' && (
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          {error && <div className="text-red-600">{error}</div>}

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:opacity-90"
          >
            Log in
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
