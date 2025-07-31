'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  username: z.string().min(2),
  surname: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Register failed');

      alert('Registered successfully!');
      reset();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Username *</label>
        <input
          type="text"
          {...register('username')}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Surname *</label>
        <input
          type="text"
          {...register('surname')}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.surname && <p className="text-red-500 text-sm">{errors.surname.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email *</label>
        <input
          type="email"
          {...register('email')}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Password *</label>
        <input
          type="password"
          {...register('password')}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        {isSubmitting ? 'Registering...' : (
          <>
            <i className="ri-user-add-line mr-2" />
            Register
          </>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;

