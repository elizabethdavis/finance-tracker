import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, DollarSign, User, PlusCircle } from 'lucide-react';

const BottomTabBar: React.FC = () => {
  const location = useLocation();

  const getTabStyle = (path: string) => {
    return `flex flex-col items-center p-2 ${
      location.pathname === path
        ? 'text-blue-500'
        : 'text-gray-600 hover:text-blue-500'
    }`;
  };

  return (
    <nav className="bottom-nav bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center">
          <Link to="/" className={getTabStyle('/')}>
            <HomeIcon size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/add-expense" className={getTabStyle('/add-expense')}>
            <PlusCircle size={24} />
            <span className="text-xs mt-1">Add Expense</span>
          </Link>
          <Link to="/expenses" className={getTabStyle('/expenses')}>
            <DollarSign size={24} />
            <span className="text-xs mt-1">Expenses</span>
          </Link>
          <Link to="/profile" className={getTabStyle('/profile')}>
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default BottomTabBar;