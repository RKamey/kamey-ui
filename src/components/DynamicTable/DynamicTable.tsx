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
 * @param {(record: Record<string, unknown>) => void} [props.onView] - Callback function when the view button is clicked. This is optional and will only show the view button if provided.
 * @param {() => void} [props.onRefresh] - Callback function when the refresh button is clicked.
 * @param {string} [props.createButtonText="Crear"] - The text for the create button.
 * @param {React.ReactNode} [props.createButtonIcon=<FaPlus />] - The icon for the create button.
 * @param {ColumnsProps[]} props.columns - The columns configuration for the table.
 * @param {Record<string, unknown>[]} props.data - The data to display in the table.
 * @param {boolean} [props.loading] - Whether the table is in a loading state.
 * @param {Array<{ key: string, label: string, icon: React.ReactNode, onClick: (record: Record<string, unknown>) => void }>} [props.moreActions] - Additional actions to display in the actions column.
 * @param {Object} [props.actionConfig] - Configuration for the actions column.
 * @param {boolean} [props.actionConfig.showDefaultActions=true] - Whether to show the default actions (edit, delete, view).
 * @param {boolean} [props.actionConfig.showEdit=true] - Whether to show the edit button.
 * @param {boolean} [props.actionConfig.showDelete=true] - Whether to show the delete button.
 * @param {boolean} [props.actionConfig.showView=true] - Whether to show the view button. This is optional and will only show the view button if `onView` is provided.
 * @param {string} [props.actionConfig.refreshButtonText="Refrescar"] - The text for the refresh button.
 * @param {Object} [props.actionConfig.customIcons] - Custom icons for the actions.
 * @param {React.ReactNode} [props.actionConfig.customIcons.create=<FaPlus />] - Custom icon for the create button.
 * @param {React.ReactNode} [props.actionConfig.customIcons.edit=<FaEdit />] - Custom icon for the edit button.
 * @param {React.ReactNode} [props.actionConfig.customIcons.delete=<FaTrash />] - Custom icon for the delete button.
 * @param {React.ReactNode} [props.actionConfig.customIcons.refresh=<FaSync />] - Custom icon for the refresh button.
 * @param {React.ReactNode} [props.actionConfig.customIcons.view=<FaEye />] - Custom icon for the view button.
 * @param {Object} [props.actionConfig.customActionsColor] - Custom colors for the actions.
 * @param {string} [props.actionConfig.customActionsColor.edit] - Custom color for the edit button.
 * @param {string} [props.actionConfig.customActionsColor.delete] - Custom color for the delete button.
 * @param {string} [props.actionConfig.customActionsColor.view] - Custom color for the view button.
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
 *   onView={(record) => console.log('View button clicked', record)} // Optional
 *   onRefresh={() => console.log('Refresh button clicked')}
 *   moreActions={[
 *     {
 *       key: 'view',
 *       label: 'View',
 *       icon: <FaEye />,
 *       onClick: (record) => console.log('View button clicked', record),
 *     },
 *   ]}
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
  Button,
  Input,
  Table,
  Popconfirm,
  ConfigProvider,
} from "antd";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSync,
  FaEye,
  FaFileExcel,
} from "react-icons/fa";
import { ColumnsProps, DynamicTableProps } from "./types";
import * as XLSX from "xlsx";

const { Title, Text } = Typography;
const { Search } = Input;

interface ExportData {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const DynamicTable = ({
  title,
  icon: Icon,
  description,
  showCreateButton,
  showRefreshButton,
  onCreate,
  onEdit,
  onDelete,
  onView,
  onRefresh,
  exportToExcel,
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
    showView: false,
    refreshButtonText: "Refrescar",
    customIcons: {
      create: <FaPlus />,
      edit: <FaEdit />,
      delete: <FaTrash />,
      refresh: <FaSync />,
      view: <FaEye />,
    },
    customActionsColor: {
      edit: "!bg-indigo-50 hover:!bg-indigo-100 !text-indigo-600 !border-none shadow-sm hover:shadow transition-all duration-300",
      delete:
        "!bg-rose-50 hover:!bg-rose-100 !text-rose-600 !border-none shadow-sm hover:shadow transition-all duration-300",
      view: "!bg-gray-50 hover:!bg-gray-100 !text-gray-600 !border-none shadow-sm hover:shadow transition-all duration-300",
    },
  },
  searchConfig = {
    searchableFields: [],
    customSearch: undefined,
  },
  themeConfig,
}: DynamicTableProps): React.ReactNode => {
  const [searchTerm, setSearchTerm] = useState("");

  const dataWithKey = useMemo(
    () =>
      data.map((item, index) =>
        typeof item === "object" && item !== null
          ? { ...item, key: index }
          : { key: index }
      ),
    [data]
  );

  const searchInObject = (
    obj: Record<string, unknown>,
    term: string
  ): boolean => {
    return Object.values(obj).some((value: unknown) => {
      if (value === null || value === undefined) return false;

      if (typeof value === "object") {
        return typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
          ? searchInObject(value as Record<string, unknown>, term)
          : false;
      }

      return value.toString().toLowerCase().includes(term.toLowerCase());
    });
  };

  const searchByFields = (
    item: Record<string, unknown>,
    term: string,
    fields: string[]
  ) => {
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

      if (
        searchConfig.searchableFields &&
        searchConfig.searchableFields.length > 0
      ) {
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
    showTotal: (total: number) =>
      `Total ${total} registros${searchTerm ? " filtrados" : ""}`,
    className: "custom-pagination",
  };

  const handleEdit = (record: Record<string, unknown>) => {
    onEdit?.(record);
  };

  const handleDelete = (record: Record<string, unknown>) => {
    onDelete?.(record);
  };

  const handleView = (record: Record<string, unknown>) => {
    onView?.(record);
  };

  const handleRefresh = async () => {
    onRefresh?.();
  };

  const onExportExcel = () => {
    if (!exportToExcel) return;
    const { fileName, sheetName, data, columns } = exportToExcel;

    const translatedData = data.map((item) => {
      const newItem: { [key: string]: unknown } = {};
      columns.forEach((col) => {
        const dataIndexKey = col.dataIndex as keyof ExportData;
        newItem[col.title] = (item as Record<string, unknown>)[dataIndexKey];
      });
      return newItem;
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(translatedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const processColumns = (columns: ColumnsProps[]) => {
    const processedColumns = columns.filter((column) => !column.isHidden).map((column) => ({
      ...column,
      title: column.icon ? (
        <div className="flex items-center gap-2">
          {React.isValidElement(column.icon)
            ? React.cloneElement(column.icon)
            : column.icon}
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
                type="warning"
                className={`action-button-edit transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center ${
                  actionConfig.customActionsColor?.edit ||
                  "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
                icon={actionConfig.customIcons?.edit || <FaEdit />}
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
                  type="danger"
                  className={`action-button-delete transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center ${
                    actionConfig.customActionsColor?.delete ||
                    "bg-red-600 hover:bg-red-500 text-white"
                  }`}
                  icon={
                    actionConfig.customIcons?.delete?.type ? (
                      React.createElement(actionConfig.customIcons.delete.type)
                    ) : (
                      <FaTrash />
                    )
                  }
                />
              </Popconfirm>
            )}
            {actionConfig.showView &&
              onView && ( // Solo mostrar el botón de "Ver" si onView está definido
                <Button
                  type="view"
                  className={`action-button-view transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center ${
                    actionConfig.customActionsColor?.view ||
                    "bg-gray-600 hover:bg-gray-500 text-white"
                  }`}
                  icon={actionConfig.customIcons?.view || <FaEye />}
                  onClick={() => handleView(record as Record<string, unknown>)}
                />
              )}
            {moreActions?.map((action) => (
              <Button
                key={action.key}
                type="button"
                className={`action-button transition-colors ${
                  actionConfig.customActionsColor?.edit ||
                  action.className ||
                  ""
                }`}
                style={action.style}
                icon={
                  React.isValidElement(action.icon)
                    ? React.cloneElement(action.icon)
                    : action.icon
                }
                onClick={() =>
                  action.onClick(record as Record<string, unknown>)
                }
              >
                {action.label}
              </Button>
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
            <Title
              level={4}
              className="!m-0 !text-gray-900 font-bold tracking-tight text-lg sm:text-xl"
            >
              {title}
            </Title>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {description && (
              <div className="w-full sm:flex-1">
                <Text className="text-gray-600 text-sm leading-relaxed">
                  {description}
                </Text>
              </div>
            )}

            {exportToExcel && (
              <Button
                icon={<FaFileExcel />}
                className={`${
                  exportToExcel.buttonProps?.className ||
                  "flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow transition-all duration-300 rounded-lg px-4 h-8"
                }`}
                style={exportToExcel.buttonProps?.style || {}}
                onClick={onExportExcel}
              >
                {exportToExcel.buttonProps?.text || "Exportar a Excel"}
              </Button>
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
                <Button
                  type="default"
                  className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow transition-all duration-300 rounded-lg px-4 h-8"
                  icon={actionConfig.customIcons?.refresh || <FaSync />}
                  onClick={handleRefresh}
                >
                  <span className="text-gray-700 font-medium">
                    {actionConfig.refreshButtonText}
                  </span>
                </Button>
              )}

              {showCreateButton && (
                <Button
                  type="primary"
                  className="flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow-md"
                  icon={React.cloneElement(createButtonIcon) || <FaPlus />}
                  onClick={onCreate}
                >
                  {createButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>

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
          />
        </div>
      </div>
    </ConfigProvider>
  );
};
