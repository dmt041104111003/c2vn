"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { profileFields } from "~/constants/profile";

interface ProfileFormProps {
  info: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export default function ProfileForm({ info, onSave, onCancel }: ProfileFormProps) {
  const { data: session } = useSession();
  const [editForm, setEditForm] = useState({
    name: "",
    dob: "",
    phone: "",
    hometown: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEditForm({
      name: info?.name || "",
      dob: info?.dob || "",
      phone: info?.phone || "",
      hometown: info?.hometown || "",
    });
  }, [info]);

  const handleSave = async () => {
    if (!editForm.name || !editForm.dob || !editForm.phone || !editForm.hometown) {
      setError("Please fill in all required fields.");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      const { profile } = await response.json();
      onSave(profile);
    } catch (err) {
      setError("Failed to save profile. Please try again.");
      console.error('Error saving profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditForm({
      name: info?.name || "",
      dob: info?.dob || "",
      phone: info?.phone || "",
      hometown: info?.hometown || "",
    });
    onCancel();
    setError("");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profileFields.slice(0, 4).map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor={`edit-${field.id}`}>
              {field.label} {field.required && "*"}
            </label>
            <input
              id={`edit-${field.id}`}
              type={field.type}
              value={editForm[field.id as keyof typeof editForm] || ""}
              onChange={(e) => setEditForm({...editForm, [field.id]: e.target.value})}
              className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
              placeholder={field.placeholder}
              disabled={isLoading}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="edit-email">
          Email
        </label>
        <input
          id="edit-email"
          type="email"
          value={session?.user?.email || ""}
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
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="flex-1 bg-white/10 hover:bg-white/20 disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 backdrop-blur-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
} 