import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ label, options, value, onChange }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl 
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'var(--foreground)', // Color por defecto
            },
            '&:hover fieldset': {
              borderColor: 'var(--secondary)', // Color al pasar el cursor
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--primary)', // Color cuando está seleccionado
            },
          },
          '& .MuiInputLabel-root': {
            color: 'var(--foreground)', // Color del label por defecto
            '&.Mui-focused': {
              color: 'var(--primary)', // Color del label cuando está enfocado
            },
          },
        }}
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
            minWidth: '180px',
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
  );
}
