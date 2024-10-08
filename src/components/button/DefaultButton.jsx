import React from 'react';
import { Button } from '@mui/material';
import Theme from '@/utils/themeProvider';

const DefaultButton = ({ onClick, disabled = false, variant = "contained", children}) => {
    return (
        <Theme>
            <Button
                onClick={onClick}
                disabled={disabled}
                variant={variant}
                sx={{ minWidth: "40px", padding: "10px", fontSize: { xs: "0.75rem", md: "0.9rem"} }}
            >
                {children}
            </Button>
        </Theme>
    )
}

export default DefaultButton