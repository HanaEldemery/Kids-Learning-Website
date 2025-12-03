import { Calculator, BookOpen, Beaker } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "./AppContext";
import BackButton from "./ui/BackButton";
import Header from "./Header";
import Footer from "./Footer";
import ChatbotTab from "./ChatbotTab";

export default function ExerciseCategories() {
  const {
    selectedChild,
    selectedGroup,
    navigate,
    selectSubject,
  } = useApp();

  if (!selectedChild || !selectedGroup) {
    navigate("parent-dashboard");
    return null;
  }

  const getFilteredExercises = (subject: string) => {
    let filtered = selectedChild.exerciseHistory.filter(
      (ex) =>
        ex.subject.toLowerCase() === subject.toLowerCase(),
    );

    if (selectedGroup === "correct") {
      filtered = filtered.filter((ex) => ex.isCorrect);
    } else if (selectedGroup === "timer") {
      filtered = filtered.filter((ex) => ex.withinTime);
    } else {
      filtered = filtered.filter((ex) => !ex.isCorrect);
    }

    return filtered;
  };

  const subjects = [
    {
      name: "Maths",
      icon: Calculator,
      gradient: "from-green-500 to-green-600",
      bgLight: "bg-green-50",
      borderColor: "border-green-300",
      textColor: "text-green-700",
    },
    {
      name: "English",
      icon: BookOpen,
      gradient: "from-purple-500 to-purple-600",
      bgLight: "bg-purple-50",
      borderColor: "border-purple-300",
      textColor: "text-purple-700",
    },
    {
      name: "Science",
      icon: Beaker,
      gradient: "from-teal-500 to-teal-600",
      bgLight: "bg-teal-50",
      borderColor: "border-teal-300",
      textColor: "text-teal-700",
    },
  ];

  const subjectData = subjects.map((subject) => ({
    ...subject,
    count: getFilteredExercises(subject.name).length,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <Header />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <BackButton
              onClick={() =>
                navigate("child-performance-groups")
              }
              label="Back to Performance Groups"
            />
          </div>

          {/* Header Section - Cleaner Design */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="mb-3 bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent text-4xl">
              View {selectedChild.name}'s Exercises by Subject
            </h1>
          </motion.div>

          {/* Subject Cards - Modern Card Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjectData.map((subject, index) => (
              <motion.button
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: subject.count > 0 ? 1.03 : 1,
                  y: subject.count > 0 ? -4 : 0,
                }}
                whileTap={{
                  scale: subject.count > 0 ? 0.98 : 1,
                }}
                onClick={() =>
                  subject.count > 0 &&
                  selectSubject(subject.name)
                }
                disabled={subject.count === 0}
                className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden ${
                  subject.count === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {/* Background Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${subject.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                />

                <div className="relative z-10">
                  {/* Icon Circle */}
                  <div
                    className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}
                  >
                    <subject.icon className="w-12 h-12 text-white" />
                  </div>

                  {/* Subject Name */}
                  <h3 className="text-2xl mb-3 text-gray-800">
                    {subject.name}
                  </h3>

                  {/* Exercise Count Badge */}
                  <div
                    className={`inline-flex items-center justify-center ${subject.bgLight} ${subject.borderColor} border-2 rounded-full px-6 py-2 mb-4`}
                  >
                    <span
                      className={`text-3xl ${subject.textColor}`}
                    >
                      {subject.count}
                    </span>
                    <span className="text-gray-600 ml-2">
                      exercise{subject.count !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Action Text */}
                  <p className="text-gray-600">
                    {subject.count > 0 ? (
                      <span
                        className={`${subject.textColor} group-hover:underline`}
                      >
                        View exercises →
                      </span>
                    ) : (
                      "No exercises yet"
                    )}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Total Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-white rounded-3xl p-6 shadow-lg border-2 border-purple-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-700 mb-1">
                  Total Exercises
                </h3>
                <p className="text-3xl text-purple-700">
                  {subjectData.reduce(
                    (sum, s) => sum + s.count,
                    0,
                  )}{" "}
                  exercises
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center">
                <span className="text-3xl">📚</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      <ChatbotTab />
    </div>
  );
}