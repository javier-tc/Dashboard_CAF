import React from 'react';
import Card from '@mui/material/Card';

import styles from './maincard.module.css'

const Maincard = ({children}) => {
  return (
    <div className={styles.container}>
        <Card
            sx={{
                padding: '20px'
            }}
        >
            {children}
        </Card>
    </div>
  )
}

export default Maincard