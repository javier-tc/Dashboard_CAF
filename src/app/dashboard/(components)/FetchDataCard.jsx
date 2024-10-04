import { useState, useEffect } from 'react';
import styles from './(styles)/fetchdatacard.module.css';
import api from '@/config/axiosConfig'; // Importa la configuración de Axios

// Components
import BasicSelect from '@/components/select/BasicSelect';
import MultipleSelectCheckmarks from '@/components/select/MultipleSelectCheckmarks';
import Maincard from '@/components/card/Maincard';
import LoadingButtons from '@/components/button/LoadingButton';

//icon
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const FetchDataCard = ({handleAddQuery, loading}) => {
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

    const [loadingSelectors, setLoadingSelectors] = useState(false);
    const [loadingData, setLoadingData] = useState(loading);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSelectors = async () => {
          try {
            setLoadingSelectors(true);
            // console.log("Fetching selectors...");
            const response = await api.get('/api/selectors');
            const data = response.data;
            // console.log("Data fetched:", data);
            
            setYears(data.years);
            setFundos(data.fundos);
            setPredios(data.predios);
            setSectores(data.sectores);
            setAtributos1(data.atributos1);
            setAtributos2(data.atributos2);
          } catch (err) {
            console.error('Error:', err.message);
            setError('Error al obtener datos del servidor');
          } finally {
            setLoadingSelectors(false);
          }
        };
      
        fetchSelectors();
      }, []);
      

    useEffect(() => {
        setLoadingData(loading);
    }, [loading]);

    const handleChangeYear = (event) => setSelectedYear(event.target.value);
    const handleChangeFundo = (event) => setSelectedFundos(event.target.value);
    const handleChangePredios = (newValues) => setSelectedPredios(newValues);
    const handleChangeSectores = (predio, event) => setSelectedSectores(prevState => ({ ...prevState, [predio]: event.target.value }));
    const handleChangeAtributo1 = (event) => setAtributo1(event.target.value);
    const handleChangeAtributo2 = (event) => setAtributo2(event.target.value);
    return (
        <Maincard>
            <div className={styles.fetchDataContainer}>
                <div className={styles.selectGroupContainer}>
                    <BasicSelect
                        label="Año"
                        options={years}
                        value={selectedYear}
                        onChange={handleChangeYear}
                    />
                    <BasicSelect
                        label="Fundo"
                        options={fundos}
                        value={selectedFundo}
                        onChange={handleChangeFundo}
                    />
                    <MultipleSelectCheckmarks
                        label="Predios"
                        options={predios}
                        selectedValues={selectedPredios}
                        onChange={handleChangePredios}
                    />
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
                        loading={loadingData}
                        onClick={handleAddQuery}
                        text="Agregar consulta"
                        icon={<QueryStatsIcon />}
                    />
                </div>
            </div>
        </Maincard>
    )
}

export default FetchDataCard