import React from 'react'

import styles from './logo.module.css'
import Link from 'next/link';

import ForestIcon from '@mui/icons-material/Forest';


const Logo = () => {
    return (
        <Link href="/" className={styles.logo}>
            <ForestIcon />
            Logo
        </Link>
    )
}

export default Logo