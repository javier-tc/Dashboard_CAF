import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Theme from '@/utils/themeProvider';

import styles from './basicselect.module.css';

export default function BasicSelect({ label, options, value, onChange }) {
  return (
    <Theme>
      <div className={styles.selectContainer}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl
            fullWidth
          >
            <InputLabel
              id="basic-select-label"
              sx={{
                display: 'block',
                textOverflow: 'ellipsis',
              }}
            >
              {label}
            </InputLabel>
            <Select
              labelId="basic-select-label"
              id="basic-select"
              value={value}
              label={label}
              onChange={onChange}
              sx={{
                minWidth: '200px',
              }}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </Theme>
  );
}
