import {  Routes, Route } from "react-router-dom";
import AdminFeedback from "./pages/AdminFeedback";
import Navbar from "./components/Navbar";
import Home from './pages/Home'
import Contact from './pages/Contact'
import Footer from "./components/Footer"
import Store from './pages/Store'
import AdminStore from './pages/AdminStore'
import EnterDetails from './pages/EnterDetails'
import SelectAppointment from './pages/SelectAppointment'
import AdminPanel from "./pages/AdminPanel";



export default function AppRouter() {
  return (
   
      <div className="container-fluid p-0 w-100">
        <Navbar />
        <div className="w-100">
          <Routes>
            <Route path="/" element={<Home />} />  {/* Add a default homepage */}
            <Route path="/AdminFeedback" element={<AdminFeedback />} />
            <Route path="/Contact" element={<Contact />} /> 
            <Route path="/Store" element={<Store />} /> 
            <Route path="/AdminStore" element={<AdminStore />} />  
            <Route path="/EnterDetails" element={<EnterDetails />} /> 
            <Route path="/SelectAppointment" element={<SelectAppointment />} /> 
            <Route path="/AdminPanel" element={<AdminPanel />} /> 

          </Routes>
        </div>
        <Footer/>
      </div>
   
  );
}