//src/app/dashboard/page.jsx

"use client";

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import dynamic from 'next/dynamic';

import api from '@/config/axiosConfig'; // Importa la configuración de Axios

// Components
import Maincard from '@/components/card/Maincard';
import BasicSelect from '@/components/select/BasicSelect';
import MultipleSelectCheckmarks from '@/components/select/MultipleSelectCheckmarks';
import ToggleDataDisplay from '@/components/button/ToggleDataDisplay'; // El componente toggle para alternar entre gráficos y tablas
import BasicTable from '@/components/table/BasicTable';
import CustomSnackbar from '@/components/snackbar/Snackbar';
import ThemedAlert from '@/components/alert/ThemedAlert';
import LoadingButtons from '@/components/button/LoadingButton';

//icon
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { SnackbarProvider } from 'notistack';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

// Importar el componente dinámicamente solo en el cliente
const BasicLineChart = dynamic(() => import('@/components/charts/BasicLineChart'), { ssr: false });

const Dashboard = () => {
  const [snackbar, setSnackbar] = useState({ message: "", severity: "", id: null });

  const showSnackbar = (message, severity) => {
    setSnackbar({ message, severity, id: Date.now() });
  };

  // Estados para guardar los datos obtenidos del backend
  const [years, setYears] = useState([]);
  const [fundos, setFundos] = useState([]);
  const [predios, setPredios] = useState([]);
  const [sectores, setSectores] = useState({});
  const [atributos1, setAtributos1] = useState([]);
  const [atributos2, setAtributos2] = useState([]);

  // Estados para selecciones de usuario
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedFundo, setSelectedFundos] = useState("");
  const [selectedPredios, setSelectedPredios] = useState([]);
  const [selectedSectores, setSelectedSectores] = useState({});
  const [atributo1, setAtributo1] = useState("");
  const [atributo2, setAtributo2] = useState("");

  // Manejo de la visualización de gráficos y tablas
  const [dataDisplayMode, setDataDisplayMode] = useState('tables');
  const [dataComponents, setDataComponents] = useState([]);

  // Estado de carga y errores
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener datos de la API (reemplaza '/api/years', '/api/fundos', etc. por tus rutas reales)
  useEffect(() => {
    const fetchSelectors = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/selectors'); // Usando axios en lugar de fetch
        const data = response.data;

        setYears(data.years);
        setFundos(data.fundos);
        setPredios(data.predios);
        setSectores(data.sectores);
        setAtributos1(data.atributos1);
        setAtributos2(data.atributos2);
      } catch (err) {
        setError('Error al obtener datos del servidor');
      } finally {
        setLoading(false);
      }
    };
    fetchSelectors();
  }, []);

  // Manejo de cambios en las selecciones
  const handleChangeYear = (event) => setSelectedYear(event.target.value);
  const handleChangeFundo = (event) => setSelectedFundos(event.target.value);
  const handleChangePredios = (newValues) => setSelectedPredios(newValues);
  const handleChangeSectores = (predio, event) => setSelectedSectores(prevState => ({ ...prevState, [predio]: event.target.value }));
  const handleChangeAtributo1 = (event) => setAtributo1(event.target.value);
  const handleChangeAtributo2 = (event) => setAtributo2(event.target.value);

  // Manejo de gráficos y tablas
  const handleChartClick = () => setDataDisplayMode('charts');
  const handleTableClick = () => setDataDisplayMode('tables');
  const handleBothClick = () => setDataDisplayMode('both');


  // Manejo de componentes de consultas
  const handleAddComponent = async () => {
    setLoading(true);
    
    try {
      const response = await api.get('/api/data');
      const data = response.data;

      const newComponent = {
        id: Date.now(), // Generar un ID único con timestamp
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
      }, 2000);
    }
  };

  useEffect(() => {
    if (!loading) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [dataComponents, loading]);

  const handleRemoveComponent = (id) => {
    setDataComponents(dataComponents.filter(comp => comp.id !== id));
    showSnackbar(`Se ha eliminado la consulta con ID ${id}.`, "error");
  };

  // if (loading) return <p>Cargando datos...</p>;
  // if (error) return <p>{error}</p>;

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
        <div className={styles.titleContainer}>
          <Maincard>
            <h2> Dashboard </h2>
          </Maincard>
        </div>
        <Maincard>
          <div className={styles.fetchDataContainer}>
            <div className={styles.selectGroupContainer}>
              <div className={styles.selectContainer}>
                <BasicSelect
                  label="Año"
                  options={years}
                  value={selectedYear}
                  onChange={handleChangeYear}
                />
              </div>
              <div className={styles.selectContainer}>
                <BasicSelect
                  label="Fundo"
                  options={fundos}
                  value={selectedFundo}
                  onChange={handleChangeFundo}
                />
              </div>
              <div className={styles.selectContainer}>
                <MultipleSelectCheckmarks
                  label="Predios"
                  options={predios}
                  selectedValues={selectedPredios}
                  onChange={handleChangePredios}
                />
              </div>
              <div className={styles.sectoresContainer}>
                {selectedPredios.length > 0 ? (
                  selectedPredios.map((predio) => (
                    <BasicSelect
                      key={predio}
                      label={`${predio}`}
                      options={sectores[predio] || []}
                      value={selectedSectores[predio] || ""}
                      onChange={(event) => handleChangeSectores(predio, event)}
                    />
                  ))
                ) : (
                  <p>No hay predios seleccionados</p>
                )}
              </div>
              <div className={styles.sectoresContainer}>
                <BasicSelect
                  label="Atributo 1"
                  options={atributos1}
                  value={atributo1}
                  onChange={handleChangeAtributo1}
                />
                <BasicSelect
                  label="Atributo 2"
                  options={atributos2}
                  value={atributo2}
                  onChange={handleChangeAtributo2}
                />
              </div>
            </div>
            <div className={styles.addComponentContainer}>
              <LoadingButtons
                loading={loading}
                onClick={handleAddComponent}
                text="Agregar consulta"
                icon={<QueryStatsIcon />}
              />
            </div>
          </div>
        </Maincard>
        <div className={styles.toggleContainer}>
          {dataComponents.length === 0 ? (
            <ThemedAlert severity="info">Debe realizar una consulta para mostrar información.</ThemedAlert>
          ) : (
            <ToggleDataDisplay
              onChartClick={handleChartClick}
              onTableClick={handleTableClick}
              onBothClick={handleBothClick}
            />
          )}
        </div>
        <div className={styles.resultsContainer}>
          {dataComponents.map((component, index) => (
            <div
              key={component.id}
              className={`${styles.resultItem} ${dataComponents.length === 1 ? styles.fullWidth : styles.halfWidth}`}
            >
              <Maincard>
                <div className={styles.dataContainer}>
                  <h4>{"placeholder title id " + component.id}</h4>
                  <div className={styles.removeButtonContainer}>
                    <button
                      onClick={() => handleRemoveComponent(component.id)}
                      className={styles.removeComponentButton}
                    >
                      <HighlightOffIcon />
                    </button>
                  </div>
                  {(dataDisplayMode === 'tables' || dataDisplayMode === 'both') &&
                    component.dataTable.length > 0 && (
                      <div
                        className={
                          dataDisplayMode === 'both'
                            ? styles.halfwidthTableContainer
                            : styles.maxwidthGraphContainer
                        }
                      >
                        <BasicTable
                          columns={component.columns}
                          columnGroups={component.columnGroups}
                          data={component.dataTable}
                        />
                      </div>
                    )}

                  {(dataDisplayMode === 'charts' || dataDisplayMode === 'both') &&
                    component.dataset.length > 0 && (
                      <div
                        className={
                          dataDisplayMode === 'both'
                            ? styles.halfwidthGraphContainer
                            : styles.maxwidthGraphContainer
                        }
                      >
                        <BasicLineChart
                          // title={`Gráfico ${component.id}`}
                          dataset={component.dataset}
                          xAxisData={component.xAxisData}
                          yAxisTitle={component.yAxisTitle}
                          yAxisData={component.yAxisData}
                        />
                      </div>
                    )}
                </div>
              </Maincard>
            </div>
          ))}
        </div>

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
