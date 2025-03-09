import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import MainLayout from "./pages/MainLayout/MainLayout";
import HeartRate from "./pages/HeartRate/HeartRate";
import MobileInformation from "./pages/MobileInformation/MobileInformation";
import OxygenLevel from "./pages/OxygenLevel/OxygenLevel";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/mobile-information" element={<MobileInformation />} />
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
        path="/oxygen-level"
        element={
          <MainLayout>
            <OxygenLevel />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default AppRouter;
