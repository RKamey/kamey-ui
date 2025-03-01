/* eslint-disable @typescript-eslint/no-explicit-any */
export type FieldType = 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'datepicker' | 'rangepicker' | 'time' | 'checkbox' | 'radio' | 'switch' | 'slider' | 'rate' | 'upload' | 'custom' | 'hidden';
export type PickerType = 'date' | 'week' | 'month' | 'quarter' | 'year' | undefined;

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
  onChange?: (value: string | number) => void;
  datepickerConfig?: DatepickerConfig;
  selectConfig?: SelectConfig;
  readonly?: boolean;
  dependsOn?: SelectDependencyConfig;
  checkboxConfig?: CheckboxConfig;
  uploadConfig?: UploadConfig;
  radioConfig?: RadioConfig;
  hidden?: boolean;
}

interface ApiResponse<T> {
  data: T | { data: T };
}

export interface DatepickerConfig {
  format?: string;
  showTime?: boolean;
  picker?: PickerType;
  size?: 'large' | 'middle' | 'small';
}

export interface UploadConfig {
  textButton?: string;
  iconButton?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // en bytes
  maxCount?: number;
  name?: string; // nombre del campo en el FormData
  action?: string; // URL a la que se subirá el archivo
  beforeUpload?: (file: File) => boolean;
  onChange?: (info: any) => void;
  customRequest?: (options: any) => void;
  responseTransform?: (response: any) => string; // función para transformar la respuesta
  formData?: boolean; // indicar si debe usar FormData
  formDataName?: string; // nombre del campo en FormData
  headers?: Record<string, string>; // cabeceras adicionales
}

export interface RadioConfig {
  onChange?: (value: string | number) => void;
  radioWidth?: string | number;
  cols?: number;
}

export interface SelectConfig {
  options?: Options[];
  apiConfig?: {
    url?: string;
    getterMethod?: () => Promise<ApiResponse<unknown>>;
    method?: string;
    headers?: Record<string, string>;
    params?: Record<string, string>;
    valueKey: string;
    labelKey: string;
    responseDataPath?: string;
  };
  customOption?: CustomOption;
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
  paramKey?: string;
  idPlaceholder?: string;
  placeholderTemplate?: string;
  transformRequest?: (value: string | number) => Record<string, string>;
}


export interface CheckboxConfig {
  options?: Options[];
  onChange?: (value: string | number) => void;
}

export interface Options {
  label: string | React.ReactElement;
  value: string | number;
  disabled?: boolean;
}

export interface CustomOption extends Partial<Options> {
  onClick: () => void;
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
  isGreaterThan?: {
    target: string;
    message: string;
  },
  isLessThan?: {
    target: string;
    message: string;
  },
}