import React from 'react';
import Card from '@mui/material/Card';

import styles from './maincard.module.css'

const Maincard = ({children, sx}) => {
  return (
    <div className={styles.container}>
        <Card
            sx={{
                padding: '10px',
                boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                ...sx
            }}
        >
            {children}
        </Card>
    </div>
  )
}

export default Maincard