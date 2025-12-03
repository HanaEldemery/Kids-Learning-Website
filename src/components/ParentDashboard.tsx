import { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useApp } from "./AppContext";
import ChatbotTab from "./ChatbotTab";
import EditChildModal from "./EditChildModal";
import DeleteChildModal from "./DeleteChildModal";
import Header from "./Header";
import Footer from "./Footer";
import BackButton from './ui/BackButton';
import { motion } from "framer-motion";
import {
  TrendingUp,
  CheckCircle,
  Zap,
  XCircle,
} from "lucide-react";
import CircularProgress from "./CircularProgress";

export default function ParentDashboard() {
  const {
    selectedChild,
    navigate,
    deleteChild,
    updateParentChildInfo,
  } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
  }, []);

  if (!selectedChild) {
    navigate("parent-home");
    return null;
  }

  const total =
    selectedChild.correctCount + selectedChild.incorrectCount;
  const correctPercentage =
    total > 0
      ? Math.round((selectedChild.correctCount / total) * 100)
      : 0;
  const timerPercentage =
    total > 0
      ? Math.round(
          (selectedChild.correctWithinTimerCount / total) * 100,
        )
      : 0;
  const incorrectPercentage =
    total > 0
      ? Math.round((selectedChild.incorrectCount / total) * 100)
      : 0;

  const groups = [
    {
      id: "correct" as const,
      title: "Correct Exercises",
      count: selectedChild.correctCount,
      percentage: correctPercentage,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "timer" as const,
      title: "Within Timer",
      count: selectedChild.correctWithinTimerCount,
      percentage: timerPercentage,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "incorrect" as const,
      title: "Incorrect Exercises",
      count: selectedChild.incorrectCount,
      percentage: incorrectPercentage,
      color: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-100",
    },
  ];

  const handleSelectGroup = (
    groupId: "correct" | "timer" | "incorrect",
  ) => {
    navigate("child-performance-groups", { group: groupId });
  };

  const handleDeleteChild = () => {
    deleteChild(selectedChild.id);
    setShowDeleteModal(false);
    navigate("parent-home");
  };

  const handleEditChild = () => {
    setShowMenu(false);
    setShowEditModal(true);
  };

  const handleSaveEdit = (
    name: string,
    username: string,
    password: string,
  ) => {
    updateParentChildInfo(
      selectedChild.id,
      name,
      username,
      password,
    );
  };

  const handleHome = () => {
    navigate('parent-home');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <Header />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-8">
              <BackButton
                onClick={handleHome}
                label="Back to Home Page"
              />
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-700" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10">
                  <button
                    onClick={handleEditChild}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <Pencil className="w-4 h-4 text-blue-600" />
                    <span>Edit Child</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowDeleteModal(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                    <span className="text-red-600">
                      Delete Child
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-3xl mb-6 text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              {selectedChild.name}'s Performance Breakdown
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ✅ Correct Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-green-200 relative overflow-hidden"
                onClick={() =>
                  navigate("child-performance-groups", {
                    group: "correct",
                  })
                }
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full opacity-50 -mr-16 -mt-16" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl text-gray-800">
                      Correct
                    </h3>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="flex justify-center mb-6">
                    <CircularProgress
                      percentage={correctPercentage}
                      size={140}
                      strokeWidth={12}
                      color="#10B981"
                    />
                  </div>

                  <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Exercises
                      </span>
                      <span className="text-3xl text-green-700">
                        {selectedChild.correctCount}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="text-gray-600">
                        Percentage
                      </span>
                      <span className="text-2xl text-green-700">
                        {correctPercentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ✅ On Time Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-200 relative overflow-hidden"
                onClick={() =>
                  navigate("child-performance-groups", {
                    group: "timer",
                  })
                }
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full opacity-50 -mr-16 -mt-16" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl text-gray-800">
                      On Time
                    </h3>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="flex justify-center mb-6">
                    <CircularProgress
                      percentage={timerPercentage}
                      size={140}
                      strokeWidth={12}
                      color="#06B6D4"
                    />
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Exercises
                      </span>
                      <span className="text-3xl text-blue-700">
                        {selectedChild.correctWithinTimerCount}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="text-gray-600">
                        Percentage
                      </span>
                      <span className="text-2xl text-blue-700">
                        {timerPercentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ✅ Incorrect Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-pink-200 relative overflow-hidden"
                onClick={() =>
                  navigate("child-performance-groups", {
                    group: "incorrect",
                  })
                }
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-full opacity-50 -mr-16 -mt-16" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl text-gray-800">
                      Incorrect
                    </h3>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg">
                      <XCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="flex justify-center mb-6">
                    <CircularProgress
                      percentage={incorrectPercentage}
                      size={140}
                      strokeWidth={12}
                      color="#EC4899"
                    />
                  </div>

                  <div className="bg-pink-50 rounded-2xl p-4 border-2 border-pink-200">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Exercises
                      </span>
                      <span className="text-3xl text-pink-700">
                        {selectedChild.incorrectCount}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="text-gray-600">
                        Percentage
                      </span>
                      <span className="text-2xl text-pink-700">
                        {incorrectPercentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <ChatbotTab context="dashboard" />
        </div>
      </main>

      <Footer />

      {showEditModal && (
        <EditChildModal
          child={selectedChild}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEdit}
        />
      )}

      {showDeleteModal && (
        <DeleteChildModal
          childName={selectedChild.name}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteChild}
        />
      )}
    </div>
  );
}