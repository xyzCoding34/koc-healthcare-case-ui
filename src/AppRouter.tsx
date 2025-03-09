import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import MainLayout from "./pages/MainLayout/MainLayout";
import HeartRate from "./pages/HeartRate/HeartRate";
import SpO2 from "./pages/SpO2/Spo2";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/heart-rate"
        element={
          <MainLayout>
            <HeartRate />
          </MainLayout>
        }
      />
      <Route
        path="/spo2"
        element={
          <MainLayout>
            <SpO2 />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default AppRouter;
