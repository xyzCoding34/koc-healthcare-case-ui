import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import User from "../types/User";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  isMobile: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("id", user.id);
    localStorage.setItem("first_name", user.firstName);
    localStorage.setItem("profile_group", user.profileGroup);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("id");
    localStorage.removeItem("first_name");
    localStorage.removeItem("token");
    localStorage.removeItem("profile_group");
  };

  useEffect(() => {
    // window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
    const chekcIfItsMobile = window.innerWidth <= 768;

    if (chekcIfItsMobile) {
      setIsMobile(true);
      navigate("/mobile-information");
      return;
    }

    const currentlyLoggedIn = localStorage.getItem("isAuthenticated");

    if (currentlyLoggedIn === "true") {
      setIsAuthenticated(true);

      const userInfo: User = {
        id: localStorage.getItem("id")!,
        firstName: localStorage.getItem("first_name")!,
        token: localStorage.getItem("token")!,
        profileGroup: localStorage.getItem("profile_group")!,
      };
      setUser(userInfo);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isMobile,
        setIsAuthenticated,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthenticationContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
