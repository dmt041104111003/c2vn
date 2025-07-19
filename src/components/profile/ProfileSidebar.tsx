"use client";

import { useSession } from "next-auth/react";
import { courseStats } from "~/constants/profile";

export default function ProfileSidebar() {
  const { data: session } = useSession();

  return (
    <div className="lg:col-span-3">
      <div className="bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm p-6">
        <div className="text-center mb-6">
          {session?.user?.image ? (
            <img 
              src={session.user.image} 
              alt="Profile" 
              className="w-20 h-20 rounded-full border-2 border-white/20 shadow-lg mx-auto mb-3"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white/20 shadow-lg mx-auto mb-3 flex items-center justify-center">
              <span className="text-xl font-bold text-white">
                {session?.user?.name?.charAt(0) || "U"}
              </span>
            </div>
          )}
        </div>
        <div className="mt-6 pt-4 border-t border-white/10">
          <h4 className="text-sm font-medium text-white mb-3">Course Statistics</h4>
          <div className="space-y-3">
            {courseStats.map((stat) => (
              <div key={stat.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{stat.label}:</span>
                <span className={`text-sm font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 