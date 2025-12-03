import { useState } from "react";
import { useApp } from "./AppContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import PageNav from './PageNav';
import {
  GraduationCap,
  User,
  Lock,
  Star,
  Rocket,
  Info,
  HelpCircle,
} from "lucide-react";
import Footer from "./Footer";
import ChildBackground from "./ChildBackground";
import BackButton from "./ui/BackButton";

export default function ChildLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, navigate } = useApp();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password, "child");
    if (!success) {
      setError("Invalid username or password");
    }
  };

  return (
    <ChildBackground>
      <div className="min-h-screen flex flex-col">
        <PageNav/>

        <main className="flex-1 flex items-center justify-center p-8 relative z-10">
          <div className="max-w-md w-full">
            {/* Back Button */}
            <div className="mb-6">
              <BackButton onClick={() => navigate("welcome")} label="Back" />
            </div>
            
            {/* Fun Animated Characters in Corners */}
            <div className="absolute top-10 left-10 hidden lg:block">
              <div className="bg-white rounded-full p-4 shadow-lg animate-bounce">
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="absolute top-10 right-10 hidden lg:block">
              <div className="bg-white rounded-full p-4 shadow-lg animate-pulse">
                <Rocket className="w-8 h-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-purple-200 relative">
              {/* Decorative stars */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 shadow-lg">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>

              <h1 className="text-center mb-2 text-4xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Time to Learn!
              </h1>
              <p className="text-center text-gray-700 mb-8 text-lg">
                Let's have fun learning together! 🎉
              </p>

              <form
                onSubmit={handleLogin}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-gray-700 text-lg"
                  >
                    Your Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-500" />
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value)
                      }
                      className="pl-14 rounded-2xl border-4 border-purple-200 focus:border-purple-500 h-14 text-lg"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 text-lg"
                  >
                    Your Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-500" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      className="pl-14 rounded-2xl border-4 border-purple-200 focus:border-purple-500 h-14 text-lg"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border-4 border-red-200 rounded-2xl p-4 text-red-600 text-center">
                    {error}
                  </div>
                )}

                {/* Demo Credentials in Speech Bubble */}
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-4 border-purple-200 rounded-2xl p-4 relative">
                  <div className="flex items-start gap-3">
                    <Info className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-700 mb-2">
                        Try it out!
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-purple-600">
                          Username:
                        </span>{" "}
                        ahmed123
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-purple-600">
                          Password:
                        </span>{" "}
                        password
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl hover:shadow-2xl transition-all hover:scale-105 text-xl"
                >
                  <span className="block text-center">
                    Let's Go! 🚀
                  </span>
                </button>

                {/* Parent Help Button */}
                <div className="text-center">
                  <button
                    type="button"
                    className="flex items-center gap-2 mx-auto text-gray-500 transition-colors"
                  >
                    <HelpCircle className="w-5 h-5" />
                    <span>Need help? Ask your parent!</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ChildBackground>
  );
}