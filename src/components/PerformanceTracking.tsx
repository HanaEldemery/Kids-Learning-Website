import { motion } from 'motion/react';
import { useApp, Child } from './AppContext';
import { Calculator, BookOpen, Beaker, Trophy, CheckCircle, Clock, Lightbulb, Flame, BookMarked, Star } from 'lucide-react';
import ChildBackground from './ChildBackground';
import BackButton from './ui/BackButton';
import Header from './Header';
import Footer from './Footer';

export default function PerformanceTracking() {
  const { currentUser, navigate } = useApp();
  const child = currentUser as Child;

  const totalQuestions = child.correctCount + child.incorrectCount;
  const correctCount = child.correctCount;
  const onTimeCount = child.correctWithinTimerCount;
  const incorrectCount = child.incorrectCount;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Calculate subject performance
  const mathExercises = child.exerciseHistory.filter(ex => ex.subject === 'Maths');
  const englishExercises = child.exerciseHistory.filter(ex => ex.subject === 'English');
  const scienceExercises = child.exerciseHistory.filter(ex => ex.subject === 'Science');

  const mathAccuracy = mathExercises.length > 0 
    ? Math.round((mathExercises.filter(ex => ex.isCorrect).length / mathExercises.length) * 100) 
    : 0;
  const englishAccuracy = englishExercises.length > 0 
    ? Math.round((englishExercises.filter(ex => ex.isCorrect).length / englishExercises.length) * 100) 
    : 0;
  const scienceAccuracy = scienceExercises.length > 0 
    ? Math.round((scienceExercises.filter(ex => ex.isCorrect).length / scienceExercises.length) * 100) 
    : 0;

  const dayStreak = 12; // Mock data
  const bestSubject = mathAccuracy >= englishAccuracy && mathAccuracy >= scienceAccuracy ? 'Math' :
                      englishAccuracy >= scienceAccuracy ? 'English' : 'Science';

  // Calculate stars based on accuracy
  const stars = accuracy >= 90 ? 5 : accuracy >= 80 ? 4 : accuracy >= 70 ? 3.5 : accuracy >= 60 ? 3 : accuracy >= 50 ? 2.5 : 2;

  return (
    <ChildBackground>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="container max-w-7xl mx-auto px-6 py-8 flex-1">
          {/* Back Button */}
          <div className="mb-6">
            <BackButton onClick={() => navigate('topic-selection')} label="Back to Topics" />
          </div>

          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl mb-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Great Job, {child.name}! 🌟
            </h1>
            <p className="text-xl text-gray-700">Here's how you're doing!</p>
          </motion.div>

          {/* Main Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 mb-8 shadow-xl border-4 border-transparent"
            style={{
              backgroundImage: 'linear-gradient(white, white), linear-gradient(90deg, #7C3AED, #06B6D4, #FB923C, #10B981, #7C3AED)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            {/* Center Circle */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <svg className="w-64 h-64 transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="110"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="16"
                  />
                  <motion.circle
                    cx="128"
                    cy="128"
                    r="110"
                    fill="none"
                    stroke="url(#rainbowGradient)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 691 }}
                    animate={{ strokeDashoffset: 691 - (691 * accuracy / 100) }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{ strokeDasharray: 691 }}
                  />
                  <defs>
                    <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="33%" stopColor="#06B6D4" />
                      <stop offset="66%" stopColor="#FB923C" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-6xl text-purple-600">{accuracy}%</div>
                  <div className="text-gray-600 mt-1">Overall Score</div>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${i < Math.floor(stars) ? 'fill-yellow-400 text-yellow-400' : i < stars ? 'fill-yellow-400 text-yellow-400 opacity-50' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">📚</div>
                <div className="text-3xl text-blue-600 mb-1">{totalQuestions}</div>
                <div className="text-gray-700">Questions Completed</div>
              </div>
              <div className="bg-orange-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">🔥</div>
                <div className="text-3xl text-orange-600 mb-1">{dayStreak}</div>
                <div className="text-gray-700">Day Streak!</div>
              </div>
              <div className="bg-green-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-3xl text-green-600 mb-1">{bestSubject}</div>
                <div className="text-gray-700">Your Best!</div>
              </div>
            </div>
          </motion.div>

          {/* Subject Performance */}
          <h2 className="text-3xl text-gray-800 mb-6">Your Subjects</h2>
          <div className="space-y-4 mb-8">
            {/* Math */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-green-50 rounded-2xl p-6 border-l-4 border-green-500 shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-gray-800 mb-2">Math</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
                    <div
                      className="bg-green-500 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${mathAccuracy}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{mathExercises.length} exercises completed</p>
                </div>
                <div className="text-3xl text-green-600">{mathAccuracy}%</div>
              </div>
            </motion.div>

            {/* English */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500 shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-gray-800 mb-2">English</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
                    <div
                      className="bg-blue-500 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${englishAccuracy}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{englishExercises.length} exercises completed</p>
                </div>
                <div className="text-3xl text-blue-600">{englishAccuracy}%</div>
              </div>
            </motion.div>

            {/* Science */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-purple-50 rounded-2xl p-6 border-l-4 border-purple-500 shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                  <Beaker className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-gray-800 mb-2">Science</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
                    <div
                      className="bg-purple-500 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${scienceAccuracy}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{scienceExercises.length} exercises completed</p>
                </div>
                <div className="text-3xl text-purple-600">{scienceAccuracy}%</div>
              </div>
            </motion.div>
          </div>

          {/* Achievement Badges */}
          <h2 className="text-3xl text-gray-800 mb-6">Your Badges! 🏆</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-3xl p-8 shadow-xl mb-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <div className="text-sm text-gray-700">First Steps</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center shadow-lg">
                  <Flame className="w-10 h-10 text-white" />
                </div>
                <div className="text-sm text-gray-700">Fast Learner</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <div className="text-sm text-gray-700">Perfect Score</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Beaker className="w-10 h-10 text-white" />
                </div>
                <div className="text-sm text-gray-700">Science Star</div>
              </div>
            </div>

            {/* Next Badge Progress */}
            <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center opacity-50">
                  <Calculator className="w-8 h-8 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="text-gray-700 mb-1">Next Badge</div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-purple-500 h-3 rounded-full" style={{ width: '60%' }} />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">2 more exercises until Math Master!</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <div className="flex justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('topic-selection')}
              className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-xl"
            >
              Keep Learning! →
            </motion.button>
          </div>
        </div>

        <Footer />
      </div>
    </ChildBackground>
  );
}