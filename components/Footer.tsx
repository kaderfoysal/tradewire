'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaInstagram, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'Support', href: '/support' },
        { name: 'Advertise', href: '/advertise' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
        { name: 'Cookies', href: '/cookies' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: '#', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: <FaTwitter />, href: '#', label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: <FaLinkedin />, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: <FaYoutube />, href: '#', label: 'YouTube', color: 'hover:text-red-500' },
    { icon: <FaInstagram />, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-gray-400 py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12">
        
        {/* Brand Section - Wider Column */}
        <div>
          <h2 className="text-white text-2xl font-extrabold mb-4">Tradrewire</h2>

          <p className="text-sm text-gray-400 mb-4">
            <span className="font-semibold text-white">Editor & Publisher:</span> Farhana Chowdhury
          </p>
          <div className="text-sm text-gray-400 space-y-1">
            <p>166/1667, Shahid Syed Nazrul Islam Sarani,</p>
            <p>Al Razi Complex, Bijoy Nagar, Paltan,</p>
            <p>Dhaka, Bangladesh</p>
          </div>

          <div className="flex space-x-4 mt-5">
            {socialLinks.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                aria-label={s.label}
                className={`text-gray-400 ${s.color} transition-colors duration-300`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Dynamic Footer Links */}
        {footerLinks.map((section, index) => (
          <div key={index}>
            <h3 className="text-white font-semibold text-lg mb-4">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe for exclusive insights and updates.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2 rounded-md transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center">
        <p className="text-sm text-gray-500">
          © {currentYear} Tradrewire — All rights reserved.
        </p>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <FaArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
