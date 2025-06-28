import { Home, Settings, Users, FileText, Bell } from "lucide-react";

interface SidebarRoute {
  title: string;
  icon: React.ElementType;
  children?: SidebarRoute[];
}
const sidebarRoutes: SidebarRoute[] = [
  {
    title: "Dashboard",
    icon: Home,
  },
  {
    title: "Users",
    icon: Users,
    children: [
      { title: "All Users", icon: FileText },
      { title: "Add User", icon: Bell },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

export default sidebarRoutes;
