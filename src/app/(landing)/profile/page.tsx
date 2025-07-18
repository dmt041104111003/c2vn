"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Title from "~/components/title";
import WalletSidebar from "~/components/profile/WalletSidebar";
import ProfileForm from "~/components/profile/ProfileForm";
import ProfileDisplay from "~/components/profile/ProfileDisplay";
import ProfileSidebar from "~/components/profile/ProfileSidebar";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [info, setInfo] = useState<null | {
    id: string;
    name: string;
    dob: string;
    phone: string;
    hometown: string;
  }>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.email) return;
      
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const { profile } = await response.json();
          setInfo(profile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  const handleSave = (updatedInfo: any) => {
    setInfo(updatedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!session) {
    return (
      <main className="relative pt-20">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
            <p className="text-gray-300">You need to sign in to view this page.</p>
          </div>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="relative pt-20">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Loading Profile...</h1>
            <p className="text-gray-300">Please wait while we fetch your information.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative pt-20">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        {/* Title */}
        <Title
          title="Profile"
          description="Manage your personal information and account settings"
        />

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Wallet */}
          <WalletSidebar />

          {/* Main Content */}
          <div className="lg:col-span-6">
            <div className="bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm p-6">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {info?.name || session.user?.name || "User"}
                </h2>
                <p className="text-gray-300 text-sm">{session.user?.email}</p>
              </div>

              {/* Profile Information */}
              <div className="space-y-4">
                {isEditing ? (
                  <ProfileForm 
                    info={info} 
                    onSave={handleSave} 
                    onCancel={handleCancel} 
                  />
                ) : (
                  <ProfileDisplay 
                    info={info} 
                    onEdit={handleEdit} 
                  />
                )}
              </div>
            </div>
          </div>

          <ProfileSidebar />
        </div>
      </div>
    </main>
  );
} 