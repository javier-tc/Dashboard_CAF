import React from 'react';
import Alert from '@mui/material/Alert';
import Theme from '@/utils/themeProvider';

const ThemedAlert = React.forwardRef((props, ref) => (
  <Theme>
    <Alert ref={ref} {...props} />
  </Theme>
));

export default ThemedAlert;
