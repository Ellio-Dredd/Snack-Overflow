import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import AdminFeedback from "./pages/AdminFeedback";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar"; // Make sure this import is correct
import Home from './pages/Home';
import Contact from './pages/Contact';
import Footer from "./components/Footer";
import Store from './pages/Store';
import AdminStore from './pages/AdminStore';
import EnterDetails from './pages/EnterDetails';
import SelectAppointment from './pages/SelectAppointment';
import AdminPanel from "./pages/AdminPanel";
import Cart from "./pages/Cart";
import CredentialsSignInPage from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import OrderConfirmation from "./pages/OrderConfirmation";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import { UserContext } from "./UserContext";
import Deliver from "./pages/Deliver";

import AdminDelivery from "./pages/AdminDelivery"; // Adjust the import based on your file structure;


export default function AppRouter() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  
  // Check if route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // Check if user is an admin - adjust this based on your user data structure
  const isAdmin = user && (user.role === 'admin' || user.isAdmin === true);
  
  // For debugging - remove this in production
  console.log('Current path:', location.pathname);
  console.log('Is admin route:', isAdminRoute);
  console.log('User:', user);
  console.log('Is admin:', isAdmin);
  
  // Determine which navbar to show
  const showAdminNavbar = isAdminRoute && isAdmin;

  return (
    <div className="container-fluid p-0 w-100">
      {/* Show AdminNavbar only when it's an admin route AND the user is an admin */}
      {showAdminNavbar ? <AdminNavbar /> : <Navbar />}
      
      <div className="w-100">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Store" element={<Store />} />
          <Route path="/EnterDetails" element={<EnterDetails />} />
          <Route path="/SelectAppointment" element={<SelectAppointment />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/SignIn" element={<CredentialsSignInPage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
          <Route path="/Deliver" element={<Deliver />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/feedback" element={<AdminRoute><AdminFeedback /></AdminRoute>} />
          <Route path="/admin/store" element={<AdminRoute><AdminStore /></AdminRoute>} />
          <Route path="/admin/panel" element={<AdminRoute><AdminPanel /></AdminRoute>} />

          <Route path="/admin/deliveries" element={<AdminDelivery />} />

        </Routes>
      </div>
      <Footer/>
    </div>
  );
}