import React from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./header.css"
import logo from "../../assets/logo.png"

function Header(props) {

  const {logOutHandle, isLogout} = props;

    return (
        // <Router>
          <div className="header">
            <div className="logo">
              <Link className="Link" to={'/'}>
                <img alt="logo" src={logo}></img>
              </Link>
            </div>
            {
              !isLogout && (
              <>
                <Link to={"/compose"}>Create Ad</Link>
                <Link to={"#"}>Update Ad</Link>
                <Link to={"#"}>Delete Ad</Link>
                <Link to={"#"} onClick={logOutHandle}>Signout</Link>
              </>                
            )}
            {
              isLogout && (
                <>
                  <Link to={"/signup"}>Register</Link>
                  <Link to={"/signin"}>Login</Link>
                </>
            )}
            <div className="tagline">WE MINIMIZE E-WASTE</div>
          </div>  
      /* </Router> */
    )
}

export default Header