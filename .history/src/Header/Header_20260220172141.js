import { Link } from 'react-router-dom'
import './Header.css';
import logo from '../Header/dw.avif'
import { FaTruck, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';


export default function Header() {
   const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className='top-section'>
      <header className='header'>
        {/* Left - Logo */}
        <div className='header-left'>
           <Link to="/">
          <img src={logo} alt='Design Walls Logo' className='logo' />
           </Link>
        </div>

        {/* Center - Menu */}
        <nav className='header-center'>
          <NavLink
            to='/about'
            className={({ isActive }) =>
              isActive ? 'headings active-link' : 'headings'
            }
          >
            About Us
          </NavLink>

          <NavLink
            to='/products'
            className={({ isActive }) =>
              isActive ? 'headings active-link' : 'headings'
            }
          >
            Products
          </NavLink>

          <NavLink
            to='/catalogue'
            className={({ isActive }) =>
              isActive ? 'headings active-link' : 'headings'
            }
          >
            Catalogue
          </NavLink>

          <div
            className='dropdown-wrapper'
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span
              className='headings'
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: 'pointer' }}
            >
              Our Projects{' '}
              {showDropdown ? (
                <FaChevronUp size={12} />
              ) : (
                <FaChevronDown size={12} />
              )}
            </span>
            {showDropdown && (
              <div className='dropdown-menu'>
                <NavLink to='/projects/wallpapers' className='dropdown-item' onClick={() => setShowDropdown(false)}>
                  Wallpapers
                </NavLink>
                <NavLink to='/projects/blinds' className='dropdown-item'>
                  Blinds
                </NavLink>
                <NavLink to='/projects/curtains' className='dropdown-item'>
                  Curtains
                </NavLink>
                <NavLink to='/projects/upholstery' className='dropdown-item'>
                  Upholstery
                </NavLink>
              </div>
            )}
          </div>

          <NavLink
            to='/blog'
            className={({ isActive }) =>
              isActive ? 'headings active-link' : 'headings'
            }
          >
            Blog
          </NavLink>

          <NavLink
            to='/contact'
            className={({ isActive }) =>
              isActive ? 'headings active-link' : 'headings'
            }
          >
            Contact Us
          </NavLink>



        </nav>

        {/* Right - Contact */}
        <div className='header-right'>
          <span>📞 +91 98765 43210</span>
        </div>
      </header>
      <div className='shipping-banner'>
        <h2>
          FREE SHIPPING & INSTALLATION <FaTruck className='shipping-icon' />
        </h2>
      </div>
    </div>
  );
}
