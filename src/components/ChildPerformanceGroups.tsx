import {
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Calendar,
  Award,
  Target,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "./AppContext";
import ChatbotTab from "./ChatbotTab";
import BackButton from "./ui/BackButton";
import Header from "./Header";
import Footer from "./Footer";

// Circular Progress Ring Component
const CircularProgress = ({
  percentage,
  size = 120,
  strokeWidth = 10,
  color = "#7C3AED",
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset =
    circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl" style={{ color }}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default function ChildPerformanceGroups() {
  const { selectedChild, selectedGroup, navigate } = useApp();

  if (!selectedChild || !selectedGroup) {
    navigate("parent-dashboard");
    return null;
  }

  const groupInfo = {
    correct: {
      title: "Correct Exercises",
      description: "All exercises answered correctly",
      icon: CheckCircle,
      color: "#10B981",
      gradient: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      textColor: "text-green-700",
    },
    timer: {
      title: "Within Timer",
      description: "Exercises completed within the time limit",
      icon: Clock,
      color: "#06B6D4",
      gradient: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      textColor: "text-blue-700",
    },
    incorrect: {
      title: "Incorrect Exercises",
      description: "Exercises that need more practice",
      icon: XCircle,
      color: "#EC4899",
      gradient: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-300",
      textColor: "text-pink-700",
    },
  };

  const info = groupInfo[selectedGroup];
  const total =
    selectedChild.correctCount + selectedChild.incorrectCount;

  const count =
    selectedGroup === "correct"
      ? selectedChild.correctCount
      : selectedGroup === "timer"
        ? selectedChild.correctWithinTimerCount
        : selectedChild.incorrectCount;

  const percentage =
    selectedGroup === "correct"
      ? Math.round((selectedChild.correctCount / total) * 100)
      : selectedGroup === "timer"
        ? Math.round(
            (selectedChild.correctWithinTimerCount / total) *
              100,
          )
        : Math.round(
            (selectedChild.incorrectCount / total) * 100,
          );

  const lastActivity =
    selectedChild.exerciseHistory.length > 0
      ? new Date(
          selectedChild.exerciseHistory[
            selectedChild.exerciseHistory.length - 1
          ].timestamp,
        ).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "No data";

  // Calculate all stats
  const correctCount = selectedChild.correctCount;
  const incorrectCount = selectedChild.incorrectCount;
  const withinTimerCount =
    selectedChild.correctWithinTimerCount;
  const accuracy = Math.round((correctCount / total) * 100);

  const IconComponent = info.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <Header />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <BackButton
              onClick={() => navigate("parent-dashboard")}
              label="Back to Performance"
            />
          </div>

          {/* Header Section with Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl mb-3 bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent tracking-wide">
              {selectedChild.name}'s Performance Breakdown
            </h1>
            
            <p className="text-lg text-gray-600 font-medium">
              {info.title}
            </p>

          </motion.div>

          {/* Main Stats Overview - Hero Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className={`${info.bgColor} rounded-3xl p-8 md:p-12 shadow-2xl border-2 ${info.borderColor} mb-8`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left: Circular Progress */}
              <div className="flex flex-col items-center">
                <CircularProgress
                  percentage={percentage}
                  size={180}
                  strokeWidth={16}
                  color={info.color}
                />
                <div className="mt-6 text-center">
                  <h2 className="text-5xl mb-2">{count}</h2>
                  <p className="text-xl text-gray-600">
                    Exercises
                  </p>
                  <div
                    className={`mt-4 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white shadow-md ${info.borderColor} border-2`}
                  >
                    <IconComponent
                      className={`w-5 h-5 ${info.textColor}`}
                    />
                    <span className={`${info.textColor}`}>
                      {percentage}% of Total
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Key Stats Cards */}
              <div className="grid grid-cols-1 gap-4">
                {/* Total Exercises */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 mb-1">
                        Total Exercises
                      </p>
                      <p className="text-4xl text-gray-800">
                        {total}
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Accuracy */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 mb-1">
                        Accuracy
                      </p>
                      <p className="text-4xl text-green-700">
                        {accuracy}%
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  {/* Mini progress bar */}
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${accuracy}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2"
                    />
                  </div>
                </motion.div>

                {/* Last Activity */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-teal-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 mb-1">
                        Last Activity
                      </p>
                      <p className="text-2xl text-teal-700">
                        {lastActivity}
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <p className="text-xl text-gray-700">
                {info.description}
              </p>
            </motion.div>
          </motion.div>

          {/* Breakdown Cards - Visual Charts - Title Removed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("exercise-categories")}
              className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              <span className="text-xl">
                View Exercises by Subject →
              </span>
            </motion.button>
          </motion.div>

          <ChatbotTab context="group" />
        </div>
      </main>

      <Footer />
    </div>
  );
}