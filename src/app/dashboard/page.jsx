"use client";

import { useState } from 'react';
import styles from './page.module.css';
import dynamic from 'next/dynamic';

// Components
import Maincard from '@/components/card/Maincard';
import BasicSelect from '@/components/select/BasicSelect';
import MultipleSelectCheckmarks from '@/components/select/MultipleSelectCheckmarks';
import ToggleDataDisplay from '@/components/button/ToggleDataDisplay'; // El componente toggle para alternar entre gráficos y tablas
import BasicTable from '@/components/table/BasicTable';

// Importar el componente dinámicamente solo en el cliente
const BasicLineChart = dynamic(() => import('@/components/charts/BasicLineChart'), { ssr: false });

const Dashboard = () => {
  // Basic select (Comparación de años)
  const [selectedYear, setSelectedYear] = useState("2020");

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  const years = [
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
  ];

  // Basic select (Comparación entre fundos)
  const [selectedFundo, setSelectedFundos] = useState("Copihue");

  const handleChangeFundo = (event) => {
    setSelectedFundos(event.target.value);
  };

  const fundos = [
    { value: "Copihue", label: "Copihue" },
    { value: "Quillaimo", label: "Quillaimo" },
    { value: "Santa Delfina", label: "Santa Delfina" },
    { value: "Santa Rosa", label: "Santa Rosa" },
  ];

  // Multiple select (Predios)
  const [selectedPredios, setSelectedPredios] = useState([]);

  const handleChangePredios = (newValues) => {
    setSelectedPredios(newValues);
  };

  const predios = [
    { value: 'El Sauce', label: 'El Sauce' },
    { value: 'El Espino', label: 'El Espino' },
    { value: 'La Patagua', label: 'La Patagua' },
    { value: 'La Ballica', label: 'La Ballica' },
  ];

  // Sectores por predio
  const sectores = {
    'El Sauce': [
      { value: "01-A", label: "01-A" },
    ],
    'El Espino': [
      { value: "02-A", label: "02-A" },
      { value: "02-C", label: "02-C" }
    ],
    'La Patagua': [
      { value: "03-A", label: "03-A" },
      { value: "03-C", label: "03-C" }
    ],
    'La Ballica': [
      { value: "04-A", label: "04-A" },
      { value: "04-C", label: "04-C" }
    ]
  };

  const [selectedSectores, setSelectedSectores] = useState({});

  const handleChangeSectores = (predio, event) => {
    setSelectedSectores((prevState) => ({
      ...prevState,
      [predio]: event.target.value
    }));
  };

  const [atributo1, setAtributo1] = useState("");

  const handleChangeAtributo1 = (event) => {
    setAtributo1(event.target.value);
  };

  const [atributo2, setAtributo2] = useState("");

  const handleChangeAtributo2 = (event) => {
    setAtributo2(event.target.value);
  };

  const atributos1 = [
    { value: 'Consumo de agua', label: 'Consumo de agua' },
    { value: 'Agua disponible', label: 'Agua disponible' },
    { value: 'N° Riegos', label: 'N° Riegos' },
    { value: 'Rendimiento (m3/ha)', label: 'Rendimiento (m3/ha)' },
    { value: 'Superficie regada', label: 'Superficie regada' },
  ];

  const atributos2 = [
    { value: 'Edad', label: 'Edad' },
    { value: 'Variedad', label: 'Variedad' },
    { value: 'Predio', label: 'Predio' },
    { value: 'Sector', label: 'Sector' },
    { value: 'Fundo', label: 'Fundo' },
  ];

  const xAxis_data = {
    id: 'Area',
    dataKey: 'area',
    label: 'Área (m²)',
    scaleType: 'linear',
    valueFormatter: (value) => `${value} m²`,
  };

  const yAxis_data = [
    {
      id: 'Lugar1',
      label: 'Consumo de agua - Lugar 1 (m³)',
      dataKey: 'water_consumption_lugar1',
      area: false,
      showMark: true,
    },
    {
      id: 'Lugar2',
      label: 'Consumo de agua - Lugar 2 (m³)',
      dataKey: 'water_consumption_lugar2',
      area: false,
      showMark: true,
    }
  ];

  const yAxis_title = "Consumo de agua (m³)";

  const dataset = [
    { area: 50, water_consumption_lugar1: 10, water_consumption_lugar2: 8 },
    { area: 100, water_consumption_lugar1: 18, water_consumption_lugar2: 15 },
    { area: 150, water_consumption_lugar1: 25, water_consumption_lugar2: 22 },
    { area: 200, water_consumption_lugar1: 35, water_consumption_lugar2: 30 },
    { area: 250, water_consumption_lugar1: 45, water_consumption_lugar2: 38 },
    { area: 300, water_consumption_lugar1: 60, water_consumption_lugar2: 50 },
  ];
  const dataset2 = [
    { area: 50, water_consumption_lugar1: 13, water_consumption_lugar2: 2 },
    { area: 100, water_consumption_lugar1: 10, water_consumption_lugar2: 11 },
    { area: 150, water_consumption_lugar1: 30, water_consumption_lugar2: 27 },
    { area: 200, water_consumption_lugar1: 28, water_consumption_lugar2: 35 },
    { area: 250, water_consumption_lugar1: 45, water_consumption_lugar2: 70 },
    { area: 300, water_consumption_lugar1: 80, water_consumption_lugar2: 56 },
  ];

  // Estado para gráficos y tablas
  const [activeGraphs, setActiveGraphs] = useState(false);
  const [activeTables, setActiveTables] = useState(true);


  const [graphDisplayStyle, setGraphDisplayStyle] = useState(styles.maxwidthGraphContainer);
  const [tableDisplayStyle, setTableDisplayStyle] = useState(styles.maxwidthGraphContainer);

  // const handleChartClick = () => {
  //   setGraphDisplayStyle(styles.maxwidthGraphContainer);
  //   setTableDisplayStyle(styles.maxwidthGraphContainer);
  //   setActiveGraphs(true);
  //   setActiveTables(false);
  // };

  // const handleTableClick = () => {
  //   setGraphDisplayStyle(styles.maxwidthGraphContainer);
  //   setTableDisplayStyle(styles.maxwidthGraphContainer);
  //   setActiveTables(true);
  //   setActiveGraphs(false);
  // };

  // const handleBothClick = () => {
  //   setGraphDisplayStyle(styles.halfwidthGraphContainer);
  //   setTableDisplayStyle(styles.halfwidthTableContainer);
  //   setActiveGraphs(true);
  //   setActiveTables(true);

  // };

  //tabla
  const columns = [
    // { id: '', label: '', minWidth: 80 },
    { id: 'month', label: 'Mes', minWidth: 80 },
    { id: 'superficial', label: 'Superficial', minWidth: 80, align: 'center', format: (value) => value.toLocaleString('en-US') },
    { id: 'pozo', label: 'Pozo', minWidth: 80, align: 'center', format: (value) => value.toLocaleString('en-US') },
    { id: 'subTotal', label: 'SubTotal', minWidth: 80, align: 'center', format: (value) => value.toLocaleString('en-US') },
    { id: 'agricolas', label: 'Agricolas', minWidth: 80, align: 'center', format: (value) => value.toLocaleString('en-US') },
    { id: 'arriendo', label: 'Arriendo', minWidth: 80, align: 'center', format: (value) => value.toLocaleString('en-US') },
    { id: 'usoForestal', label: '', minWidth: 80, align: 'center', format: (value) => value.toLocaleString('en-US') },
  ];

  // Definición de los datos
  function createData(month, superficial, pozo, subTotal, agricolas, arriendo, usoForestal) {
    // const density = population / size;
    return { month, superficial, pozo, subTotal, agricolas, arriendo, usoForestal };
  }

  const data = [
    createData('Sep', '-', 53890, 53890, 53890, '-', '-'),
    createData('Oct', '-', 258877, 258877, 258877, '-', '-'),
    createData('Nov', 2284070, 248309, 2532379, 376181, '-', 2156198),
    createData('Dic', 4168428, 417452, 4585880, 2148908, '-', 2436972),
    createData('Ene', 3540309, 840677, 4380986, 3175006, '-', 1205980),
    createData('Feb', 3311902, 762715, 4074671, 2664248, '-', 1410369),
    createData('Mar', 1142035, 381989, 1524024, 722755, '-', 801269),
    createData('Abr', '-', '-', '-', '-', '-', '-'),
    createData('Total', 14446745, 2963909, 17410654, 9399865, '-', 8010789),
  ];


  // Definición de la agrupación de columnas
  const columnGroups = [
    { label: '', colSpan: 1 },
    { label: 'Entrada', colSpan: 2 },
    { label: 'Salida', colSpan: 3 },
    { label: 'Uso Forestal', colSpan: 1 },
  ];

  // handle graphs & table
  const [dataDisplayMode, setDataDisplayMode] = useState('tables');
  const [dataComponents, setDataComponents] = useState([{ id: 1 }]);

  const handleChartClick = () => {
    setDataDisplayMode('charts');
    setGraphDisplayStyle(styles.maxwidthGraphContainer);
    setTableDisplayStyle(styles.maxwidthGraphContainer);
  };

  const handleTableClick = () => {
    setDataDisplayMode('tables');
    setGraphDisplayStyle(styles.maxwidthGraphContainer);
    setTableDisplayStyle(styles.maxwidthGraphContainer);
  };

  const handleBothClick = () => {
    setDataDisplayMode('both');
    setGraphDisplayStyle(styles.halfwidthGraphContainer);
    setTableDisplayStyle(styles.halfwidthTableContainer);
  };

  const handleAddComponent = () => {
    const newId = Math.max(...dataComponents.map(comp => comp.id), 0) + 1;
    setDataComponents([...dataComponents, { id: newId }]);
  };

  const handleRemoveComponent = (id) => {
    setDataComponents(dataComponents.filter(comp => comp.id !== id));
  };


  return (
    <div className={styles.container}>
      <Maincard>
        <h2>Dashboard</h2>
        <hr />
        <div className={styles.selectContainer}>
          <div className={styles.comparacionContainer}>
            <h3>Años</h3>
            <BasicSelect
              label="Comparación entre años"
              options={years}
              value={selectedYear}
              onChange={handleChangeYear}
            />
            <h3>Fundos</h3>
            <BasicSelect
              label="Comparación entre fundos"
              options={fundos}
              value={selectedFundo}
              onChange={handleChangeFundo}
            />
          </div>
          <div className={styles.prediosContainer}>
            <h3>Predios</h3>
            <MultipleSelectCheckmarks
              label="Predios"
              options={predios}
              selectedValues={selectedPredios}
              onChange={handleChangePredios}
            />
          </div>
          <div className={styles.sectoresContainer}>
            <h3>Sectores</h3>
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
          <div className={styles.atributosContainer}>
            <h3>Atributos</h3>
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

        <div className={styles.resultsContainer}>

          <div className={styles.addComponentContainer}>
            <button onClick={handleAddComponent} className={styles.addComponentButton}>
              Realizar consulta
            </button>
          </div>

          <div className={styles.toggleContainer}>

            <ToggleDataDisplay
              onChartClick={handleChartClick}
              onTableClick={handleTableClick}
              onBothClick={handleBothClick}
            />
          </div>

          {dataComponents.map((component) => (
            <div key={component.id} className={styles.dataComponent}>
              
              <div className={styles.dataContainer}>

                {(dataDisplayMode === 'tables' || dataDisplayMode === 'both') && (
                  <div className={dataDisplayMode === 'both' ? styles.halfwidthTableContainer : styles.maxwidthGraphContainer}>
                    <BasicTable columns={columns} columnGroups={columnGroups} data={data} />
                  </div>
                )}
                {(dataDisplayMode === 'charts' || dataDisplayMode === 'both') && (
                  <div className={dataDisplayMode === 'both' ? styles.halfwidthGraphContainer : styles.maxwidthGraphContainer}>
                    <h3>Gráfico 1</h3>
                    <BasicLineChart
                      dataset={dataset}
                      xAxis_data={xAxis_data}
                      yAxis_title={yAxis_title}
                      yAxis_data={yAxis_data}
                    />
                    <h3>Gráfico 2</h3>
                    <BasicLineChart
                      dataset={dataset2}
                      xAxis_data={xAxis_data}
                      yAxis_title={yAxis_title}
                      yAxis_data={yAxis_data}
                    />
                  </div>
                )}
              </div>

              <button
                onClick={() => handleRemoveComponent(component.id)}
                className={styles.removeComponentButton}
              >
                X
              </button>

            </div>
          ))}
        </div>
      </Maincard>
    </div>
  );
};

export default Dashboard;
