/**
 * @alias DynamicTableProps
 * @description The properties object for the DynamicTable component.
 * @author @RKamey @Guada8a
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the table.
 * @param {React.ReactNode} [props.icon] - The icon to display next to the title.
 * @param {string} [props.description] - The description of the table.
 * @param {boolean} [props.showCreateButton] - Whether to show the create button.
 * @param {boolean} [props.showRefreshButton] - Whether to show the refresh button.
 * @param {() => void} [props.onCreate] - Callback function when the create button is clicked.
 * @param {(record: Record<string, unknown>) => void} [props.onEdit] - Callback function when the edit button is clicked.
 * @param {(record: Record<string, unknown>) => void} [props.onDelete] - Callback function when the delete button is clicked.
 * @param {() => void} [props.onRefresh] - Callback function when the refresh button is clicked.
 * @param {string} [props.createButtonText="Crear"] - The text for the create button.
 * @param {React.ReactNode} [props.createButtonIcon=<FaPlus />] - The icon for the create button.
 * @param {ColumnsProps[]} props.columns - The columns configuration for the table.
 * @param {Record<string, unknown>[]} props.data - The data to display in the table.
 * @param {boolean} [props.loading] - Whether the table is in a loading state.
 * @param {Array<{ key: string, label: string, icon: React.ReactNode, onClick: (record: Record<string, unknown>) => void }>} [props.moreActions] - Additional actions to display in the actions column.
 * @param {Object} [props.actionConfig] - Configuration for the actions column.
 * @param {boolean} [props.actionConfig.showDefaultActions=true] - Whether to show the default actions (edit, delete).
 * @param {boolean} [props.actionConfig.showEdit=true] - Whether to show the edit button.
 * @param {boolean} [props.actionConfig.showDelete=true] - Whether to show the delete button.
 * @param {string} [props.actionConfig.refreshButtonText="Refrescar"] - The text for the refresh button.
 * @param {Object} [props.actionConfig.customIcons] - Custom icons for the actions.
 * @param {React.ReactNode} [props.actionConfig.customIcons.create=<FaPlus />] - Custom icon for the create button.
 * @param {React.ReactNode} [props.actionConfig.customIcons.edit=<FaEdit />] - Custom icon for the edit button.
 * @param {React.ReactNode} [props.actionConfig.customIcons.delete=<FaTrash />] - Custom icon for the delete button.
 * @param {React.ReactNode} [props.actionConfig.customIcons.refresh=<FaSync />] - Custom icon for the refresh button.
 * @param {Object} [props.actionConfig.customActionsColor] - Custom colors for the actions.
 * @param {string} [props.actionConfig.customActionsColor.edit] - Custom color for the edit button.
 * @param {string} [props.actionConfig.customActionsColor.delete] - Custom color for the delete button.
 * @param {Object} [props.searchConfig] - Configuration for the search functionality.
 * @param {string[]} [props.searchConfig.searchableFields=[]] - Fields to search within.
 * @param {(item: Record<string, unknown>, term: string) => boolean} [props.searchConfig.customSearch] - Custom search function.
 * @param {Object} [props.themeConfig] - Theme configuration for the table.
 * 
 * @example
 * <DynamicTable
 *   title="User List"
 *   icon={<FaUsers />}
 *   description="List of all users"
 *   showCreateButton={true}
 *   showRefreshButton={true}
 *   onCreate={() => console.log('Create button clicked')}
 *   onEdit={(record) => console.log('Edit button clicked', record)}
 *   onDelete={(record) => console.log('Delete button clicked', record)}
 *   onRefresh={() => console.log('Refresh button clicked')}
 *   createButtonText="Add User"
 *   columns={[
 *     { title: 'Name', dataIndex: 'name', key: 'name' },
 *     { title: 'Email', dataIndex: 'email', key: 'email' },
 *   ]}
 *   data={[
 *     { name: 'John Doe', email: 'john@example.com' },
 *     { name: 'Jane Doe', email: 'jane@example.com' },
 *   ]}
 *   loading={false}
 * />
 */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from "react";
import {
  Typography,
  Input,
  Table,
  Popconfirm,
  ConfigProvider,
  Button,
  Space,
  TableProps,
} from "antd";
import { FaPlus, FaEdit, FaTrash, FaSync } from "react-icons/fa";
import { ColumnsProps, DynamicTableProps } from "./types";
import { SorterResult } from "antd/es/table/interface";

const { Title, Text } = Typography;
const { Search } = Input;

type OnChange = NonNullable<TableProps<Record<string, unknown>>['onChange']>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

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
  createButtonText = "Crear",
  createButtonIcon = <FaPlus />,
  columns,
  data,
  loading,
  moreActions,
  actionConfig = {
    showDefaultActions: true,
    showEdit: true,
    showDelete: true,
    refreshButtonText: "Refrescar",
    customIcons: {
      create: <FaPlus />,
      edit: <FaEdit />,
      delete: <FaTrash />,
      refresh: <FaSync />,
    },
    customActionsColor: {
      edit: "!bg-yellow-50 hover:!bg-yellow-100 !text-yellow-600 !border-none shadow-sm hover:shadow transition-all duration-300",
      delete: "!bg-red-50 hover:!bg-red-100 !text-red-600 !border-none shadow-sm hover:shadow transition-all duration-300",
    },
  },
  searchConfig = {
    searchableFields: [],
    customSearch: undefined,
  },
  themeConfig,
}: DynamicTableProps): React.ReactNode => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const dataWithKey = useMemo(() => data.map((item, index) => (typeof item === 'object' && item !== null ? { ...item, key: index } : { key: index })), [data]);

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const searchInObject = (obj: Record<string, unknown>, term: string): boolean => {
    return Object.values(obj).some((value: unknown) => {
      if (value === null || value === undefined) return false;

      if (typeof value === "object") {
        return typeof value === 'object' && value !== null && !Array.isArray(value) ? searchInObject(value as Record<string, unknown>, term) : false;
      }

      return value.toString().toLowerCase().includes(term.toLowerCase());
    });
  };

  const searchByFields = (item: Record<string, unknown>, term: string, fields: string[]) => {
    return fields.some((field) => {
      const value = item[field];
      if (value === null || value === undefined) return false;
      return value.toString().toLowerCase().includes(term.toLowerCase());
    });
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return dataWithKey;

    return dataWithKey.filter((item) => {
      if (searchConfig.customSearch) {
        return searchConfig.customSearch(item, searchTerm);
      }

      if (searchConfig.searchableFields && searchConfig.searchableFields.length > 0) {
        return searchByFields(item, searchTerm, searchConfig.searchableFields);
      }

      return searchInObject(item, searchTerm);
    });
  }, [dataWithKey, searchTerm, searchConfig]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const paginationConfig = {
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total: number) => `Total ${total} registros${searchTerm ? " filtrados" : ""}`,
    className: "custom-pagination",
  };

  const handleEdit = (record: Record<string, unknown>) => {
    onEdit?.(record);
  };

  const handleDelete = (record: Record<string, unknown>) => {
    onDelete?.(record);
  };

  const handleRefresh = async () => {
    onRefresh?.();
  };

  const processColumns = (columns: ColumnsProps[]) => {
    const processedColumns = columns.map((column) => ({
      ...column,
      title: column.icon ? (
        <div className="flex items-center gap-2">
          {React.isValidElement(column.icon) ? React.cloneElement(column.icon) : column.icon}
          <span className="font-medium">{column.title}</span>
        </div>
      ) : (
        <span className="font-medium">{column.title}</span>
      ),
      className: "py-4 px-6 bg-white",
      sorter: column.sorter || false, // Agregar sorter si está definido
      sortOrder: sortedInfo.columnKey === column.dataIndex ? sortedInfo.order : null,
      filteredValue: filteredInfo[column.dataIndex] || null,
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
              <button
                title="Editar"
                className={`p-2 rounded-lg hover:bg-yellow-100 text-yellow-600 transition-all duration-300 ${actionConfig.customActionsColor?.edit}`}
                onClick={() => handleEdit(record as Record<string, unknown>)}
              >
                <FaEdit />
              </button>
            )}
            {actionConfig.showDelete && (
              <Popconfirm
                title="¿Estás seguro de que deseas eliminar este registro?"
                onConfirm={() => handleDelete(record as Record<string, unknown>)}
                okText="Eliminar"
                cancelText="Cancelar"
              >
                <button
                  title="Eliminar"
                  className={`p-2 rounded-lg hover:bg-red-100 text-red-600 transition-all duration-300 ${actionConfig.customActionsColor?.delete}`}
                >
                  <FaTrash />
                </button>
              </Popconfirm>
            )}
            {moreActions?.map((action) => (
              <button
                key={action.key}
                className={`p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-300`}
                onClick={() => action.onClick(record as Record<string, unknown>)}
              >
                {React.isValidElement(action.icon) ? React.cloneElement(action.icon) : action.icon}
              </button>
            ))}
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
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="flex items-center space-x-3 gap-2 sm:space-x-4 mb-3 sm:mb-4">
            {Icon && (
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-lightest hover:bg-primary-lightest/70 transition-colors">
                {React.isValidElement(Icon) ? React.cloneElement(Icon) : Icon}
              </div>
            )}
            <Title level={4} className="!m-0 !text-gray-900 font-bold tracking-tight text-lg sm:text-xl">
              {title}
            </Title>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {description && (
              <div className="w-full sm:flex-1">
                <Text className="text-gray-600 text-sm leading-relaxed">{description}</Text>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Search
                allowClear
                className="w-full sm:min-w-[240px]"
                placeholder="Buscar"
                onChange={(e) => handleSearch(e.target.value)}
                onSearch={handleSearch}
              />

              {showRefreshButton && (
                <button
                  className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow transition-all duration-300 rounded-lg px-4 h-8"
                  onClick={handleRefresh}
                >
                  <FaSync className="text-gray-700" />
                  <span className="text-gray-700 font-medium">{actionConfig.refreshButtonText}</span>
                </button>
              )}

              {showCreateButton && (
                <button
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 shadow-sm hover:shadow-md rounded-lg px-4 h-8"
                  onClick={onCreate}
                >
                  {React.cloneElement(createButtonIcon) || <FaPlus />}
                  {createButtonText}
                </button>
              )}
            </div>
          </div>
        </div>

        <Space style={{ marginBottom: 16 }}>
          <Button onClick={clearFilters}>Limpiar filtros</Button>
          <Button onClick={clearAll}>Limpiar filtros y ordenamiento</Button>
        </Space>

        <div className="overflow-x-auto">
          <Table
            columns={processColumns(columns)}
            dataSource={filteredData}
            loading={loading}
            pagination={{
              ...paginationConfig,
              total: filteredData.length,
              responsive: true,
              className: "px-4 sm:px-6 py-3 sm:py-4",
            }}
            className="dynamic-table"
            scroll={{ x: "max-content" }}
            onChange={(pagination, filters, sorter, extra) => handleChange(pagination, filters, sorter as SorterResult<Record<string, unknown>> | SorterResult<Record<string, unknown>>[], extra)}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};