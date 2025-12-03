import { motion } from 'motion/react';
import { Star, Sparkles, BookOpen, Calculator, FlaskConical, Trophy, Award } from 'lucide-react';

const bubbles = [
  // Small bubbles
  { size: 20, color: 'bg-purple-400/20', top: '10%', left: '15%', duration: 8, delay: 0 },
  { size: 20, color: 'bg-teal-400/20', top: '25%', left: '75%', duration: 7, delay: 1 },
  { size: 20, color: 'bg-orange-400/20', top: '60%', left: '20%', duration: 9, delay: 2 },
  { size: 20, color: 'bg-green-400/20', top: '80%', left: '85%', duration: 8, delay: 1.5 },
  // Medium bubbles
  { size: 40, color: 'bg-purple-400/20', top: '15%', left: '60%', duration: 10, delay: 0.5 },
  { size: 40, color: 'bg-teal-400/20', top: '45%', left: '10%', duration: 11, delay: 2 },
  { size: 40, color: 'bg-orange-400/20', top: '70%', left: '65%', duration: 9, delay: 1 },
  { size: 40, color: 'bg-green-400/20', top: '35%', left: '90%', duration: 10, delay: 0 },
  // Large bubbles
  { size: 60, color: 'bg-purple-400/20', top: '50%', left: '50%', duration: 12, delay: 0 },
  { size: 60, color: 'bg-teal-400/20', top: '20%', left: '30%', duration: 13, delay: 1.5 },
  { size: 60, color: 'bg-orange-400/20', top: '85%', left: '40%', duration: 11, delay: 2.5 },
  { size: 60, color: 'bg-green-400/20', top: '5%', left: '80%', duration: 12, delay: 1 },
];

const floatingIcons = [
  { Icon: Star, top: '8%', left: '12%', duration: 6, delay: 0, color: 'text-purple-400/30' },
  { Icon: Sparkles, top: '18%', left: '88%', duration: 7, delay: 1, color: 'text-teal-400/30' },
  { Icon: BookOpen, top: '35%', left: '5%', duration: 8, delay: 2, color: 'text-orange-400/30' },
  { Icon: Calculator, top: '65%', left: '92%', duration: 7, delay: 0.5, color: 'text-green-400/30' },
  { Icon: FlaskConical, top: '75%', left: '15%', duration: 9, delay: 1.5, color: 'text-purple-400/30' },
  { Icon: Trophy, top: '45%', left: '95%', duration: 8, delay: 2.5, color: 'text-teal-400/30' },
  { Icon: Award, top: '90%', left: '70%', duration: 7, delay: 1, color: 'text-orange-400/30' },
  { Icon: Star, top: '28%', left: '78%', duration: 6, delay: 0.8, color: 'text-green-400/30' },
  { Icon: Sparkles, top: '55%', left: '25%', duration: 8, delay: 1.8, color: 'text-purple-400/30' },
];

export default function ChildBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#E9D5FF] to-[#FDE2E4] overflow-hidden">
      {/* Animated Bubbles */}
      {bubbles.map((bubble, index) => (
        <motion.div
          key={`bubble-${index}`}
          className={`absolute rounded-full ${bubble.color} backdrop-blur-sm`}
          style={{
            width: bubble.size,
            height: bubble.size,
            top: bubble.top,
            left: bubble.left,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={`icon-${index}`}
          className={`absolute ${item.color}`}
          style={{
            top: item.top,
            left: item.left,
          }}
          animate={{
            y: [-15, 15, -15],
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <item.Icon className="w-6 h-6" />
        </motion.div>
      ))}

      {/* Sparkle Stars */}
      {[...Array(15)].map((_, index) => (
        <motion.div
          key={`star-${index}`}
          className="absolute text-yellow-300/40"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
