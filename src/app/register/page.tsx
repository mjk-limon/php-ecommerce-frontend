'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Phone, User as UserIcon, MapPin, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

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
        <div className="section-card overflow-hidden">
          {/* Top Switcher */}
          <div className="flex border-b border-[#F0EDE8] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <Link
              href="/login"
              className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-center border-b-2 border-transparent text-[#736C62] hover:text-[#1F1D1A]"
            >
              Customer Sign In
            </Link>
            <span className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-center border-b-2 border-[#BA2D1D] bg-white dark:bg-[#1E1E1E] text-[#BA2D1D] dark:text-[#E05343]">
              Join Free / Register
            </span>
          </div>

          <div className="px-6 pt-6 sm:px-8 sm:pt-8">
            <h1 className="text-2xl font-bold tracking-tight text-[#202923]">Create your account</h1>
            <p className="mt-2 text-sm text-[#707970]">Join WellSell BD for a faster, simpler checkout.</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">Division / State *</label>
              <input type="text" required value={regState} onChange={(e) => setRegState(e.target.value)} placeholder="Dhaka" className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#24634b]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">Postal code</label>
              <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal code" className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#24634b]" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                Email Address *
              </label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
                <Mail className="absolute right-3 w-4 h-4 text-[#9A9184]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">Confirm password *</label>
              <input type="password" required minLength={6} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#24634b]" />
              {confirmPassword && password !== confirmPassword && <p className="mt-1 text-xs text-red-600">Passwords do not match.</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                Phone Number (BD) *
              </label>
              <div className="relative flex items-center">
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
                <Phone className="absolute right-3 w-4 h-4 text-[#9A9184]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                  Street / Area Address *
                </label>
                <input
                  type="text"
                  required
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  placeholder="Sector / Road"
                  className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={regCity}
                  onChange={(e) => setRegCity(e.target.value)}
                  placeholder="Dhaka"
                  className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                Password *
              </label>
              <div className="relative flex items-center">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
                <Lock className="absolute right-3 w-4 h-4 text-[#9A9184]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || password !== confirmPassword}
              className="md:col-span-2 w-full bg-[#24634b] hover:bg-[#194b38] text-white py-3 rounded-lg font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Registering Account...</span>
              ) : (
                <>
                  <span>Create Customer Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="md:col-span-2 text-center pt-2 text-xs text-[#736C62] dark:text-[#9E968B]">
              Already registered?{' '}
              <Link href="/login" className="text-[#BA2D1D] font-semibold hover:underline">
                Sign In Instead
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
