import React from 'react'
import dynamic from 'next/dynamic';

import styles from './(styles)/datacard.module.css'

// Components
import Maincard from '@/components/card/Maincard';

//icon
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// Import @dnd-kit components
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from '@dnd-kit/core';
// import {
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';


import BasicTable from '@/components/table/BasicTable';
// Dynamically import BasicLineChart
const BasicLineChart = dynamic(() => import('@/components/charts/BasicLineChart'), { ssr: false });



// function SortableItem({ id, children }) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({ id: id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       {children}
//     </div>
//   );
// }

const DataCard = ({ dataComponents, dataDisplayMode, handleRemoveComponent}) => { //, handleDragEnd }) => {
  // const sensors = useSensors(
  //   useSensor(PointerSensor, {
  //     activationConstraint: {
  //       distance: 8,
  //     },
  //   }),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   })
  // );
  return (
    // <DndContext
    //   sensors={sensors}
    //   collisionDetection={closestCenter}
    //   onDragEnd={handleDragEnd}
    // >
    //   <SortableContext
    //     items={dataComponents.map(comp => comp.id)}
    //     strategy={verticalListSortingStrategy}
    //   >
        <div className={styles.resultsContainer}>
          {dataComponents.map((component) => (
            <div key={component.id} id={component.id} className={`${styles.resultItem} ${dataComponents.length === 1 ? styles.fullWidth : styles.halfWidth}`}>
              {/* <SortableItem key={component.id} id={component.id}> */}
                <Maincard >
                  <div className={styles.dataContainer}>
                    <h4>{`Consulta ID: ${component.id}`}</h4>
                    <div className={styles.removeButtonContainer}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveComponent(component.id);
                        }}
                        className={styles.removeComponentButton}
                      >
                        <HighlightOffIcon />
                      </button>
                    </div>
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
              {/* </SortableItem> */}
            </div>
          ))}
        </div>
    //   </SortableContext>
    // </DndContext>
  )
}

export default DataCard