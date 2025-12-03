import { useState } from 'react';
import { useApp } from './AppContext';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { GraduationCap, User, Lock, Info, Star, Sparkles } from 'lucide-react';
import Footer from './Footer';
import PageNav from './PageNav';
import BackButton from './ui/BackButton';

export default function ParentLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, navigate } = useApp();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password, 'parent');
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-teal-50 to-orange-50 flex flex-col relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-teal-300 rounded-full opacity-20 animate-pulse"></div>
        <Star className="absolute top-1/4 right-1/3 w-16 h-16 text-purple-300 opacity-30 animate-spin" style={{ animationDuration: '10s' }} />
        <Sparkles className="absolute bottom-1/3 left-1/3 w-12 h-12 text-teal-300 opacity-30 animate-pulse" />
      </div>

      <PageNav/>

      <main className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="max-w-md w-full">
          {/* Back Button */}
          <div className="mb-6">
            <BackButton onClick={() => navigate('welcome')} label="Back" />
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
            <h1 className="text-center mb-2 text-3xl bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">Welcome Back, Parent!</h1>
            <p className="text-center text-gray-600 mb-8">Track and support your child's learning journey</p>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-12 rounded-2xl border-2 border-purple-200 focus:border-purple-500 h-12"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 rounded-2xl border-2 border-purple-200 focus:border-purple-500 h-12"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="text-right">
                  <button 
                    type="button" 
                    onClick={() => navigate('forgot-password')}
                    className="text-sm text-purple-600 hover:text-purple-700 underline hover:no-underline transition-all"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-3 text-red-600 text-center">
                  {error}
                </div>
              )}

              {/* Demo Credentials */}
              <div className="bg-gradient-to-r from-purple-50 to-teal-50 border-2 border-purple-200 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700 mb-2">Demo Credentials:</p>
                    <p className="text-sm"><span className="font-semibold text-purple-600">Username:</span> sarah</p>
                    <p className="text-sm"><span className="font-semibold text-purple-600">Password:</span> password</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-teal-500 text-white py-3 rounded-2xl hover:shadow-lg transition-all hover:scale-105"
              >
                <span className="block text-center">Login</span>
              </button>

              <div className="text-center">
                <span className="text-gray-700">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => navigate('parent-signup')}
                  className="text-purple-600 hover:text-purple-700 transition-colors font-semibold"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}