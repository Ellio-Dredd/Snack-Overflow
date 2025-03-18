import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './components/Navbar.jsx';
import './App.css';
import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectAppointment from "./Pages/SelectAppointment";
import EnterDetails from "./Pages/EnterDetails";




function App() {
  return(
    <dev>
      <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<SelectAppointment />} />
        <Route path="/enter-details" element={<EnterDetails />} />
      </Routes>
    </Router>
    
    
    </dev>
    
  );
}

export default App
