import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Printer, FileText, User, Shield, CreditCard, Ban, AlertTriangle, RefreshCw, Mail } from 'lucide-react';
import PageNav from './PageNav';
import Footer from './Footer';
import { useApp } from './AppContext';

export default function TermsConditions() {
  const [activeSection, setActiveSection] = useState('acceptance');
  const { navigate } = useApp();

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms', icon: FileText },
    { id: 'accounts', title: 'User Accounts', icon: User },
    { id: 'parent', title: 'Parent Responsibilities', icon: Shield },
    { id: 'safety', title: 'Child Safety', icon: Shield },
    { id: 'content', title: 'Content Usage', icon: FileText },
    { id: 'payment', title: 'Payment Terms', icon: CreditCard },
    { id: 'termination', title: 'Termination', icon: Ban },
    { id: 'liability', title: 'Limitations of Liability', icon: AlertTriangle },
    { id: 'changes', title: 'Changes to Terms', icon: RefreshCw },
    { id: 'contact-terms', title: 'Contact Information', icon: Mail },
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
      <PageNav currentPage="terms" />

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
                  Terms and Conditions
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl border-2 border-white/30"
                >
                  <p className="text-white">Effective: January 2025</p>
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
                      <section.icon className="w-5 h-5 flex-shrink-0" />
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
              {/* Acceptance of Terms */}
              <section id="acceptance" className="scroll-mt-24">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-gray-800">1. Acceptance of Terms</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p className="mb-4">
                      By accessing and using Bubbles ("the Platform"), you agree to be bound by these Terms and Conditions. 
                      If you do not agree to these terms, please do not use our services.
                    </p>
                    
                    <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-2xl">
                      <p className="text-purple-900">
                        These terms constitute a legally binding agreement between you and Bubbles. 
                        Please read them carefully before using the Platform.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* User Accounts */}
              <section id="accounts" className="scroll-mt-24">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-gray-800">2. User Accounts</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p className="mb-4"><strong>2.1 Account Creation</strong></p>
                    <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                      <li>Parents must be at least 18 years old to create an account</li>
                      <li>All information provided must be accurate and current</li>
                      <li>You are responsible for maintaining account security</li>
                      <li>You must not share your login credentials with others</li>
                    </ul>

                    <p className="mb-4"><strong>2.2 Account Responsibilities</strong></p>
                    <div className="bg-teal-50 border-2 border-teal-300 rounded-2xl p-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3">
                          <span className="text-teal-600 flex-shrink-0">•</span>
                          <span>You are responsible for all activities under your account</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-teal-600 flex-shrink-0">•</span>
                          <span>Notify us immediately of any unauthorized access</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-teal-600 flex-shrink-0">•</span>
                          <span>Keep your contact information up to date</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Parent Responsibilities */}
              <section id="parent" className="scroll-mt-24">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-gray-800">3. Parent Responsibilities</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p className="mb-4">As a parent or guardian, you agree to:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'Supervise your child\'s use of the Platform',
                        'Ensure content is age-appropriate',
                        'Monitor learning progress regularly',
                        'Maintain account security',
                        'Review and approve privacy settings',
                        'Report any inappropriate content'
                      ].map((responsibility, index) => (
                        <div key={index} className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-sm">✓</span>
                          </div>
                          <span>{responsibility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Child Safety */}
              <section id="safety" className="scroll-mt-24">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-gray-800">4. Child Safety</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-2xl">
                      <h4 className="text-xl text-green-800 mb-3">Our Commitment to Safety</h4>
                      <ul className="space-y-2">
                        <li>✓ COPPA compliant child protection measures</li>
                        <li>✓ No third-party advertising to children</li>
                        <li>✓ Age-appropriate content filtering</li>
                        <li>✓ Secure data handling practices</li>
                        <li>✓ Regular safety audits and updates</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="w-6 h-6 text-orange-600" />
                        <h4 className="text-xl text-orange-800">Important</h4>
                      </div>
                      <p className="text-orange-900">
                        Parents are ultimately responsible for their children's online safety. We provide tools and safeguards, 
                        but parental supervision is essential.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Content Usage */}
              <section id="content" className="scroll-mt-24">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-gray-800">5. Content Usage</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p className="mb-4"><strong>5.1 License Grant</strong></p>
                    <p className="mb-4">
                      Bubbles grants you a limited, non-exclusive, non-transferable license to access and use 
                      the Platform for personal, educational purposes only.
                    </p>

                    <p className="mb-4"><strong>5.2 Prohibited Uses</strong></p>
                    <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6">
                      <p className="text-red-900 mb-3">You may NOT:</p>
                      <ul className="space-y-2 text-red-800">
                        <li>✗ Copy, modify, or distribute Platform content</li>
                        <li>✗ Use automated systems to access the Platform</li>
                        <li>✗ Reverse engineer any Platform components</li>
                        <li>✗ Use the Platform for commercial purposes</li>
                        <li>✗ Share or resell access to the Platform</li>
                      </ul>
                    </div>

                    <p className="mb-4 mt-6"><strong>5.3 Intellectual Property</strong></p>
                    <p>
                      All content, trademarks, and materials on Bubbles are owned by us or our licensors and 
                      are protected by copyright and intellectual property laws.
                    </p>
                  </div>
                </div>
              </section>

              {/* Payment Terms */}
              <section id="payment" className="scroll-mt-24">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center">
                      <CreditCard className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-gray-800">6. Payment Terms</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p className="mb-4"><strong>6.1 Subscription Plans</strong></p>
                    <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                      <li>Free trial available for new users</li>
                      <li>Subscription fees are billed in advance</li>
                      <li>Prices subject to change with 30 days notice</li>
                      <li>Refunds handled on a case-by-case basis</li>
                    </ul>

                    <p className="mb-4"><strong>6.2 Cancellation</strong></p>
                    <p>
                      You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period.
                    </p>
                  </div>
                </div>
              </section>

              {/* Termination */}
              <section id="termination" className="scroll-mt-24">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center">
                      <Ban className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-gray-800">7. Termination</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p className="mb-4">
                      We reserve the right to suspend or terminate accounts that violate these terms, including:
                    </p>
                    
                    <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-2xl">
                      <ul className="space-y-2">
                        <li>• Providing false information</li>
                        <li>• Violating intellectual property rights</li>
                        <li>• Engaging in fraudulent activities</li>
                        <li>• Harassing or abusing other users</li>
                        <li>• Attempting to compromise Platform security</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Limitations of Liability */}
              <section id="liability" className="scroll-mt-24">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-2xl flex items-center justify-center">
                      <AlertTriangle className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-gray-800">8. Limitations of Liability</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6">
                      <p className="text-yellow-900 mb-4">
                        Bubbles is provided "as is" without warranties of any kind. We are not liable for:
                      </p>
                      <ul className="space-y-2 text-yellow-800">
                        <li>• Interruptions or errors in service</li>
                        <li>• Loss of data or content</li>
                        <li>• Indirect or consequential damages</li>
                        <li>• Third-party actions or content</li>
                      </ul>
                    </div>

                    <p>
                      Our total liability to you for any claims related to the Platform shall not exceed the amount 
                      you paid us in the 12 months preceding the claim.
                    </p>
                  </div>
                </div>
              </section>

              {/* Changes to Terms */}
              <section id="changes" className="scroll-mt-24">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center">
                      <RefreshCw className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-gray-800">9. Changes to Terms</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p>
                      We may update these Terms and Conditions from time to time. We will notify you of significant 
                      changes via email or a prominent notice on the Platform.
                    </p>
                    
                    <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded-r-2xl">
                      <p className="text-teal-900">
                        Your continued use of the Platform after changes constitutes acceptance of the new terms. 
                        If you don't agree with the changes, please discontinue use of the Platform.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section id="contact-terms" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-purple-600 via-teal-500 to-orange-500 rounded-3xl p-8 shadow-xl text-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl text-white">Questions? Contact Our Support Team</h2>
                  </div>
                  
                  <p className="text-xl text-white/90 mb-6">
                    If you have questions about these Terms and Conditions, please don't hesitate to reach out.
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('contact')}
                    className="bg-white text-purple-700 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Contact Us
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