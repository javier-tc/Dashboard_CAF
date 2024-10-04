"use client";

import React from 'react'
import styles from './titlecard.module.css'
import Maincard from './Maincard'
import { usePathname } from 'next/navigation';

const TitleCard = () => {
    const pathname = usePathname();

    const title = pathname.replace('/', '').charAt(0).toUpperCase() + pathname.replace('/', '').slice(1);
    return (
        <div className={styles.titleContainer}>
            <Maincard>
                <h2> {title === '' ? 'Home' : title} </h2>
            </Maincard>
        </div>
    )
}

export default TitleCard