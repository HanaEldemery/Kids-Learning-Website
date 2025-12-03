import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, Clock, Facebook, Instagram, Linkedin, ChevronDown, Info } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import PageNav from './PageNav';
import Footer from './Footer';
import { toast } from 'sonner@2.0.3';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General',
    message: '',
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: 'General', message: '' });
  };

  const faqs = [
    {
      question: 'How do I create a child account?',
      answer: 'After signing up as a parent, go to your dashboard and click "Add Child Account". Fill in your child\'s details to get started!',
    },
    {
      question: 'Is Bubbles suitable for all ages?',
      answer: 'Bubbles is designed for children aged 5-12. Our exercises are categorized by difficulty levels to match your child\'s learning stage.',
    },
    {
      question: 'How do I track my child\'s progress?',
      answer: 'Your parent dashboard shows detailed analytics including accuracy rates, time spent learning, and areas that need improvement.',
    },
    {
      question: 'Can I use Bubbles on mobile devices?',
      answer: 'Yes! Bubbles is fully responsive and works on tablets, phones, and desktop computers.',
    },
    {
      question: 'What if my child gets stuck on a question?',
      answer: 'Every question includes helpful explanations. Children can also review incorrect answers to learn from mistakes.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! You can try Bubbles with our demo accounts. Just log in with the provided credentials on the login page.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PageNav currentPage="contact" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 via-teal-500 to-orange-500 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl mb-4 text-white"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl opacity-90"
            >
              We're here to help!
            </motion.p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Side - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-purple-100">
                  <h2 className="text-3xl mb-6 text-gray-800">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-700">Your Name</Label>
                      <div className="relative mt-2">
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="pl-4 rounded-2xl border-2 border-purple-200 focus:border-purple-500 h-12"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-12 rounded-2xl border-2 border-purple-200 focus:border-purple-500 h-12"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-gray-700">Subject</Label>
                      <div className="relative mt-2">
                        <select
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full pl-4 pr-10 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 appearance-none bg-white"
                        >
                          <option>General</option>
                          <option>Technical</option>
                          <option>Feedback</option>
                          <option>Partnership</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-700">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-2 rounded-2xl border-2 border-purple-200 focus:border-purple-500 min-h-[150px]"
                        placeholder="Tell us how we can help..."
                        required
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                    >
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </motion.button>

                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center justify-center gap-2">
                      <Info className="w-5 h-5 text-green-600" />
                      <p className="text-green-700">We'll respond within 24 hours</p>
                    </div>
                  </form>
                </div>
              </motion.div>

              {/* Right Side - Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                {/* Email Card */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 shadow-xl border-2 border-purple-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl mb-3 text-gray-800">Email Us</h3>
                  <a href="mailto:contact@Bubbles.com" className="text-xl text-purple-700 hover:text-purple-800 transition-colors underline mb-2 block">
                    contact@Bubbles.com
                  </a>
                  <p className="text-gray-600">Questions? We're here to help!</p>
                </div>

                {/* Social Media Card */}
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl p-8 shadow-xl border-2 border-teal-200">
                  <h3 className="text-2xl mb-4 text-gray-800">Follow Us</h3>
                  <p className="text-gray-600 mb-6">Stay updated with our latest news!</p>
                  <div className="flex gap-4">
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="https://facebook.com/Bubbles"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                    >
                      <Facebook className="w-5 h-5 text-white" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="https://x.com/Bubbles"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-black rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:bg-gray-800"
                    >
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="https://instagram.com/Bubbles"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                    >
                      <Instagram className="w-5 h-5 text-white" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="https://linkedin.com/company/Bubbles"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </motion.a>
                  </div>
                </div>

                {/* Office Hours Card */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 shadow-xl border-2 border-orange-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl mb-3 text-gray-800">Support Hours</h3>
                  <p className="text-gray-700 mb-2">Monday - Friday: 9am - 5pm EST</p>
                  <p className="text-gray-700">Weekend: Closed</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-purple-100"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-purple-50 transition-colors"
                  >
                    <h3 className="text-xl text-gray-800">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-purple-600" />
                    </motion.div>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedFaq === index ? 'auto' : 0,
                      opacity: expandedFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 text-lg">{faq.answer}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
