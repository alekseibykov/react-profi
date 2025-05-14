import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface FormData {
    name: string;
    email: string;
    message: string;
}

export function generateAndOpenPdf(values: FormData) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Demo Form Submission', 10, 20);
    doc.setFontSize(12);
    const tableBody = [
        ['1', 'Name', values.name || ''],
        ['2', 'Email', values.email || ''],
        ['3', 'Message', values.message || '']
    ];
    const tableResult = autoTable(doc, {
        startY: 30,
        body: tableBody,
        styles: {
            font: 'helvetica',
            fontSize: 12,
            cellPadding: [1, 4],
            lineColor: [0, 0, 0],
            lineWidth: 0.2,
            halign: 'left',
            valign: 'middle',
            fillColor: [255, 255, 255], // white background
            textColor: [0, 0, 0]
        },
        bodyStyles: {
            fillColor: [255, 255, 255], // white
            textColor: [0, 0, 0],
            halign: 'left',
            valign: 'middle',
            lineColor: [0, 0, 0],
            lineWidth: 0.2,
            cellPadding: [1, 4]
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255] // force all rows to be white
        },
        columnStyles: {
            0: {cellWidth: 10, halign: 'center'}, // index column
            1: {cellWidth: 40},
            2: {cellWidth: 120}
        }
    }) as unknown as { finalY?: number };
    doc.text('Thank you for submitting the form!', 10, ((tableResult?.finalY ?? 80) + 20));
    window.open(doc.output('bloburl'), '_blank');
} 