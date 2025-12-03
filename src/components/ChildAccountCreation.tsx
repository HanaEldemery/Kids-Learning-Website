import { useState } from 'react';
import { useApp } from './AppContext';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { GraduationCap, User, Lock, CheckCircle, Star, Sparkles } from 'lucide-react';
import BackButton from './ui/BackButton';
import Footer from './Footer';
import Header from "./Header";

export default function ChildAccountCreation() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { createChild, navigate } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const success = createChild(name, username, password);
    if (!success) {
      setError('Failed to create child account');
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

      <Header />

      <main className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="max-w-md w-full">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
            <h1 className="text-center mb-2 text-3xl bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
              Add Child Account
            </h1>
            <p className="text-center text-gray-600 mb-8">Create a learning account for your child</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Child's Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-12 rounded-2xl border-2 border-purple-200 focus:border-purple-500 h-12"
                    placeholder="Enter child's name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700">Child's Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-12 rounded-2xl border-2 border-purple-200 focus:border-purple-500 h-12"
                    placeholder="Choose a username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Child's Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 rounded-2xl border-2 border-purple-200 focus:border-purple-500 h-12"
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">Re-enter Password</Label>
                <div className="relative">
                  <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-12 rounded-2xl border-2 border-purple-200 focus:border-purple-500 h-12"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-3 text-red-600 text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-teal-500 text-white py-3 rounded-2xl hover:shadow-lg transition-all hover:scale-105"
              >
                <span className="block text-center">Create Account</span>
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
