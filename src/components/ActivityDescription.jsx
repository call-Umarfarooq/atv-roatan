"use client";
import React, { useState } from 'react';

export default function ActivityDescription({ description }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 300;
  const shouldTruncate = description && description.length > maxLength;

  return (
    <>
      <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">About this Activity</h3>
        <div className={`transition-all duration-300 ease-in-out`}>
            <p className={`whitespace-pre-wrap ${!isExpanded && shouldTruncate ? 'line-clamp-4' : ''}`}>
            {description}
            </p>
        </div>
        
        {shouldTruncate && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#00694B] font-bold text-sm underline hover:no-underline mt-2 inline-block focus:outline-none"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>
    </>
  );
}

