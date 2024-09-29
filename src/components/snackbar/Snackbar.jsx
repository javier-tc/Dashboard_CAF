import React from 'react';
import { useSnackbar } from 'notistack';
import ThemedAlert from '@/components/alert/ThemedAlert';

// Componente reutilizable que se integra con notistack
export default function CustomSnackbar({ message, severity }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  React.useEffect(() => {
    // Encolar el Snackbar cuando se recibe el mensaje
    if (message) {
      enqueueSnackbar(message, {
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
    }
  }, [message, severity, enqueueSnackbar, closeSnackbar]);

  return null; // Este componente no necesita renderizar nada directamente
}
