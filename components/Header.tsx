'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setCurrentDate(date.toLocaleDateString('en-US', options));
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Business', href: '/business' },
    { name: 'Markets', href: '/markets' },
    { name: 'Tech', href: '/tech' },
    { name: 'Opinion', href: '/opinion' },
    { name: 'Features', href: '/features' },
  ];

  const topLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Advertise', href: '/advertise' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white text-xs sm:text-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Always show date */}
          <div className="opacity-90 font-medium">{currentDate}</div>

          {/* Show top links only on md+ screens */}
          <ul className="hidden md:flex space-x-4">
            {topLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-yellow-300 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold text-blue-900 tracking-tight hover:text-blue-700 transition-colors"
        >
          Tradrewire
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative group text-gray-800 hover:text-blue-700 font-medium transition-colors"
            >
              {item.name}
              <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          <button
            className="p-2 rounded-full hover:bg-blue-100 transition-colors"
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-blue-800" />
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-blue-800 hover:text-blue-600 transition-colors"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-inner"
          >
            <nav className="flex flex-col py-3 px-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 my-2"></div>
              {topLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
