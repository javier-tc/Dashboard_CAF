import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({ label, options, selectedValues, onChange }) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    onChange(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <FormControl
      sx={{
        m: 0,
        // width: '100%',
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
    // variant='filled'
    >
      <InputLabel id="multiple-checkbox-label">{label}</InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        id="multiple-checkbox"
        multiple
        value={selectedValues}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}

        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={selectedValues.includes(option.value)} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
