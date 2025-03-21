import { ColumnsProps } from "../DynamicTable/types";
import { FormField } from "../DynamicForm/types";
import { sortOrder } from "../SortOrder/SortOrder";
import { SharedFieldConfig } from "./types";

/**
 * Función para generar las columnas de una tabla a partir de un objeto de campos.
 * @param fields Objeto de campos.
 * @returns Arreglo de columnas con el tipo ColumnsProps<T>.
 */
const generateColumns = <T extends object>(
  fields: Record<string, SharedFieldConfig>
): ColumnsProps<T>[] => {
  return Object.values(fields).map((field) => ({    
    key: field.key,
    title: field.title,
    dataIndex: field.key,
    sorter: field.sorter
      ? (a: T, b: T) => sortOrder<T>(field.key as keyof T)(a, b)
      : undefined,
    width: field.width,
    align: field.align,
    icon: field.icon,
    isHidden: field.isHidden,
    render: field.render as
      | ((value: T[keyof T], record: T) => React.ReactNode)
      | undefined,
  }));
};

/**
 * Función para generar los campos de un formulario a partir de un objeto de campos.
 * @param fields Objeto de campos.
 * @returns Arreglo de campos con el tipo FormField[].
 */
const generateFields = (
  fields: Record<string, SharedFieldConfig>
): FormField[] => {
  return Object.entries(fields).map(([name, field]) => ({
    type: field.type || "text", // Asigna un tipo por defecto si no está definido
    name,
    label: field.label,
    placeholder: field.placeholder,
    validations: field.validations,
    datepickerConfig: field.datepickerConfig,
    min: field.min,
    max: field.max,
    step: field.step,
    width: field.width,
    readonly: field.readonly,
    hidden: field.hiddenInForm,
    checkboxConfig: field.checkboxConfig,
    selectConfig: field.selectConfig,
    dependsOn: field.dependsOn,
    options: field.options,
    onChange: field.onChange,
    uploadConfig: field.uploadConfig,
    radioConfig: field.radioConfig,
  }));
};

export { generateColumns, generateFields };
