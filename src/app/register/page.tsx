'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { ArrowRight, Lock, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useApp();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regCity, setRegCity] = useState('');
  const [regState, setRegState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    setIsLoading(true);
    const ok = await register({
      username: regEmail,
      password,
      first_name: firstName,
      last_name: lastName,
      email: regEmail,
      phone: regPhone,
      address: regAddress,
      city: regCity,
      state: regState,
      country: 'Bangladesh',
      postal_code: postalCode
    });
    setIsLoading(false);
    if (ok) {
      router.push('/');
    }
  };

  return (
    <div className="w-full pb-20 pt-8 sm:pt-12 bg-[#FAFAFA] dark:bg-[#121212] min-h-[75vh]">
      <div className="max-w-5xl mx-auto px-4">
        <Card className="overflow-hidden">
          {/* Top Switcher */}
          <div className="flex border-b border-[#F0EDE8] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <Link
              href="/login"
              className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-center border-b-2 border-transparent text-[#736C62] hover:text-[#1F1D1A]"
            >
              Customer Sign In
            </Link>
            <span className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-center border-b-2 border-[#BA2D1D] bg-white dark:bg-[#1E1E1E] text-primary dark:text-[#E05343]">
              Join Free / Register
            </span>
          </div>

          <div className="px-6 pt-6 sm:px-8 sm:pt-8">
            <h1 className="text-2xl font-bold tracking-tight text-[#202923] dark:text-white">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-[#707970] dark:text-[#9E968B]">
              Join WellSell BD for a faster, simpler checkout.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                  First Name *
                </label>
                <Input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                  Last Name *
                </label>
                <Input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                Division / State *
              </label>
              <Input
                type="text"
                required
                value={regState}
                onChange={(e) => setRegState(e.target.value)}
                placeholder="Dhaka"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                Postal code
              </label>
              <Input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Postal code"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                Email Address *
              </label>
              <Input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="you@domain.com"
                icon={<Mail className="w-4 h-4 text-[#9A9184]" />}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                Confirm password *
              </label>
              <Input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                icon={<Lock className="w-4 h-4 text-[#9A9184]" />}
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-600">Passwords do not match.</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                Phone Number (BD) *
              </label>
              <Input
                type="tel"
                required
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                icon={<Phone className="w-4 h-4 text-[#9A9184]" />}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                  Street / Area Address *
                </label>
                <Input
                  type="text"
                  required
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  placeholder="Sector / Road"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                  City *
                </label>
                <Input
                  type="text"
                  required
                  value={regCity}
                  onChange={(e) => setRegCity(e.target.value)}
                  placeholder="Dhaka"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                Password *
              </label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                icon={<Lock className="w-4 h-4 text-[#9A9184]" />}
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <Button
                type="submit"
                variant="default"
                size="lg"
                isLoading={isLoading}
                disabled={password !== confirmPassword}
                className="w-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-[#24634b] hover:bg-[#194b38]"
              >
                <span>Create Customer Account</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="md:col-span-2 text-center pt-2 text-xs text-[#736C62] dark:text-[#9E968B]">
              Already registered?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Sign In Instead
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
