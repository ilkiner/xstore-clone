'use client';

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg relative"
        >
          <Dialog.Title className="text-lg font-bold mb-4 text-center">
            {mode === 'login' ? 'Sign In to Your Account' : 'Create a New Account'}
          </Dialog.Title>

          {mode === 'login' ? <LoginForm /> : <RegisterForm />}

          <div className="text-center text-sm text-gray-500 mt-4">
            {mode === 'login' ? (
              <>
                Don’t have an account?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-blue-600 hover:underline font-medium"
                  type="button"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-blue-600 hover:underline font-medium"
                  type="button"
                >
                  Sign In
                </button>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-2 right-3 text-gray-400 hover:text-black text-2xl leading-none"
            type="button"
          >
            ×
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AuthModal;
