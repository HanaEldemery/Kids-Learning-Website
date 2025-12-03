import { GraduationCap } from 'lucide-react';
import { useApp } from './AppContext';

interface PageNavProps {
  currentPage?: 'home' | 'about' | 'contact' | 'privacy' | 'terms';
}

export default function PageNav({ currentPage = 'home' }: PageNavProps) {
  const { navigate } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', screen: 'welcome' as const },
    { id: 'about', label: 'About Us', screen: 'about' as const },
    { id: 'contact', label: 'Contact Us', screen: 'contact' as const },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-[1000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button 
            onClick={() => navigate('welcome')}
            className="flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
              <button 
                onClick={() => navigate('welcome')}
                className="bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent text-2xl font-bold"
              >
                Bubbles
              </button>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.screen)}
                className={`transition-colors ${
                  currentPage === item.id
                    ? 'text-purple-700'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="relative group">
              <button className="text-gray-600 hover:text-purple-600 transition-colors">
                Sign In
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button
                  onClick={() => navigate('parent-login')}
                  className="block w-full text-left px-4 py-3 hover:bg-purple-50 rounded-t-xl transition-colors"
                >
                  Parent Login
                </button>
                <button
                  onClick={() => navigate('child-login')}
                  className="block w-full text-left px-4 py-3 hover:bg-purple-50 rounded-b-xl transition-colors"
                >
                  Child Login
                </button>
              </div>
            </div>

            <button
              onClick={() => navigate('parent-signup')}
              className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all"
            >
              Sign Up
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600 hover:text-purple-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
