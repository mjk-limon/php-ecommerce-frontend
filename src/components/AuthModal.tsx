'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    login,
    register
  } = useApp();

  const [username, setUsername] = useState('ixarapitiy04@gmail.com');
  const [password, setPassword] = useState('123456');

  // Register state
  const [firstName, setFirstName] = useState('Jahid');
  const [lastName, setLastName] = useState('Limon');
  const [regEmail, setRegEmail] = useState('info@limon.bd');
  const [regPhone, setRegPhone] = useState('01894084242');
  const [regAddress, setRegAddress] = useState('Sector 3, Uttara');
  const [regCity, setRegCity] = useState('Dhaka');

  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(username, password);
    setIsLoading(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await register({
      username: regEmail,
      password,
      first_name: firstName,
      last_name: lastName,
      email: regEmail,
      phone: regPhone,
      address: regAddress,
      city: regCity
    });
    setIsLoading(false);
  };

  const fillDemoCredentials = () => {
    setUsername('ixarapitiy04@gmail.com');
    setPassword('123456');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md bg-[#FBF9F5] dark:bg-[#1A1916] border border-[#E8E2D9] dark:border-[#312E29] rounded-sm shadow-2xl overflow-hidden my-6">
        {/* Header Tabs */}
        <div className="flex border-b border-[#E8E2D9] dark:border-[#312E29] bg-white dark:bg-[#1E1C19] relative">
          <button
            onClick={() => setAuthModalTab('login')}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              authModalTab === 'login'
                ? 'border-[#BA2D1D] text-[#BA2D1D] dark:text-[#E05343]'
                : 'border-transparent text-[#736C62] hover:text-[#1F1D1A]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthModalTab('register')}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              authModalTab === 'register'
                ? 'border-[#BA2D1D] text-[#BA2D1D] dark:text-[#E05343]'
                : 'border-transparent text-[#736C62] hover:text-[#1F1D1A]'
            }`}
          >
            Join Free (Register)
          </button>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-3 right-3 p-1 rounded-full text-[#736C62] hover:text-[#1F1D1A]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab 1: Login */}
        {authModalTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="p-5 sm:p-6 space-y-4">
            <div className="bg-[#F5F1EA] dark:bg-[#25221E] p-3 rounded-xs text-[11px] text-[#736C62] dark:text-[#9E968B] flex items-center justify-between">
              <span>Postman demo account available</span>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-[#BA2D1D] dark:text-[#E05343] font-semibold underline cursor-pointer"
              >
                Auto Fill
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#736C62] dark:text-[#9E968B] mb-1">
                Username / Email *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white dark:bg-[#161513] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#736C62] dark:text-[#9E968B] mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white dark:bg-[#161513] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#BA2D1D] hover:bg-[#961F12] text-white text-xs font-semibold py-2.5 rounded-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Wellsell BD'}
            </button>
          </form>
        ) : (
          /* Tab 2: Register */
          <form onSubmit={handleRegisterSubmit} className="p-5 sm:p-6 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[10px] font-semibold text-[#736C62] dark:text-[#9E968B] mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-white dark:bg-[#161513] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-2.5 py-1.5 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#736C62] dark:text-[#9E968B] mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-white dark:bg-[#161513] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-2.5 py-1.5 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-[#736C62] dark:text-[#9E968B] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full bg-white dark:bg-[#161513] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-2.5 py-1.5 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-[#736C62] dark:text-[#9E968B] mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                className="w-full bg-white dark:bg-[#161513] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-2.5 py-1.5 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[10px] font-semibold text-[#736C62] dark:text-[#9E968B] mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={regCity}
                  onChange={(e) => setRegCity(e.target.value)}
                  className="w-full bg-white dark:bg-[#161513] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-2.5 py-1.5 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#736C62] dark:text-[#9E968B] mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white dark:bg-[#161513] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-2.5 py-1.5 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-[#736C62] dark:text-[#9E968B] mb-1">
                Delivery Address *
              </label>
              <input
                type="text"
                required
                value={regAddress}
                onChange={(e) => setRegAddress(e.target.value)}
                className="w-full bg-white dark:bg-[#161513] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-2.5 py-1.5 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1F6E54] hover:bg-[#185541] text-white text-xs font-semibold py-2.5 rounded-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
