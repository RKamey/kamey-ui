import { FieldType, CheckboxConfig, SelectConfig, SelectDependencyConfig, Validations } from "../DynamicForm/types";

export interface SharedFieldConfig {
  key: string;
  title: string;
  label: string;
  placeholder?: string;
  validations?: Validations[];
  width?: string | number;
  datepickerConfig?: { format: string; showTime: boolean };
  min?: number;
  render?: <T extends string = string>(value: T) => React.ReactNode;
  readonly?: boolean;
  hidden?: boolean;
  type?: FieldType;
  align?: "left" | "right" | "center";
  icon?: React.ReactElement;
  checkboxConfig?: CheckboxConfig;
  selectConfig?: SelectConfig;
  dependsOn?: SelectDependencyConfig;
  max?: number;
  step?: number;
  options?: Array<{ label: string; value: string | number }>;
}