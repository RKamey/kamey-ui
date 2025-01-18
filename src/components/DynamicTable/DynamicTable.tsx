import {
  Typography,
  Button,
  Input,
  Table,
  Popconfirm,
  ConfigProvider,
} from "antd";
import { ColumnsProps, DynamicTableProps } from "./types";
import { FaPlus, FaEdit, FaTrash, FaSync } from "react-icons/fa";
import { useMemo, useState } from "react";

const { Title, Text } = Typography;
const { Search } = Input;

/**
 * @description
 * The DynamicTable component is a table that allows you to display and manage data.
 * It includes a search bar, a create button, and action buttons for each row.
 * @param {DynamicTableProps} props
 * @param {string} props.title - The title of the table
 * @param {React.ElementType} props.icon - The icon of the table
 * @param {string} props.description - The description of the table
 * @param {boolean} props.showCreateButton - Whether to show the create button
 * @param {() => void} props.onCreate - The function to be called when the create button is clicked
 * @param {() => void} props.onEdit - The function to be called when the edit button is clicked
 * @param {() => void} props.onDelete - The function to be called when the delete button is clicked
 * @param {string} props.createButtonText - The text of the create button
 * @param {React.ReactElement} props.createButtonIcon - The icon of the create button
 * @param {ColumnsProps[]} props.columns - The columns of the table
 * @param {unknown[]} props.data - The data of the table
 * @param {boolean} props.loading - Whether the table is loading
 * @param {ActionConfig} props.actionConfig - The action configuration of the table
 * @param {SearchConfig} props.searchConfig - The search configuration of the table
 * @returns {React.ReactNode}
 */
export const DynamicTable = ({
  title,
  icon: Icon,
  description,
  showCreateButton,
  showRefreshButton,
  onCreate,
  onEdit,
  onDelete,
  onRefresh,
  createButtonText = "Create",
  createButtonIcon = <FaPlus />,
  columns,
  data,
  loading,
  moreActions,
  actionConfig = {
    showDefaultActions: true,
    showEdit: true,
    showDelete: true,
    customIcons: {
      create: <FaPlus />,
      edit: <FaEdit />,
      delete: <FaTrash />,
    },
    customActionsColor: {
      edit: "!bg-indigo-50 hover:!bg-indigo-100 !text-indigo-600 !border-none shadow-sm hover:shadow transition-all duration-300",
      delete: "!bg-rose-50 hover:!bg-rose-100 !text-rose-600 !border-none shadow-sm hover:shadow transition-all duration-300",
    },
  },
  searchConfig = {
    searchableFields: [],
    customSearch: undefined,
  },
  themeConfig,
}: DynamicTableProps): React.ReactNode => {
  const [searchTerm, setSearchTerm] = useState("");

  // ==== [ Handlers ] ====
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const searchInObject = (obj: any, term: string): boolean => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.values(obj).some((value: any) => {
      if (value === null || value === undefined) return false;

      if (typeof value === "object") {
        return searchInObject(value, term);
      }

      return value.toString().toLowerCase().includes(term.toLowerCase());
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const searchByFields = (item: any, term: string, fields: string[]) => {
    return fields.some((field) => {
      const value = item[field];
      if (value === null || value === undefined) return false;
      return value.toString().toLowerCase().includes(term.toLowerCase());
    });
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter((item) => {
      if (searchConfig.customSearch) {
        return searchConfig.customSearch(item, searchTerm);
      }

      if (
        searchConfig.searchableFields &&
        searchConfig.searchableFields.length > 0
      ) {
        return searchByFields(item, searchTerm, searchConfig.searchableFields);
      }

      return searchInObject(item, searchTerm);
    });
    // eslint-disable-next-line
  }, [data, searchTerm, searchConfig]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const paginationConfig = {
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total: number) => `Total ${total} registros`,
    className: "custom-pagination",
  };

  const handleEdit = (record: Record<string, unknown>) => {
    console.log("Editando registro:", record);
    onEdit?.(record);
  };

  const handleDelete = (record: Record<string, unknown>) => {
    console.log("Eliminando registro:", record);
    onDelete?.(record);
  };

  const handleRefresh = async () => {
    if (onRefresh) {
      await onRefresh();
    }
  };

  const processColumns = (columns: ColumnsProps[]) => {
    const processedColumns = columns.map((column) => ({
      ...column,
      title: column.icon ? (
        <div className="flex items-center gap-2">
          {column.icon && <column.icon className="text-primary-600" />}
          <span className="font-medium">{column.title}</span>
        </div>
      ) : (
        <span className="font-medium">{column.title}</span>
      ),
      className: "py-4 px-6 bg-white",
    }));

    if (actionConfig.showDefaultActions) {
      const actionsColumn = {
        title: <span className="font-medium">Acciones</span>,
        key: "actions",
        width: 120,
        className: "py-4 px-6 bg-white",
        render: (_: unknown, record: unknown) => (
          <div className="flex items-center gap-3">
            {actionConfig.showEdit && (
              <Button
                type="text"
                className={`action-button-edit transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center ${
                  actionConfig.customActionsColor?.edit ||
                  "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
                icon={
                  actionConfig.customIcons?.edit || (
                    <FaEdit className="text-white text-sm" />
                  )
                }
                onClick={() => handleEdit(record as Record<string, unknown>)}
              />
            )}
            {actionConfig.showDelete && (
              <Popconfirm
                title="¿Estás seguro de que deseas eliminar este registro?"
                onConfirm={() =>
                  handleDelete(record as Record<string, unknown>)
                }
                okText="Eliminar"
                cancelText="Cancelar"
              >
                <Button
                  type="text"
                  className={`action-button-delete transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center ${
                    actionConfig.customActionsColor?.delete ||
                    "bg-red-600 hover:bg-red-500 text-white"
                  }`}
                  icon={
                    actionConfig.customIcons?.delete || (
                      <FaTrash className="text-white text-sm" />
                    )
                  }
                />
              </Popconfirm>
            )}
            {moreActions &&
              moreActions.length > 0 &&
              moreActions.map((action) => {
                return (
                  <Button
                    key={action.key}
                    type="text"
                    className={`action-button transition-colors ${
                      actionConfig.customActionsColor?.edit || ""
                    }`}
                    icon={action.icon}
                    onClick={action.onClick}
                  >
                    {action.label}
                  </Button>
                );
              })}
          </div>
        ),
      };
      return [...processedColumns, actionsColumn];
    }

    return processedColumns;
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="p-4 bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {/* Title and Icon Section */}
          <div className="flex items-center space-x-3 gap-2 sm:space-x-4 mb-3 sm:mb-4">
            {Icon && (
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-lightest hover:bg-primary-lightest/70 transition-colors">
                <Icon className="text-primary-dark text-lg sm:text-xl" />
              </div>
            )}
            <Title
              level={4}
              className="!m-0 !text-gray-900 font-bold tracking-tight text-lg sm:text-xl"
            >
              {title}
            </Title>
          </div>

          {/* Content Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Description - Lado izquierdo */}
            {description && (
              <div className="w-full sm:flex-1">
                <Text className="text-gray-600 text-sm leading-relaxed">
                  {description}
                </Text>
              </div>
            )}

            {/* Search y Create Button - Lado derecho */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Search
                allowClear
                className="w-full sm:min-w-[240px]"
                placeholder="Buscar"
                onChange={(e) => handleSearch(e.target.value)}
                onSearch={handleSearch}
              />

              {showRefreshButton && (
                <Button
                  type="default"
                  className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow transition-all duration-300 rounded-lg px-4 h-8"
                  icon={
                    <FaSync className="text-gray-600 hover:rotate-180 transition-transform duration-500" />
                  }
                  onClick={handleRefresh}
                >
                  <span className="text-gray-700 font-medium">Refrescar</span>
                </Button>
              )}

              {showCreateButton && (
                <Button
                  type="primary"
                  className="flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow-md"
                  icon={actionConfig.customIcons?.create || createButtonIcon}
                  onClick={onCreate}
                >
                  {createButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <Table
            columns={processColumns(columns)}
            dataSource={filteredData}
            loading={loading}
            pagination={{
              ...paginationConfig,
              total: filteredData.length,
              showTotal: (total) =>
                `Total ${total} registros${searchTerm ? " filtrados" : ""}`,
              responsive: true,
              className: "px-4 sm:px-6 py-3 sm:py-4",
            }}
            className="dynamic-table"
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};