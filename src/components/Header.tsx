import { useState, useRef, useEffect } from 'react';
import { Home, LogOut, Settings, Eye, GraduationCap } from 'lucide-react';
import { useApp, Child } from './AppContext';

export default function Header() {
  const { currentUser, userType, navigate, logout } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) return null;

  const getInitials = () => {
    if (userType === 'parent') {
      return currentUser.username.substring(0, 2).toUpperCase();
    } else {
      return (currentUser as any).name?.substring(0, 2).toUpperCase() || 'U';
    }
  };

  const handleHome = () => {
    if (userType === 'parent') {
      navigate('parent-home');
    } else {
      navigate('topic-selection');
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-[1000] border-b-2 border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg animate-pulse">
                <GraduationCap className="w-7 h-7 text-white" onClick={handleHome}/>
              </div>
              <button 
                onClick={handleHome}
                className="bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent text-2xl font-bold"
              >
                Bubbles
              </button>
            </div>
            <nav className="hidden md:flex gap-6">
              <button
                onClick={handleHome}
                className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-all hover:scale-105"
              >
                <Home className="w-5 h-5" />
                Home
              </button>
              {userType === 'child' && (
                <button
                  onClick={() => navigate('performance')}
                  className="text-gray-700 hover:text-purple-600 transition-all hover:scale-105"
                >
                  My Progress
                </button>
              )}
            </nav>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 hover:opacity-80 transition-all hover:scale-105"
            >
              <span className="hidden md:block text-gray-700 font-medium">
                {userType === 'parent' ? currentUser.username : (currentUser as any).name}
              </span>
              {userType === 'child' && (currentUser as Child).avatar ? (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-1 shadow-lg border-2 border-white">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl">
                    {(currentUser as Child).avatar}
                  </div>
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center text-white shadow-lg border-2 border-white">
                  {getInitials()}
                </div>
              )}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border-2 border-purple-100 py-2 overflow-hidden">
                <button
                  onClick={() => {
                    navigate('account-info');
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-purple-50 transition-colors"
                >
                  <Eye className="w-5 h-5 text-purple-600" />
                  <span>View Account</span>
                </button>
                {userType === 'parent' && (
                  <button
                    onClick={() => {
                      navigate('edit-account');
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-purple-50 transition-colors"
                  >
                    <Settings className="w-5 h-5 text-purple-600" />
                    <span>Edit Account</span>
                  </button>
                )}
                <hr className="my-2 border-purple-100" />
                <button
                  onClick={() => {
                    logout();
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-red-50 text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}