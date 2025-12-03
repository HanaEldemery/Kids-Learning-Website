import { useState } from "react";
import {
  Plus,
  Trash2,
  TrendingUp,
  Target,
  Award,
  BarChart3,
} from "lucide-react";
import { useApp, Parent } from "./AppContext";
import DeleteChildModal from "./DeleteChildModal";
import Header from "./Header";
import Footer from "./Footer";

export default function ParentHome() {
  const { currentUser, navigate, selectChild, deleteChild } =
    useApp();
  const parent = currentUser as Parent;
  const [childToDelete, setChildToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleSelectChild = (childId: string) => {
    selectChild(childId);
    navigate("parent-dashboard");
  };

  const handleDeleteClick = (
    childId: string,
    childName: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setChildToDelete({ id: childId, name: childName });
  };

  const handleConfirmDelete = () => {
    if (childToDelete) {
      deleteChild(childToDelete.id);
      setChildToDelete(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-purple-600 via-teal-500 to-orange-500 rounded-3xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
            <div className="relative z-10">
              <h1 className="text-4xl mb-2">
                {getGreeting()}, {parent.username}!
              </h1>
              <p className="text-xl opacity-90">
                Track and support your children's learning
                journey
              </p>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-purple-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">
                    Total Children
                  </p>
                  <p className="text-2xl text-gray-800">
                    {parent.children.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-teal-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">
                    Avg Accuracy
                  </p>
                  <p className="text-2xl text-gray-800">
                    {parent.children.length > 0
                      ? Math.round(
                          parent.children.reduce(
                            (sum, child) =>
                              sum + child.accuracy,
                            0,
                          ) / parent.children.length,
                        )
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-orange-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">
                    Total Exercises
                  </p>
                  <p className="text-2xl text-gray-800">
                    {parent.children.reduce(
                      (sum, child) =>
                        sum +
                        child.correctCount +
                        child.incorrectCount,
                      0,
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-green-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">
                    View Reports
                  </p>
                  <p className="text-sm text-gray-600">
                    Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border-2 border-purple-100">
            <h2 className="mb-6 text-3xl bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
              Your Children
            </h2>

            {parent.children.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-teal-100 flex items-center justify-center">
                  <Plus className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-2xl mb-4 text-gray-800">
                  No Children Added Yet
                </h3>
                <p className="text-gray-600 mb-8">
                  Start by adding your first child to track
                  their progress!
                </p>
                <button
                  onClick={() => navigate("create-child")}
                  className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-10 py-4 rounded-2xl hover:shadow-2xl transition-all hover:scale-105 text-lg"
                >
                  <span className="block text-center">
                    Add Your First Child
                  </span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {parent.children.map((child, index) => {
                  const total =
                    child.correctCount + child.incorrectCount;
                  const circumference = 2 * Math.PI * 45;
                  const progressOffset =
                    circumference -
                    (child.accuracy / 100) * circumference;
                  const colors = [
                    "from-purple-400 to-purple-600",
                    "from-teal-400 to-teal-600",
                    "from-orange-400 to-orange-600",
                  ];
                  const borderColors = [
                    "border-purple-300",
                    "border-teal-300",
                    "border-orange-300",
                  ];
                  const color = colors[index % colors.length];
                  const borderColor =
                    borderColors[index % borderColors.length];

                  return (
                    <div
                      key={child.id}
                      className={`bg-white rounded-3xl p-6 hover:shadow-2xl transition-all relative group cursor-pointer border-4 ${borderColor} hover:scale-105`}
                      onClick={() =>
                        handleSelectChild(child.id)
                      }
                    >
                      <button
                        onClick={(e) =>
                          handleDeleteClick(
                            child.id,
                            child.name,
                            e,
                          )
                        }
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        title="Remove child"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      <div className="flex flex-col items-center text-center">
                        {/* Avatar */}
                        <div
                          className={`w-24 h-24 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-xl mb-4 border-4 border-white`}
                        >
                          <span className="text-3xl">
                            {child.name
                              .substring(0, 2)
                              .toUpperCase()}
                          </span>
                        </div>

                        <h3 className="mb-1 text-2xl text-gray-800">
                          {child.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-6">
                          Age {child.age || "N/A"}
                        </p>

                        {/* Progress Ring */}
                        <div className="relative w-36 h-36 mb-6">
                          <svg className="transform -rotate-90 w-36 h-36">
                            <circle
                              cx="72"
                              cy="72"
                              r="45"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              className="text-gray-200"
                            />
                            <circle
                              cx="72"
                              cy="72"
                              r="45"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              strokeDasharray={circumference}
                              strokeDashoffset={progressOffset}
                              className="text-purple-600 transition-all duration-1000"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-3xl text-purple-600">
                              {child.accuracy}%
                            </span>
                            <span className="text-xs text-gray-500">
                              Accuracy
                            </span>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="w-full space-y-2 mb-4">
                          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-3 flex justify-between items-center border border-green-200">
                            <span className="text-sm text-gray-700">
                              Correct Answers
                            </span>
                            <span className="text-green-600 font-semibold">
                              {child.correctCount}
                            </span>
                          </div>
                          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 flex justify-between items-center border border-blue-200">
                            <span className="text-sm text-gray-700">
                              On Time
                            </span>
                            <span className="text-blue-600 font-semibold">
                              {child.correctWithinTimerCount}
                            </span>
                          </div>
                          <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-3 flex justify-between items-center border border-pink-200">
                            <span className="text-sm text-gray-700">
                              To Review
                            </span>
                            <span className="text-pink-600 font-semibold">
                              {child.incorrectCount}
                            </span>
                          </div>
                        </div>

                        {/* Badge */}
                        <div className="bg-gradient-to-r from-purple-100 to-teal-100 px-4 py-2 rounded-full text-sm text-purple-700 mb-2">
                          {total} exercises completed
                        </div>

                        {/* View Progress Button */}
                        <button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-teal-500 text-white py-3 rounded-2xl hover:shadow-lg transition-all group-hover:scale-105">
                          View Progress
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Add Another Child Card */}
                <button
                  onClick={() => navigate("create-child")}
                  className="bg-gradient-to-br from-purple-50 to-teal-50 rounded-3xl p-6 hover:from-purple-100 hover:to-teal-100 transition-all flex flex-col items-center justify-center min-h-[520px] border-4 border-dashed border-purple-300 hover:border-purple-400 hover:scale-105 group"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Plus className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl mb-2 text-gray-800">
                    Add Another Child
                  </h3>
                  <p className="text-gray-600 text-center">
                    Start tracking a new learner's progress
                  </p>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {childToDelete && (
        <DeleteChildModal
          childName={childToDelete.name}
          onClose={() => setChildToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}