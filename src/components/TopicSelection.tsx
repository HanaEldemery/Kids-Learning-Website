import { BookOpen, Calculator, FlaskConical, Sparkles, Trophy, Star, Zap, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from './AppContext';
import Header from './Header';
import Footer from './Footer';
import ChildBackground from './ChildBackground';

const topics = [
  { 
    id: 'english', 
    name: 'English', 
    icon: BookOpen, 
    gradient: 'from-purple-500 via-purple-600 to-purple-700',
    hoverGradient: 'hover:from-purple-600 hover:via-purple-700 hover:to-purple-800',
    shadowColor: 'shadow-purple-500/50',
    description: 'Read, write & spell!'
  },
  { 
    id: 'maths', 
    name: 'Maths', 
    icon: Calculator, 
    gradient: 'from-teal-500 via-teal-600 to-teal-700',
    hoverGradient: 'hover:from-teal-600 hover:via-teal-700 hover:to-teal-800',
    shadowColor: 'shadow-teal-500/50',
    description: 'Count & calculate!'
  },
  { 
    id: 'science', 
    name: 'Science', 
    icon: FlaskConical, 
    gradient: 'from-orange-500 via-orange-600 to-orange-700',
    hoverGradient: 'hover:from-orange-600 hover:via-orange-700 hover:to-orange-800',
    shadowColor: 'shadow-orange-500/50',
    description: 'Explore & discover!'
  },
  { 
    id: 'mix', 
    name: 'Mix', 
    icon: Sparkles, 
    gradient: 'from-green-500 via-green-600 to-green-700',
    hoverGradient: 'hover:from-green-600 hover:via-green-700 hover:to-green-800',
    shadowColor: 'shadow-green-500/50',
    description: 'All subjects together!'
  }
];

const achievements = [
  { icon: Trophy, label: '5 Streak', color: 'text-amber-500' },
  { icon: Star, label: 'Top Scorer', color: 'text-purple-500' },
  { icon: Zap, label: 'Quick Learner', color: 'text-teal-500' }
];

export default function TopicSelection() {
  const { navigate, currentUser } = useApp();

  return (
    <ChildBackground>
      <div className="min-h-screen flex flex-col">
        <Header />

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Animated Header with Encouraging Message */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Target className="w-16 h-16 text-purple-600 mx-auto" />
              </motion.div>
            </div>
            <h1 className="text-5xl mb-4 bg-gradient-to-r from-purple-600 via-teal-600 to-orange-600 bg-clip-text text-transparent">
              Choose Your Adventure!
            </h1>
            <p className="text-xl text-gray-700 mb-2">
              {currentUser?.username ? `Hi ${currentUser.username}!` : 'Welcome!'} Pick a subject to start learning
            </p>
            <p className="text-gray-600">Every question makes you smarter! 🌟</p>
          </motion.div>

          {/* Achievement Badges Row */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center gap-4 mb-12 flex-wrap"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl px-6 py-3 shadow-lg border-2 border-purple-100 flex items-center gap-3 hover:scale-105 transition-transform"
              >
                <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                <span className="text-gray-700">{achievement.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Subject Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
            {topics.map((topic, index) => (
              <motion.button
                key={topic.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 0.6 + index * 0.1,
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('quiz', { topic: topic.id })}
                className="group relative"
              >
                {/* Animated Background Glow */}
                <motion.div
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} rounded-3xl blur-xl opacity-50`}
                />

                {/* Main Button */}
                <div className={`relative bg-gradient-to-br ${topic.gradient} ${topic.hoverGradient} rounded-3xl shadow-2xl ${topic.shadowColor} hover:shadow-3xl transition-all duration-300 overflow-hidden`}>
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                  
                  {/* Content */}
                  <div className="relative p-8 flex flex-col items-center gap-4">
                    {/* Icon Container */}
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                      className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 shadow-lg"
                    >
                      <topic.icon className="w-16 h-16 text-white drop-shadow-lg" />
                    </motion.div>

                    {/* Text */}
                    <div className="text-center">
                      <h3 className="text-3xl text-white mb-1">{topic.name}</h3>
                      <p className="text-white/90 text-sm">{topic.description}</p>
                    </div>

                    {/* Hover indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2"
                    >
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-white text-sm">Click to start! →</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Motivational Footer Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-8 border-2 border-purple-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-3">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-gray-800 mb-1">Earn Rewards</h4>
                <p className="text-gray-600 text-sm">Complete exercises to unlock badges and achievements!</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-3">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-gray-800 mb-1">Track Progress</h4>
                <p className="text-gray-600 text-sm">Watch your scores improve as you practice more!</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-3">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-gray-800 mb-1">Have Fun</h4>
                <p className="text-gray-600 text-sm">Learning is an adventure - enjoy every moment!</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

        <Footer />
      </div>
    </ChildBackground>
  );
}
