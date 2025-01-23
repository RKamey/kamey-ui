export type FieldType = 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'datepicker' | 'rangepicker' | 'time' | 'checkbox' | 'radio' | 'switch' | 'slider' | 'rate' | 'upload';
export type PickerType = 'date' | 'week' | 'month' | 'quarter' | 'year' | undefined;
export interface DatepickerConfig {
  format?: string;
  showTime?: boolean;
  picker?: PickerType;
  size?: 'large' | 'middle' | 'small';
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
  required?: boolean | { 
    value: boolean; 
    message?: string; 
  };
  regex?: {
    pattern: string;
    message?: string;
  };
  min?: {
    value: number;
    message?: string;
  };
  max?: {
    value: number;
    message?: string;
  };
  email?: {
    value: boolean;
    message?: string;
  };
}