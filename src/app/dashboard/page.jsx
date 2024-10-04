//src/app/dashboard/page.jsx
"use client";

import { useState, useEffect, useCallback } from 'react';
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

// Dnd-kit
// import {
//   arrayMove,
// } from '@dnd-kit/sortable';

const Dashboard = () => {
  const [snackbar, setSnackbar] = useState({ message: "", severity: "", id: null });
  const [dataDisplayMode, setDataDisplayMode] = useState('table');
  const [dataComponents, setDataComponents] = useState([]);
  const [loading, setLoading] = useState(false);


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
        id: `component-${Date.now()}`, // Generar un ID único con timestamp
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
  }, [showSnackbar])

  // const handleDragEnd = useCallback((event) => {
  //   const { active, over } = event;

  //   if (active.id !== over.id) {
  //     setDataComponents((items) => {
  //       const oldIndex = items.findIndex((item) => item.id === active.id);
  //       const newIndex = items.findIndex((item) => item.id === over.id);

  //       return arrayMove(items, oldIndex, newIndex);
  //     });
  //   }
  // }, []);



  return (
    <SnackbarProvider
      maxSnack={2}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      preventDuplicate={false}
    >
      <div className={styles.container}>
        <FetchDataCard handleAddQuery={handleAddQuery} loading={loading} />

        <div className={styles.toggleContainer}>
          {dataComponents.length === 0 ? (
            <ThemedAlert severity="info">Debe realizar una consulta para mostrar información.</ThemedAlert>
          ) : (
            <ToggleDataDisplay
              view={dataDisplayMode} // Pasar el modo actual de visualización
              onViewChange={handleViewChange} // Manejar el cambio de visualización
            />
          )}
        </div>

        <DataCard
          dataComponents={dataComponents}
          dataDisplayMode={dataDisplayMode}
          handleRemoveComponent={handleRemoveComponent}
          // handleDragEnd={handleDragEnd}
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
