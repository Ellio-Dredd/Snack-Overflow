
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";


;


export default function Navbar() {
    return (
      
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Pharmacy</a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" ><Link to="/">Home</Link></a>
              </li>
              <li className="nav-item">
              <a className="nav-link" ><Link to="/Store">Store</Link></a>
              </li>
              <li className="nav-item">
              <a className="nav-link" ><Link to="/SelectAppointment">E-Channeling</Link></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" ><Link to="/Contact">Contact</Link></a>
              </li>
            </ul>
  
            {/* Right-Aligned Items */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Sign In</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Log In</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" ><Link to="/Cart"><ShoppingCartIcon/></Link></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>



     
    );
  }