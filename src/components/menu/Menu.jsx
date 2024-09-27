"use client";
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './menu.module.css';
import Link from 'next/link';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';

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

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Link href="/"> Logo </Link>
      </div>
      <hr />
      <div className={styles.linksContainer}>
        {links.map((link, index) => (
          <div key={index} onClick={() => router.push(link.path)}>
            <div
              className={`${styles.link} ${
                pathname === link.path ? styles.active : ''
              }`}
            >
              {link.icon}
              <span className={styles.linkText}>{link.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
