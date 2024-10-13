import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const downloadPDF = async (selectedComponents) => {
    if (selectedComponents.length === 0) {
      return;
    }
  
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfPageWidth = pdf.internal.pageSize.getWidth();
    const pdfPageHeight = pdf.internal.pageSize.getHeight();
    
    for (let i = 0; i < selectedComponents.length; i++) {
      const componentId = selectedComponents[i];
      const component = document.getElementById(componentId);
  
      if (component) {
        const canvas = await html2canvas(component, {
          ignoreElements: (element) => element.classList.contains('no-pdf')
        });
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
  
        // Calcular las proporciones para ajustar la imagen al tamaño máximo posible en el PDF
        const componentRatio = imgProps.width / imgProps.height;
        const pdfRatio = pdfPageWidth / pdfPageHeight;
  
        let pdfWidth, pdfHeight;
  
        if (componentRatio > pdfRatio) {
          // Ajustar por ancho
          pdfWidth = pdfPageWidth;
          pdfHeight = pdfPageWidth / componentRatio;
        } else {
          // Ajustar por alto
          pdfHeight = pdfPageHeight;
          pdfWidth = pdfPageHeight * componentRatio;
        }
  
        if (i > 0) {
          pdf.addPage();
        }
  
        // Centrar la imagen en la página
        const xOffset = (pdfPageWidth - pdfWidth) / 2;
        const yOffset = (pdfPageHeight - pdfHeight) / 2;
  
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, pdfWidth, pdfHeight);
      }
    }
  
    pdf.save('Consultas_Seleccionadas.pdf');
  };
  


export default downloadPDF;