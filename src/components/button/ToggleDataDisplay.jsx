import * as React from 'react';
import ShowChartIcon from '@mui/icons-material/ShowChart'; // Icono para gráficos
import TableChartIcon from '@mui/icons-material/TableChart'; // Icono para tablas
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import ViewComfyIcon from '@mui/icons-material/ViewComfy'; // Icono para ambos
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Paper from '@mui/material/Paper';

import Theme from '@/utils/themeProvider';

export default function ToggleDataDisplay({ onChartClick, onTableClick, onBothClick }) {
  const [view, setView] = React.useState(() => ['table']); // Valor inicial: 'chart'

  const handleViewChange = (event, newView) => {
    if (newView.length > 0) {
      setView(newView); // Actualiza el estado solo si no está vacío
      if (newView.includes('chart')) {
        onChartClick(); // Ejecuta el callback para gráficos
      }
      if (newView.includes('table')) {
        onTableClick(); // Ejecuta el callback para tablas
      }
      if (newView.includes('both')) {
        onBothClick(); // Ejecuta el callback para mostrar ambos
      }
    }
  };

  return (
    <Theme>
    <Paper elevation={1}>
      <ToggleButtonGroup
        value={view}
        onChange={handleViewChange}
        aria-label="view toggle"
        exclusive // Solo permite una opción activa a la vez
      >
        <ToggleButton value="table" aria-label="table view">
          <TableChartIcon />
        </ToggleButton>
        <ToggleButton value="chart" aria-label="chart view">
          <ShowChartIcon />
        </ToggleButton>
        <ToggleButton value="both" aria-label="both views">
          <LegendToggleIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      </Paper>
    </Theme>
  );
}
