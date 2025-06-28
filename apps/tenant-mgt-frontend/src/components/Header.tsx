import React from "react";
import { Bell, LogOut, Menu } from "lucide-react";

interface HeaderProps {
  pageTitle: string;
  onLogout: () => void;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ pageTitle, onLogout, toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between bg-blue-600 p-4 text-white">
      <div className="flex items-center gap-3">
        <button className="text-white" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-md hover:bg-blue-700">
          <Bell size={13} />
        </button>
        <button className="p-2 rounded-md hover:bg-red-600" onClick={onLogout}>
          <LogOut  size={13}  />
        </button>
      </div>
    </header>
  );
};

export default Header;
