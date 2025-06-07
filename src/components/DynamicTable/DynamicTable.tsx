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
 * @param {Object} [props.exportToExcel] - Configuration for exporting data to Excel.
 * @param {string} props.exportToExcel.fileName - The name of the Excel file.
 * @param {string} props.exportToExcel.sheetName - The name of the Excel sheet.
 * @param {Record<string, unknown>[]} props.exportToExcel.data - The data to export.
 * @param {ColumnsProps[]} props.exportToExcel.columns - The columns configuration for the Excel sheet.
 * @param {boolean} [props.disableWrapper=false] - Whether to disable the default wrapper styles.
 * @param {React.ReactNode | boolean} [props.backButton] - Custom back button. If `true`, a default back button will be rendered.
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
  Button,
  Input,
  Table,
  Popconfirm,
  ConfigProvider,
  Tooltip,
} from "antd";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSync,
  FaEye,
  FaFileExcel,
  FaArrowLeft,
} from "react-icons/fa";
import { ColumnsProps, DynamicTableProps } from "./types";
import * as XLSX from "xlsx";
import clsx from "clsx";
import { sortOrder } from "../SortOrder/SortOrder";

const { Search } = Input;

interface ExportData {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const DynamicTable = <T extends Record<string, unknown>>({
  title,
  icon: Icon,
  description,
  showSearchBar = true,
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
  customFilters,
  disableWrapper = false,
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
      edit: "!bg-yellow-500 !text-white !border-none shadow-xs hover:!bg-white hover:!text-yellow-500 hover:!border hover:!border-yellow-500 transition-all duration-300",
      delete: "!bg-red-500 !text-white !border-none shadow-xs hover:!bg-white hover:!text-red-500 hover:!border hover:!border-red-500 transition-all duration-300",
      view: "!bg-sky-500 !text-white !border-none shadow-xs hover:!bg-white hover:!text-sky-500 hover:!border hover:!border-sky-500 transition-all duration-300",
    },
  },
  searchConfig = {
    searchableFields: [],
    customSearch: undefined,
  },
  themeConfig,
  backButton,
}: DynamicTableProps<T>): React.ReactNode => {
  const [searchTerm, setSearchTerm] = useState("");

  const dataWithKey = useMemo(
    () =>
      data.map((item, index) => ({
        ...(item as T),
        key: index
      })),
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
    item: T,
    term: string,
    fields: string[]
  ) => {
    return fields.some((field) => {
      const value = item[field as keyof T];
      if (value === null || value === undefined) return false;
      return value.toString().toLowerCase().includes(term.toLowerCase());
    });
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return dataWithKey;

    return dataWithKey.filter((item) => {
      const typedItem = item as unknown as T; // First cast to unknown, then to T

      if (searchConfig.customSearch) {
        return searchConfig.customSearch(typedItem, searchTerm);
      }

      if (
        searchConfig.searchableFields &&
        searchConfig.searchableFields.length > 0
      ) {
        return searchByFields(typedItem, searchTerm, searchConfig.searchableFields);
      }

      return searchInObject(item as Record<string, unknown>, searchTerm);
    });
  }, [dataWithKey, searchTerm, searchConfig]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const paginationConfig = {
    defaultPageSize: 10,       // ← aquí
    showSizeChanger: true,
    showTotal: (total: number) =>
      `Total ${total} registros${searchTerm ? " filtrados" : ""}`,
    // opcional: explícita los tamaños disponibles
    pageSizeOptions: ["10", "20", "50", "100"],
  };

  const handleEdit = (record: T) => {
    onEdit?.(record);
  };

  const handleDelete = (record: T) => {
    onDelete?.(record);
  };

  const handleView = (record: T) => {
    onView?.(record);
  };

  const handleRefresh = async () => {
    onRefresh?.();
  };

  const renderBackButton = () => {
    if (!backButton) return null;

    if (typeof backButton === "boolean") {
      return (
        <Button
          icon={<FaArrowLeft />}
          className="bg-white hover:bg-gray-50 border border-gray-200 shadow-xs hover:shadow-sm transition-all duration-300 px-4 h-8"
          onClick={() => window.history.back()}
        >
          Volver
        </Button>
      );
    } else {
      return backButton;
    }
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

  const processColumns = (columns: ColumnsProps<T>[]) => {
    const processedColumns = columns
      .filter((column) => !column.isHidden)
      .map((column) => ({
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
        className: "py-4 px-6",
        sorter: column.sorter ? (a: T, b: T) => sortOrder<T>(column.key as keyof T)(a, b) : undefined,
      }));

    const renderActions = (record: T) => (
      <div className="flex items-center gap-3">

        {/* More Actions */}
        {moreActions?.map((action) => {
          const isHidden =
            typeof action.hidden === "function" ? action.hidden(record) : false;

          return (
            !isHidden && (
              <Tooltip title={action.tooltip}>
                <Button
                  key={action.key}
                  type="button"
                  className={clsx(
                    "action-button transition-colors shadow-sm hover:shadow-sm duration-300",
                    action.className ? action.className : "!bg-slate-500 hover:!bg-slate-700 !border-none"
                  )}
                  style={action.style}
                  icon={
                    React.isValidElement(action.icon)
                      ? React.cloneElement(action.icon)
                      : action.icon
                  }
                  onClick={() => action.onClick(record)}
                >
                  {action.label}
                </Button>
              </Tooltip>
            )
          );
        })}

        {/* Default Actions */}
        {actionConfig.showDefaultActions && (
          <>
            {actionConfig.showEdit &&
              (typeof actionConfig.showEdit === "function"
                ? actionConfig.showEdit(record as T) && (
                  <Tooltip title="Editar">
                    <Button
                      type="warning"
                      title="Editar"
                      className={clsx(
                        "action-button-edit transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center",
                        actionConfig.customActionsColor?.edit ||
                        "!bg-yellow-500 !text-white !border-none shadow-xs hover:!bg-white hover:!text-yellow-500 hover:!border hover:!border-yellow-500 transition-all duration-300"
                      )}
                      icon={actionConfig.customIcons?.edit || <FaEdit className="text-white hover:text-yellow-500" />}
                      onClick={() => handleEdit(record)}
                    />
                  </Tooltip>
                )
                : actionConfig.showEdit && (
                  <Tooltip title="Editar">
                    <Button
                      type="warning"
                      className={`!bg-yellow-500 !text-white !border-none shadow-xs hover:!bg-white hover:!text-yellow-500 hover:!border hover:!border-yellow-500 transition-all duration-300 `}
                      icon={actionConfig.customIcons?.edit || <FaEdit className="text-white hover:text-yellow-500" />}
                      onClick={() => handleEdit(record)}
                    />
                  </Tooltip>
                ))}
            {actionConfig.showDelete &&
              (typeof actionConfig.showDelete === "function"
                ? actionConfig.showDelete(record) && (
                  <Popconfirm
                    title="¿Estás seguro de que deseas eliminar este registro?"
                    onConfirm={() => handleDelete(record)}
                    okText="Eliminar"
                    cancelText="Cancelar"
                  >
                    <Tooltip title="Eliminar">
                      <Button
                        type="danger"
                        className={clsx(
                          "action-button-delete transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center",
                          actionConfig.customActionsColor?.delete ||
                          "!bg-red-500 !text-white !border-none shadow-xs hover:!bg-white hover:!text-red-500 hover:!border hover:!border-red-500 transition-all duration-300"
                        )}
                        icon={
                          actionConfig.customIcons?.delete?.type ? (
                            React.createElement(
                              actionConfig.customIcons.delete.type
                            )
                          ) : (
                            <FaTrash className="text-white hover:text-red-500" />
                          )}
                      />
                    </Tooltip>
                  </Popconfirm>
                )
                : actionConfig.showDelete && (
                  <Popconfirm
                    title="¿Estás seguro de que deseas eliminar este registro?"
                    onConfirm={() => handleDelete(record)}
                    okText="Eliminar"
                    cancelText="Cancelar"
                  >
                    <Tooltip title="Eliminar">
                      <Button
                        type="danger"
                        className={clsx(
                          "!bg-red-500 !text-white !border-none shadow-xs hover:!bg-white hover:!text-red-500 hover:!border hover:!border-red-500 transition-all duration-300",
                          actionConfig.customActionsColor?.delete || ""
                        )}
                        icon={
                          actionConfig.customIcons?.delete?.type ? (
                            React.createElement(
                              actionConfig.customIcons.delete.type
                            )
                          ) : (
                            <FaTrash className="text-white hover:text-red-500" />
                          )
                        }
                      />
                    </Tooltip>
                  </Popconfirm>
                ))}
            {actionConfig.showView &&
              onView &&
              (typeof actionConfig.showView === "function"
                ? actionConfig.showView(record) && (
                  <Tooltip title="Ver">
                    <Button
                      type="view"
                      className={clsx(
                        "action-button-view transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center",
                        actionConfig.customActionsColor?.view ||
                        "!bg-sky-500 !text-white !border-none shadow-xs hover:!bg-white hover:!text-sky-500 hover:!border hover:!border-sky-500 transition-all duration-300"
                      )}
                      icon={actionConfig.customIcons?.view || <FaEye className="text-white hover:text-sky-500" />}
                      onClick={() => handleView(record)}
                    />
                  </Tooltip>
                )
                : actionConfig.showView && (
                  <Tooltip title="Ver">
                    <Button
                      type="view"
                      className={clsx(
                        "action-button-view transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center",
                        actionConfig.customActionsColor?.view ||
                        "!bg-sky-500 !text-white !border-none shadow-xs hover:!bg-white hover:!text-sky-500 hover:!border hover:!border-sky-500 transition-all duration-300"
                      )}
                      icon={actionConfig.customIcons?.view || <FaEye className="text-white hover:text-sky-500" />}
                      onClick={() => handleView(record)}
                    />
                  </Tooltip>
                ))}
          </>
        )}

      </div>
    );

    const actionsColumn = {
      title: <span className="font-medium">Acciones</span>,
      key: "actions",
      width: 120,
      className: "py-4 px-6",
      render: (_: unknown, record: T) => renderActions(record),
    };

    if (
      actionConfig.showDefaultActions ||
      (moreActions && moreActions.length > 0)
    ) {
      return [...processedColumns, actionsColumn];
    }

    return processedColumns;
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div
        className={clsx("my-1", {
          "bg-white rounded-xl shadow-lg": !disableWrapper,
        })}
      >
        {/* Header: Título, descripción, ícono y botón de volver */}
        <div className="mb-2 space-y-3 sm:space-y-3">
          {title && (
            <div className="grid grid-cols-[auto_1fr] items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              {renderBackButton && <div>{renderBackButton()}</div>}

              {Icon ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-lightest hover:bg-primary-lightest/70 transition-colors">
                    {React.isValidElement(Icon) ? React.cloneElement(Icon) : Icon}
                  </div>
                  <h1>{title}</h1>
                </div>
              ) : (
                <h2 className="text-xl font-semibold">{title}</h2>
              )}

              {description && <span className="text-gray-200">{description}</span>}
            </div>
          )}

          {/* Barra de búsqueda y botones */}
          <div className="flex flex-col md:flex-row w-full gap-3">
            {/* Buscador */}
            {showSearchBar && (
              <div className="w-full md:flex-1">
                <Search
                  allowClear
                  className="w-full"
                  placeholder="Buscar"
                  onChange={(e) => handleSearch(e.target.value)}
                  onSearch={handleSearch}
                />
              </div>
            )}

            {/* Botones de acción */}
            <div
              className={clsx(
                "w-full md:w-auto",
                "flex flex-wrap gap-3 items-start md:items-center md:justify-end"
              )}
            >
              {/* Exportar a Excel */}
              {exportToExcel && (
                <Button
                  icon={<FaFileExcel />}
                  className={clsx(
                    "bg-white hover:bg-gray-50 border border-gray-200 shadow-xs hover:shadow-sm transition-all duration-300 px-4 h-8",
                    exportToExcel.buttonProps?.className
                  )}
                  style={exportToExcel.buttonProps?.style}
                  onClick={onExportExcel}
                >
                  {exportToExcel.buttonProps?.text || "Exportar a Excel"}
                </Button>
              )}

              {/* Filtros personalizados */}
              {customFilters && (
                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                  {customFilters.map((filter) => (
                    <Button
                      key={filter.key}
                      type="default"
                      className={clsx(
                        "bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-sm transition-all duration-300 px-4 h-8",
                        filter.className
                      )}
                      icon={filter.icon}
                      onClick={() => filter.onClick({} as T)}
                    >
                      <span className="font-medium">{filter.label}</span>
                    </Button>
                  ))}
                </div>
              )}

              {/* Botón de refrescar */}
              {showRefreshButton && (
                <Button
                  type="default"
                  className="bg-white hover:bg-gray-50 border border-gray-200 shadow-xs hover:shadow-sm transition-all duration-300 px-4 h-8"
                  icon={actionConfig.customIcons?.refresh || <FaSync />}
                  onClick={handleRefresh}
                >
                  <span className="font-medium">
                    {actionConfig.refreshButtonText || "Refrescar"}
                  </span>
                </Button>
              )}

              {/* Botón de crear */}
              {showCreateButton && (
                <Button
                  type="primary"
                  className="flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-200 shadow-xs hover:shadow-md"
                  icon={React.cloneElement(createButtonIcon) || <FaPlus />}
                  onClick={onCreate}
                >
                  {createButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <Table
            columns={processColumns(columns)}
            dataSource={filteredData}
            loading={loading}
            pagination={paginationConfig}
            className="dynamic-table"
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </ConfigProvider>
  );

};
