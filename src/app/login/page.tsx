'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, showToast } = useApp();

  const [username, setUsername] = useState('ixarapitiy04@gmail.com');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const ok = await login(username, password);
    setIsLoading(false);
    if (ok) {
      router.push('/');
    }
  };

  return (
    <div className="w-full pb-20 pt-8 sm:pt-12 bg-[#FAFAFA] dark:bg-[#121212] min-h-[75vh]">
      <div className="max-w-md mx-auto px-4">
        <div className="section-card overflow-hidden">
          {/* Top Switcher */}
          <div className="flex border-b border-[#F0EDE8] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <span className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-center border-b-2 border-[#BA2D1D] bg-white dark:bg-[#1E1E1E] text-[#BA2D1D] dark:text-[#E05343]">
              Customer Sign In
            </span>
            <Link
              href="/register"
              className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-center border-b-2 border-transparent text-[#736C62] hover:text-[#1F1D1A]"
            >
              Join Free / Register
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            <div className="bg-[#F8F9FA] dark:bg-[#252525] p-3 rounded-xs text-[11px] text-[#736C62] dark:text-[#9E968B] flex items-center justify-between border border-[#F0EDE8] dark:border-[#2A2A2A]">
              <span>Demo Account</span>
              <button
                type="button"
                onClick={() => {
                  setUsername('ixarapitiy04@gmail.com');
                  setPassword('');
                  showToast('Demo credentials prefilled!', 'info');
                }}
                className="text-[#BA2D1D] dark:text-[#E05343] font-semibold underline cursor-pointer"
              >
                Quick Fill
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                Email Address / Username *
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. ixarapitiy04@gmail.com"
                  className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2.5 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
                <Mail className="absolute right-3 w-4 h-4 text-[#9A9184]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                  Password *
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('Password reset link sent to demo account.', 'info');
                  }}
                  className="text-[11px] text-[#BA2D1D] hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative flex items-center">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2.5 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
                <Lock className="absolute right-3 w-4 h-4 text-[#9A9184]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#BA2D1D] hover:bg-[#961F12] text-white py-3 rounded-xs font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2 text-xs text-[#736C62] dark:text-[#9E968B]">
              Don't have an account yet?{' '}
              <Link href="/register" className="text-[#BA2D1D] font-semibold hover:underline">
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
