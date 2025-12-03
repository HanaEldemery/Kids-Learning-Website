import { User, Mail, Trophy, Target, Flame, Star, Crown, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp, Parent, Child } from './AppContext';
import BackButton from './ui/BackButton';
import Header from './Header';
import Footer from './Footer';
import ChildBackground from './ChildBackground';

// Avatar options for children
const avatarOptions = [
  { id: 1, emoji: '😀', name: 'Happy' },
  { id: 2, emoji: '😎', name: 'Cool' },
  { id: 3, emoji: '🤓', name: 'Smart' },
  { id: 4, emoji: '🦸', name: 'Hero' },
  { id: 5, emoji: '🦄', name: 'Unicorn' },
  { id: 6, emoji: '🐶', name: 'Puppy' },
  { id: 7, emoji: '🐱', name: 'Kitty' },
  { id: 8, emoji: '🦊', name: 'Fox' },
  { id: 9, emoji: '🐼', name: 'Panda' },
  { id: 10, emoji: '🐨', name: 'Koala' },
  { id: 11, emoji: '🦁', name: 'Lion' },
  { id: 12, emoji: '🐯', name: 'Tiger' },
  { id: 13, emoji: '🦋', name: 'Butterfly' },
  { id: 14, emoji: '🌟', name: 'Star' },
  { id: 15, emoji: '🌈', name: 'Rainbow' },
  { id: 16, emoji: '🎨', name: 'Artist' },
  { id: 17, emoji: '🎵', name: 'Music' },
  { id: 18, emoji: '⚽', name: 'Soccer' },
  { id: 19, emoji: '🎮', name: 'Gamer' },
  { id: 20, emoji: '🚀', name: 'Rocket' },
];

export default function AccountInfo() {
  const { currentUser, userType, navigate, updateChildAvatar } = useApp();
  const child = userType === 'child' ? currentUser as Child : null;
  const [selectedAvatar, setSelectedAvatar] = useState(
    child?.avatar ? avatarOptions.find(a => a.emoji === child.avatar) || avatarOptions[0] : avatarOptions[0]
  );
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  if (!currentUser) return null;

  const isParent = userType === 'parent';
  const user = currentUser as Parent | Child;
  
  const handleAvatarChange = (avatar: typeof avatarOptions[0]) => {
    setSelectedAvatar(avatar);
    updateChildAvatar(avatar.emoji);
    setShowAvatarPicker(false);
  };

  // Parent View (Professional)
  if (isParent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
        <Header />

        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <BackButton onClick={() => navigate('parent-home')} label="Back to Home" />
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-purple-100">
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center text-white shadow-lg">
                  <span className="text-3xl">
                    {user.username.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <h1 className="mb-2">Account Information</h1>
                <p className="text-gray-600">Parent Account</p>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-purple-600" />
                    <p className="text-gray-600">Username</p>
                  </div>
                  <p className="text-xl ml-8 text-gray-800">{user.username}</p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border-2 border-teal-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-teal-600" />
                    <p className="text-gray-600">Email</p>
                  </div>
                  <p className="text-xl ml-8 text-gray-800">{(user as Parent).email}</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-orange-600" />
                    <p className="text-gray-600">Children</p>
                  </div>
                  <p className="text-xl ml-8 text-gray-800">
                    {(user as Parent).children.length} child{(user as Parent).children.length !== 1 ? 'ren' : ''}
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('edit-account')}
                  className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all"
                >
                  <span>Edit Account Information</span>
                </motion.button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Child View (Fun and Playful)
  const childUser = user as Child;
  const totalPoints = (childUser.correctCount * 10) + (childUser.correctWithinTimerCount * 5);

  // Mock badges
  const earnedBadges = [
    { name: 'First Steps', icon: '🥉', earned: true },
    { name: 'Math Whiz', icon: '🥈', earned: childUser.correctCount >= 3 },
    { name: 'Fast Learner', icon: '🥇', earned: childUser.correctWithinTimerCount >= 2 },
    { name: 'Super Star', icon: '⭐', earned: false },
    { name: 'Champion', icon: '🏆', earned: false },
  ];

  return (
    <ChildBackground>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
              <BackButton onClick={() => navigate('topic-selection')} label="Back to Topics" />
            </div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-5xl mb-2 bg-gradient-to-r from-purple-600 via-teal-600 to-orange-600 bg-clip-text text-transparent">
                My Profile
              </h1>
              <p className="text-xl text-gray-700">Your amazing learning journey! 🌟</p>
            </motion.div>

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-2xl p-8 mb-6 border-4 border-purple-200 relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-200 rounded-full opacity-30 -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-200 rounded-full opacity-30 -ml-16 -mb-16"></div>

              <div className="relative z-10">
                {/* Avatar Section */}
                <div className="text-center mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-2 shadow-xl cursor-pointer"
                    onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  >
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-6xl">
                      {selectedAvatar.emoji}
                    </div>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                    className="bg-purple-600 text-white px-6 py-2 rounded-2xl hover:bg-purple-700 transition-all shadow-lg"
                  >
                    Change Avatar
                  </motion.button>
                </div>

                {/* Avatar Picker */}
                {showAvatarPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 mb-8 border-2 border-purple-300"
                  >
                    <h3 className="text-2xl text-center mb-4 text-purple-800">Choose Your Avatar</h3>
                    <div className="grid grid-cols-5 gap-4">
                      {avatarOptions.map((avatar) => (
                        <motion.button
                          key={avatar.id}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAvatarChange(avatar)}
                          className={`w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-lg hover:shadow-xl transition-all ${
                            selectedAvatar.id === avatar.id ? 'ring-4 ring-purple-600' : ''
                          }`}
                        >
                          {avatar.emoji}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Name and Username */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-6 h-6 text-purple-600" />
                      <p className="text-gray-600">Your Name</p>
                    </div>
                    <p className="text-2xl text-gray-800">{childUser.name}</p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border-2 border-teal-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Crown className="w-6 h-6 text-teal-600" />
                      <p className="text-gray-600">Username</p>
                    </div>
                    <p className="text-2xl text-gray-800">{childUser.username}</p>
                    <p className="text-sm text-gray-500 mt-1">Ask parent to change</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* My Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <h2 className="text-3xl mb-4 text-gray-800">My Stats</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Points */}
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-6 shadow-xl text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <Trophy className="w-8 h-8" />
                    <h3 className="text-white">Total Points</h3>
                  </div>
                  <p className="text-5xl mb-2">{totalPoints}</p>
                  <p className="text-yellow-100">Keep earning! 🎯</p>
                </div>

                {/* Learning Streak */}
                <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl p-6 shadow-xl text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <Flame className="w-8 h-8" />
                    <h3 className="text-white">Streak</h3>
                  </div>
                  <p className="text-5xl mb-2">12</p>
                  <p className="text-orange-100">Days in a row! 🔥</p>
                </div>

                {/* Favorite Subject */}
                <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-3xl p-6 shadow-xl text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="w-8 h-8" />
                    <h3 className="text-white">Favorite</h3>
                  </div>
                  <p className="text-3xl mb-2">📚 English</p>
                  <p className="text-purple-100">You're great! ⭐</p>
                </div>

                {/* Total Time */}
                <div className="bg-gradient-to-br from-teal-400 to-teal-500 rounded-3xl p-6 shadow-xl text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-8 h-8" />
                    <h3 className="text-white">Time Learning</h3>
                  </div>
                  <p className="text-5xl mb-2">2h</p>
                  <p className="text-teal-100">This week! ⏰</p>
                </div>
              </div>
            </motion.div>

            {/* My Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h2 className="text-3xl mb-4 text-gray-800">My Badges</h2>
              
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {earnedBadges.map((badge, index) => (
                    <motion.div
                      key={badge.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: badge.earned ? 1.1 : 1 }}
                      className={`rounded-2xl p-6 text-center shadow-lg ${
                        badge.earned 
                          ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' 
                          : 'bg-gray-200 grayscale'
                      }`}
                    >
                      <div className="text-5xl mb-2">{badge.icon}</div>
                      <h4 className={`text-sm ${badge.earned ? 'text-white' : 'text-gray-500'}`}>
                        {badge.name}
                      </h4>
                      {!badge.earned && <p className="text-xs text-gray-400 mt-1">Keep learning!</p>}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Preferences */}
            {/* Removed for child users */}

            {/* Safety Features */}
            {/* Removed for child users */}
          </div>
        </main>

        <Footer />
      </div>
    </ChildBackground>
  );
}