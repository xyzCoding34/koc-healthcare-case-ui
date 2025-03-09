import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import AppRouter from "./AppRouter";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuthenticationContext } from "./Context/AuthProvider"; // AuthProvider'ı burada import et
import Login from "./pages/Login/Login";
import { BrowserRouter as Router } from "react-router-dom"; // BrowserRouter import et
import MobileInformation from "./pages/MobileInformation/MobileInformation";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
      <Toaster />
    </MantineProvider>
  );
}

function AppContent() {
  const { isAuthenticated, isMobile } = useAuthenticationContext();

  if (isMobile) {
    return <MobileInformation />;
  }

  if (isAuthenticated) {
    return <AppRouter />;
  }

  return <Login />;
}

export default App;
