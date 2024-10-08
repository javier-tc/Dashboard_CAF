import Theme from '@/utils/themeProvider';
import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/system';

const CustomCheckbox = styled(Checkbox)({
  '&.Mui-checked': {
    transition: 'transform 0.1s ease',
    transform: 'scale(1.1)',
  },
});

const DefaultCheckbox = ({ checked, onChange }) => {
  return (
    <Theme>
      <CustomCheckbox
        checked={checked}
        onChange={onChange}
        sx={{
          width: '30px',
          height: '30px',
        }}
      />
    </Theme>
  );
};

export default DefaultCheckbox;
