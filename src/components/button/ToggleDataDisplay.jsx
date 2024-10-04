import * as React from 'react';
import ShowChartIcon from '@mui/icons-material/ShowChart'; // Icono para gráficos
import TableChartIcon from '@mui/icons-material/TableChart'; // Icono para tablas
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Theme from '@/utils/themeProvider';

export default function ToggleDataDisplay({ view, onViewChange }) {
  return (
    <Theme>
      <Paper elevation={1}>
        <ToggleButtonGroup
          value={view}
          onChange={onViewChange}
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
