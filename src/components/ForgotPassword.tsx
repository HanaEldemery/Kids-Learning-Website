import { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from './AppContext';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import PageNav from './PageNav';
import Footer from './Footer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { navigate } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Check your email for reset instructions!');
    setTimeout(() => navigate('parent-login'), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-teal-50 to-orange-50 flex flex-col">
      <PageNav />

      <main className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
            <h1 className="text-center mb-2 text-4xl bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
              Reset Password
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Enter your email address and we'll send you instructions to reset your password
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 rounded-2xl border-2 border-purple-200 focus:border-purple-500 h-12 bg-gray-200"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-teal-500 text-white py-3 rounded-2xl hover:shadow-lg transition-all hover:scale-105"
              >
                Send Reset Link
              </button>

              <button
                type="button"
                onClick={() => navigate('parent-login')}
                className="w-full flex items-center justify-center gap-2 bg-purple-50 text-purple-700 px-6 py-3 rounded-xl border border-purple-600 hover:bg-purple-100 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Login</span>
              </button>
            </form>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
