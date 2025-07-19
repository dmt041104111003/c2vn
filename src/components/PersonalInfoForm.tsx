"use client";

import { useState } from "react";

export default function PersonalInfoForm({
  email,
  name: defaultName,
  onSubmit,
  onSkip,
}: {
  email: string;
  name?: string;
  onSubmit: (data: { name: string; dob: string; phone: string; hometown: string; email: string }) => void;
  onSkip?: () => void;
}) {
  const [name, setName] = useState(defaultName || "");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [hometown, setHometown] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !dob || !phone || !hometown) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    onSubmit({ name, dob, phone, hometown, email });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl bg-gray-900 p-8 shadow-2xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Complete Your Profile</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1" htmlFor="name">Full Name</label>
            <input
              id="name"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1" htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="YYYY-MM-DD"
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1" htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1" htmlFor="hometown">Hometown</label>
            <input
              id="hometown"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your hometown"
              value={hometown}
              onChange={e => setHometown(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              className="w-full p-2 rounded bg-gray-800 text-gray-400 border border-gray-700 cursor-not-allowed"
              value={email}
              readOnly
              disabled
            />
          </div>
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          <div className="flex gap-2 mt-2">
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">Save</button>
            {onSkip && (
              <button type="button" onClick={onSkip} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition">Skip</button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
} 