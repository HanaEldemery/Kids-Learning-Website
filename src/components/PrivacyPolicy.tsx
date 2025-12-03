import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Printer, Shield, Lock, Eye, Cookie, UserCheck, Mail, AlertCircle } from 'lucide-react';
import PageNav from './PageNav';
import Footer from './Footer';
import { useApp } from './AppContext';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('collection');
  const { navigate } = useApp();

  const sections = [
    { id: 'collection', title: 'Information We Collect', icon: Shield },
    { id: 'usage', title: 'How We Use Your Data', icon: Eye },
    { id: 'security', title: 'Data Security', icon: Lock },
    { id: 'coppa', title: 'Children\'s Privacy (COPPA)', icon: UserCheck },
    { id: 'cookies', title: 'Cookies', icon: Cookie },
    { id: 'rights', title: 'Your Rights', icon: AlertCircle },
    { id: 'contact', title: 'Contact Us', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      // Find which section is currently in view
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is in the viewport (with some offset for header)
          if (rect.top <= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageNav currentPage="privacy" />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-purple-600 via-teal-500 to-orange-500 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl mb-4 text-white"
                >
                  Privacy Policy
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl border-2 border-white/30"
                >
                  <p className="text-white">Last Updated: January 2025</p>
                </motion.div>
              </div>
              
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.print()}
                className="bg-white text-purple-700 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
              >
                <Printer className="w-5 h-5" />
                <span>Print This Page</span>
              </motion.button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-purple-100 sticky top-24">
                <h3 className="text-xl mb-4 text-gray-800">Table of Contents</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                        activeSection === section.id
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-purple-50 text-gray-700 hover:bg-purple-100'
                      }`}
                    >
                      <section.icon className="w-5 h-5" />
                      <span className="text-sm">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 space-y-12"
            >
              {/* Information We Collect */}
              <section id="collection" className="scroll-mt-24">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-gray-800">Information We Collect</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p>
                      At Bubbles, we collect only the information necessary to provide our educational services:
                    </p>
                    
                    <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-2xl">
                      <h4 className="text-xl text-purple-800 mb-3">Parent Account Information:</h4>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Name and email address</li>
                        <li>Account credentials</li>
                        <li>Payment information (if applicable)</li>
                      </ul>
                    </div>

                    <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded-r-2xl">
                      <h4 className="text-xl text-teal-800 mb-3">Child Profile Information:</h4>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>First name and username</li>
                        <li>Age or grade level</li>
                        <li>Learning progress and quiz results</li>
                      </ul>
                    </div>

                    <p>
                      We do <strong>not</strong> collect sensitive personal information from children without parental consent.
                    </p>
                  </div>
                </div>
              </section>

              {/* How We Use Your Data */}
              <section id="usage" className="scroll-mt-24">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center">
                      <Eye className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-gray-800">How We Use Your Data</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p>We use the collected information to:</p>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span>Provide personalized learning experiences for each child</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span>Track and report learning progress to parents</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span>Improve our educational content and platform features</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span>Communicate important updates and educational tips</span>
                      </li>
                    </ul>

                    <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-6 mt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertCircle className="w-6 h-6 text-orange-600" />
                        <h4 className="text-xl text-orange-800">Important Note</h4>
                      </div>
                      <p className="text-orange-900">
                        We will never sell or share your child's information with third parties for marketing purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Security */}
              <section id="security" className="scroll-mt-24">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center">
                      <Lock className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-gray-800">Data Security</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p>
                      We take data security seriously and implement industry-standard measures to protect your information:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6">
                        <h4 className="text-xl text-green-800 mb-2">Encryption</h4>
                        <p className="text-gray-700">All data transmitted is encrypted using SSL/TLS protocols</p>
                      </div>
                      <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6">
                        <h4 className="text-xl text-green-800 mb-2">Secure Storage</h4>
                        <p className="text-gray-700">Data stored in secure, password-protected databases</p>
                      </div>
                      <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6">
                        <h4 className="text-xl text-green-800 mb-2">Access Control</h4>
                        <p className="text-gray-700">Limited employee access on a need-to-know basis</p>
                      </div>
                      <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6">
                        <h4 className="text-xl text-green-800 mb-2">Regular Audits</h4>
                        <p className="text-gray-700">Periodic security assessments and updates</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* COPPA Compliance */}
              <section id="coppa" className="scroll-mt-24">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center">
                      <UserCheck className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-gray-800">Children's Privacy (COPPA Compliance)</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p>
                      Bubbles complies with the Children's Online Privacy Protection Act (COPPA):
                    </p>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-2xl space-y-3">
                      <p>✓ Parental consent is required before creating child accounts</p>
                      <p>✓ We collect only minimal information necessary for the service</p>
                      <p>✓ Parents can review, update, or delete their child's information at any time</p>
                      <p>✓ We do not require children to provide more information than necessary</p>
                    </div>

                    <p>
                      Parents have full control over their children's accounts and can manage all settings through the parent dashboard.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section id="cookies" className="scroll-mt-24">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center">
                      <Cookie className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-gray-800">Cookies</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p>
                      We use cookies and similar technologies to:
                    </p>
                    
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Keep you logged into your account</li>
                      <li>Remember your preferences</li>
                      <li>Understand how you use our platform</li>
                      <li>Improve site performance</li>
                    </ul>

                    <p>
                      You can control cookie settings through your browser preferences. Note that disabling cookies may affect platform functionality.
                    </p>
                  </div>
                </div>
              </section>

              {/* Your Rights */}
              <section id="rights" className="scroll-mt-24">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center">
                      <AlertCircle className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-gray-800">Your Rights</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p>You have the right to:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'Access your personal data',
                        'Correct inaccurate information',
                        'Request data deletion',
                        'Object to data processing',
                        'Data portability',
                        'Withdraw consent'
                      ].map((right, index) => (
                        <div key={index} className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4 flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white">✓</span>
                          </div>
                          <span>{right}</span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-6">
                      To exercise these rights, please contact us using the information below.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-purple-600 via-teal-500 to-orange-500 rounded-3xl p-8 shadow-xl text-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-white">Questions About Privacy?</h2>
                  </div>
                  
                  <p className="text-xl text-white/90 mb-6">
                    If you have any questions or concerns about our privacy practices, we're here to help.
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('contact')}
                    className="bg-white text-purple-700 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Contact Our Support Team
                  </motion.button>
                </div>
              </section>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}