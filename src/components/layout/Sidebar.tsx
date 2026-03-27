"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-[#E2E8F0] flex-shrink-0 flex flex-col h-screen sticky top-0">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Inflio</h1>
        <p className="text-xs text-[#64748B] mt-1">Find creators before they blow up.</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {[
          { name: "Discover", href: "/discover" },
          { name: "Search", href: "/" },
          { name: "Saved", href: "/saved" },
        ].map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                active
                  ? "bg-[#F8FAFC] text-[#4F46E5]"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
        {/* Disabled Item */}
        <div className="flex items-center px-3 py-2.5 text-sm font-medium text-[#cbd5e1] cursor-not-allowed">
          Analytics <span className="ml-auto text-[10px] bg-[#f1f5f9] px-1.5 py-0.5 rounded text-[#94a3b8]">Soon</span>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[#E2E8F0]">
        <button className="w-full mb-4 bg-white border border-[#E2E8F0] shadow-sm text-[#0F172A] py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#F8FAFC] transition-colors">
          Upgrade to Pro
        </button>
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#818cf8] flex-shrink-0" />
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-[#0F172A] truncate">Sarah Jenkins</p>
            <p className="text-xs text-[#64748B] truncate">sarah@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
