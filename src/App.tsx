import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import AppRouter from "./AppRouter";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuthenticationContext } from "./Context/AuthProvider"; // AuthProvider'ı burada import et
import Login from "./pages/Login/Login";
import { BrowserRouter as Router } from "react-router-dom"; // BrowserRouter import et

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
  const { isAuthenticated } = useAuthenticationContext();

  return <>{isAuthenticated ? <AppRouter /> : <Login />}</>;
}

export default App;
