import { AxiosInstance } from 'axios';
import { AxiosRequestConfig } from 'axios';
import { CSSProperties } from 'react';
import { default as default_2 } from 'react';
import { JSX } from 'react/jsx-runtime';
import { QueryKey } from '@tanstack/react-query';
import { QueryObserverResult } from '@tanstack/query-core';
import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { RefetchOptions } from '@tanstack/query-core';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query';
import { UseQueryResult } from '@tanstack/react-query';

export declare interface ActionConfig<T extends Record<string, unknown> = Record<string, unknown>> {
    showDefaultActions?: boolean;
    showEdit?: boolean | ((record: T) => boolean);
    showDelete?: boolean | ((record: T) => boolean);
    showView?: boolean | ((record: T) => boolean);
    customIcons?: ActionIcons;
    refreshButtonText?: string;
    customActionsColor?: {
        edit?: string;
        delete?: string;
        view?: string;
        moreActions?: string;
    };
}

export declare interface ActionIcons {
    create?: React.ReactElement;
    edit?: React.ReactElement;
    delete?: React.ReactElement;
    refresh?: React.ReactElement;
    view?: React.ReactElement;
}

declare interface ApiConfig {
    url: string;
    method: string;
    headers?: Record<string, string>;
    params?: Record<string, string>;
    responseDataPath?: string;
}

declare interface ApiResponse<T> {
    data: T | {
        data: T;
    };
}

/**
 * Clase para gestionar la creación y obtención de instancias de Axios.
 * Permite crear instancias de Axios con una URL base, configuración personalizada
 * y opcionalmente un número de versión específico.
 *
 * @param baseUrl URL base de la API
 * @param config Configuración personalizada de Axios
 *
 * @method version(version: string): AxiosInstance
 * @method getInstance(version: string): AxiosInstance
 *
 * @example
 * ```typescript
 * // Configuración básica
 * const api = new ApiVersioning(import.meta.env.VITE_API_URL);
 *
 * // Configuración personalizada
 * const api = new ApiVersioning(import.meta.env.VITE_API_URL, {
 *   headers: { 'Authorization': 'Bearer token' },
 *   withCredentials: true
 * });
 *
 * // Con versión
 * const apiV1 = api.getInstance('v1');
 *
 * // Sin versión - petición GET
 * const response = await api.get('/users');
 *
 * // Con versión - petición Get
 * const response = await apiV1.get('/users');
 * ```
 */
export declare class ApiVersioning {
    private baseUrl;
    private config?;
    private instances;
    constructor(baseUrl: string, config?: AxiosRequestConfig);
    private createApiInstance;
    version(version: string): AxiosInstance;
    getInstance(version: string): AxiosInstance;
}

/**
 * @alias Btn
 * @description Versatile button component with icon support, custom variants and presets
 * @param {BtnProps} props
 * @param {React.ReactNode} props.children - The content of the button
 * @param {'primary' | 'link' | 'text' | 'default' | 'dashed'} props.type - The Ant Design button type
 * @param {'small' | 'middle' | 'large'} props.size - The size of the button
 * @param {'default' | 'success' | 'danger' | 'warning' | 'info' | 'dark'} props.variant - Color variant
 * @param {'save' | 'delete' | 'edit' | 'add' | 'download' | 'upload' | 'refresh' | 'search' | 'settings' | 'profile' | 'favorite' | 'cart' | 'mail' | 'call' | 'home' | 'next'} props.preset - Predefined button with icon and text
 * @param {React.ReactNode} props.icon - Custom icon
 * @param {'left' | 'right'} props.iconPosition - Position of the icon
 * @param {boolean} props.iconOnly - Show only icon without text
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.disabled - Disabled state
 * @param {() => void} props.onClick - Click handler
 * @returns {React.ReactNode}
 * @example
 * <Btn preset="save" variant="success">Guardar</Btn>
 * <Btn icon={<FiCustomIcon />} variant="info">Custom</Btn>
 * <Btn preset="delete" iconOnly />
 */
export declare const Btn: ({ children, type, size, variant, preset, icon, iconPosition, iconOnly, loading, disabled, onClick }: BtnProps) => React.ReactNode;

export declare interface BtnProps {
    children?: React.ReactNode;
    type?: 'primary' | 'link' | 'text' | 'default' | 'dashed';
    size?: 'small' | 'middle' | 'large';
    variant?: 'default' | 'success' | 'danger' | 'warning' | 'info' | 'dark';
    preset?: 'save' | 'delete' | 'edit' | 'add' | 'download' | 'upload' | 'refresh' | 'search' | 'settings' | 'profile' | 'favorite' | 'cart' | 'mail' | 'call' | 'home' | 'next';
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    iconOnly?: boolean;
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

export declare interface CheckboxConfig {
    options?: Options[];
    onChange?: (value: string | number) => void;
}

export declare interface ColumnsProps<T = Record<string, unknown>> {
    title: string;
    dataIndex: string;
    isPrimaryKey?: boolean;
    isHidden?: boolean;
    key: string | number;
    filters?: FilterItem[];
    onFilter?: (value: boolean | React.Key, record: T & {
        key: number;
    }) => boolean;
    width?: string | number;
    align?: "left" | "right" | "center";
    icon?: React.ReactElement;
    render?: (value: T[keyof T], record: T) => React.ReactNode;
    sorter?: boolean | ((a: T, b: T) => number);
}

/**
 * Crea un generador de acciones tipado para un tipo específico
 * @returns Una función createMoreAction tipada con T
 */
export declare const createActionFactory: <T>() => (key: string, icon: default_2.ReactElement, tooltip: string, className: string, onClick: (record: T) => void, hidden?: (record: T) => boolean, label?: string, style?: default_2.CSSProperties) => MoreActions<T>;

export declare const createPermissions: (...permissions: Permission[]) => Permission[];

/**
 * Helper function to create a fully typed permission configuration.
 * Accepts any dynamic role and generates the corresponding permissions.
 * @param config - The permission configuration object.
 * @returns A fully typed permission configuration.
 */
export declare const createPermissionsConfig: <T extends PermissionConfig>(config: T) => T;

declare type CrudName = string;

declare type CrudOperations<T, CreateT = T> = {
    getAll: () => Promise<{
        data: T[];
        error?: boolean;
        message?: string;
    }>;
    create?: (item: CreateT) => Promise<{
        data: T;
        error?: boolean;
        message?: string;
    }>;
    update?: (item: T) => Promise<{
        data: T;
        error?: boolean;
        message?: string;
    }>;
    delete?: (item: T | {
        [key: string]: any;
    }) => Promise<{
        data: T;
        error?: boolean;
        message?: string;
    }>;
    idField?: string;
    entityName?: string;
};

declare type CrudPermissions = Record<string, Permission[]>;

export declare interface CustomFilters<T = Record<string, unknown>> {
    key: string;
    label?: string | ReactElement;
    className?: string;
    style?: React.CSSProperties;
    icon?: React.ReactElement;
    onClick: (record: T) => void;
}

declare interface CustomOption extends Partial<Options> {
    onClick: () => void;
}

declare interface CustomTitleProps {
    level?: 1 | 2 | 3 | 4 | 5;
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
}

export declare interface DatepickerConfig {
    format?: string;
    showTime?: boolean;
    picker?: PickerType;
    size?: 'large' | 'middle' | 'small';
}

declare interface DirectPermissions {
    create?: boolean;
    read?: boolean;
    update?: boolean;
    delete?: boolean;
    view?: boolean;
    refresh?: boolean;
    export?: boolean;
}

export declare const DynamicCrud: <T extends Record<string, unknown>>({ columns, data, title, formTitle, formTitles, description, formDescription, fields, showCreateButton, createButtonText, createButtonIcon, icon, layout, actionConfig, searchConfig, headerDirection, showRefreshButton, onRefresh, loading, onCreate, createRedirect, onEdit, onDelete, onView, submitButtonText, apiConfig, initialData, themeConfig, moreActions, formCols, formCustomCols, exportToExcel, backButton, showSearchBar, customFilters, disableWrapper, hiddenActions, widthActionsCol, crudName, permissions, }: DynamicCrudProps<T>) => ReactNode;

export declare interface DynamicCrudProps<T extends Record<string, unknown>> {
    title?: string | ReactElement;
    formTitle?: string | ReactElement;
    formTitles?: string[];
    description?: string | ReactElement;
    formDescription?: string | ReactElement;
    columns: ColumnsProps<T>[];
    data?: T[];
    fields?: FormField[];
    showCreateButton?: boolean;
    createButtonText?: string;
    createButtonIcon?: ReactElement;
    submitButtonText?: string;
    icon?: ReactElement;
    layout?: "horizontal" | "vertical";
    actionConfig?: ActionConfig<T>;
    hiddenActions?: boolean;
    searchConfig?: SearchConfig<T>;
    showRefreshButton?: boolean;
    onRefresh?: () => void;
    headerDirection?: "horizontal" | "vertical";
    loading?: boolean;
    onCreate?: OnCreateHandler;
    createRedirect?: boolean;
    onEdit?: (record: T) => void;
    onDelete?: (record: T) => void;
    onView?: (record: T) => void;
    apiConfig?: ApiConfig;
    initialData?: T;
    themeConfig?: ThemeConfig;
    moreActions?: MoreActions<T>[];
    customFilters?: CustomFilters[];
    formCols?: 1 | 2 | 3 | 4;
    formCustomCols?: boolean;
    showView?: boolean;
    exportToExcel?: ExcelConfigProps<T>;
    backButton?: boolean | ReactElement;
    showSearchBar?: boolean;
    disableWrapper?: boolean;
    widthActionsCol?: string | number;
    crudName?: string;
    permissions?: {
        create?: boolean;
        read?: boolean;
        update?: boolean;
        delete?: boolean;
        export?: boolean;
        view?: boolean;
        refresh?: boolean;
    };
}

export declare const DynamicForm: ({ mode, title, description, icon, layout, cols, fields, submitButtonText, onSubmit, initialData, customCols, }: DynamicFormProps) => default_2.ReactNode;

declare interface DynamicFormProps {
    mode?: "create" | "update" | "view";
    title?: string | ReactElement;
    description?: string | ReactElement;
    icon?: ReactElement;
    layout?: "vertical" | "horizontal";
    cols?: 1 | 2 | 3 | 4;
    fields: FormField[] | FormField[][];
    submitButtonText?: string;
    onSubmit?: (data: unknown) => void;
    apiConfig?: ApiConfig;
    initialData?: Record<string, unknown>;
    customCols?: boolean;
}

export declare const DynamicTable: <T extends Record<string, unknown>>({ title, icon: Icon, description, showSearchBar, showCreateButton, onCreate, onEdit, onDelete, onView, onRefresh, exportToExcel, createButtonText, createButtonIcon, columns, data, loading, moreActions, customFilters, disableWrapper, actionConfig, showRefreshButton, hiddenActions, searchConfig, backButton, widthActionsCol, }: DynamicTableProps<T>) => default_2.ReactNode;

export declare interface DynamicTableProps<T = Record<string, unknown>> {
    title?: string | ReactElement;
    description?: string | ReactElement;
    icon?: ReactElement;
    headerDirection?: "horizontal" | "vertical";
    columns: ColumnsProps<T>[];
    data: T[];
    className?: string;
    loading?: boolean;
    exportToExcel?: ExcelConfigProps<T>;
    showSearchBar?: boolean;
    showCreateButton?: boolean;
    showRefreshButton?: boolean;
    disableWrapper?: boolean;
    createButtonText?: string;
    createButtonIcon?: ReactElement;
    moreActions?: MoreActions<T>[];
    customFilters?: CustomFilters<T>[];
    onCreate?: () => void;
    onView?: (record: T) => void;
    onEdit?: (record: T) => void;
    onDelete?: (record: T) => void;
    onRefresh?: () => void;
    actionConfig?: ActionConfig;
    searchConfig?: SearchConfig<T>;
    themeConfig?: ThemeConfig;
    customCols?: boolean;
    backButton?: boolean | ReactElement;
    hiddenActions?: boolean;
    widthActionsCol?: string | number;
}

export declare interface ExcelConfigProps<T = Record<string, unknown>> {
    fileName: string;
    sheetName: string;
    data: T[];
    columns: ColumnsProps<T>[];
    buttonProps?: {
        className?: string;
        style?: React.CSSProperties;
        text?: string;
    };
}

export declare type FieldType = 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'datepicker' | 'rangepicker' | 'time' | 'checkbox' | 'radio' | 'switch' | 'slider' | 'rate' | 'upload' | 'custom' | 'hidden';

export declare interface FilterItem {
    text: string;
    value: string | number | boolean;
    children?: FilterItem[];
}

export declare interface FormField {
    type: FieldType;
    name: string;
    label?: string;
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

/**
 * Función para generar las columnas de una tabla a partir de un objeto de campos.
 * @param fields Objeto de campos.
 * @returns Arreglo de columnas con el tipo ColumnsProps<T>.
 */
export declare const generateColumns: <T extends object>(fields: Record<string, SharedFieldConfig>) => ColumnsProps<T>[];

/**
 * Función para generar los campos de un formulario a partir de un objeto de campos.
 * @param fields Objeto de campos.
 * @returns Arreglo de campos con el tipo FormField[].
 */
export declare const generateFields: (fields: Record<string, SharedFieldConfig>) => FormField[];

export declare interface MoreActions<T = Record<string, unknown>> {
    key: string;
    label?: string;
    tooltip?: string;
    className?: string;
    style?: React.CSSProperties;
    icon?: React.ReactElement;
    hidden?: (record: T) => boolean;
    onClick: (record: T) => void;
}

declare type MutationConfig<TData, TError, TVariables> = {
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
    onMutate?: (variables: TVariables) => void;
    onSettled?: (data: TData | undefined, error: TError | null) => void;
};

/**
 * Componente de Notificación
 * @description Muestra una notificación con un mensaje
 * @param type Tipo de notificación
 * @param message Mensaje de la notificación
 * @param placement Posición de la notificación
 * @example openNotification('success', 'Usuario creado', 'El usuario fue creado exitosamente');
 */
declare type NotificationType = 'success' | 'error' | 'info' | 'warning';

declare type OnCreateHandler<T = Record<string, unknown>> = ((values: T) => void) | (() => void);

export declare const openNotification: (type: NotificationType, message: string, description: string, placement?: placement) => void;

export declare interface Options {
    label: string | React.ReactElement;
    value: string | number | boolean;
    disabled?: boolean;
}

declare type Permission = 'create' | 'read' | 'update' | 'delete' | 'view' | 'refresh' | 'export';

declare interface PermissionChecker {
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    canView: boolean;
    canRefresh: boolean;
    canExport: boolean;
    hasPermission: (permission: string) => boolean;
}

declare type PermissionConfig = Record<string, CrudPermissions>;

/**
 * Predefined permission sets for easy configuration
 */
export declare const PERMISSIONS: {
    readonly FULL_ACCESS: Permission[];
    readonly READ_WRITE: Permission[];
    readonly READ_ONLY: Permission[];
    readonly VIEW_ONLY: Permission[];
    readonly NO_ACCESS: Permission[];
};

declare type PermissionsConfig = Record<CrudName, Record<string, Permission[]>>;

export declare const PermissionsProvider: ({ role, config, children }: PermissionsProviderProps) => JSX.Element;

declare interface PermissionsProviderProps {
    role: string;
    config: PermissionsConfig;
    children: ReactNode;
}

export declare type PickerType = 'date' | 'week' | 'month' | 'quarter' | 'year' | undefined;

declare type placement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

declare type QueryConfig<TData, TError> = {
    enabled?: boolean;
    retry?: boolean | number;
    staleTime?: number;
    cacheTime?: number;
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
};

export declare interface RadioConfig {
    onChange?: (value: string | number) => void;
    radioWidth?: string | number;
    cols?: number;
}

export declare interface SearchConfig<T> {
    searchableFields?: string[];
    customSearch?: (item: T, term: string) => boolean;
}

export declare interface SelectConfig {
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

export declare interface SelectDependencyConfig {
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

export declare interface SharedFieldConfig<T = Record<string, unknown>> {
    key: string;
    title: string;
    label?: string;
    placeholder?: string;
    validations?: Validations[];
    filtrers?: FilterItem[];
    onFilter?: (value: boolean | React.Key, record: T & {
        key: number;
    }) => boolean;
    width?: string | number;
    datepickerConfig?: {
        format: string;
        showTime: boolean;
    };
    min?: number;
    render?: <T extends string = string>(value: T) => React.ReactNode;
    readonly?: boolean;
    isHidden?: boolean;
    hiddenInForm?: boolean;
    type?: FieldType;
    align?: "left" | "right" | "center";
    icon?: React.ReactElement;
    checkboxConfig?: CheckboxConfig;
    selectConfig?: SelectConfig;
    dependsOn?: SelectDependencyConfig;
    max?: number;
    step?: number;
    options?: Array<{
        label: string;
        value: string | number;
    }>;
    sorter?: boolean;
    onChange?: (value: string | number) => void;
    uploadConfig?: UploadConfig;
    radioConfig?: RadioConfig;
}

declare type SortFunction<T> = (a: T, b: T) => number;

/**
 * Función para ordenar un arreglo de objetos por una propiedad específica.
 * @param key Propiedad por la que se va a ordenar.
 * @returns Función de comparación para usar en el método `sort` de un arreglo.
 */
export declare const sortOrder: <T extends object>(key: keyof T) => SortFunction<T>;

export declare interface ThemeConfig {
    token?: {
        colorPrimary?: string;
        colorPrimaryHover?: string;
    };
    components?: {
        Table?: {
            headerBg?: string;
            colorTextHeading?: string;
            stickyScrollBar?: string;
            rowHoverBg?: string;
        };
    };
}

export declare const Title: ({ level, children, className, style }: CustomTitleProps) => JSX.Element;

declare interface UploadConfig {
    textButton?: string;
    iconButton?: string;
    accept?: string;
    multiple?: boolean;
    maxSize?: number;
    maxCount?: number;
    name?: string;
    action?: string;
    beforeUpload?: (file: File) => boolean;
    onChange?: (info: any) => void;
    customRequest?: (options: any) => void;
    responseTransform?: (response: any) => string;
    formData?: boolean;
    formDataName?: string;
    headers?: Record<string, string>;
    listType?: 'text' | 'picture' | 'picture-card';
    renderPreview?: (value: string) => React.ReactNode;
}

/**
 * Custom hook to handle asynchronous operations.
 *
 * @template T - The type of the data returned by the async function.
 * @param {() => Promise<T>} asyncFunction - The asynchronous function to execute.
 * @param {unknown[]} [dependencies] - Optional array of dependencies for the useEffect hook.
 * @returns {{ data: T | undefined, error: Error | null, loading: boolean }} - An object containing the data, error, and loading state.
 */
export declare const useAsync: <T>(asyncFunction: () => Promise<T>, dependencies?: unknown[]) => {
    data: T | undefined;
    error: Error | null;
    loading: boolean;
};

export declare function useCrudOperations<T extends {
    [key: string]: any;
}, CreateT = Omit<T, 'id'>>({ getAll, create, update, delete: deleteItem, idField, entityName, }: CrudOperations<T, CreateT>): {
    data: T[];
    isLoading: boolean;
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<T[], Error>>;
    handleCreate: (values: Record<string, unknown>) => Promise<T>;
    handleUpdate: (record: unknown) => Promise<T>;
    handleDelete: (record: unknown) => Promise<T>;
    createItemAsync: UseMutateAsyncFunction<T, Error, CreateT, unknown>;
    updateItemAsync: UseMutateAsyncFunction<T, Error, T, unknown>;
    deleteItemAsync: UseMutateAsyncFunction<T, Error, T, unknown>;
};

/**
 * Use Mutation Fetch Hook
 * @param queryKey - The query key.
 * @param mutationFn - The mutation function.
 * @param config - The mutation configuration.
 * @returns The mutation result.
 * @template TData - The mutation data type.
 * @template TError - The mutation error type.
 * @template TVariables - The mutation variables type.
 * @example
 * const { mutateAsync: createItemAsync } = useMutationFetch<T, Error, CreateT>({
 * queryKey: KEY,
 * mutationFn: async (item: CreateT) => {
 * const response = await create(item);
 * return response.data;
 * },
 * config: getMutationConfig('creado'),
 * });
 * @see https://tanstack.com/query/latest/docs/framework/react/mutations
 */
export declare const useMutationFetch: <TData, TError = Error, TVariables = unknown>({ queryKey, mutationFn, config }: {
    queryKey: QueryKey;
    mutationFn: (variables: TVariables) => Promise<TData>;
    config?: MutationConfig<TData, TError, TVariables>;
}) => UseMutationResult<TData, TError, TVariables, unknown>;

export declare const usePermissions: (crudName?: string, directPermissions?: DirectPermissions) => PermissionChecker;

export declare const useQueryFetch: <TData, TError = Error>({ queryKey, queryFn, config }: {
    queryKey: QueryKey;
    queryFn: () => Promise<TData>;
    config?: QueryConfig<TData, TError>;
}) => UseQueryResult<TData, TError>;

export declare interface Validations {
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
    };
    isLessThan?: {
        target: string;
        message: string;
    };
}

export { }
