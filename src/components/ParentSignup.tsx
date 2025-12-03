import { useState } from 'react';
import { useApp } from './AppContext';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { GraduationCap, User, Mail, Lock, CheckCircle2, XCircle, Star, Sparkles, CheckSquare } from 'lucide-react';
import Footer from './Footer';
import PageNav from './PageNav';
import BackButton from './ui/BackButton';

export default function ParentSignup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { signupParent, navigate } = useApp();

  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: '', color: '' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    return { strength, label: labels[strength - 1] || '', color: colors[strength - 1] || 'bg-gray-300' };
  };

  const passwordStrength = getPasswordStrength();
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms and Conditions');
      return;
    }

    const success = signupParent(username, password, email);
    if (!success) {
      setError('Username already exists');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-teal-50 to-orange-50 flex flex-col relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-teal-300 rounded-full opacity-20 animate-pulse"></div>
        <Star className="absolute top-1/4 right-1/3 w-16 h-16 text-purple-300 opacity-30 animate-spin" style={{ animationDuration: '10s' }} />
        <Sparkles className="absolute bottom-1/3 left-1/3 w-12 h-12 text-teal-300 opacity-30 animate-pulse" />
      </div>
      <PageNav/>

      <main className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="max-w-md w-full">
          <div className="mb-6">
            <BackButton onClick={() => navigate('welcome')} label="Back" />
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
            <h1 className="text-center mb-2 text-3xl bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">Join the Bubbles Family!</h1>
            <p className="text-center text-gray-600 mb-8">Create an account to get started</p>
            
            <form onSubmit={handleSignup} className="space-y-5">
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
                    placeholder="Choose a username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 rounded-2xl border-2 border-purple-200 focus:border-purple-500 h-12"
                    placeholder="your.email@example.com"
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
                    placeholder="Create a strong password"
                    required
                  />
                </div>
                {password && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${passwordStrength.color} transition-all`} 
                          style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{passwordStrength.label}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-12 rounded-2xl border-2 border-purple-200 focus:border-purple-500 h-12"
                    placeholder="Confirm your password"
                    required
                  />
                  {confirmPassword && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {passwordsMatch ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-2xl border border-purple-200">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  By signing up, you agree to our <a href="#" className="text-purple-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
                </label>
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
                <span className="block text-center">Create Account & Start Learning!</span>
              </button>

              <div className="text-center">
                <span className="text-gray-700">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => navigate('parent-login')}
                  className="text-purple-600 hover:text-purple-700 transition-colors font-semibold"
                >
                  Login
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