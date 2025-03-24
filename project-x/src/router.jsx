import {  Routes, Route } from "react-router-dom";
import AdminFeedback from "./pages/AdminFeedback";
import Navbar from "./components/Navbar";
import Home from './pages/Home'
import Contact from './pages/Contact'
import Footer from "./components/Footer"
import Store from './pages/Store'
import AdminStore from './pages/AdminStore'


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
          </Routes>
        </div>
        <Footer/>
      </div>
   
  );
}