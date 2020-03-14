import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar-component">
            <div className="navbar-logo">
                <Link to="/">WeConnect</Link>
            </div>
        </div>
    )
}

export default Navbar;
