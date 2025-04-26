import { StrictMode } from 'react'

import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './UserContext';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
     <StrictMode>
     <UserProvider>
      <App/>
      </UserProvider>
     </StrictMode>
  </BrowserRouter>
);


