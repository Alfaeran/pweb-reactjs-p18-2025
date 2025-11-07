import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface NavbarProps {
  userEmail?: string
  onLogout?: () => void
}

const Navbar: React.FC<NavbarProps> = ({ userEmail = 'user@example.com', onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    if (onLogout) onLogout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/books" className="navbar-logo">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 3C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H4ZM4 5H8V19H4V5ZM10 5H20V19H10V5ZM12 7V17H18V7H12Z" fill="var(--gold)"/>
          </svg>
          Hogwarts Library
        </Link>

        {/* Navigation Links */}
        <div className="navbar-menu">
          <Link to="/books" className="navbar-link">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 3C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H4ZM12 5V19M4 5H20V7H4V5Z" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Books Collection
          </Link>
          <Link to="/transactions" className="navbar-link">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3H21C21.55 3 22 3.45 22 4V20C22 20.55 21.55 21 21 21H3C2.45 21 2 20.55 2 20V4C2 3.45 2.45 3 3 3ZM4 5V19H20V5H4ZM6 10H18V12H6V10ZM6 14H18V16H6V14Z" fill="var(--gold)"/>
            </svg>
            My Transactions
          </Link>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          <span className="user-email">{userEmail}</span>
          <button className="logout-btn" onClick={handleLogout}>
            <svg className="logout-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L23 11L17 5M4 5H10V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H10V19H4V5Z" fill="var(--parchment)"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
