import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';

export default function GroupedSelect({ label, categories, defaultValue, onChange }) {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">{label}</InputLabel>
        <Select
          value={defaultValue || ""}
          id="grouped-select"
          label={label}
          onChange={onChange}
        >
          {categories.flatMap((category) => [
            <ListSubheader key={category.label}>{category.label}</ListSubheader>,
            ...category.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            )),
          ])}
        </Select>
      </FormControl>
    </div>
  );
}
