import React, { useState } from 'react';
import { Lock, Mail, Phone, User as UserIcon, MapPin, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const { login, register, navigateToHome, showToast } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Login inputs (prefilled with demo account from Postman)
  const [username, setUsername] = useState('ixarapitiy04@gmail.com');
  const [password, setPassword] = useState('123456');

  // Register inputs matching Postman payload
  const [firstName, setFirstName] = useState('Jahid');
  const [lastName, setLastName] = useState('Limon');
  const [regEmail, setRegEmail] = useState('info@limon.bd');
  const [regPhone, setRegPhone] = useState('01894084242');
  const [regAddress, setRegAddress] = useState('Sector 3, Uttara');
  const [regCity, setRegCity] = useState('Dhaka');

  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const ok = await login(username, password);
    setIsLoading(false);
    if (ok) {
      navigateToHome();
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const ok = await register({
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
    if (ok) {
      navigateToHome();
    }
  };

  return (
    <div className="w-full pb-20 pt-8 sm:pt-12">
      <div className="max-w-md mx-auto px-4">
        <div className="section-card overflow-hidden">
          {/* Top Switcher */}
          <div className="flex border-b border-[#F0EDE8] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                mode === 'login'
                  ? 'border-[#BA2D1D] bg-white dark:bg-[#1E1E1E] text-[#BA2D1D] dark:text-[#E05343]'
                  : 'border-transparent text-[#736C62] hover:text-[#1F1D1A]'
              }`}
            >
              Customer Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                mode === 'register'
                  ? 'border-[#BA2D1D] bg-white dark:bg-[#1E1E1E] text-[#BA2D1D] dark:text-[#E05343]'
                  : 'border-transparent text-[#736C62] hover:text-[#1F1D1A]'
              }`}
            >
              Join Free / Register
            </button>
          </div>

          {mode === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="p-6 sm:p-8 space-y-4">
              <div className="bg-[#F8F9FA] dark:bg-[#252525] p-3 rounded-xs text-[11px] text-[#736C62] dark:text-[#9E968B] flex items-center justify-between border border-[#F0EDE8] dark:border-[#2A2A2A]">
                <span>Postman API Test Account</span>
                <button
                  type="button"
                  onClick={() => {
                    setUsername('ixarapitiy04@gmail.com');
                    setPassword('123456');
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
                    placeholder="Enter password (e.g. 123456)"
                    className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2.5 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                  />
                  <Lock className="absolute right-3 w-4 h-4 text-[#9A9184]" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#BA2D1D] hover:bg-[#961F12] text-white text-xs font-semibold py-3 rounded-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isLoading ? 'Signing In...' : 'Sign In to Account'}
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-[#736C62] dark:text-[#9E968B]">
                  Don't have an account yet?{' '}
                </span>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-xs font-semibold text-[#BA2D1D] hover:underline"
                >
                  Register here
                </button>
              </div>
            </form>
          ) : (
            /* Registration Form */
            <form onSubmit={handleRegisterSubmit} className="p-6 sm:p-8 space-y-3.5">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                  Phone Number (11 Digits for Delivery) *
                </label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="01894084242"
                  className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                    City / Division *
                  </label>
                  <input
                    type="text"
                    required
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                  Full Street Delivery Address *
                </label>
                <textarea
                  rows={2}
                  required
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  placeholder="House, Road, Area, Landmark"
                  className="w-full bg-[#FAFAFA] dark:bg-[#141414] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1F6E54] hover:bg-[#185541] text-white text-xs font-semibold py-3 rounded-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer disabled:opacity-50 mt-2"
              >
                {isLoading ? 'Creating Account...' : 'Complete Registration'}
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-[#736C62] dark:text-[#9E968B]">
                  Already have an account?{' '}
                </span>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs font-semibold text-[#BA2D1D] hover:underline"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
