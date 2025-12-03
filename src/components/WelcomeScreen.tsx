import { useApp } from './AppContext';
import { User, Baby, GraduationCap, Star, Sparkles, BookOpen, TrendingUp } from 'lucide-react';
import PageNav from './PageNav';
import Footer from './Footer';

export default function WelcomeScreen() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-teal-50 to-orange-50 flex flex-col relative overflow-hidden">
      <PageNav currentPage="home" />
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-teal-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-orange-300 rounded-full opacity-20 animate-bounce"></div>
        <Star className="absolute top-1/4 right-1/3 w-16 h-16 text-purple-300 opacity-30 animate-spin" style={{ animationDuration: '10s' }} />
        <Sparkles className="absolute bottom-1/3 left-1/3 w-12 h-12 text-teal-300 opacity-30 animate-pulse" />
      </div>
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <div className="max-w-6xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center shadow-2xl animate-pulse">
                <GraduationCap className="w-20 h-20 text-white" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl mb-6 bg-gradient-to-r from-purple-600 via-teal-500 to-orange-500 bg-clip-text text-transparent font-bold">
              Making Learning Fun and Engaging for Children
            </h1>
            <p className="text-xl text-gray-700 mb-8">Interactive quizzes • Parent monitoring • AI assistance</p>
          </div>

          {/* Who Are You Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-center mb-12 text-3xl bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">Who Are You?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Parent Card */}
              <button
                onClick={() => navigate('parent-login')}
                className="group relative overflow-hidden rounded-3xl transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white h-full">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <User className="w-20 h-20" />
                    </div>
                    <h3 className="text-2xl">Parent</h3>
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                      Track & Support
                    </div>
                    <p className="text-sm text-center opacity-90">Monitor your child's progress and help them succeed</p>
                  </div>
                </div>
              </button>

              {/* Child Card */}
              <button
                onClick={() => navigate('child-login')}
                className="group relative overflow-hidden rounded-3xl transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 text-white h-full">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Baby className="w-20 h-20" />
                    </div>
                    <h3 className="text-2xl">Child</h3>
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                      Learn & Play
                    </div>
                    <p className="text-sm text-center opacity-90">Have fun while learning Math, English, and Science</p>
                  </div>
                </div>
              </button>
            </div>
            
            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                New here?{' '}
                <button
                  onClick={() => navigate('parent-signup')}
                  className="text-purple-600 hover:text-purple-700 underline transition-colors"
                >
                  Sign up as a parent
                </button>
              </p>
            </div>
          </div>

          {/* Why Choose Bubbles Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-gray-800 mb-2">Interactive Learning</h4>
              <p className="text-sm text-gray-600">Engaging quizzes in Math, English & Science</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-gray-800 mb-2">Track Progress</h4>
              <p className="text-sm text-gray-600">Detailed analytics for parents</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-gray-800 mb-2">AI Assistant</h4>
              <p className="text-sm text-gray-600">Get help anytime with our chatbot</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-gray-800 mb-2">Unlimited Practice</h4>
              <p className="text-sm text-gray-600">Repeat exercises as many times as needed</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}