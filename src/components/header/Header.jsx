import React from 'react'
import { Link } from "react-router-dom";
import "./header.css"
import logo from "../../assets/logo.png"

function Header() {
    return (
        <>
          <div className="header">
            <div className="logo">
                <Link className="Link" to={'/'}>
                    <img alt="logo" src={logo}></img>
                </Link>
            </div>
            <div className="tagline">WE MINIMIZE E-WASTE</div>
          </div>  
        </>
    )
}

export default Header