/**
 * @alias DynamicCrudProps
 * @description The properties object for the DynamicCrud component.
 * @author @RKamey @Guada8a
 * @param {Object} props - The properties object.
 * @param {string} [props.title] - The title of the table.
 * @param {string} [props.formTitle] - The title of the form (used in the modal).
 * @param {string[]} [props.formTitles] - An array of titles for the form, where the first element is used for the "create" mode and the second for the "update" mode.
 * @param {string} [props.description] - The description of the table.
 * @param {string} [props.formDescription] - The description of the form (used in the modal).
 * @param {ColumnsProps[]} props.columns - The columns configuration for the table.
 * @param {unknown[]} [props.data] - The data to display in the table.
 * @param {FormField[]} props.fields - The fields configuration for the form.
 * @param {boolean} [props.showCreateButton] - Whether to show the create button.
 * @param {string} [props.createButtonText="Crear"] - The text for the create button.
 * @param {React.ReactElement} [props.createButtonIcon] - The icon for the create button.
 * @param {string} [props.submitButtonText="Guardar"] - The text for the submit button in the form.
 * @param {React.ReactElement} [props.icon] - The icon to display next to the title.
 * @param {"horizontal" | "vertical"} [props.layout] - The layout of the form (horizontal or vertical).
 * @param {ActionConfig} [props.actionConfig] - Configuration for the actions column in the table.
 * @param {SearchConfig} [props.searchConfig] - Configuration for the search functionality in the table.
 * @param {boolean} [props.showRefreshButton] - Whether to show the refresh button.
 * @param {() => void} [props.onRefresh] - Callback function when the refresh button is clicked.
 * @param {"horizontal" | "vertical"} [props.headerDirection] - The direction of the header (horizontal or vertical).
 * @param {boolean} [props.loading] - Whether the table is in a loading state.
 * @param {OnCreateHandler} [props.onCreate] - Callback function when the create button is clicked or when a new record is submitted.
 * @param {boolean} [props.createRedirect=false] - Whether to redirect to a different page when the create button is clicked.
 * @param {(record: unknown) => void} [props.onEdit] - Callback function when the edit button is clicked or when an existing record is updated.
 * @param {(record: unknown) => void} [props.onDelete] - Callback function when the delete button is clicked.
 * @param {(record: unknown) => void} [props.onView] - Callback function when the view button is clicked. This is optional and will only show the view button if provided.
 * @param {ApiConfig} [props.apiConfig] - Configuration for API interactions in the form.
 * @param {Record<string, unknown>} [props.initialData] - Initial data for the form when in "update" mode.
 * @param {ThemeConfig} [props.themeConfig] - Theme configuration for the table and form.
 * @param {MoreActions[]} [props.moreActions] - Additional actions to display in the actions column of the table.
 * @param {1 | 2 | 3 | 4} [props.formCols=1] - The number of columns to use in the form layout.
 * @param {boolean} [props.formCustomCols=false] - Whether to use a custom column layout in the form.
 * @param {boolean} [props.showView] - Whether to show the view button in the table. This is optional and will only show the view button if `onView` is provided.
 * @param {ExcelConfigProps} [props.exportToExcel] - Configuration for exporting the table data to Excel.
 * @param {boolean | React.ReactElement} [props.backButton] - Whether to show a back button or a custom element.
 * @param {boolean} [props.showSearchBar] - Whether to show the search bar in the table.
 * 
 * @example
 * <DynamicCrud<T>
 *   title="User Management"
 *   description="Manage users in the system"
 *   columns={[
 *     { title: 'Name', dataIndex: 'name', key: 'name' },
 *     { title: 'Email', dataIndex: 'email', key: 'email' },
 *   ]}
 *   data={[
 *     { name: 'John Doe', email: 'john@example.com' },
 *     { name: 'Jane Doe', email: 'jane@example.com' },
 *   ]}
 *   fields={[
 *     { name: 'name', label: 'Name', type: 'text', required: true },
 *     { name: 'email', label: 'Email', type: 'email', required: true },
 *   ]}
 *   showCreateButton={true}
 *   createButtonText="Add User"
 *   onCreate={(values) => console.log('Creating user:', values)}
 *   onEdit={(record) => console.log('Editing user:', record)}
 *   onDelete={(record) => console.log('Deleting user:', record)}
 *   onView={(record) => console.log('Viewing user:', record)} // Optional
 *   showRefreshButton={true}
 *   onRefresh={() => console.log('Refreshing data')}
 *   formCols={2}
 * />
 */

import { DynamicTable } from "../DynamicTable/DynamicTable";
import { DynamicForm, ApiConfig } from "../DynamicForm/DynamicForm";
import { ActionConfig, ColumnsProps, CustomFilters, ExcelConfigProps, MoreActions, SearchConfig, ThemeConfig } from "../DynamicTable/types";
import { FormField } from "../DynamicForm/types";
import { ReactElement, ReactNode, useState } from "react";
import { Modal } from "antd";
import dayjs from "dayjs";
import { PlusOutlined, EditOutlined, InfoCircleFilled } from '@ant-design/icons';

type OnCreateHandler<T = Record<string, unknown>> =
  | ((values: T) => void)
  | (() => void);

export interface DynamicCrudProps<T = Record<string, unknown>> {
  title?: string | ReactElement;
  formTitle?: string | ReactElement;
  formTitles?: string[];
  description?: string | ReactElement;
  formDescription?: string | ReactElement;
  columns: ColumnsProps<T>[];
  data?: [];
  fields: FormField[];
  showCreateButton?: boolean;
  createButtonText?: string;
  createButtonIcon?: ReactElement;
  submitButtonText?: string;
  icon?: ReactElement;
  layout?: "horizontal" | "vertical";
  actionConfig?: ActionConfig;
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
}

export const DynamicCrud = <T extends Record<string, unknown>>({
  columns,
  data,
  title,
  formTitle,
  formTitles,
  description,
  formDescription,
  fields,
  showCreateButton,
  createButtonText = 'Crear',
  createButtonIcon,
  icon,
  layout,
  actionConfig,
  searchConfig,
  headerDirection,
  showRefreshButton,
  onRefresh,
  loading,
  onCreate,
  createRedirect = false,
  onEdit,
  onDelete,
  onView,
  submitButtonText = 'Guardar',
  apiConfig,
  initialData,
  themeConfig,
  moreActions,
  formCols = 1,
  formCustomCols = false,
  exportToExcel,
  backButton,
  showSearchBar,
  customFilters,
  disableWrapper = false
}: DynamicCrudProps<T>): ReactNode => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<T | null>(null);
  const [mode, setMode] = useState(initialData ? "update" : "create");

  // ==== [ Handlers ] ====
  const primaryKeyField = columns.find((col => col.isPrimaryKey))?.dataIndex || 'id';

  const formatRecordDates = (record: T): T => {
    const formattedRecord = { ...record };

    fields.forEach((field) => {
      if (field.type === 'datepicker' && formattedRecord[field.name as string]) {
        (formattedRecord as Record<string, unknown>)[field.name as string] = dayjs(formattedRecord[field.name] as string | number | Date | null | undefined);
      }
    });

    return formattedRecord;
  }

  const handleCreate = () => {
    if (createRedirect) {
      if (typeof onCreate === 'function') {
        onCreate({} as T);
      }
    } else {
      setIsModalVisible(true);
      setMode("create");
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
    setMode(initialData ? "update" : "create");
  }

  const handleEdit = (record: T) => {
    const formattedRecord = formatRecordDates(record);
    
    setCurrentRecord(formattedRecord);
    setIsModalVisible(true);
    setMode("update");
  };

  const handleDelete = (record: T) => {
    onDelete?.(record);
  }

  const handleView = (record: T) => {
    if (onView) {
      onView(record);
    } else {
      const formattedRecord = formatRecordDates(record);
      setCurrentRecord(formattedRecord);
      setIsModalVisible(true);
      setMode("view");
    }
  }

  // ==== [ Títulos e íconos ] ====

  const defaultCreateTitle = formTitles?.[0] || "Crear nuevo registro";
  const defaultEditTitle = formTitles?.[1] || "Editar registro";
  const defaultViewTitle = formTitles?.[2] || "Ver registro";
  const defaultCreateIcon = createButtonIcon || <PlusOutlined />;
  const defaultEditIcon = <EditOutlined />;
  const defaultViewIcon = <InfoCircleFilled />;

  const formTitleToShow = formTitle || (mode === "create" ? defaultCreateTitle : mode === "update" ? defaultEditTitle : defaultViewTitle);
  const formIconToShow = icon || (mode === "create" ? defaultCreateIcon : mode === "update" ? defaultEditIcon : defaultViewIcon);

  return (
    <div>
      <DynamicTable<T>
        title={title}
        description={description}
        icon={icon}
        columns={columns}
        data={data || []}
        showCreateButton={showCreateButton}
        createButtonText={createButtonText}
        createButtonIcon={createButtonIcon}
        searchConfig={searchConfig}
        actionConfig={actionConfig}
        headerDirection={headerDirection}
        showSearchBar={showSearchBar}
        showRefreshButton={showRefreshButton}
        loading={loading}
        onCreate={handleCreate}
        onEdit={(record) => {
          handleEdit(record);
        }}
        onRefresh={onRefresh}
        onDelete={handleDelete}
        onView={handleView}
        themeConfig={themeConfig}
        moreActions={moreActions}
        customFilters={customFilters}
        exportToExcel={exportToExcel}
        backButton={backButton}
        disableWrapper={disableWrapper}
      />

      {isModalVisible && (
        <Modal
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <DynamicForm
            title={formTitleToShow}
            description={formDescription || description}
            fields={fields}
            icon={formIconToShow}
            layout={layout}
            initialData={currentRecord || undefined}
            onSubmit={(values) => {
              try {
                if (mode === 'update') {
                  const dataToSend = {
                    ...(typeof values === 'object' && values !== null ? values : {}),
                    [primaryKeyField]: currentRecord?.[primaryKeyField]
                  };

                  onEdit?.(dataToSend as T);
                  setCurrentRecord(null);
                } else {
                  onCreate?.(values as Record<string, unknown>);
                }
                setIsModalVisible(false);
              } catch (error) {
                console.error(`Error al ${mode === 'update' ? 'editar' : 'crear'} registro:`, error);
              }
            }}
            mode={mode as "create" | "update" | "view"}
            submitButtonText={submitButtonText}
            apiConfig={apiConfig}
            cols={formCols}
            customCols={formCustomCols}
          />
        </Modal>
      )}
    </div>
  )
}