'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { articles } from '@/data/articles';

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // NAV ITEMS (was missing — added back)
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

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Filter articles based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.tags.some((tag: string) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md border-b border-gray-200">
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 p-4 border-t border-gray-200"
            ref={searchRef}
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  type="text"
                  ref={inputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for news, articles, and more..."
                  className="w-full p-3 pl-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Search Results */}
              {searchQuery && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                      {searchResults.slice(0, 5).map((article: any) => (
                        <li key={article.id ?? article.slug}>
                          <Link
                            href={`/articles/${article.slug}`}
                            className="flex p-3 hover:bg-gray-50 transition-colors"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                                {article.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                      {searchResults.length > 5 && (
                        <li className="p-3 text-center text-sm text-blue-600 hover:bg-gray-50">
                          <Link
                            href={`/search?q=${encodeURIComponent(searchQuery)}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            View all {searchResults.length} results
                          </Link>
                        </li>
                      )}
                    </ul>
                  ) : searchQuery ? (
                    <div className="p-4 text-center text-gray-500">
                      <p>No articles found for "{searchQuery}"</p>
                    </div>
                  ) : null}
                </div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white text-xs sm:text-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Always show date */}
          <div className="opacity-90 font-medium">{currentDate}</div>

          {/* Show top links only on md+ screens */}
          <ul className="hidden md:flex space-x-4">
            {topLinks.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-yellow-300 transition-colors duration-300">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-extrabold text-blue-900 tracking-tight hover:text-blue-700 transition-colors"
          >
            Tradrewire
          </Link>

          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <nav className="flex space-x-8">
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
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    setSearchQuery('');
                  }}
                  className={`p-2 rounded-full transition-colors ${isSearchOpen ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-100 text-blue-800'}`}
                  aria-label="Search"
                >
                  {isSearchOpen ? <XMarkIcon className="h-5 w-5" /> : <MagnifyingGlassIcon className="h-5 w-5" />}
                </button>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-blue-800 hover:text-blue-600 transition-colors"
                >
                  {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
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
