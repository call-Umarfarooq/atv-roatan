"use client";
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  // Hide header on admin and meeting-points pages
  if (pathname?.startsWith('/admin') || pathname === '/meeting-points') return null;
  return <Header />;
}
