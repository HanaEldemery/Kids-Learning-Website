import { useState } from 'react';
import { CheckCircle, XCircle, Clock, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp, ExerciseRecord } from './AppContext';
import ChatbotTab from './ChatbotTab';
import BackButton from './ui/BackButton';
import Header from './Header';
import Footer from './Footer';

export default function ExerciseList() {
  const { selectedChild, selectedGroup, selectedSubject, navigate } = useApp();
  const [selectedExercise, setSelectedExercise] = useState<ExerciseRecord | null>(null);

  if (!selectedChild || !selectedGroup || !selectedSubject) {
    navigate('parent-dashboard');
    return null;
  }

  const getFilteredExercises = () => {
    let filtered = selectedChild.exerciseHistory.filter(ex => 
      ex.subject.toLowerCase() === selectedSubject.toLowerCase()
    );

    if (selectedGroup === 'correct') {
      filtered = filtered.filter(ex => ex.isCorrect);
    } else if (selectedGroup === 'timer') {
      filtered = filtered.filter(ex => ex.withinTime);
    } else {
      filtered = filtered.filter(ex => !ex.isCorrect);
    }

    return filtered;
  };

  const exercises = getFilteredExercises();

  // Calculate stats
  const correctCount = exercises.filter(ex => ex.isCorrect).length;
  const onTimeCount = exercises.filter(ex => ex.withinTime).length;
  const accuracy = exercises.length > 0 ? Math.round((correctCount / exercises.length) * 100) : 0;
  const avgTime = exercises.length > 0 
    ? Math.round(exercises.reduce((sum, ex) => sum + ex.timeSpent, 0) / exercises.length) 
    : 0;

  if (exercises.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
        <Header />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <BackButton onClick={() => navigate('exercise-categories')} label="Back to Categories" />
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl text-gray-800 mb-2">No Exercises Found</h2>
              <p className="text-gray-600">No exercises found in this category for {selectedSubject}.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Detail View
  if (selectedExercise) {
    const currentIndex = exercises.findIndex(ex => ex.id === selectedExercise.id);
    
    const handlePrevious = () => {
      if (currentIndex > 0) {
        setSelectedExercise(exercises[currentIndex - 1]);
        window.scrollTo(0, 0);
      }
    };

    const handleNext = () => {
      if (currentIndex < exercises.length - 1) {
        setSelectedExercise(exercises[currentIndex + 1]);
        window.scrollTo(0, 0);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
        <Header />

        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <BackButton onClick={() => setSelectedExercise(null)} label="Back to Exercise List" />
            </div>

            {/* Exercise Detail Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 mb-6"
            >
              {/* Header Section - Subject Badge, Question, Timer in one row */}
              <div className="flex items-center justify-between gap-3 mb-3">
                {/* Subject Badge - Left */}
                <div className={`px-4 py-2 rounded-xl flex-shrink-0 ${
                  selectedSubject === 'Maths' ? 'bg-green-100 text-green-700' :
                  selectedSubject === 'English' ? 'bg-purple-100 text-purple-700' :
                  'bg-teal-100 text-teal-700'
                }`}>
                  <span className="text-base">{selectedExercise.subject}</span>
                </div>

                {/* Question - Center (80% width) */}
                <div className="flex-1 max-w-[80%] mx-auto">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-100">
                    <p className="text-center text-base md:text-lg text-gray-800 leading-relaxed">
                      {selectedExercise.question}
                    </p>
                  </div>
                </div>

                {/* Status Badge - Right */}
                <div className={`px-4 py-2 rounded-xl flex-shrink-0 ${
                  selectedExercise.isCorrect ? 'bg-green-500 text-white' : 'bg-red-400 text-white'
                }`}>
                  {selectedExercise.isCorrect ? (
                    <span className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-sm">
                      <XCircle className="w-4 h-4" />
                      Incorrect
                    </span>
                  )}
                </div>
              </div>

              {/* Time Badge Below */}
              <div className="flex justify-center mb-3">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-base">{selectedExercise.timeSpent}s</span>
                  {selectedExercise.withinTime && <span className="text-green-600 text-lg">⚡</span>}
                </div>
              </div>

              {/* Answer Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {selectedExercise.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl border-4 text-center transition-all ${
                      index === selectedExercise.correctAnswer
                        ? 'bg-green-50 border-green-500 shadow-lg'
                        : index === selectedExercise.userAnswer && !selectedExercise.isCorrect
                        ? 'bg-red-50 border-red-400 shadow-lg'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{option}</span>
                      {index === selectedExercise.correctAnswer && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                      {index === selectedExercise.userAnswer && !selectedExercise.isCorrect && (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 bg-gray-200 px-8 py-4 rounded-2xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  <span className="text-lg">← Previous</span>
                </motion.button>

                <div className="bg-gradient-to-r from-purple-100 to-teal-100 px-6 py-3 rounded-2xl border-2 border-purple-300">
                  <span className="text-xl">{currentIndex + 1} / {exercises.length}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  disabled={currentIndex === exercises.length - 1}
                  className="flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-2xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  <span className="text-lg">Next →</span>
                </motion.button>
              </div>
            </motion.div>

            <ChatbotTab context="exercise" currentExercise={selectedExercise} />
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // List View with Progress Bar
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <Header />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <BackButton onClick={() => navigate('exercise-categories')} label="Back to Categories" />
          </div>

          {/* Header Section - Clean Design */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-200">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <h1 className="mb-2 bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
                    {selectedSubject} Exercises
                  </h1>
                  <p className="text-xl text-gray-600">
                    {exercises.length} exercise{exercises.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                
                {/* Subject Icon */}
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
                  selectedSubject === 'Maths' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                  selectedSubject === 'English' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                  'bg-gradient-to-br from-teal-500 to-teal-600'
                }`}>
                  <span className="text-4xl">
                    {selectedSubject === 'Maths' ? '🔢' : selectedSubject === 'English' ? '📚' : '🔬'}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Completion Progress</span>
                  <span className="text-purple-700 text-lg">{accuracy}% accuracy</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${accuracy}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-purple-600 to-teal-500 h-4 rounded-full"
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200 text-center">
                  <div className="text-2xl text-green-600 mb-1">{correctCount}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200 text-center">
                  <div className="text-2xl text-blue-600 mb-1">{onTimeCount}</div>
                  <div className="text-sm text-gray-600">On Time</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200 text-center">
                  <div className="text-2xl text-orange-600 mb-1">{avgTime}s</div>
                  <div className="text-sm text-gray-600">Avg Time</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Exercise Cards - Improved Typography & Spacing */}
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <motion.button
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01, y: -2 }}
                onClick={() => {
                  setSelectedExercise(exercise);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-white rounded-2xl p-6 hover:shadow-2xl transition-all text-left shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Exercise Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full">
                        Exercise {index + 1}
                      </span>
                      <span className={`px-4 py-1 rounded-full ${
                        exercise.isCorrect ? 'bg-green-500 text-white' : 'bg-red-400 text-white'
                      }`}>
                        {exercise.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{exercise.timeSpent}s</span>
                        {exercise.withinTime && <span className="text-green-600">⚡</span>}
                      </div>
                    </div>
                    
                    {/* Question Text */}
                    <p className="text-lg text-gray-800 mb-3 leading-relaxed">
                      {exercise.question}
                    </p>
                    
                    {/* Answer Info */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="text-gray-600">
                        <span className="text-gray-500">Answered:</span>{' '}
                        <span className={exercise.isCorrect ? 'text-green-700' : 'text-red-700'}>
                          {exercise.options[exercise.userAnswer]}
                        </span>
                      </div>
                      {!exercise.isCorrect && (
                        <div className="text-gray-600">
                          <span className="text-gray-500">Correct:</span>{' '}
                          <span className="text-green-700">
                            {exercise.options[exercise.correctAnswer]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {exercise.isCorrect ? (
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle className="w-7 h-7 text-white" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-red-400 flex items-center justify-center">
                        <XCircle className="w-7 h-7 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <ChatbotTab context="group" />
        </div>
      </main>

      <Footer />
    </div>
  );
}