import { Route, Routes } from "react-router-dom";
import GuestRoutes from "./components/routes/GuestRoutes";
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
import OfficesPage from "./pages/admin/offices/OfficesPage";
import ASADRoutes from "./components/routes/ASADRoutes";
import VisitorsAdminPage from "./pages/asad/VisitorsAdminPage";
import DashboardPage from "./pages/asad/DashboardPage";
import DeptRoutes from "./components/routes/DeptRoutes";
import DeptDashboardPage from "./pages/dept/DeptDashboardPage";
import BookingHistoryPage from "./pages/dept/bookingHistory/BookingHistoryPage";
import CreateBookingPage from "./pages/dept/CreateBookingPage";
import InboxPage from "./pages/asad/inbox/InboxPage";
import AllBookingsPage from "./pages/asad/allBookings/AllBookingsPage";
import HallsPage from "./pages/asad/halls/HallsPage";
import UpdateBookingPage from "./pages/dept/UpdateBookingPage";
import ASADCreateBookingPage from "./pages/asad/createBooking/ASADCreateBookingPage";
import ASADBookingHistoryPage from "./pages/asad/myBookings/ASADBookingHistoryPage";
import ASADUpdateBookingPage from "./pages/asad/myBookings/ASADUpdateBookingPage";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* GUEST ROUTES **********************************************************/}
        <Route path="/" element={<GuestRoutes />}>
          <Route index element={<HomePage />} />
          <Route path="contact-us" element={<ContactUsPage />} />
        </Route>

        {/* AUTH ROUTES ***********************************************************/}
        <Route path="/auth" element={<AuthRoutes />}>
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* ASAD ROUTES *******************************************************/}
        <Route path="/asad" element={<ASADRoutes />}>
          {/* Dashboard */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="history" element={<AllBookingsPage />} />
          <Route path="halls" element={<HallsPage />} />
          <Route path="create-booking" element={<ASADCreateBookingPage />} />
          <Route path="my-bookings" element={<ASADBookingHistoryPage />} />
          <Route
            path="my-bookings/update-booking"
            element={<ASADUpdateBookingPage />}
          />

          {/* Profile */}
          <Route path="profile" element={<UserProfilePage />} />
        </Route>

        {/* DEPTROUTES *******************************************************/}
        <Route path="/dept" element={<DeptRoutes />}>
          {/* Dashboard */}
          <Route path="dashboard" element={<DeptDashboardPage />} />
          <Route path="create-booking" element={<CreateBookingPage />} />
          <Route path="booking-history" element={<BookingHistoryPage />} />
          <Route
            path="booking-history/update-booking"
            element={<UpdateBookingPage />}
          />

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
