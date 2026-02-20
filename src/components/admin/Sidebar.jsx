
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Compass, Settings, LogOut, Package, ClipboardList } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { name: 'Tours', icon: Compass, href: '/admin/tours/new' },
    { name: 'Activities', icon: Package, href: '/admin/activities' },
    { name: 'Categories', icon: Package, href: '/admin/categories' },
    { name: 'Bookings', icon: ClipboardList, href: '/admin/bookings' },
    // { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-40">
      <div className="p-6 flex items-center gap-2 border-b border-gray-100">
        <div className="w-8 h-8 bg-[#15531B] rounded-lg flex items-center justify-center">
            <Compass className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold text-[#1a1a1a]">Admin CMS</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-[#15531B]/10 text-[#15531B] font-semibold' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#1a1a1a]'
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-colors">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
