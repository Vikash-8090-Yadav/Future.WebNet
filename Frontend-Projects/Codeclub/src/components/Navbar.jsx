import React from 'react'
import {Link} from "react-router-dom"
import "./navbar.css"
import { useState, useEffect} from 'react'
import Lo from "../img/logo.png"

const Navbar = () => {
  const [isMobile,setIsMobile] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`n ${isScrolled ? 'fade-out' : ''}`}>
        <img src={Lo} alt="" className="logo-img" />
        <h3 className="logo">Codeclub</h3>
        <ul className={isMobile? "nav-links-mobile" : "nav-links"}
        onClick={() => setIsMobile(false)}>
            <Link to ="/" className='n-items'>
                <li>Home</li>
            </Link>
            <Link to ="/" className='n-items'>
                <li>Resources</li>
            </Link>
            <Link to ="/" className='n-items'>
                <li>Blog</li>
            </Link>
            <Link to ="/" className='n-items'>
                <li>Contact</li>
            </Link>
            <Link to ="/" className='n-items'>
                <li>Log in</li>
            </Link>
            <Link to ="/" className='n-items'>
                <li>Sign up</li>
            </Link>
        </ul>
        <button className="mobile-menu"
        onClick={() => setIsMobile(!isMobile)}
        >
            {isMobile? 
            (<i className='fas fa-times'></i>) : 
            (<i className='fas fa-bars'></i>) 
            }
        </button>
    </nav>
  )
}

export default Navbar