"use client";
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './menu.module.css';

// Components
import Navbar from '../navbar/Navbar';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Logo from '../logo/Logo';

const links = [
  {
    name: "Home",
    path: "/",
    icon: <HomeIcon />
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />
  }
];

const Menu = () => {
  const router = useRouter();
  const pathname = usePathname();

  // State to track the menu visibility
  const [menuVisible, setMenuVisible] = useState(false);

  const handleClick = () => {
    setMenuVisible(!menuVisible); // Toggle the menu visibility
  };

  // Close menu when clicking outside
  const handleOutsideClick = (e) => {
    if (menuVisible && !document.querySelector(`.${styles.menuContainer}`).contains(e.target)) {
      setMenuVisible(false); // Hide menu when clicking outside
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [menuVisible]);

  return (
    <div className={styles.mainContainer}>
      <Navbar handleClick={handleClick} />
      <div className={`${styles.menuContainer} ${menuVisible ? styles.show : styles.hide}`}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.linksContainer}>
          {links.map((link, index) => (
            <div key={index} onClick={() => router.push(link.path)}>
              <div
                className={`${styles.link} ${pathname === link.path ? styles.active : ''}`}
              >
                {link.icon}
                <span className={styles.linkText}>{link.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {menuVisible && <div className={`${styles.overlay} ${menuVisible ? styles.showOverlay : ''}`} onClick={handleClick} />}
    </div>
  );
};

export default Menu;
