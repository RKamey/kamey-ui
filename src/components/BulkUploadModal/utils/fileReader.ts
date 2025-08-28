import * as XLSX from 'xlsx';
import { TemplateField } from './templateGenerator';

export interface FileReaderResult<T> {
  success: boolean;
  data?: T[];
  errors?: string[];
  warnings?: string[];
}

type RawData = string[][];

interface ValidationResult<T = unknown> {
  isValid: boolean;
  value?: T;
  error?: string;
}

export class FileReaderUtil {
  /**
   * Method to read and parse an Excel file (.xlsx)
   * @param file - The Excel file to read
   * @param expectedFields - The expected fields configuration
   * @returns - A promise that resolves to FileReaderResult<T>
   */
  static async readExcelFile<T extends Record<string, unknown>>(
    file: File, 
    expectedFields: TemplateField[]
  ): Promise<FileReaderResult<T>> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const data = new Uint8Array(arrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          const rawData = XLSX.utils.sheet_to_json<string[]>(worksheet, {
            header: 1,
            defval: '',
            blankrows: false
          }) as RawData;

          const result = this.processRawData<T>(rawData, expectedFields);
          resolve(result);
        } catch (error) {
          resolve({
            success: false,
            errors: [`Error al leer el archivo Excel: ${String(error)}`]
          });
        }
      };

      reader.onerror = () => {
        resolve({
          success: false,
          errors: ['Error al leer el archivo']
        });
      };

      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Method to read and parse a CSV file
   * @param file - The CSV file to read
   * @param expectedFields - The expected fields configuration
   * @returns - A promise that resolves to FileReaderResult<T>
   */
  static async readCSVFile<T extends Record<string, unknown>>(
    file: File,
    expectedFields: TemplateField[]
  ): Promise<FileReaderResult<T>> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const csv = e.target?.result as string;
          const lines = csv.split('\n').filter(line => line.trim());

          if (lines.length === 0) {
            resolve({
              success: false,
              errors: ['El archivo está vacío']
            });
            return;
          }

          const rawData: RawData = lines.map(line =>
            line.split(',').map(cell => cell.trim().replace(/^"(.*)"$/, '$1'))
          );

          const result = this.processRawData<T>(rawData, expectedFields);
          resolve(result);
        } catch (error) {
          resolve({
            success: false,
            errors: [`Error al leer el archivo CSV: ${String(error)}`]
          });
        }
      };

      reader.onerror = () => {
        resolve({
          success: false,
          errors: ['Error al leer el archivo']
        });
      };

      reader.readAsText(file, 'UTF-8');
    });
  }

  /**
   * Private method to process raw data from the file
   * @param rawData - The raw data as a 2D array of strings
   * @param expectedFields - The expected fields configuration
   * @returns - FileReaderResult<T> with processed data, errors, and warnings
   * @private
   */
  private static processRawData<T extends Record<string, unknown>>(
    rawData: RawData,
    expectedFields: TemplateField[]
  ): FileReaderResult<T> {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (rawData.length === 0) {
      return {
        success: false,
        errors: ['El archivo no contiene datos']
      };
    }

    const headers = rawData[0].map(header =>
      header.toString().trim().replace(' *', '')
    );

    const expectedHeaders = expectedFields.map(field => field.label);
    const missingHeaders = expectedHeaders.filter(expected =>
      !headers.some(header => header.toLowerCase() === expected.toLowerCase())
    );

    if (missingHeaders.length > 0) {
      errors.push(`Columnas faltantes: ${missingHeaders.join(', ')}`);
    }

    const dataRows = rawData.slice(1);
    const processedData: T[] = [];

    dataRows.forEach((row, index) => {
      const rowNumber = index + 2;
      const rowData: Partial<T> = {};
      const rowErrors: string[] = [];

      expectedFields.forEach(field => {
        const headerIndex = headers.findIndex(
          header => header.toLowerCase() === field.label.toLowerCase()
        );

        if (headerIndex === -1) return;

        const cellValue = row[headerIndex]?.toString().trim() || '';
        const fieldKey = field.key as keyof T;

        if (field.required && !cellValue) {
          rowErrors.push(`Fila ${rowNumber}: ${field.label} es requerido`);
          return;
        }

        const validationResult = this.validateFieldType(
          cellValue,
          field,
          rowNumber
        );

        if (!validationResult.isValid) {
          rowErrors.push(validationResult.error!);
          return;
        }

        rowData[fieldKey] = validationResult.value as T[keyof T];
      });

      if (rowErrors.length === 0 && Object.keys(rowData).length > 0) {
        processedData.push(rowData as T);
      } else if (rowErrors.length > 0) {
        errors.push(...rowErrors);
      }
    });

    if (processedData.length === 0 && errors.length === 0) {
      errors.push('No se encontraron datos válidos en el archivo');
    }

    return {
      success: errors.length === 0,
      data: processedData,
      errors: errors.length > 0 ? errors : undefined,
      warnings: warnings.length > 0 ? warnings : undefined
    };
  }

  /**
   * Private method to validate and convert field types
   * @param value - The cell value as string
   * @param field - The field configuration
   * @param rowNumber - The current row number for error reporting
   * @returns 
   */
  private static validateFieldType(
    value: string,
    field: TemplateField,
    rowNumber: number
  ): ValidationResult {
    if (!value && !field.required) {
      return { isValid: true, value: null };
    }

    switch (field.type) {
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return {
            isValid: false,
            error: `Fila ${rowNumber}: ${field.label} debe ser un email válido`
          };
        }
        return { isValid: true, value };
      }

      case 'number': {
        const numValue = Number(value);
        if (isNaN(numValue)) {
          return {
            isValid: false,
            error: `Fila ${rowNumber}: ${field.label} debe ser un número válido`
          };
        }
        return { isValid: true, value: numValue };
      }

      case 'date': {
        const dateValue = new Date(value);
        if (isNaN(dateValue.getTime())) {
          return {
            isValid: false,
            error: `Fila ${rowNumber}: ${field.label} debe ser una fecha válida`
          };
        }
        return {
          isValid: true,
          value: dateValue.toISOString().split('T')[0]
        };
      }

      case 'text':
      default:
        return { isValid: true, value };
    }
  }
}
