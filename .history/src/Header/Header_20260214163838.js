import { Link } from 'react-router-dom'
import './Header.css';
import logo from '../Header/dw.avif'
import { FaTruck } from "react-icons/fa";
import { useState } from 'react';


export default function Header() {
   const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className='top-section'>
     <header className='header'>
      {/* Left - Logo */}
      <div className='header-left'>
        <img src={logo} alt='Design Walls Logo' className='logo' />
      </div>

      {/* Center - Menu */}
      <nav className='header-center'>
        <Link to='/about' className='headings'>
          About Us
        </Link>
        <Link to='/products' className='headings'>
          Products
        </Link>
        <Link to='/catalogue' className='headings'>
          Catalogue
        </Link>
        <div 
          className='dropdown-wrapper'
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span
              className='headings'
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: "pointer" }}
            >
              Our Projects{" "}
              {showDropdown ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
            </span>
          {showDropdown && (
            <div className='dropdown-menu'>
              <Link to='/projects/wallpapers' className='dropdown-item'>Wallpapers</Link>
              <Link to='/projects/blinds' className='dropdown-item'>Blinds</Link>
              <Link to='/projects/curtains' className='dropdown-item'>Curtains</Link>
              <Link to='/projects/upholstery' className='dropdown-item'>Upholstery</Link>
            </div>
          )}
        </div>
        <Link to='/blog' className='headings'>
          Blog
        </Link>
        <Link to='/contact' className='headings'>
          Contact Us
        </Link>
      </nav>

      {/* Right - Contact */}
      <div className='header-right'>
        <span>📞 +91 98765 43210</span>
      </div>
     </header>
      <div className="shipping-banner">
      <h2>FREE SHIPPING & INSTALLATION  <FaTruck className="shipping-icon" /></h2>
      </div>
    </div>
  );
}
