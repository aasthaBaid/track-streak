import React from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut, User } from "lucide-react";
interface HeaderProps {
  username?: string;
}
const Header: React.FC<HeaderProps> = ({
  username
}) => {
  const {
    logout
  } = useAuth();
  return <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-indigo-600 rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Streak Tracker</h1>
        </div>
        <div className="flex items-center">
          <div className="hidden md:flex items-center mr-4">
            <User size={18} className="text-gray-500 mr-2" />
            <span className="text-gray-700">{username || "User"}</span>
          </div>
          <button onClick={logout} className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
            <LogOut size={18} className="mr-1" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>;
};
export default Header;