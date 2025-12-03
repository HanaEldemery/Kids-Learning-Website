import { useState, useEffect, useMemo } from 'react';
import { Star, ArrowRight, Clock, CheckCircle, XCircle, Lock, Sparkles, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp, mockQuizQuestions } from './AppContext';
import BackButton from './ui/BackButton';
import Header from './Header';
import Footer from './Footer';
import ChildBackground from './ChildBackground';

// Confetti component for correct answers
function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
            y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
            opacity: 1,
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
            opacity: 0,
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: ['#7C3AED', '#06B6D4', '#FB923C', '#10B981', '#EC4899'][Math.floor(Math.random() * 5)],
          }}
        />
      ))}
    </div>
  );
}

export default function QuizInterface() {
  const { currentTopic, navigate, submitQuizAnswer, currentUser } = useApp();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timer, setTimer] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Map<number, { answer: number; isCorrect: boolean }>>(new Map());
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const filteredQuestions = useMemo(() => {
    if (currentTopic === 'mix') {
      return [...mockQuizQuestions].sort(() => Math.random() - 0.5);
    }
    return mockQuizQuestions.filter(q => q.subject.toLowerCase() === currentTopic?.toLowerCase());
  }, [currentTopic]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const isQuestionAnswered = answeredQuestions.has(currentQuestionIndex);
  const previousAnswer = answeredQuestions.get(currentQuestionIndex);

  // Calculate completion stats
  const totalQuestions = filteredQuestions.length;
  const correctAnswers = Array.from(answeredQuestions.values()).filter(a => a.isCorrect).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  // Subject colors and icons
  const subjectConfig = {
    English: { color: '#7C3AED', bg: 'from-purple-500 to-purple-600', icon: '📚' },
    Maths: { color: '#10B981', bg: 'from-green-500 to-green-600', icon: '🔢' },
    Science: { color: '#06B6D4', bg: 'from-teal-500 to-teal-600', icon: '🔬' },
    Mix: { color: '#FB923C', bg: 'from-orange-500 to-orange-600', icon: '✨' },
  }[currentQuestion?.subject] || { color: '#7C3AED', bg: 'from-purple-500 to-purple-600', icon: '⭐' };

  useEffect(() => {
    if (!showCompletion) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentQuestionIndex, showCompletion]);

  useEffect(() => {
    // Reset state when changing questions
    if (isQuestionAnswered) {
      setSelectedAnswer(previousAnswer!.answer);
      setShowFeedback(true);
    } else {
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTimer(0);
    }
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (index: number) => {
    if (showFeedback || isQuestionAnswered) return;
    setSelectedAnswer(index);
    setShowFeedback(true);

    const isCorrect = index === currentQuestion.correctAnswer;
    const withinTime = timer <= 15;

    // Store the answer
    setAnsweredQuestions(new Map(answeredQuestions.set(currentQuestionIndex, { answer: index, isCorrect })));

    // Show confetti if correct
    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }

    submitQuizAnswer({
      questionId: currentQuestion.id,
      subject: currentQuestion.subject,
      question: currentQuestion.question,
      options: currentQuestion.options,
      userAnswer: index,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      withinTime,
      timeSpent: timer
    });
  };

  const handleNext = () => {
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Loop back to the first question and reset all answers
      setAnsweredQuestions(new Map());
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTimer(0);
    }
  };

  const handlePrevious = () => {
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleTryAgain = () => {
    // Reset everything for a new loop
    setAnsweredQuestions(new Map());
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTimer(0);
    setShowCompletion(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timer <= 10) return 'text-green-600';
    if (timer <= 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTimerBg = () => {
    if (timer <= 10) return 'bg-green-100 border-green-300';
    if (timer <= 15) return 'bg-yellow-100 border-yellow-300';
    return 'bg-red-100 border-red-300';
  };

  const getButtonClass = (index: number) => {
    if (isQuestionAnswered || showFeedback) {
      if (index === currentQuestion.correctAnswer) {
        return 'bg-green-500 text-white border-green-600 shadow-lg shadow-green-500/50';
      }
      if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
        return 'bg-red-400 text-white border-red-500 shadow-lg shadow-red-400/50';
      }
      return 'bg-gray-200 text-gray-500 border-gray-300';
    }
    return selectedAnswer === index 
      ? 'bg-purple-200 text-purple-900 border-purple-400 shadow-lg'
      : 'bg-white text-gray-800 border-gray-300 hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg hover:-translate-y-1';
  };

  const answerLabels = ['A', 'B', 'C', 'D'];

  // Completion Screen
  if (showCompletion) {
    return (
      <ChildBackground>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex items-center justify-center p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center border-4 border-purple-200"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mb-6"
              >
                <div className="text-8xl mb-4">🎉</div>
                <h1 className="text-5xl mb-4 bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
                  Great Work!
                </h1>
              </motion.div>

              <p className="text-2xl text-gray-700 mb-6">
                You finished {totalQuestions} questions!
              </p>

              <div className="mb-8">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-teal-100 px-8 py-6 rounded-2xl border-2 border-purple-300">
                  <Trophy className="w-12 h-12 text-purple-600" />
                  <div>
                    <div className="text-4xl text-purple-700">{correctAnswers}/{totalQuestions}</div>
                    <div className="text-xl text-gray-700">({accuracy}% correct)</div>
                  </div>
                  <Star className="w-12 h-12 text-yellow-500 fill-yellow-500" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTryAgain}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all text-xl"
                >
                  Try Again
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('topic-selection')}
                  className="bg-white text-purple-700 px-10 py-4 rounded-2xl border-2 border-purple-600 hover:bg-purple-50 transition-all text-xl"
                >
                  Back to Topics
                </motion.button>
              </div>
            </motion.div>
          </div>
          <Footer />
        </div>
      </ChildBackground>
    );
  }

  return (
    <ChildBackground>
      <div className="min-h-screen flex flex-col">
        <Header />
        {showConfetti && <Confetti />}

        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
              <BackButton onClick={() => navigate('topic-selection')} label="Back to Topics" />
            </div>

            {/* Question Card */}
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 mb-6 border-t-8"
              style={{ borderColor: subjectConfig.color }}
            >
              {/* Subject Badge, Question, and Timer in one row */}
              <div className="flex items-center justify-between gap-3 mb-3">
                {/* Subject Badge - Left */}
                <div className={`bg-gradient-to-r ${subjectConfig.bg} text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 flex-shrink-0`}>
                  <span className="text-lg">{subjectConfig.icon}</span>
                  <span className="text-base">{currentQuestion.subject}</span>
                  <Star className="w-4 h-4 fill-white" />
                </div>

                {/* Question Text - Center (80% width) */}
                <div className="flex-1 max-w-[80%] mx-auto">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-100">
                    <p className="text-center text-base md:text-lg text-gray-800">{currentQuestion.question}</p>
                  </div>
                </div>

                {/* Timer - Right */}
                {!isQuestionAnswered && (
                  <motion.div
                    animate={timer > 15 ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5, repeat: timer > 15 ? Infinity : 0 }}
                    className={`${getTimerBg()} px-4 py-2 rounded-xl border-2 shadow-lg flex items-center gap-2 flex-shrink-0`}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Clock className={`w-5 h-5 ${getTimerColor()}`} />
                    </motion.div>
                    <span className={`text-lg ${getTimerColor()}`}>{formatTime(timer)}</span>
                  </motion.div>
                )}
              </div>

              {/* Locked State for Previously Answered */}
              {isQuestionAnswered && (
                <div className="mb-3 bg-purple-50 rounded-xl p-3 border-2 border-purple-200 relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-purple-600" />
                    <h3 className="text-purple-800 text-sm">Answer Locked</h3>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-700">
                      <span className="font-semibold">You answered:</span>{' '}
                      {currentQuestion.options[previousAnswer!.answer]}
                      {previousAnswer!.isCorrect ? (
                        <CheckCircle className="inline w-4 h-4 text-green-600 ml-2" />
                      ) : (
                        <XCircle className="inline w-4 h-4 text-red-500 ml-2" />
                      )}
                    </p>
                    {!previousAnswer!.isCorrect && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Correct answer:</span>{' '}
                        {currentQuestion.options[currentQuestion.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Answer Options - 2x2 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={!showFeedback && !isQuestionAnswered ? { scale: 1.02 } : {}}
                    whileTap={!showFeedback && !isQuestionAnswered ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback || isQuestionAnswered}
                    className={`relative min-h-[60px] p-4 rounded-xl border-4 transition-all duration-300 ${getButtonClass(index)} ${
                      isQuestionAnswered ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    {/* Answer Label Badge */}
                    <div className="absolute top-2 left-2 w-6 h-6 bg-white/50 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-white/80">
                      <span className="font-semibold text-sm">{answerLabels[index]}</span>
                    </div>
                    
                    <span className="text-base block text-center">{option}</span>

                    {/* Checkmark or X for answered questions */}
                    {(showFeedback || isQuestionAnswered) && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="absolute top-2 right-2 w-6 h-6 text-white" />
                    )}
                    {(showFeedback || isQuestionAnswered) && index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer && (
                      <XCircle className="absolute top-2 right-2 w-6 h-6 text-white" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Navigation Buttons - Previous and Next */}
              <div className="flex justify-between gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2 bg-gray-200 text-gray-800 px-10 py-4 rounded-2xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg min-h-[60px] text-lg"
                >
                  <span>← Previous</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-purple-600 text-white px-10 py-4 rounded-2xl hover:bg-purple-700 transition-all shadow-lg min-h-[60px] text-lg"
                >
                  <span>Next →</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Feedback - Outside card, below it */}
            <AnimatePresence>
              {showFeedback && !isQuestionAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`rounded-2xl p-6 mb-6 border-4 ${
                    selectedAnswer === currentQuestion.correctAnswer 
                      ? 'bg-green-50 border-green-500' 
                      : 'bg-red-50 border-red-400'
                  }`}
                >
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <div className="text-center">
                      <p className="text-green-700 text-xl mb-3 flex items-center justify-center gap-2">
                        <CheckCircle className="w-8 h-8" />
                        <span>Awesome! You got it right! 🎉</span>
                      </p>
                      <p className="text-gray-700 text-lg">{currentQuestion.explanation}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-red-700 text-xl mb-3 flex items-center gap-2">
                        <XCircle className="w-8 h-8" />
                        <span>Not quite, but that's okay!</span>
                      </p>
                      <p className="text-gray-700 mb-4 text-lg">
                        You answered <span className="font-semibold text-red-700">"{currentQuestion.options[selectedAnswer!]}"</span> but the correct answer is{' '}
                        <span className="font-semibold text-green-700">"{currentQuestion.options[currentQuestion.correctAnswer]}"</span> because{' '}
                        {currentQuestion.explanation}
                      </p>
                      <p className="text-purple-700 text-lg">
                        Mistakes help you grow — you've got this! Let's keep learning! 💪
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        <Footer />
      </div>
    </ChildBackground>
  );
}