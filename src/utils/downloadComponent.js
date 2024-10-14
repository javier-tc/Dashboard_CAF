import React from 'react';
import { Document, Page, View, Text, StyleSheet, pdf, Svg, Line, G } from '@react-pdf/renderer';

// Definir estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  section: {
    margin: 5,
    padding: 5,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 3,
    fontSize: 8,
    padding: 3,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  chart: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center', // Centra el gráfico
  },
});

// Componente para la tabla
const PDFTable = ({ columns, data, columnGroups }) => (
  <View style={styles.table}>
    {columnGroups && (
      <View style={[styles.tableRow, styles.tableHeader]}>
        {columnGroups.map((group, index) => (
          <View key={index} style={[styles.tableCol, { width: `${(group.colSpan / columns.length) * 100}%` }]}>
            <Text style={styles.tableCell}>{group.label}</Text>
          </View>
        ))}
      </View>
    )}
    <View style={[styles.tableRow, styles.tableHeader]}>
      {columns.map((column) => (
        <View key={column.id} style={[styles.tableCol, { width: `${100 / columns.length}%` }]}>
          <Text style={styles.tableCell}>{column.label}</Text>
        </View>
      ))}
    </View>
    {data.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.tableRow}>
        {columns.map((column) => (
          <View key={column.id} style={[styles.tableCol, { width: `${100 / columns.length}%` }]}>
            <Text style={styles.tableCell}>
              {column.format && typeof row[column.id] === 'number'
                ? column.format(row[column.id])
                : row[column.id]}
            </Text>
          </View>
        ))}
      </View>
    ))}
  </View>
);

// Componente del gráfico
const colors = [
  'rgb(255, 99, 132)', // Rojo
  'rgb(54, 162, 235)', // Azul
  'rgb(255, 206, 86)', // Amarillo
  'rgb(75, 192, 192)', // Verde claro
  'rgb(153, 102, 255)', // Púrpura
  'rgb(255, 159, 64)', // Naranja
];

// Componente del gráfico
const ChartComponent = ({ data, xAxisData, yAxisData, yAxisTitle }) => {
  const width = 400;
  const height = 200;
  const padding = 40;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  const xValues = data.map(d => d[xAxisData.dataKey]);
  const yValues = yAxisData.flatMap(y => data.map(d => d[y.dataKey])).filter(v => v !== undefined);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  // Función para escalar valores de X y Y
  const xScale = (index) => padding + (index / (xValues.length - 1)) * chartWidth;
  const yScale = (value) => height - padding - ((value - minY) / (maxY - minY)) * chartHeight;

  return (
    <View style={{ padding: 5, border: '1px solid black', position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Svg width={width} height={height}>
        {/* Eje X */}
        <Line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="black" />
        {xValues.map((value, index) => (
          <Text key={index} x={xScale(index)} y={height - padding + 15} fontSize={8} textAnchor="middle">
            {value}
          </Text>
        ))}

        {/* Eje Y */}
        <Line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="black" />
        {[minY, (minY + maxY) / 2, maxY].map((value, index) => (
          <Text key={index} x={padding - 10} y={yScale(value)} fontSize={8} textAnchor="end">
            {value.toFixed(2)}
          </Text>
        ))}

        {/* Títulos de los ejes */}
        <Text x={width / 2} y={height - 10} fontSize={10} textAnchor="middle" >{xAxisData.label}</Text>

        <G transform={`translate(7, ${height / 2}) rotate(-90)`} >
          <Text fontSize={10} textAnchor="middle">{yAxisTitle}</Text>
        </G>

        {/* Líneas y etiquetas */}
        {yAxisData.map((yData, index) => (
          <G key={index}>
            {data.map((d, i) => {
              if (i === 0) return null;
              const x1 = xScale(i - 1);
              const y1 = yScale(data[i - 1][yData.dataKey]);
              const x2 = xScale(i);
              const y2 = yScale(d[yData.dataKey]);
              return (
                <G key={i}>
                  <Line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={colors[index % colors.length]} // Usa colores de la lista
                    strokeWidth={1}
                  />
                </G>
              );
            })}
          </G>
        ))}
      </Svg>
      
      <View style={{ flexDirection: 'column', marginLeft: 5 }}>
        {yAxisData.map((yData, index) => (
          <Text
            key={index}
            fontSize={1}
            color={colors[index % colors.length]}
            style={{ color: colors[index % colors.length], fontSize: 10, marginTop: 3, marginRight: 7, padding: 2 }}
            fill={colors[index % colors.length]} // Usa colores de la lista
          >
            {yData.label}
          </Text>
        ))}
      </View>
    </View>
  );
};




// Componente para generar el PDF
const PDFDocument = ({ dataComponents }) => (
  <Document>
  {console.log(dataComponents)}
    {dataComponents.map((component, index) => (
      <Page key={index} size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{`Consulta ID: ${component.id}`}</Text>
          <PDFTable
            columns={component.columns}
            data={component.dataTable}
            columnGroups={component.columnGroups}
          />
          {component.dataset && component.dataset.length > 0 && (
            <View style={styles.chart}>
              <ChartComponent data={component.dataset} xAxisData={component.xAxisData} yAxisData={component.yAxisData} yAxisTitle={component.yAxisTitle} />
            </View>
          )}
        </View>
      </Page>
    ))}
  </Document>
);

// Función para descargar el PDF
const downloadPDF = async (selectedComponents) => {
  const blob = await pdf(<PDFDocument dataComponents={selectedComponents} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Consultas_Seleccionadas.pdf';
  link.click();
  URL.revokeObjectURL(url);
};

export default downloadPDF;