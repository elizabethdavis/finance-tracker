import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, DollarSign, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const LeftNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <ul className="space-y-2">
        <li>
          <Link
            to="/"
            className={`flex items-center space-x-2 p-2 rounded-lg ${
              location.pathname === "/" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <Home size={24} />
            <span>Home</span>
          </Link>
        </li>
        
        <li>
          <Link
            to="/expenses"
            className={`flex items-center space-x-2 p-2 rounded-lg ${
              location.pathname === "/expenses" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <DollarSign size={24} />
            <span>Expenses</span>
          </Link>
        </li>
        
        <li>
          <Link
            to="/profile"
            className={`flex items-center space-x-2 p-2 rounded-lg ${
              location.pathname === "/profile" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <User size={24} />
            <span>Profile</span>
          </Link>
        </li>
        
        <li>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 w-full text-left"
          >
            <LogOut size={24} />
            <span>Sign Out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default LeftNavigation;