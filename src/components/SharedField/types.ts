import { FieldType, CheckboxConfig, SelectConfig, SelectDependencyConfig, Validations, UploadConfig, RadioConfig, ConditionalConfig } from "../DynamicForm/types";
import { FilterItem } from "../DynamicTable/types";

export interface SharedFieldConfig<T = Record<string, unknown>> {
  key: string;
  title: string;
  label?: string;
  placeholder?: string;
  validations?: Validations[];
  filtrers?: FilterItem[];
  onFilter?: (value: boolean | React.Key, record: T & { key: number }) => boolean;
  width?: string | number;
  datepickerConfig?: { format: string; showTime: boolean };
  min?: number;
  render?: <T extends string = string>(value: T) => React.ReactNode;
  readonly?: boolean;
  isHidden?: boolean; // Para ocultar la columna en la tabla
  hiddenInForm?: boolean; // Para ocultar el campo en el formulario
  type?: FieldType;
  align?: "left" | "right" | "center";
  icon?: React.ReactElement;
  checkboxConfig?: CheckboxConfig;
  selectConfig?: SelectConfig;
  dependsOn?: SelectDependencyConfig;
  max?: number;
  step?: number;
  options?: Array<{ label: string; value: string | number }>;
  sorter?: boolean;
  onChange?: (value: string | number) => void;
  uploadConfig?: UploadConfig;
  radioConfig?: RadioConfig;
  conditionalConfig?: ConditionalConfig;
}