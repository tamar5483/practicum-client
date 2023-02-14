import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Page from "./Page"
import UserContext from "./UserContext"
import UserForm from "./UserForm"
import Home from "./HomePage"
import Error from "./Error"
import Confirm from "./Confirm"
export default () => {
   return (<div>
      <BrowserRouter>
         <div style={{
            height: "20vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around"
         }}>
            <Link to="/" style={{ textDecoration: "none" }}>
               <h1 style={{ fontFamily: "Freestyle Script", color: "black",fontSize:"8vh" }}>Wellcome to our web site!</h1></Link>
         </div>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/Form" className="nav-link" style={{ flexGrow: "1", textAlign: "center" }}>Form</Link>
            <Link to="/Page" className="nav-link" style={{ flexGrow: "1", textAlign: "center" }}>Page</Link>
            </nav>
         <Routes>
            {/* <Route exact path="/" element={<Home />} /> */}
            <Route path="/Page" element={<Page />} />
            <Route path="/Confirm" element={<Confirm />} />
            {/* <Route path="/Error/:messege" element={<Error />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/Form" element={<UserForm />} />
         </Routes>

      </BrowserRouter>

   </div>)
}