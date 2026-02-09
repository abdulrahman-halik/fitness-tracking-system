import {
  AtSignIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import React from "react";
import { Toaster } from "react-hot-toast";

const Login = () => {
  // CHANGE 1: initial state must NOT be "login"
  const [state, setState] = useState("signup");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const { login, signup, user } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (state === "login") {
      await login({ email, password });
    } else {
      await signup({ username, email, password });
    }
    setIsSubmitting(false);
  };
  useEffect(() => {
    if (user) {
      navigate("");
    }
  }, [user, navigate]);

  return (
    <>
      <Toaster />
      <main className="login-page-container relative">
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="text-3xl font-medium text-gray-900 dark:text-white">
            {state === "login" ? "Sign In" : "Sign up"}
          </h2>

          <p className="mt-2 text-sm text-gray-500/90 dark:text-gray-400">
            {state === "login"
              ? "Please enter email and password"
              : "Please enter your details to create an account"}
          </p>

          {/* Username */}
          {state !== "login" && (
            <div className="mt-4">
              <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Username
              </label>
              <div className="relative mt-2">
                <AtSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Enter a username"
                  className="login-input"
                  required
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="mt-4">
            <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="relative mt-2">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Please enter your email"
                className="login-input"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative mt-2">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Please enter your password"
                className="login-input pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? (
                  <EyeOffIcon size={16} />
                ) : (
                  <EyeIcon size={16} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="login-button"
          >
            {isSubmitting
              ? "Signing in..."
              : state === "login"
                ? "Login"
                : "Sign up"}
          </button>

          {/* Toggle between login and signup forms when the user clicks the button */}
          {state === "login" ? (
            <p className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setState("signup")}
                className="ml-1 cursor-pointer text-green-600 hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setState("login")}
                className="ml-1 cursor-pointer text-green-600 hover:underline"
              >
                Login
              </button>
            </p>
          )}
        </form>
      </main>
    </>
  );
};

export default Login;
