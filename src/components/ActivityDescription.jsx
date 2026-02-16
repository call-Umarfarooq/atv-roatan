"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ActivityDescription({ description }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const maxLength = 300;
  const shouldTruncate = description && description.length > maxLength;

  return (
    <>
      <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">About this Activity</h3>
        <p className={`whitespace-pre-wrap ${!isModalOpen && shouldTruncate ? 'line-clamp-4' : ''}`}>
          {description}
        </p>
        
        {shouldTruncate && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-[#15531B] font-bold text-sm underline hover:no-underline mt-2 inline-block"
          >
            Read more
          </button>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative animate-scaleIn">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-[#1a1a1a]">About this Activity</h2>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                        <X size={20} className="text-gray-600" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <p className="text-[#1a1a1a] leading-relaxed text-[16px] whitespace-pre-wrap">
                        {description}
                    </p>
                </div>
            </div>
        </div>
      )}
    </>
  );
}
