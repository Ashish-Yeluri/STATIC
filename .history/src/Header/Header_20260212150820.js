import { Link } from 'react-router-dom'
import './Header.css';
import logo from '../Header/dw.avif'

export default function Header() {
  return (
    <>
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
        <Link to='/projects' className='headings'>
          Our Projects
        </Link>
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
    <reddiv>
      <h2>FREE SHIPPING & INSTALLATION
</h2>
    </reddiv>
    </>
  );
}
