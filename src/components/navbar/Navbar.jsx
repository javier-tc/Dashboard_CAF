import React from 'react';
import styles from './navbar.module.css';
import Link from 'next/link';

//
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../logo/Logo';

const Navbar = ({ handleClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Logo />
        <button className={styles.menuButton} onClick={handleClick}>
          <MenuIcon />
        </button>
      </div>
      <div className={styles.utilsContainer}>
        {/* Aquí puedes agregar otros elementos del Navbar si es necesario */}
      </div>
    </div>
  );
};

export default Navbar;
