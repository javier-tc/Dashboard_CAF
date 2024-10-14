"use client";

import { useState, useCallback } from 'react';
import styles from './page.module.css';
import api from '@/config/axiosConfig'; // Importa la configuración de Axios

// Components
import ToggleDataDisplay from '@/components/button/ToggleDataDisplay'; // El componente toggle para alternar entre gráficos y tablas
import CustomSnackbar from '@/components/snackbar/Snackbar';
import ThemedAlert from '@/components/alert/ThemedAlert';
import DataCard from './(components)/DataCard';
import FetchDataCard from './(components)/FetchDataCard';

// Notistack
import { SnackbarProvider } from 'notistack';
import DefaultButton from '@/components/button/DefaultButton';

//icons
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

//utils
import downloadPDF from '@/utils/downloadComponent';

const Dashboard = () => {
  const [snackbar, setSnackbar] = useState({ message: "", severity: "", id: null });
  const [dataDisplayMode, setDataDisplayMode] = useState('table');
  const [dataComponents, setDataComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState([]);

  const showSnackbar = (message, severity) => {
    setSnackbar({ message, severity, id: Date.now() });
  };

  const handleViewChange = (event, newView) => {
    if (newView) {
      setDataDisplayMode(newView);
    }
  };

  const handleAddQuery = async () => {
    setLoading(true);

    try {
      const response = await api.get('/api/data');
      const data = response.data;

      const newComponent = {
        id: `component-${Date.now()}`,
        dataset: data.dataset,
        xAxisData: data.xAxisData,
        yAxisData: data.yAxisData,
        yAxisTitle: data.yAxisTitle,
        dataTable: data.dataTable,
        columnGroups: data.columnGroups,
        columns: data.columns,
      };

      setDataComponents(prevComponents => [...prevComponents, newComponent]);
      showSnackbar(`Se ha agregado la consulta con ID ${newComponent.id}.`, "success");
    } catch (err) {
      showSnackbar(err.message, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleRemoveComponent = useCallback((id) => {
    setDataComponents(prevComponents => prevComponents.filter(comp => comp.id !== id));
    showSnackbar(`Se ha eliminado la consulta con ID ${id}.`, "error");
  }, [showSnackbar]);

  // Manejar selección de componentes
  const handleSelectComponent = (id) => {
    setSelectedComponents((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter(compId => compId !== id) : [...prevSelected, id]
    );
    showSnackbar(`Se ha seleccionado la consulta con ID ${id}.`, "info");
  };

  // Manejar selección de todos los componentes
  const handleSelectAllComponents = () => {
    if (selectedComponents.length === dataComponents.length) {
      setSelectedComponents([]); // Deseleccionar todos si ya están seleccionados
      showSnackbar("Se han deseleccionado todas las consultas.", "info");
    } else {
      setSelectedComponents(dataComponents.map(comp => comp.id)); // Seleccionar todos
      showSnackbar("Se han seleccionado todas las consultas.", "info");
    }
  };

  // Manejar eliminación de componentes seleccionados
  const handleRemoveSelectedComponents = () => {
    setDataComponents((prevComponents) => prevComponents.filter(comp => !selectedComponents.includes(comp.id)));
    setSelectedComponents([]);
    showSnackbar("Se han eliminado las consultas seleccionadas.", "error");
  };

  const handleDownloadSelectedComponents = () => {
    const selectedDataComponents = dataComponents.filter(comp => selectedComponents.includes(comp.id));
    downloadPDF(selectedDataComponents);
    showSnackbar("Se está generando el PDF.", "info");
  };
  

  const handleDownloadComponent = (selectedComponents) => {
    downloadPDF(selectedComponents);
    showSnackbar("Se está generando el PDF.", "info");
  }

  return (
    <SnackbarProvider
      maxSnack={2}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      preventDuplicate={false}
      autoHideDuration={2000}
    >
      <div className={styles.container}>
        <FetchDataCard handleAddQuery={handleAddQuery} loading={loading} />

        <div className={styles.buttonContainer}>
          {dataComponents.length === 0 ? (
            <div className={styles.alert}>
              <ThemedAlert severity="info">Debe realizar una consulta para mostrar información.</ThemedAlert>
            </div>
          ) : (
            <>
              <div className={styles.selectButtonContainer}>
                <DefaultButton
                  onClick={handleSelectAllComponents}
                  variant="contained"
                  title = "Seleccionar todos"
                >
                  <div className={styles.buttonText}>
                    {selectedComponents.length === dataComponents.length ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                    {/* {selectedComponents.length === dataComponents.length ? "Deseleccionar todos" : "Seleccionar todos"} */}
                  </div>
                </DefaultButton>
                <DefaultButton
                  onClick={handleDownloadSelectedComponents}
                  disabled={selectedComponents.length === 0}
                  variant="contained"
                  title = "Descargar seleccionados"
                >
                  {<DownloadIcon />}
                </DefaultButton>
                <DefaultButton
                  onClick={handleRemoveSelectedComponents}
                  disabled={selectedComponents.length === 0}
                  variant="contained"
                  title = "Eliminar seleccionados"
                >
                  {<DeleteIcon />}
                </DefaultButton>
              </div>
              <div className={styles.dataDisplayModeContainer}>
                <ToggleDataDisplay
                  view={dataDisplayMode}
                  onViewChange={handleViewChange}
                />
              </div>
            </>
          )}
        </div>

        <DataCard
          dataComponents={dataComponents}
          dataDisplayMode={dataDisplayMode}
          handleRemoveComponent={handleRemoveComponent}
          selectedComponents={selectedComponents}
          handleSelectComponent={handleSelectComponent}
          handleDownloadComponent={handleDownloadComponent}
        />

        {snackbar.message && (
          <CustomSnackbar
            message={snackbar.message}
            severity={snackbar.severity}
            id={snackbar.id}
          />
        )}

      </div>
    </SnackbarProvider>
  );
};

export default Dashboard;
