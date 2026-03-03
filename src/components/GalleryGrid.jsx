"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

function LazyImage({ src, alt, tourTitle, slug }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gray-100"
    >
      {visible ? (
        <>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Hover overlay with tour title */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
            <div className="w-full px-3 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <Link
                href={`/product/${slug}`}
                className="text-white text-xs sm:text-sm font-semibold line-clamp-1 hover:underline"
              >
                {tourTitle}
              </Link>
            </div>
          </div>
        </>
      ) : (
        /* Skeleton placeholder while not yet visible */
        <div className="w-full h-full animate-pulse bg-gray-200 rounded-2xl" />
      )}
    </div>
  );
}

export default function GalleryGrid({ images }) {
  if (!images || images.length === 0) {
    return (
      <div className="text-center text-gray-500 py-20">
        No gallery images found. Add images to your tours to see them here.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {images.map((img, index) => (
        <LazyImage
          key={index}
          src={img.src}
          alt={img.alt}
          tourTitle={img.tourTitle}
          slug={img.slug}
        />
      ))}
    </div>
  );
}
