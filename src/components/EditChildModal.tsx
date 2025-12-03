import { useState } from 'react';
import { X, User, Lock, CheckCircle } from 'lucide-react';
import { Child } from './AppContext';

interface EditChildModalProps {
  child: Child;
  onClose: () => void;
  onSave: (name: string, username: string, password: string) => void;
}

export default function EditChildModal({ child, onClose, onSave }: EditChildModalProps) {
  const [name, setName] = useState(child.name);
  const [username, setUsername] = useState(child.username);
  const [password, setPassword] = useState(child.password);
  const [confirmPassword, setConfirmPassword] = useState(child.password);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (name.trim() && username.trim() && password.trim()) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      onSave(name, username, password);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 mt-16">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-md w-full p-8 border-2 border-purple-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
            Edit Child Profile
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 transition-all flex items-center justify-center hover:rotate-90 duration-300"
          >
            <X className="w-6 h-6 text-purple-600" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-2xl text-red-600 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700">Child's Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 px-4 py-3 rounded-2xl border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-12"
                placeholder="Enter child's name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 px-4 py-3 rounded-2xl border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-12"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 px-4 py-3 rounded-2xl border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-12"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Confirm Password</label>
            <div className="relative">
              <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 px-4 py-3 rounded-2xl border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-12"
                placeholder="Re-enter password"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl hover:bg-gray-300 transition-all hover:scale-105"
            >
              <span className="block text-center">Cancel</span>
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-teal-500 text-white py-3 rounded-2xl hover:shadow-lg transition-all hover:scale-105"
            >
              <span className="block text-center">Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
