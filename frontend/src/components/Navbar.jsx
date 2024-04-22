import { NavLink, Link } from "react-router-dom"
import { FaBook } from 'react-icons/fa'
import "../styles/navbar.css"
import { ACCESS_TOKEN } from '../constants'
import { useState, useEffect } from "react"
import { jwtDecode } from 'jwt-decode'


const Navbar = () => {

  const linkclass = ({ isActive }) => isActive ? "nav-link nav-active": "nav-link"
  const token = localStorage.getItem(ACCESS_TOKEN);
  const [ loggedInFirstName, setLoggedInFirstName ] = useState("");
  

  useEffect(() => {

    if (token) {
      const decoded = jwtDecode(token);
      const firstName = decoded.first_name.charAt(0).toUpperCase() + decoded.first_name.slice(1);
      setLoggedInFirstName(firstName);
    }
  },[token]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
            <NavLink to="/"><FaBook className="book-icon"/></NavLink>
            <NavLink className="navbar-brand" to="/">Books</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                  <NavLink className={ linkclass } to="/">Home</NavLink>
                  <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle drop-nav" data-bs-toggle="dropdown" aria-expanded="false">
                      Genre
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li><Link type="button" className="dropdown-item" to="/genre/Drama">Drama</Link></li>
                      <li><Link type="button" className="dropdown-item" to="/genre/Psychology">Psychology</Link></li>
                      <li><Link type="button" className="dropdown-item" to="/genre/Self-Help">Self-Help</Link></li>
                      <li><Link type="button" className="dropdown-item" to="/genre/Classic">Classic</Link></li>
                      <li><Link type="button" className="dropdown-item" to="/genre/Horror">Horror</Link></li>
                      <li><Link type="button" className="dropdown-item" to="/genre/History">History</Link></li>
                      <li><Link type="button" className="dropdown-item" to="/genre/Romance">Romance</Link></li>
                      <li><Link type="button" className="dropdown-item" to="/genre/Non-Fiction">Non-Fiction</Link></li>
                      <li><Link type="button" className="dropdown-item" to="/genre/Mystery">Mystery</Link></li>
                      <li><Link type="button" className="dropdown-item" to="/genre/Fiction">Fiction</Link></li>
                      <li><Link type="button" className="dropdown-item" to="/genre/Poetry">Poetry</Link></li>
                    </ul>
                  </li>
                  <NavLink className={ linkclass } to="/mybooks">My Books</NavLink>
              </div>
              
              <div className="login-btn-container navbar-collapse">
              { token &&  
                    <li className="nav-item dropdown login-dropdown">
                      <NavLink className="nav-link dropdown-toggle drop-nav login-btn" data-bs-toggle="dropdown" aria-expanded="false">
                      {loggedInFirstName}
                      </NavLink>
                      <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                        <li><Link type="button" className="dropdown-item" to="/mybooks">My Books</Link></li>
                        <li><a type="button" className="dropdown-item" href="/mybooks/logout">Logout</a></li>
                      </ul>
                    </li>
                  }
                 </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar

