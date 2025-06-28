import React from "react";
import { ChevronRight, ChevronDown, Menu } from "lucide-react";
import sidebarRoutes from "./sidebarRoutes";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside className={`h-screen transition-all duration-300  bg-gray-900 text-white flex flex-col`}>
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <span className="text-xl font-bold">{isOpen ? "My Logo" : "ML"}</span>
      </div>

      <nav className="flex flex-col flex-grow">
        {sidebarRoutes.map((route) => (
          <button key={route.title} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition">
            <route.icon size={20} />
            {isOpen && <span>{route.title}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
