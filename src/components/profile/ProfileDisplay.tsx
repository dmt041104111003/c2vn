import { useSession } from "next-auth/react";
import { profileFields } from "~/constants/profile";

interface ProfileDisplayProps {
  info: Record<string, string> | null;
  onEdit: () => void;
}

export default function ProfileDisplay({ info, onEdit }: ProfileDisplayProps) {
  const { data: session } = useSession();

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {profileFields.slice(0, 4).map((field) => (
          <div key={field.id} className="bg-white/5 rounded-lg p-3 border border-white/10 backdrop-blur-sm">
            <div className="text-xs text-gray-400 mb-1">{field.label}</div>
            <div className="text-white font-medium text-sm">
              {info?.[field.id] || (session?.user as any)?.[field.id] || "Not provided"}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 rounded-lg p-3 border border-white/10 backdrop-blur-sm">
        <div className="text-xs text-gray-400 mb-1">Email</div>
        <div className="text-white font-medium text-sm">
          {session?.user?.email}
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={onEdit}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
} 