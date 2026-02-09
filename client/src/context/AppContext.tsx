import { createContext, useContext, useEffect, useState } from "react";
import {
  initialState,
  type ActivityEntry,
  type Credentials,
  type FoodEntry,
  type User,
} from "../types";
import { useNavigate } from "react-router-dom";
import api from "../configs/api";
import toast from "react-hot-toast";

const AppContext = createContext(initialState);
// const AppContext = createContext<ReturnType<typeof createContextValue> | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(null);
  const [isUserFetched, setIsUserFetched] = useState(
    localStorage.getItem("token") ? false : true,
  );
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [allFoodLogs, setAllFoodLogs] = useState<FoodEntry[]>([]);
  const [allActivityLogs, setAllActivityLogs] = useState<ActivityEntry[]>([]);

  const signup = async (credentials: Credentials) => {
    try {
      const { data } = await api.post("/api/auth/local/register", credentials);
      setUser({ ...data.user, token: data.jwt });

      if (data?.user?.age && data?.user?.weight && data?.user?.goal) {
        setOnboardingCompleted(true);
      }

      localStorage.setItem("token", data.jwt);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    } catch (error: any) {
      console.error("Signup Error:", error);
      let errorMessage =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        "Something went wrong";

      if (errorMessage.includes("already taken")) {
        errorMessage = "Email or Username already exists. Please try logging in instead.";
      }

      toast.error(errorMessage);
    }
  };

  const login = async (credentials: Credentials) => {
    try {
      const { data } = await api.post("/api/auth/local", {
        identifier: credentials.email,
        password: credentials.password,
      });
      setUser({ ...data.user, token: data.jwt });

      if (data?.user?.age && data?.user?.weight && data?.user?.goal) {
        setOnboardingCompleted(true);
      }

      localStorage.setItem("token", data.jwt);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    } catch (error: any) {
      console.error("Login Error:", error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const fetchUser = async (token: string) => {
    try {
      const { data } = await api.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser({ ...data, token });

      if (data?.age && data?.weight && data?.goal) {
        setOnboardingCompleted(true);
      }
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error: any) {
      console.error("Fetch User Error:", error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errorMessage);
    }
    setIsUserFetched(true);
  };

  const fetchFoodLogs = async (token: string) => {
    try {
      const { data } = await api.get("/api/food-logs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllFoodLogs(data.data || []); // Handle potentially nested data
    } catch (error: any) {
      console.error("Fetch Food Logs Error:", error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const fetchActivityLogs = async (token: string) => {
    try {
      const { data } = await api.get("/api/activity-logs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllActivityLogs(data.data || []); // Handle potentially nested data
    } catch (error: any) {
      console.error("Fetch Activity Logs Error:", error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setOnboardingCompleted(false);
    api.defaults.headers.common["Authorization"] = "";
    navigate("/");
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     (async () => {
  //       await fetchUser(token);
  //       await fetchFoodLogs();
  //       await fetchActivityLogs();
  //     })();
  //   } else {
  //     setIsUserFetched(true);
  //   }
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        await fetchUser(token);
        await fetchFoodLogs(token);
        await fetchActivityLogs(token);
      })();
    }
  }, []);

  const value = {
    user,
    setUser,
    isUserFetched,
    fetchUser,
    signup,
    login,
    logout,
    onboardingCompleted,
    setOnboardingCompleted,
    allFoodLogs,
    allActivityLogs,
    setAllFoodLogs,
    setAllActivityLogs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
