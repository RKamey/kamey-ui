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
  apiConfig?: ApiConfig;
  initialData?: Record<string, unknown>;
  themeConfig?: ThemeConfig;
  moreActions?: MoreActions[];
  formCols?: 1 | 2 | 3 | 4;
  formCustomCols?: boolean;
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