import {
  Bell,
  BookOpen,
  LayoutDashboard,
  MessageSquare,
  UserCircle,
  Users,
} from "lucide-react";

export const navLinks = [
  { href: "/dashboard", label: "Home", Icon: LayoutDashboard },
  { href: "/curriculum", label: "Curriculum", Icon: BookOpen },
  { href: "/feed", label: "Discover", Icon: Users },
  { href: "/chat", label: "Chat", Icon: MessageSquare },
  { href: "/settings/profile", label: "Profile", Icon: UserCircle },
  { href: "/notifications", label: "Alerts", Icon: Bell },
];
