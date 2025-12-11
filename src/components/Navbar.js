import React, { useState } from "react";
import '../styles/Navbar.css';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState("Guest");
    const [showLogin, setShowLogin] = useState(false);

    const goToFavorites = () => console.log("Go to favorites");
    const goToContact = () => console.log("Go to contact");
    const logOut = () => {
        setIsLoggedIn(false);
        setUser("Guest");
    };

    return (
        <>
            <header>
                <a href="#" className="logo">
                    <img
                        className="company-logo"
                        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                        alt="Movie DB Logo"
                    />
                </a>

                <input type="checkbox" className="nav-toggle" id="nav-toggle" />

            {/* Centered Menu */}
            <nav className="nav-center">
                <ul>
                    <li><a href="#" className="nav-link">Movies</a></li>
                    <li><a href="#" className="nav-link">TV Shows</a></li>
                    <li><a href="#" className="nav-link">People</a></li>
                    <li><a href="#" className="nav-link">More</a></li>
                </ul>
            </nav>

            {/* Right Side Buttons */}
            <div className="nav-right">
                {isLoggedIn && (
                    <button onClick={goToFavorites} className="button">Favorites</button>
                )}
                <button onClick={goToContact} className="button">Contact</button>
                {isLoggedIn ? (
                    <button onClick={logOut} className="button">Logout - {user}</button>
                ) : (
                    <button onClick={() => setShowLogin(true)} className="button">Login</button>
                )}
            </div>

            {/* <label htmlFor="nav-toggle" className="nav-toggle-label">
          <span></span>
        </label> */}
        </header >
        </>
    );
}
