import { DynamicTable } from "../DynamicTable/DynamicTable";
import { DynamicForm, ApiConfig } from "../DynamicForm/DynamicForm";
import { ActionConfig, ColumnsProps, MoreActions, SearchConfig, ThemeConfig } from "../DynamicTable/types";
import { FormField } from "../DynamicForm/types";
import { useState } from "react";
import { Modal } from "antd";
import dayjs from "dayjs";

interface DynamicCrudProps {
  title?: string;
  formTitle?: string;
  description?: string;
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
  headerDirection?: "horizontal" | "vertical";
  loading?: boolean;
  onCreate?: (values: Record<string, unknown>) => void;
  onEdit?: (record: unknown) => void;
  onDelete?: (record: unknown) => void;
  apiConfig?: ApiConfig;
  initialData?: Record<string, unknown>;
  themeConfig?: ThemeConfig;
  moreActions?: MoreActions[];
  formCols?: 1 | 2 | 3 | 4;
  formCustomCols?: boolean;
}

/**
 * @alias DynamicCrud
 * @description The DynamicCrud component is a wrapper that combines the DynamicTable and DynamicForm components to create a full-featured CRUD interface.
 * @param {DynamicCrudProps} props
 * @param {ColumnsProps[]} props.columns - The columns of the table
 * @param {unknown[]} props.data - The data of the table
 * @param {string} props.title - The title of the table
 * @param {string} props.description - The description of the table
 * @param {FormField[]} props.fields - The fields of the form
 * @param {boolean} props.showCreateButton - Whether to show the create button
 * @param {string} props.createButtonText - The text of the create button
 * @param {React.ReactElement} props.createButtonIcon - The icon of the create button
 * @param {React.ElementType} props.icon - The icon of the table
 * @param {string} props.layout - The layout of the form
 * @param {ActionConfig} props.actionConfig - The action configuration of the table
 * @param {SearchConfig} props.searchConfig - The search configuration of the table
 * @param {boolean} props.loading - Whether the table is loading
 * @param {() => void} props.onCreate - The function to be called when the create button is clicked
 * @param {() => void} props.onEdit - The function to be called when the edit button is clicked
 * @param {() => void} props.onDelete - The function to be called when the delete button is clicked
 * @param {string} props.submitButtonText - The text of the submit button
 * @param {ApiConfig} props.apiConfig - The API configuration of the form
 * @param {Record<string, unknown>} props.initialData - The initial data of the form
 * @returns {React.ReactNode}
 */
export const DynamicCrud = ({
  columns,
  data,
  title,
  formTitle,
  description,
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
  loading,
  onCreate,
  onEdit,
  onDelete,
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
  const formatRecordDates = (record: Record<string, unknown>): Record<string, unknown> => {
    const formattedRecord = {...record};
    
    fields.forEach((field) => {
      if (field.type === 'datepicker' && formattedRecord[field.name as string]) {
        formattedRecord[field.name as string] = dayjs(formattedRecord[field.name] as string | number | Date | null | undefined);
      }
    });

    return formattedRecord;
  }

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
    setMode(initialData ? "update" : "create");
  }

  const handleEdit = (record: unknown) => {
    const formattedRecord = formatRecordDates(record as Record<string, unknown>);
    setCurrentRecord(formattedRecord);
    setIsModalVisible(true);
    setMode("update");
  }

  const handleDelete = (record: unknown) => {
    console.log('Eliminando registro:', record);
    onDelete?.(record as Record<string, unknown>);
  }

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
        onCreate={() => setIsModalVisible(true)}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
            title={formTitle || title}
            description={description}
            fields={fields}
            icon={icon}
            layout={layout}
            initialData={currentRecord || undefined}
            onSubmit={(values) => {
              try {
                if (mode === 'update') {
                  onEdit?.(values as Record<string, unknown>);
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
