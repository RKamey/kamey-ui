import * as XLSX from "xlsx";

export interface TemplateField {
  key: string;
  label: string;
  example?: string;
  required?: boolean;
  type?: "text" | "email" | "number" | "date";
}

export interface TemplateConfig {
  entityName: string;
  fields: TemplateField[];
  includeExamples?: boolean;
  sheetName?: string;
}

export class TemplateGenerator {
  static generateExcel(config: TemplateConfig): void {
    const { entityName, fields, includeExamples = true, sheetName } = config;

    const wb = XLSX.utils.book_new();

    const headers = fields.map((field) =>
      field.required ? `${field.label} *` : field.label
    );

    const templateData = [headers];

    if (includeExamples) {
      const exampleRow = fields.map((field) => field.example || "");
      templateData.push(exampleRow);
    }

    const ws = XLSX.utils.aoa_to_sheet(templateData);

    const headerRange = XLSX.utils.decode_range(ws["!ref"] || "A1");
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!ws[cellAddress]) continue;
      ws[cellAddress].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "EEEEEE" } },
      };
    }

    XLSX.utils.book_append_sheet(wb, ws, sheetName || entityName);
    XLSX.writeFile(wb, `plantilla_${entityName.toLowerCase()}.xlsx`);
  }

  static generateCSV(config: TemplateConfig): void {
    const { entityName, fields, includeExamples = true } = config;

    const headers = fields.map((field) =>
      field.required ? `${field.label} *` : field.label
    );

    let csvContent = headers.join(",");

    if (includeExamples) {
      const exampleRow = fields.map((field) => field.example || "");
      csvContent += "\n" + exampleRow.join(",");
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `plantilla_${entityName.toLowerCase()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

