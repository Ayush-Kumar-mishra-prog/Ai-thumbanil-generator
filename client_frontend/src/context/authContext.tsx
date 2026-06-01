import { createContext, useContext, useEffect, useState } from "react";
import type { IUser } from "../assest/assets";
import api, { TOKEN_STORAGE_KEY } from "../config/api";
import { useNotify } from "./notificationContext";

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  authLoading: boolean;
  setAuthLoading: (loading: boolean) => void;
  login: (user: { email: string; password: string }) => Promise<void>;
  signup: (user: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  authLoading: false,
  setAuthLoading: () => {},
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const { notify } = useNotify();

  const signup = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    setAuthLoading(true);
    try {
      const { data } = await api.post("/api/auth/register", {
        name,
        email,
        password,
      });
      if (data.user && data.token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      }
      notify(data.message);
    } catch (e: any) {
      console.log(e);
      notify(e?.response?.data?.message || "Signup failed", "error");
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setAuthLoading(true);
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      if (data.user && data.token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      }
      notify(data.message);
    } catch (e: any) {
      console.log(e);
      notify(e?.response?.data?.message || "Login failed", "error");
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { data } = await api.post("/api/auth/logout");
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      setUser(null);
      setIsLoggedIn(false);
      notify(data.message);
    } catch (e: any) {
      console.log(e);
      notify(e?.response?.data?.message || "Logout failed", "error");
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (!token) {
        setUser(null);
        setIsLoggedIn(false);
        return;
      }

      const { data } = await api.get("/api/auth/verify");
      if (data.user) {
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      }
    } catch (e) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      setUser(null);
      setIsLoggedIn(false);
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    authLoading,
    setAuthLoading,
    login,
    signup,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
