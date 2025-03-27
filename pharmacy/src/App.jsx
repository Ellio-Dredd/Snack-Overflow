import AdminNavbar  from "./AdminNavbar";
import SignUp from "./SignUp"
import CredentialsSignInPage from "./SignIn";
import { useState } from "react";

const App = () => {
  return (
    <div>
       <AdminNavbar/>  
       {/* <CredentialsSignInPage/> */}
       <SignUp/>
    </div>
  );
}
export default App 
