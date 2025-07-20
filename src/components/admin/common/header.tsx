"use client";

import { Bell, Mail, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="py-4 px-6 bg-white shadow-sm">
      <div className="flex items-center justify-end gap-8">
        {/* Notification & Mail Buttons */}
        <div className="flex items-center gap-4">
          <IconButton icon={<Bell className="w-5 h-5 text-gray-600" />} />
          <IconButton icon={<Mail className="w-5 h-5 text-gray-600" />} />
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
          <Image src="/images/members/nghia.png" alt="Jane Cooper" width={40} height={40} className="rounded-full object-cover" />
          <div className="text-left leading-tight">
            <p className="text-sm font-medium text-gray-900">Jane Cooper</p>
            <p className="text-xs text-gray-500">jane234@example.com</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
}
function IconButton({ icon }: { icon: React.ReactNode }) {
  return <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition">{icon}</button>;
}

