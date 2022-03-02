import React from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./header.css"
import logo from "../../assets/logo.png"

function Header(props) {

  const {logOutHandle, isLogout} = props;

    return (
          <div className="header">
            <div className="logo">
              <Link className="Link" to={'/'}>
                <img alt="logo" src={logo}></img>
              </Link>
            </div>
            {
              !isLogout && (
              <div className="tabs">
                <div className="tab-i">
                  <Link to={"/compose"} className="Link">CREATE AD</Link>
                </div>
                <div className="tab-i">
                  <Link to={"/update"} className="Link">UPDATE AD</Link>
                </div>
                <div className="tab-i">
                  <Link to={"/delete"} className="Link">DELETE AD</Link>
                </div>
                <div className="tab-i">
                  <Link to={"#"} onClick={logOutHandle} className="Link">SIGNOUT</Link>
                </div>
              </div>                
            )}
            {
              isLogout && (
                <div className="tabs">
                  <div className="tab-i">
                    <Link to={"/signup"} className="Link">SIGN UP</Link>
                  </div>
                  <div className="tab-i">
                    <Link to={"/signin"} className="Link">SIGN IN</Link>
                  </div>
                </div>
            )}
          </div>  
    )
}

export default Header