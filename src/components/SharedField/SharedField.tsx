/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnsProps } from "../DynamicTable/types";
import { FormField } from "../DynamicForm/types";
import { sortOrder } from "../SortOrder/SortOrder";
import { SharedFieldConfig } from "./types";

/**
 * Función para generar las columnas de una tabla a partir de un objeto de campos
 * @param fields: Record<string, SharedFieldConfig> - Objeto de campos
 * @returns ColumnsProps[] - Arreglo de columnas
 */
const generateColumns = (fields: Record<string, SharedFieldConfig>): ColumnsProps[] => {
  return Object.values(fields).map((field) => ({
    key: field.key,
    title: field.title,
    dataIndex: field.key,
    sorter: field.sorter && ((a: any, b: any) => sortOrder(field.key)(a, b)),
    width: field.width,
    align: field.align,
    icon: field.icon,
    isHidden: field.hidden,
    render: field.render as ((value: unknown, record: unknown) => React.ReactNode) | undefined,
  }));
};

/**
 * Función para generar los campos de un formulario a partir de un objeto de campos
 * @param fields: Record<string, SharedFieldConfig> - Objeto de campos
 * @returns FormField[] - Arreglo de campos
 */
const generateFields = (fields: Record<string, SharedFieldConfig>): FormField[] => {
  return Object.entries(fields).map(([name, field]) => ({
    type: field.type || "text", // Asignar un tipo por defecto si no está definido
    name,
    label: field.label,
    placeholder: field.placeholder,
    validations: field.validations,
    datepickerConfig: field.datepickerConfig,
    min: field.min,
    width: field.width,
    readonly: field.readonly,
    hidden: field.hidden,
    checkboxConfig: field.checkboxConfig,
    selectConfig: field.selectConfig,
    dependsOn: field.dependsOn,
    max: field.max,
    options: field.options,
    step: field.step,
  }));
};

export { generateColumns, generateFields };