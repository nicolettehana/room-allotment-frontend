import { Route, Routes } from "react-router-dom";
import GuestRoutes from "./components/routes/GuestRoutes";
import SADRoutes from "./components/routes/SADRoutes";
import AuthRoutes from "./components/routes/AuthRoutes";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import HomePage from "./pages/home/HomePage";
import RegisterPage from "./pages/auth/register/RegisterPage";
import ContactUsPage from "./pages/contactUs/ContactUsPage";
import UserProfilePage from "./pages/user/profile/UserProfilePage";
import AdminRoutes from "./components/routes/AdminRoutes";
import AdminManageUsersPage from "./pages/admin/manageUsers/AdminManageUsersPage";
import AdminLogsPage from "./pages/admin/adminLogs/AdminLogsPage";
import ForgotPasswordPage from "./pages/auth/forgotPassword/ForgotPasswordPage";
import { AuthProvider } from "./components/auth/authContext";
import CreateRegistrationPage from "./pages/sad/registration/CreateRegistrationPage";
import VisitorsPage from "./pages/sad/visitors/VisitorsPage";
import OfficesPage from "./pages/admin/offices/OfficesPage";
import ASADRoutes from "./components/routes/ASADRoutes";
import VisitorsAdminPage from "./pages/asad/VisitorsAdminPage";
import DashboardPage from "./pages/asad/DashboardPage";
import DashboardSADPage from "./pages/sad/DashboardSADPage";
import VisitorLoginPage from "./pages/home/VisitorLoginPage";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* GUEST ROUTES **********************************************************/}
        <Route path="/" element={<GuestRoutes />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<VisitorLoginPage />} />
          <Route path="contact-us" element={<ContactUsPage />} />
        </Route>

        {/* AUTH ROUTES ***********************************************************/}
        <Route path="/auth" element={<AuthRoutes />}>
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* SAD ROUTES *******************************************************/}
        <Route path="/sad" element={<SADRoutes />}>
          {/* Dashboard */}
          <Route path="register" element={<CreateRegistrationPage />} />
          <Route path="visitors" element={<VisitorsPage />} />
          <Route path="dashboard" element={<DashboardSADPage />} />

          {/* Profile */}
          <Route path="profile" element={<UserProfilePage />} />
        </Route>

        {/* ASAD ROUTES *******************************************************/}
        <Route path="/asad" element={<ASADRoutes />}>
          {/* Dashboard */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="visitors" element={<VisitorsAdminPage />} />

          {/* Profile */}
          <Route path="profile" element={<UserProfilePage />} />
        </Route>

        {/* ADMIN ROUTES ******************************************************** */}
        <Route path="/admin" element={<AdminRoutes />}>
          {/* Dashboard */}
          <Route path="logs" element={<AdminLogsPage />} />

          {/* Manage Users */}
          <Route path="users" element={<AdminManageUsersPage />} />

          {/* Manage Offices */}
          <Route path="offices" element={<OfficesPage />} />

          {/* Profile */}
          <Route path="profile" element={<UserProfilePage />} />
        </Route>

        {/* NOT FOUND *************************************************************/}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
