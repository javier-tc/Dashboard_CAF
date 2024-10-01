import { Paper } from '@mui/material';
import React, { useRef } from 'react';
import Chart from 'react-apexcharts';

import styles from './basiclinechart.module.css';

export default function BasicLineChart({ title, xAxisData, yAxisData, dataset, yAxisTitle }) {
  const chartRef = useRef(null);

  const series = yAxisData.map((yData) => ({
    name: yData.label,
    data: dataset.map((data) => data[yData.dataKey]),
  }));

  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: dataset.map((data) => data[xAxisData.dataKey]),
      labels: {
        formatter: xAxisData.valueFormatter || ((value) => value),
      },
      title: {
        text: xAxisData.label || 'X Axis',
      },
    },
    yaxis: {
      title: {
        text: yAxisTitle || 'Y Axis',
      },
    },
    stroke: {},
    markers: {
      size: 4,
    },
    colors:[  
      '#6a994e', '#14213d', '#bc4749', '#fca311', '#a8dadc', '#457b9d', '#1d3557',]
  };

  return (
    <div ref={chartRef} className={styles.container}>
      <Paper elevation={1} sx={{ width: '100%', height: '100%', padding: '10px' }}>
        <h3>{title}</h3>
        <Chart options={options} series={series} type="line" width="100%" height="400px" /> 
      </Paper>
    </div>
  );
}
