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
 * 
 * @example
 * <DynamicCrud
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
import { ActionConfig, ColumnsProps, MoreActions, SearchConfig, ThemeConfig } from "../DynamicTable/types";
import { FormField } from "../DynamicForm/types";
import { useState } from "react";
import { Modal } from "antd";
import dayjs from "dayjs";
import { PlusOutlined, EditOutlined } from '@ant-design/icons'; // Importar íconos por defecto

type OnCreateHandler = 
  | ((values: Record<string, unknown>) => void)
  | (() => void);

interface DynamicCrudProps {
  title?: string;
  formTitle?: string;
  formTitles?: string[];
  description?: string;
  formDescription?: string;
  columns: ColumnsProps[];
  data?: unknown[];
  fields: FormField[];
  showCreateButton?: boolean;
  createButtonText?: string;
  createButtonIcon?: React.ReactElement;
  submitButtonText?: string;
  icon?: React.ReactElement;
  layout?: "horizontal" | "vertical";
  actionConfig?: ActionConfig;
  searchConfig?: SearchConfig;
  showRefreshButton?: boolean;
  onRefresh?: () => void;
  headerDirection?: "horizontal" | "vertical";
  loading?: boolean;
  onCreate?: OnCreateHandler;
  createRedirect?: boolean;
  onEdit?: (record: unknown) => void;
  onDelete?: (record: unknown) => void;
  onView?: (record: unknown) => void;
  apiConfig?: ApiConfig;
  initialData?: Record<string, unknown>;
  themeConfig?: ThemeConfig;
  moreActions?: MoreActions[];
  formCols?: 1 | 2 | 3 | 4;
  formCustomCols?: boolean;
  showView?: boolean;
}

export const DynamicCrud = ({
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
  formCustomCols = false
}: DynamicCrudProps): React.ReactNode => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<Record<string, unknown> | null>(null);
  const [mode, setMode] = useState(initialData ? "update" : "create");

  // ==== [ Handlers ] ====
  const primaryKeyField = columns.find((col => col.isPrimaryKey))?.dataIndex || 'id';

  const formatRecordDates = (record: Record<string, unknown>): Record<string, unknown> => {
    const formattedRecord = {...record};
    
    fields.forEach((field) => {
      if (field.type === 'datepicker' && formattedRecord[field.name as string]) {
        formattedRecord[field.name as string] = dayjs(formattedRecord[field.name] as string | number | Date | null | undefined);
      }
    });

    return formattedRecord;
  }
  
  const handleCreate = () => {
    if (createRedirect) {
      if (typeof onCreate === 'function') {
        onCreate({});
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

  const handleEdit = (record: unknown) => {
    const formattedRecord = formatRecordDates(record as Record<string, unknown>);
    
    console.log('ID del registro:', formattedRecord[primaryKeyField]);
    
    setCurrentRecord(formattedRecord);
    setIsModalVisible(true);
    setMode("update");
  };
  

  const handleDelete = (record: unknown) => {
    console.log('Eliminando registro:', record);
    onDelete?.(record as Record<string, unknown>);
  }

  const handleView = (record: unknown) => {
    onView?.(record as Record<string, unknown>);
  }

  // ==== [ Títulos e íconos ] ====

  const defaultCreateTitle = formTitles?.[0] || "Crear nuevo registro";
  const defaultEditTitle = formTitles?.[1] || "Editar registro";
  const defaultCreateIcon = createButtonIcon || <PlusOutlined />;
  const defaultEditIcon = <EditOutlined />;

  const formTitleToShow = formTitle || (mode === "create" ? defaultCreateTitle : defaultEditTitle);
  const formIconToShow = icon || (mode === "create" ? defaultCreateIcon : defaultEditIcon);

  return (
    <div>
      <DynamicTable
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
        showRefreshButton={showRefreshButton}
        loading={loading}
        onCreate={handleCreate}
        onEdit={(record) => {
          console.log('editando', record);
          handleEdit(record);
        }}
        onRefresh={onRefresh}
        onDelete={handleDelete}
        onView={handleView}
        themeConfig={themeConfig}
        moreActions={moreActions}
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
                  
                  onEdit?.(dataToSend as Record<string, unknown>);
                } else {
                  onCreate?.(values as Record<string, unknown>);
                }
                setIsModalVisible(false);
                } catch (error) {
                console.error(`Error al ${mode === 'update' ? 'editar' : 'crear'} registro:`, error);
              }
            }}
            mode={mode as "create" | "update"}
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