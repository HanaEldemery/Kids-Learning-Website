import { motion } from 'motion/react';
import { Target, Users, BarChart3, Heart, BookOpen, Star, TrendingUp, Award } from 'lucide-react';
import { useApp } from './AppContext';
import PageNav from './PageNav';
import Footer from './Footer';

export default function AboutUs() {
  const { navigate } = useApp();

  const steps = [
    {
      number: 1,
      title: 'Parents Create Account',
      description: 'Sign up in seconds and create profiles for your children',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
    },
    {
      number: 2,
      title: 'Children Start Learning',
      description: 'Kids choose subjects and complete fun, interactive exercises',
      icon: BookOpen,
      color: 'from-teal-500 to-teal-600',
    },
    {
      number: 3,
      title: 'Track Progress Together',
      description: 'Monitor growth and celebrate achievements as a family',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const values = [
    { icon: Heart, title: 'Child-First', description: 'Every feature designed with kids in mind' },
    { icon: Target, title: 'Goal-Oriented', description: 'Clear learning objectives and outcomes' },
    { icon: Star, title: 'Engaging', description: 'Fun, colorful, and interactive experience' },
    { icon: Award, title: 'Achievement', description: 'Celebrating every milestone' },
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Students', icon: Users },
    { number: '500+', label: 'Learning Exercises', icon: BookOpen },
    { number: '50+', label: 'Schools Trust Us', icon: Star },
    { number: '95%', label: 'Parent Satisfaction', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PageNav currentPage="about" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 via-teal-500 to-orange-500 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl mb-6 text-white"
            >
              About Bubbles
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl opacity-90 mb-8"
            >
              Making learning an adventure for every child
            </motion.p>
            
            {/* Illustration placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-12 border-2 border-white/20"
            >
              <div className="flex justify-center items-center gap-8">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <BookOpen className="w-24 h-24 text-white" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Star className="w-32 h-32 text-yellow-300 fill-yellow-300" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Award className="w-24 h-24 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 shadow-xl border-2 border-purple-100"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl mb-4 text-gray-800">Our Mission</h2>
                  <p className="text-xl text-gray-700 mb-4">
                    At Bubbles, we believe every child deserves access to engaging, effective educational content. 
                    Our mission is to transform learning into an exciting adventure that sparks curiosity and builds confidence.
                  </p>
                  <ul className="space-y-3">
                    {values.map((value, index) => (
                      <motion.li
                        key={value.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                          <value.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-purple-700">{value.title}:</span>{' '}
                          <span className="text-gray-600">{value.description}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl text-center mb-12 text-gray-800">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {steps.map((step, index) => (
                <>
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100 hover:shadow-2xl transition-shadow h-full">
                    {/* Step Number */}
                    <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl text-white">{step.number}</span>
                    </div>

                    {/* Icon */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mb-6 mx-auto mt-4`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>

                    <h3 className="text-2xl text-center mb-4 text-gray-800">{step.title}</h3>
                    <p className="text-gray-600 text-center text-lg">{step.description}</p>
                  </div>
                </motion.div>
                
                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 transform -translate-y-1/2 z-10 items-center justify-center" style={{ left: `${(index + 1) * (100 / 3) - (100 / 6) + index * 0.95 + 15}%` }}>
                    <div className="text-purple-300 text-4xl">→</div>
                  </div>
                )}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl text-center mb-12 text-gray-800">Bubbles by the Numbers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-xl text-center border-2 border-purple-100 hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <motion.p
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                    className="text-5xl text-purple-700 mb-2"
                  >
                    {stat.number}
                  </motion.p>
                  <p className="text-gray-600 text-lg">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-teal-500 to-orange-500">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl mb-6 text-white">Ready to Start Learning?</h2>
              <p className="text-2xl text-white/90 mb-8">
                Join thousands of families making education fun!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('parent-signup')}
                className="bg-white text-purple-700 px-12 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all text-2xl"
              >
                Sign Up Now
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}