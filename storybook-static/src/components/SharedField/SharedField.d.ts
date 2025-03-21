import { ColumnsProps } from '../DynamicTable/types';
import { FormField } from '../DynamicForm/types';
import { SharedFieldConfig } from './types';
/**
 * Función para generar las columnas de una tabla a partir de un objeto de campos.
 * @param fields Objeto de campos.
 * @returns Arreglo de columnas con el tipo ColumnsProps<T>.
 */
declare const generateColumns: <T extends object>(fields: Record<string, SharedFieldConfig>) => ColumnsProps<T>[];
/**
 * Función para generar los campos de un formulario a partir de un objeto de campos.
 * @param fields Objeto de campos.
 * @returns Arreglo de campos con el tipo FormField[].
 */
declare const generateFields: (fields: Record<string, SharedFieldConfig>) => FormField[];
export { generateColumns, generateFields };
