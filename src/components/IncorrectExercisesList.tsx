import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useApp, Child } from './AppContext';
import Header from './Header';
import Footer from './Footer';

export default function IncorrectExercisesList() {
  const { currentUser, navigate } = useApp();
  const child = currentUser as Child;
  
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects = ['Maths', 'English', 'Science'];
  
  const filteredExercises = selectedSubject
    ? child.incorrectExercises.filter(ex => ex.subject === selectedSubject)
    : child.incorrectExercises;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col">
      <Header />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('performance')}
            className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Performance</span>
          </button>

          <h1 className="mb-8">List of Incorrect Exercises</h1>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setSelectedSubject(null)}
              className={`px-6 py-3 rounded-xl transition-colors ${
                selectedSubject === null 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              <span>All</span>
            </button>
            {subjects.map(subject => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-6 py-3 rounded-xl transition-colors ${
                  selectedSubject === subject 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <span>{subject}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredExercises.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center">
                <p className="text-gray-600">No incorrect exercises yet. Keep learning! 🎉</p>
              </div>
            ) : (
              filteredExercises.map((exercise, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-pink-100 text-pink-700 px-4 py-1 rounded-full">
                      {exercise.subject}
                    </span>
                    <span className="text-gray-500">#{index + 1}</span>
                  </div>
                  <p className="mb-4">{exercise.question}</p>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="bg-red-50 border-2 border-red-300 rounded-xl p-3">
                      <span className="text-red-700">Your answer: {exercise.userAnswer + 1}</span>
                    </div>
                    <div className="bg-green-50 border-2 border-green-300 rounded-xl p-3">
                      <span className="text-green-700">Correct answer: {exercise.correctAnswer + 1}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}