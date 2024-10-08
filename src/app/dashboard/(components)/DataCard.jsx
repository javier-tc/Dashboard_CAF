import React from 'react'
import dynamic from 'next/dynamic';

import styles from './(styles)/datacard.module.css'

// Components
import Maincard from '@/components/card/Maincard';
import BasicTable from '@/components/table/BasicTable';
import DefaultCheckbox from '@/components/button/DefaultCheckbox';

//icon
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

// Dynamically import BasicLineChart
const BasicLineChart = dynamic(() => import('@/components/charts/BasicLineChart'), { ssr: false });

const DataCard = ({ dataComponents, dataDisplayMode, handleRemoveComponent, selectedComponents, handleSelectComponent }) => {
  return (
    <div className={styles.resultsContainer}>
      {dataComponents.map((component) => (
        <div key={component.id} id={component.id} className={`${styles.resultItem} ${dataComponents.length === 1 ? styles.fullWidth : styles.halfWidth}`}>
          <Maincard >
            <div className={styles.dataContainer}>
              <div className={styles.checkboxAndTextContainer}>
                <div className={styles.checkboxContainer}>
                  <DefaultCheckbox
                    checked={selectedComponents.includes(component.id)}
                    onChange={() => handleSelectComponent(component.id)}
                  />
                </div>
                <div className={styles.removeButtonContainer}>
                  {/* <Paper > */}
                    <button
                      onClick={(e) => {
                        console.log("descargar componente", component.id);
                      }}
                      className={styles.downloadComponentButton}
                      title="Descargar consulta"
                    >
                      <DownloadIcon />
                    </button>
                  {/* </Paper> */}
                </div>
                <div className={styles.removeButtonContainer}>
                  {/* <Paper > */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveComponent(component.id);
                      }}
                      className={styles.removeComponentButton}
                      title="Borrar consulta"
                    >
                      <DeleteIcon />
                    </button>
                  {/* </Paper> */}
                </div>
              </div>
              <h4 className={styles.dataTitle}>{`Consulta ID: ${component.id}`}</h4>
              {(dataDisplayMode === 'table' || dataDisplayMode === 'both') &&
                component.dataTable.length > 0 && (
                  <div
                    className={
                      dataDisplayMode === 'both'
                        ? styles.halfwidthTableContainer
                        : styles.maxwidthGraphContainer
                    }
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BasicTable
                      columns={component.columns}
                      columnGroups={component.columnGroups}
                      data={component.dataTable}
                    />
                  </div>
                )}

              {(dataDisplayMode === 'chart' || dataDisplayMode === 'both') &&
                component.dataset.length > 0 && (
                  <div
                    className={
                      dataDisplayMode === 'both'
                        ? styles.halfwidthGraphContainer
                        : styles.maxwidthGraphContainer
                    }
                  >
                    <BasicLineChart
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
  )
}

export default DataCard