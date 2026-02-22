import React from 'react';
import Image from 'next/image';

export const metadata = {
  title: "Privacy Policy | ATV Roatan",
  description: "Read our privacy policy to understand how ATV Roatan handles your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#fcfcfc] min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px]">
        <Image
          src="/images/hero.png"
          alt="Privacy Policy - ATV Roatan"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20 relative z-10">
          <div className="mb-4">
             <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 text-white/90 text-sm tracking-widest uppercase bg-black/20 backdrop-blur-sm">
                Legal
             </span>
          </div>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 drop-shadow-lg">
            Privacy <span className="text-[#15531B] italic font-serif px-2">Policy</span>
          </h1>
          <p className="text-gray-200 text-sm md:text-base max-w-xl">
            Last Updated: January 2024
          </p>
        </div>
      </section>

      {/* 2. Content Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#e9edea] space-y-8 text-gray-700 leading-relaxed">
          
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">1. Introduction</h2>
            <p>
              Welcome to ATV Roatan. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">2. Data We Collect About You</h2>
            <p className="mb-3">
              Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Financial Data:</strong> includes bank account and payment card details (processed securely by our payment providers).</li>
              <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">3. How We Use Your Data</h2>
            <p className="mb-3">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., booking a tour).</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">5. Data Retention</h2>
            <p>
              We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">6. Your Legal Rights</h2>
            <p className="mb-3">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:info@atvroatan.com" className="text-[#15531B] font-semibold hover:underline">info@atvroatan.com</a>.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
