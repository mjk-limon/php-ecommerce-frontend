'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

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
        <Card className="overflow-hidden">
          {/* Top Switcher */}
          <div className="flex border-b border-[#F0EDE8] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <span className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-center border-b-2 border-[#BA2D1D] bg-white dark:bg-[#1E1E1E] text-primary dark:text-[#E05343]">
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
                className="text-primary dark:text-[#E05343] font-semibold underline cursor-pointer"
              >
                Quick Fill
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                Email Address / Username *
              </label>
              <Input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. ixarapitiy04@gmail.com"
                icon={<Mail className="w-4 h-4 text-[#9A9184]" />}
              />
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
                  className="text-[11px] text-primary hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4 text-[#9A9184]" />}
              />
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              isLoading={isLoading}
              className="w-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Sign In to Account</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="text-center pt-2 text-xs text-[#736C62] dark:text-[#9E968B]">
              Don&apos;t have an account yet?{' '}
              <Link href="/register" className="text-primary font-semibold hover:underline">
                Create Account
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
