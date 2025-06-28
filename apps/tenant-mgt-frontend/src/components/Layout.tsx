import React,{useState} from 'react'
import Sidebar from './sidebar/Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  return (
    <div className="flex h-screen">
      {/* Sidebar - Show on large screens, toggle on small screens */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? "w-50" : "w-16"} bg-gray-900 text-white`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header pageTitle="Dashboard" onLogout={() => alert("Logged out")} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 p-4 bg-gray-100">
          <h1 className="text-2xl font-bold">Main Content</h1>
        </main>
      </div>
    </div>)
}

export default Layout;
