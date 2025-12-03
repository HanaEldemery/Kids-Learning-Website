import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface BackButtonProps {
  onClick: () => void;
  label: string;
}

export default function BackButton({ onClick, label }: BackButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center gap-2 bg-purple-50 text-purple-700 px-6 py-3 rounded-xl border border-purple-600 hover:bg-purple-100 transition-all shadow-sm"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>{label}</span>
    </motion.button>
  );
}
