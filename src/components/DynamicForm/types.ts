export type FieldType = 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'datepicker' | 'time' | 'checkbox' | 'radio' | 'switch' | 'slider' | 'rate' | 'upload';

export interface DatepickerConfig {
  format?: string;
  showTime?: boolean;
}

export interface SelectConfig {
  options?: Options[];
  apiConfig?: {
    url: string;
    method: string;
    headers?: Record<string, string>;
    params?: Record<string, string>;
    valueKey: string;
    labelKey: string;
    responseDataPath?: string;
  };
  dependsOn?: SelectDependencyConfig;
  onChange?: (value: string | number) => void;
}

export interface SelectDependencyConfig {
  field: string;
  apiUrl: string;
  method: string;
  headers?: Record<string, string>;
  valueKey: string;
  labelKey: string;
  paramKey: string;
  transformRequest?: (value: string | number) => Record<string, string>;
}

export interface FormField {
  type: FieldType;
  name: string;
  label: string;
  min?: number | undefined;
  max?: number | undefined;
  step?: number | undefined;
  validations?: Validations[];
  options?: Options[];
  placeholder?: string;
  datepickerConfig?: DatepickerConfig;
  selectConfig?: SelectConfig;
  readonly?: boolean;
  dependsOn?: {
    field: string;
    valueMapping?: boolean;
    transform?: (value: string | number) => Record<string, string>;
  }
  checkboxConfig?: CheckboxConfig;
}

export interface CheckboxConfig {
  options?: Options[];
  onChange?: (value: string | number) => void;
}

export interface Options {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface Validations {
  required?: boolean;
  regex?: string;
}