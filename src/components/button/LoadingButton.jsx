import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Theme from '@/utils/themeProvider';

export default function LoadingButtons({loading = false, text = "Save", icon = <SaveIcon />, onClick}) {
  return (
    <Theme>
      <LoadingButton
        loading = {loading}
        loadingPosition="start"
        startIcon={icon}
        variant="contained"
        onClick={onClick}
        sx={{ width: 'auto' }}
      >
        {text}
      </LoadingButton>
    </Theme>
  );
}
