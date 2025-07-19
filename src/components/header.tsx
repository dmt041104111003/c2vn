"use client";

import Image from "next/image";
import Link from "next/link";
import { navbars } from "~/constants/navbars";
import { routers } from "~/constants/routers";
import { images } from "~/public/images";
import { motion } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import { User as UserIcon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [missingCount, setMissingCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      if (!session?.user?.email) {
        setMissingCount(0);
        return;
      }

      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const { profile } = await response.json();
          if (!profile) {
            setMissingCount(4);
          } else {
            let count = 0;
            if (!profile.name) count++;
            if (!profile.dob) count++;
            if (!profile.phone) count++;
            if (!profile.hometown) count++;
            setMissingCount(count);
          }
        } else {
          setMissingCount(4);
        }
      } catch (error) {
        console.error('Error checking profile:', error);
        setMissingCount(4);
      }
    };

    checkProfile();
  }, [session]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full border-b border-white/20 bg-black/20 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.section
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex items-center"
          >
            <Link href={routers.home} className="flex items-center gap-3">
              <Image className="text-xl h-10 w-auto  font-bold text-white" loading="lazy" src={images.logo} alt="Cardano2vn" />
            </Link>
          </motion.section>

          {/* Desktop Navigation */}
          <section className="hidden items-center space-x-8 md:flex">
            {navbars.map(function (navbar) {
              return (
                <Link href={navbar.href} key={navbar.id} className="font-medium text-gray-300 transition-colors duration-200 hover:text-white">
                  {navbar.title}
                </Link>
              );
            })}
            <Link
              target="_blank"
              href="lms.cardano2vn.io"
              className="inline-flex items-center gap-2 rounded-sm border border-white/30 bg-gray-800/50 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:border-white/50 hover:bg-gray-700/50"
            >
              <span>LMS App</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </Link>
            {/* Desktop Auth Buttons */}
            <div className="flex items-center gap-3">
              {session ? (
                <div className="flex items-center gap-3">
                  <Link href="/profile" className="relative flex items-center">
                    {session.user?.image ? (
                      <img 
                        src={session.user.image} 
                        alt="avatar" 
                        className="w-8 h-8 rounded-full border border-white"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <UserIcon className={`w-8 h-8 text-white ${session.user?.image ? 'hidden' : ''}`} />
                    {missingCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 border border-white">{missingCount}</span>
                    )}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="font-medium text-gray-300 transition-colors duration-200 hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="inline-flex items-center gap-2 rounded-sm border border-white/30 bg-gray-800/50 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:border-white/50 hover:bg-gray-700/50"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Sign in</span>
                </button>
              )}
            </div>
          </section>

          {/* Mobile Menu Button */}
          <section className="md:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </section>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-sm"
          >
            <div className="px-6 py-4 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-3">
                {navbars.map(function (navbar) {
                  return (
                    <Link 
                      href={navbar.href} 
                      key={navbar.id} 
                      onClick={closeMenu}
                      className="block font-medium text-gray-300 transition-colors duration-200 hover:text-white py-2"
                    >
                      {navbar.title}
                    </Link>
                  );
                })}
              </div>

              {/* LMS App Link */}
              <div className="pt-2 border-t border-white/10">
                <Link
                  target="_blank"
                  href="lms.cardano2vn.io"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-2 rounded-sm border border-white/30 bg-gray-800/50 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:border-white/50 hover:bg-gray-700/50"
                >
                  <span>LMS App</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </Link>
              </div>

              {/* Mobile Auth Section */}
              <div className="pt-2 border-t border-white/10">
                {session ? (
                  <div className="space-y-3">
                    <Link 
                      href="/profile" 
                      onClick={closeMenu}
                      className="flex items-center gap-3 py-2"
                    >
                      {session.user?.image ? (
                        <img 
                          src={session.user.image} 
                          alt="avatar" 
                          className="w-8 h-8 rounded-full border border-white"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <UserIcon className={`w-8 h-8 text-white ${session.user?.image ? 'hidden' : ''}`} />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">
                          {session.user?.name || "User"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {session.user?.email}
                        </span>
                      </div>
                      {missingCount > 0 && (
                        <span className="ml-auto bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 border border-white">{missingCount}</span>
                      )}
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        closeMenu();
                      }}
                      className="w-full text-left font-medium text-gray-300 transition-colors duration-200 hover:text-white py-2"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      signIn("google", { callbackUrl: "/" });
                      closeMenu();
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-sm border border-white/30 bg-gray-800/50 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:border-white/50 hover:bg-gray-700/50"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Sign in</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
