import React, { useState, useEffect, useRef } from 'react';
import Chart from 'react-apexcharts';

export default function BasicLineChart({ xAxis_data, yAxis_data, dataset, yAxis_title }) {
  const chartRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({ width: '100%', height: 300 });

  useEffect(() => {
    // Función para ajustar el tamaño del gráfico según el tamaño del contenedor
    const updateChartSize = () => {
      if (chartRef.current) {
        const width = chartRef.current.offsetWidth || '100%';
        setChartDimensions({ width, height: 300 });
      }
    };

    // Ajusta el tamaño del gráfico cuando la ventana cambie de tamaño
    window.addEventListener('resize', updateChartSize);

    // Ajusta el tamaño del gráfico inicialmente
    updateChartSize();

    // Limpia el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', updateChartSize);
    };
  }, []);

  // Convertimos los datos para ApexCharts
  const series = yAxis_data.map((yData) => ({
    name: yData.label,
    data: dataset.map((data) => data[yData.dataKey]),
  }));

  const options = {
    chart: {
      type: 'line',
      height: chartDimensions.height,
      width: chartDimensions.width,
      toolbar: {
        show: false, // Oculta el toolbar si no es necesario
      },
    },
    xaxis: {
      categories: dataset.map((data) => data[xAxis_data.dataKey]),
      labels: {
        formatter: xAxis_data.valueFormatter || ((value) => value),
      },
      title: {
        text: xAxis_data.label || 'X Axis',
      },
    },
    yaxis: {
      title: {
        text: yAxis_title || 'Y Axis',
      },
    },
    stroke: {
      // curve: 'smooth', // Activa si prefieres líneas suaves
    },
    markers: {
      size: 4,
    },
    responsive: [
      {
        breakpoint: 768, // Para pantallas medianas
        options: {
          chart: {
            height: 250,
          },
          markers: {
            size: 3, // Reduce el tamaño de los puntos en pantallas más pequeñas
          },
        },
      },
      {
        breakpoint: 480, // Para pantallas pequeñas
        options: {
          chart: {
            height: 200,
          },
          markers: {
            size: 2,
          },
        },
      },
    ],
  };

  return (
    <div ref={chartRef} style={{ width: '100%' }}>
      <Chart options={options} series={series} type="line" height={chartDimensions.height} width="100%" />
    </div>
  );
}
