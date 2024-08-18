import React, { useState, useEffect, useRef } from 'react';
import { appleImg, bagImg, searchImg } from '../utils/index.js';
import { navLists } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  // State to track if the navbar is open or closed
  const [isOpen, setIsOpen] = useState(false);
  // State to track if the viewport is mobile-sized
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // Ref to keep a reference to the navbar element
  const navbarRef = useRef(null);

  // Function to toggle the navbar open or closed
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the navbar
  const closeNavbar = () => {
    setIsOpen(false);
  };

  // useEffect hook to add event listeners and cleanup on unmount
  useEffect(() => {
    // Function to handle window resize events
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      closeNavbar();
    };

    // Function to handle window scroll events
    const handleScroll = () => {
      closeNavbar();
    };

    // Function to handle clicks outside the navbar
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeNavbar();
      }
    };

    // Add event listeners for resize, scroll, and clicks outside
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className='w-full py-5 sm:px-10 px-5 flex flex-col items-center'>
      <nav className='flex w-full items-center justify-between' ref={navbarRef}>
        {/* Apple logo */}
        <img src={appleImg} alt="Apple" width={14} height={18} className='cursor-pointer' />
        {/* Navbar items, hidden on mobile */}
        <div style={{ display: isMobile ? 'none' : 'flex', flex: 1, justifyContent: 'center' }}>
          {navLists.map((nav) => (
            <div key={nav} className='px-5 text-sm cursor-pointer text-gray hover:text-white transition-all'>
              {nav}
            </div>
          ))}
        </div>
        {/* Search and bag icons, plus hamburger button for mobile */}
        <div className='flex items-center gap-7 cursor-pointer'>
          <img src={searchImg} alt="search" width={18} height={18} />
          <img src={bagImg} alt="bag" width={18} height={18} />
          <button onClick={toggleNavbar} style={{ display: isMobile ? 'block' : 'none' }}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </nav>
      {/* Dropdown menu for mobile */}
      {isOpen && isMobile && (
        <div className='flex flex-col items-center w-full mt-2 '>
          {navLists.map((nav) => (
            <div key={nav} className='py-2 text-sm cursor-pointer text-gray hover:text-white transition-all'>
              {nav}
            </div>
          ))}
        </div>
      )}
      {/* Additional content that should move down when the navbar is open */}
      
    </header>
  );
};

export default Navbar;
