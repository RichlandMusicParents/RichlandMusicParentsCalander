import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <div className="nav-header">
      <Link to="/splashPage">
        
        <h2 className="nav-title">Richland Music Parents</h2>
      </Link>
      <div className="nav-logo"
       style={{
        backgroundImage: `url("https://richland44musicparents.square.site/uploads/b/0261a3f50b59d2b6ae3c698e34e64a45ad2d45bcdc4cabe091edfd3c5449d46a/Richland%20Music%20Parents%20Logo_1651086122.png")`,
      }}>
      </div>
      </div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && user.is_admin === true ? (
          <>
            <Link className="navLink" to="/userform">
              Home
            </Link>

            <Link className="navLink" to="/admin-home">
              Admin
            </Link>


            <LogOutButton className="navLink" />
          </>
        ) : (
          <>
            <Link className="navLink" to="/userform">
              Home
            </Link>
           
            <LogOutButton className="navLink" />
          </>
        )}

      </div>
    
  );
}

export default Nav;
