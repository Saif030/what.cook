import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, LogOut, User, ChevronRight, Sparkles } from 'lucide-react';

export default function UserDropdown({user , handleLogout}) {
  return (
    <div className="fixed top-18 right-7 md:right-[18vw] w-56 bg-white rounded-2xl shadow-xl shadow-orange-100/50 border border-orange-100/80 p-2 z-50 overflow-hidden">
      {/* Header accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400" />
      
      {/* User info */}
      <div className="px-3 pt-4 pb-3 mb-1">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
            <p className="text-orange-500 font-bold">{user?.username[0]?.toUpperCase()}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{user?.username}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-orange-100 to-transparent mx-2" />

      {/* Menu items */}
      <div className="p-1.5 space-y-0.5">
        <Link 
          to="/dashboard" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all group"
        >
          <LayoutDashboard className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
          <span>Dashboard</span>
          <ChevronRight className="w-3.5 h-3.5 ml-auto text-gray-300 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-orange-100 to-transparent mx-2 my-1" />

      {/* Logout */}
      <div className="p-1.5">
        <button 
          onClick={() => {handleLogout(); window.location.reload();}}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all group"
        >
          <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-500 transition-colors" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}