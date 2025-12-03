import { useState } from 'react';
import { useApp, Parent, Child } from './AppContext';
import { User, Mail, Star, Sparkles, GraduationCap } from 'lucide-react';
import BackButton from './ui/BackButton';
import Header from './Header';
import Footer from './Footer';

export default function EditAccount() {
  const { currentUser, userType, navigate, updateParentInfo, updateChildInfo } = useApp();
  
  const isParent = userType === 'parent';
  
  // Redirect children to account info - they can only view, not edit
  if (userType === 'child') {
    navigate('account-info');
    return null;
  }
  
  const user = currentUser as Parent | Child;

  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(!isParent ? (user as Child).name : '');
  const [email, setEmail] = useState(isParent ? (user as Parent).email : '');
  const [success, setSuccess] = useState(false);

  if (!currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isParent) {
      updateParentInfo(username, email);
    } else {
      updateChildInfo(name, username);
    }
    
    setSuccess(true);
    setTimeout(() => {
      navigate('account-info');
    }, 1500);
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

      <header className="bg-white shadow-lg sticky top-0 z-[1000] border-b-2 border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('parent-home')}>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <h3 className="bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent text-2xl">
                Bubbles
              </h3>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="max-w-md w-full">
          <div className="mb-6">
            <BackButton onClick={() => navigate('account-info')} label="Back to Account Info" />
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
            <h1 className="text-center mb-2 text-3xl bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
              Edit Account
            </h1>
            <p className="text-center text-gray-600 mb-8">Update your account information</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isParent && (
                <div className="space-y-2">
                  <label className="block text-gray-700">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 px-4 py-3 rounded-2xl border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-12 bg-gray-50"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-gray-700">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 px-4 py-3 rounded-2xl border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-12 bg-gray-50"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {isParent && (
                <div className="space-y-2">
                  <label className="block text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 px-4 py-3 rounded-2xl border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-12 bg-gray-50"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-3 text-green-700 text-center">
                  Account updated successfully!
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-teal-500 text-white py-3 rounded-2xl hover:shadow-lg transition-all hover:scale-105"
              >
                <span className="block text-center">Save Changes</span>
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}