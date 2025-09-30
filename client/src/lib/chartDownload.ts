import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function getBackgroundColor(): string {
  const hsl = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();
  return hsl ? `hsl(${hsl})` : '#ffffff';
}

export async function downloadChartAsPNG(element: HTMLElement, filename: string = 'chart'): Promise<void> {
  const canvas = await html2canvas(element, {
    backgroundColor: getBackgroundColor(),
    scale: 2,
  });
  
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export async function downloadChartAsPDF(element: HTMLElement, filename: string = 'chart'): Promise<void> {
  const canvas = await html2canvas(element, {
    backgroundColor: getBackgroundColor(),
    scale: 2,
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height]
  });
  
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save(`${filename}.pdf`);
}
