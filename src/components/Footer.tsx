import { useState } from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  GraduationCap,
  Shield,
  Award,
  Heart,
} from "lucide-react";
import { useApp } from "./AppContext";
import { toast } from "sonner@2.0.3";

export default function Footer() {
  const { navigate } = useApp();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success(
        "Thanks for subscribing! Check your inbox for updates.",
      );
      setEmail("");
    }
  };

  return (
    <footer className="bg-gradient-to-br from-purple-50 to-teal-50 border-t-4 border-purple-300 py-12">
      <div className="max-w-7xl mx-auto px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <h3 className="bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent text-xl">
                Bubbles
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Making learning fun and engaging for children
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-800 mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate("about")}
                className="text-gray-600 hover:text-purple-600 transition-colors text-left"
              >
                About Us
              </button>
              <button
                onClick={() => navigate("contact")}
                className="text-gray-600 hover:text-purple-600 transition-colors text-left"
              >
                Contact Us
              </button>
              <button
                onClick={() => navigate("privacy")}
                className="text-gray-600 hover:text-purple-600 transition-colors text-left"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => navigate("terms")}
                className="text-gray-600 hover:text-purple-600 transition-colors text-left"
              >
                Terms and Conditions
              </button>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-gray-800 mb-4">
              Stay Connected
            </h4>

            {/* Social Media Icons */}
            <div className="flex gap-3 mb-6 flex-wrap">
              <a
                href="https://facebook.com/Bubbles"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/Bubbles"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center hover:scale-110 hover:bg-gray-800 transition-all shadow-lg"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/Bubbles"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/Bubbles"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/Bubbles"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Newsletter Signup */}
            <form
              onSubmit={handleNewsletterSubmit}
              className="max-w-[350px]"
            >
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-4 py-2 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none bg-white"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-purple-200 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-700">
              © 2025 Bubbles. All rights reserved.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">
                <Shield className="w-4 h-4" />
                <span>COPPA Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm">
                <Heart className="w-4 h-4" />
                <span>Parent Approved</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm">
                <Award className="w-4 h-4" />
                <span>Safe for Kids</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}