import "tailwindcss/tailwind.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense, useEffect } from "react";
import ProtectedRoute from "./components/core/auth-layout/ProtectedRoute";
import Home from "./pages/Home";
import LoginPage from "./pages/auth/login";
import BasicLayout from "./components/core/basic-layout";
import routes, { updateTabTitle } from "./routes";
import ForgotPasswordPage from "./pages/auth/forgotpass";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./pages/notfound";
import SignupPage from "./pages/auth/signup/Signup";

function App() {
  // useEffect(() => {
  //   document.documentElement.style.zoom = "90%";
  // }, []);
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protucted Routes */}
        <Route
          element={
            <ProtectedRoute>
              <BasicLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          {routes.map(({ path, component: Component }, index) => (
            <Route
              key={index}
              path={path}
              element={
                <Suspense fallback={null}>
                  <Component />
                </Suspense>
              }
            />
          ))}
          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
