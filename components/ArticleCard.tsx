'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Animation variants
import { Variants } from 'framer-motion';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] // easeOutExpo
    }
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1] // easeInOut
    }
  }
};

const imageHover = {
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] // easeInOut
  }
} as const;

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

type ArticleCardProps = {
  id?: string; // optional since it's not used in the component UI
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
  author: string;
  date: string | number | Date;
  readTime: string;
  variant?: 'default' | 'featured' | 'small';
  className?: string;
};

const ArticleCard: React.FC<ArticleCardProps> = ({
  id: _id,
  slug,
  title,
  excerpt,
  category,
  imageUrl,
  author,
  date,
  readTime,
  variant = 'default',
  className = ''
}) => {
  const [currentImage, setCurrentImage] = useState<string>(imageUrl ?? FALLBACK_IMAGE);
  const isFeatured = variant === 'featured';
  const isSmall = variant === 'small';

  const handleImageError = () => {
    setCurrentImage(FALLBACK_IMAGE);
  };

  const formatDate = (dateInput: string | number | Date) => {
    try {
      const dateObj = new Date(dateInput);
      if (Number.isNaN(dateObj.getTime())) return 'Invalid date';

      // Build options explicitly to avoid spreading booleans into objects
      const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric'
      };
      if (isFeatured) options.year = 'numeric';

      return dateObj.toLocaleDateString('en-US', options);
    } catch {
      return 'Invalid date';
    }
  };

  // Featured card
  if (isFeatured) {
    return (
      <motion.article
        className={`group relative overflow-hidden rounded-xl shadow-xl ${className}`}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variants={cardVariants}
      >
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <motion.div className="h-full w-full">
            <Image
              src={currentImage}
              alt={title ?? 'Article image'}
              width={800}
              height={450}
              className="w-full h-full object-cover"
              onError={() => handleImageError()}
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <motion.span
            className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wide uppercase bg-blue-600 rounded-full mb-4 shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            {category}
          </motion.span>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
            <Link href={`/articles/${slug}`} className="hover:text-blue-300 transition-colors duration-300">
              <span className="line-clamp-2">{title}</span>
            </Link>
          </h2>
          <p className="text-gray-200 mb-6 text-lg leading-relaxed line-clamp-2">{excerpt}</p>
          <div className="flex items-center text-sm text-gray-300 space-x-3">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
              <span>By {author}</span>
            </div>
            <span className="text-gray-400">•</span>
            <time dateTime={String(date)} className="text-gray-300">
              {formatDate(date)}
            </time>
            <span className="text-gray-400">•</span>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{readTime} read</span>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Small card
  if (isSmall) {
    return (
      <motion.article
        className={`flex flex-col sm:flex-row gap-4 group ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
          }
        }}
      >
        <div className="w-full sm:w-36 flex-shrink-0 overflow-hidden rounded-lg">
          <motion.div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-sm" whileHover={imageHover}>
            <Image
              src={currentImage}
              alt={title ?? 'Article image'}
              width={200}
              height={113}
              className="w-full h-full object-cover"
              onError={() => handleImageError()}
            />
          </motion.div>
        </div>
        <div className="flex-1">
          <span className="inline-block px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full mb-2">
            {category}
          </span>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-2 line-clamp-2">
            <Link href={`/articles/${slug}`}>{title}</Link>
          </h3>
          <div className="flex items-center text-xs text-gray-500">
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(date)}
            </span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readTime} read
            </span>
          </div>
        </div>
      </motion.article>
    );
  }

  // Default card
  return (
    <motion.article
      className={`group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
    >
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <motion.div className="h-full w-full">
          <Image
            src={currentImage}
            alt={title ?? 'Article image'}
            width={400}
            height={225}
            className="w-full h-full object-cover"
            onError={() => handleImageError()}
          />
        </motion.div>
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <motion.span className="inline-block self-start px-3 py-1 text-xs font-medium tracking-wide text-blue-700 bg-blue-100 rounded-full mb-3" whileHover={{ scale: 1.05 }}>
          {category}
        </motion.span>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2 line-clamp-2 leading-tight">
          <Link href={`/articles/${slug}`}>{title}</Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{excerpt}</p>
        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
              By {author}
            </span>
            <div className="flex items-center space-x-2">
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(date)}
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readTime} read
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ArticleCard;
