"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Title from "~/components/title";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [info, setInfo] = useState<null | {
    name: string;
    dob: string;
    phone: string;
    hometown: string;
    email: string;
  }>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    dob: "",
    phone: "",
    hometown: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("personal_info");
    if (data) {
      const parsedData = JSON.parse(data);
      setInfo(parsedData);
      setEditForm({
        name: parsedData.name || "",
        dob: parsedData.dob || "",
        phone: parsedData.phone || "",
        hometown: parsedData.hometown || "",
      });
    }
  }, []);

  const handleSave = () => {
    if (!editForm.name || !editForm.dob || !editForm.phone || !editForm.hometown) {
      setError("Please fill in all required fields.");
      return;
    }
    
    const updatedInfo = {
      ...info,
      ...editForm,
      email: session?.user?.email || "",
    };
    
    localStorage.setItem("personal_info", JSON.stringify(updatedInfo));
    setInfo(updatedInfo);
    setIsEditing(false);
    setError("");
  };

  const handleCancel = () => {
    setEditForm({
      name: info?.name || "",
      dob: info?.dob || "",
      phone: info?.phone || "",
      hometown: info?.hometown || "",
    });
    setIsEditing(false);
    setError("");
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
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm p-6">
              <h3 className="text-lg font-bold text-white mb-4">Wallet</h3>
              <div className="space-y-4">
                <div className="text-sm text-gray-300">
                  <div className="font-medium text-white mb-1">Address:</div>
                  <div className="text-xs text-gray-400 break-all font-mono">0x1234567890abcdef1234567890abcdef12345678</div>
                </div>
                <div className="text-sm text-gray-300">
                  <div className="font-medium text-white mb-1">Balance:</div>
                  <div className="text-lg font-bold text-green-400">1,250.50 ADA</div>
                </div>
              </div>
            </div>
          </div>

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
                  // Edit Form
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="edit-name">
                          Full Name *
                        </label>
                        <input
                          id="edit-name"
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="edit-dob">
                          Date of Birth *
                        </label>
                        <input
                          id="edit-dob"
                          type="date"
                          value={editForm.dob}
                          onChange={(e) => setEditForm({...editForm, dob: e.target.value})}
                          className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="edit-phone">
                          Phone Number *
                        </label>
                        <input
                          id="edit-phone"
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                          className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="edit-hometown">
                          Hometown *
                        </label>
                        <input
                          id="edit-hometown"
                          type="text"
                          value={editForm.hometown}
                          onChange={(e) => setEditForm({...editForm, hometown: e.target.value})}
                          className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                          placeholder="Enter your hometown"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="edit-email">
                        Email
                      </label>
                      <input
                        id="edit-email"
                        type="email"
                        value={session.user?.email || ""}
                        className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed backdrop-blur-sm"
                        disabled
                        readOnly
                        title="Email address (cannot be changed)"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    {error && (
                      <div className="text-red-400 text-sm text-center bg-red-400/10 p-3 rounded-lg backdrop-blur-sm">
                        {error}
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 backdrop-blur-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Display Mode
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10 backdrop-blur-sm">
                        <div className="text-xs text-gray-400 mb-1">Full Name</div>
                        <div className="text-white font-medium text-sm">
                          {info?.name || session.user?.name || "Not provided"}
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-lg p-3 border border-white/10 backdrop-blur-sm">
                        <div className="text-xs text-gray-400 mb-1">Date of Birth</div>
                        <div className="text-white font-medium text-sm">
                          {info?.dob || "Not provided"}
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-lg p-3 border border-white/10 backdrop-blur-sm">
                        <div className="text-xs text-gray-400 mb-1">Phone Number</div>
                        <div className="text-white font-medium text-sm">
                          {info?.phone || "Not provided"}
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-lg p-3 border border-white/10 backdrop-blur-sm">
                        <div className="text-xs text-gray-400 mb-1">Hometown</div>
                        <div className="text-white font-medium text-sm">
                          {info?.hometown || "Not provided"}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3 border border-white/10 backdrop-blur-sm">
                      <div className="text-xs text-gray-400 mb-1">Email</div>
                      <div className="text-white font-medium text-sm">
                        {session.user?.email}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm p-6">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                {session.user?.image ? (
                  <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full border-2 border-white/20 shadow-lg mx-auto mb-3"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white/20 shadow-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">
                      {session.user?.name?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
              </div>



              {/* Bottom Section - Course Statistics */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <h4 className="text-sm font-medium text-white mb-3">Course Statistics</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Courses Joined:</span>
                    <span className="text-sm font-bold text-blue-400">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Courses Completed:</span>
                    <span className="text-sm font-bold text-green-400">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">NFT Certificates:</span>
                    <span className="text-sm font-bold text-purple-400">5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 