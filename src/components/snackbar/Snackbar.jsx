import React, { useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';
import ThemedAlert from '@/components/alert/ThemedAlert';

export default function CustomSnackbar({ message, severity, id }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const shownMessagesRef = useRef(new Set());

  useEffect(() => {
    if (message && !shownMessagesRef.current.has(id)) {
      enqueueSnackbar(message, {
        variant: severity,
        persist: false,
        key: id,
        content: (key) => (
          <ThemedAlert
            severity={severity}
            variant="filled"
            onClose={() => closeSnackbar(key)}
            sx={{ width: '100%' }}
          >
            {message}
          </ThemedAlert>
        ),
      });
      shownMessagesRef.current.add(id);
    }
  }, [message, severity, id, enqueueSnackbar, closeSnackbar]);

  return null;
}