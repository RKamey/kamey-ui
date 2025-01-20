import { DynamicTable } from "../DynamicTable/DynamicTable";
import { DynamicForm, ApiConfig } from "../DynamicForm/DynamicForm";
import { ActionConfig, ColumnsProps, SearchConfig, ThemeConfig } from "../DynamicTable/types";
import { FormField } from "../DynamicForm/types";
import { useState } from "react";
import { Modal } from "antd";

interface DynamicCrudProps {
  title: string;
  description?: string;
  columns: ColumnsProps[];
  data: unknown[];
  fields: FormField[];
  showCreateButton?: boolean;
  createButtonText?: string;
  createButtonIcon?: React.ReactElement;
  icon?: React.ElementType;
  layout?: "horizontal" | "vertical";
  actionConfig?: ActionConfig;
  searchConfig?: SearchConfig;
  headerDirection?: "horizontal" | "vertical";
  loading?: boolean;
  onCreate?: (values: Record<string, unknown>) => void;
  onEdit?: (record: unknown) => void;
  onDelete?: (record: unknown) => void;
  onSubmit?: () => void;
  submitButtonText?: string;
  apiConfig?: ApiConfig;
  initialData?: Record<string, unknown>;
  themeConfig?: ThemeConfig 
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
 * @param {() => void} props.onSubmit - The function to be called when the submit button is clicked
 * @param {string} props.submitButtonText - The text of the submit button
 * @param {ApiConfig} props.apiConfig - The API configuration of the form
 * @param {Record<string, unknown>} props.initialData - The initial data of the form
 * @returns {React.ReactNode}
 */
export const DynamicCrud = ({
  columns,
  data,
  title,
  description,
  fields,
  showCreateButton,
  createButtonText,
  createButtonIcon,
  icon,
  layout,
  actionConfig,
  searchConfig,
  headerDirection,
  loading,
  onCreate,
  onEdit,
  onDelete,
  onSubmit,
  submitButtonText,
  apiConfig,
  initialData,
  themeConfig
}: DynamicCrudProps): React.ReactNode => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<Record<string, unknown> | null>(null);
  const [mode, setMode] = useState(initialData ? "update" : "create");
  
  // ==== [ Handlers ] ====
  const handleCreate = (values: Record<string, unknown>) => {
    if (onCreate) {
      onCreate(values);
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
    setCurrentRecord(record as Record<string, unknown>);
    setIsModalVisible(true);
    setMode("update");
    onEdit?.(record);
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
        data={data}
        showCreateButton={showCreateButton}
        createButtonText={createButtonText}
        createButtonIcon={createButtonIcon}
        searchConfig={searchConfig}
        actionConfig={actionConfig}
        headerDirection={headerDirection}
        loading={loading}
        onCreate={() => handleCreate({})}
        onEdit={handleEdit}
        onDelete={handleDelete}
        themeConfig={themeConfig}
      />

      {isModalVisible && (
        <Modal
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <DynamicForm 
            title={title}
            description={description}
            fields={fields}
            icon={icon}
            layout={layout}
            initialData={currentRecord || undefined}
            onSubmit={(values) => {
              if (mode === "create") {
                onCreate?.(values as Record<string, unknown>);
              } else {
                onSubmit?.();
              }
              handleCancel();
            }}
            mode={mode as "create" | "update"}
            submitButtonText={submitButtonText}
            apiConfig={apiConfig}
          />
        </Modal>
      )}
    </div>
  )
}
