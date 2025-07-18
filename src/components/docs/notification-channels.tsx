import { Mail, MessageSquare, Phone } from "lucide-react";

interface NotificationChannel {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  color: string;
}

const channels: NotificationChannel[] = [
  {
    icon: Mail,
    title: "Email",
    color: "text-blue-600",
  },
  {
    icon: MessageSquare,
    title: "Slack",
    color: "text-purple-600",
  },
  {
    icon: Phone,
    title: "SMS",
    color: "text-green-600",
  },
];

export default function NotificationChannels() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {channels.map((channel, index) => (
        <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <div className={`w-8 h-8 flex items-center justify-center ${channel.color}`}>
            <channel.icon className="h-5 w-5" />
          </div>
          <span className="font-medium text-gray-900">{channel.title}</span>
        </div>
      ))}
    </div>
  );
} 