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
 * @param {React.ReactNode} [props.createButtonIcon=<RiAddCircleLine />] - The icon for the create button.
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
 * @param {React.ReactNode} [props.actionConfig.customIcons.create=<RiAddCircleLine />] - Custom icon for the create button.
 * @param {React.ReactNode} [props.actionConfig.customIcons.edit=<RiEditLine />] - Custom icon for the edit button.
 * @param {React.ReactNode} [props.actionConfig.customIcons.delete=<RiDeleteBinLine />] - Custom icon for the delete button.
 * @param {React.ReactNode} [props.actionConfig.customIcons.refresh=<RiRefreshLine />] - Custom icon for the refresh button.
 * @param {React.ReactNode} [props.actionConfig.customIcons.view=<RiEyeLine />] - Custom icon for the view button.
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
 * title="User List"
 * icon={<RiGroupLine />}
 * description="List of all users"
 * showCreateButton={true}
 * showRefreshButton={true}
 * onCreate={() => console.log('Create button clicked')}
 * onEdit={(record) => console.log('Edit button clicked', record)}
 * onDelete={(record) => console.log('Delete button clicked', record)}
 * onView={(record) => console.log('View button clicked', record)} // Optional
 * onRefresh={() => console.log('Refresh button clicked')}
 * moreActions={[
 * {
 * key: 'view',
 * label: 'View',
 * icon: <RiEyeLine />,
 * onClick: (record) => console.log('View button clicked', record),
 * },
 * ]}
 * createButtonText="Add User"
 * columns={[
 * { title: 'Name', dataIndex: 'name', key: 'name' },
 * { title: 'Email', dataIndex: 'email', key: 'email' },
 * ]}
 * data={[
 * { name: 'John Doe', email: 'john@example.com' },
 * { name: 'Jane Doe', email: 'jane@example.com' },
 * ]}
 * loading={false}
 * />
 */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from "react";
import {
  Button,
  Input,
  Table,
  Popconfirm,
  Tooltip,
} from "antd";
import {
  RiAddCircleLine,
  RiEditLine,
  RiDeleteBinLine,
  RiRefreshLine,
  RiEyeLine,
  RiFileExcel2Line,
  RiArrowGoBackLine,
  RiUploadLine,
} from "react-icons/ri";
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
  onCreate,
  onEdit,
  onDelete,
  onView,
  onRefresh,
  exportToExcel,
  createButtonText = "Crear",
  createButtonIcon = <RiAddCircleLine />,
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
      create: <RiAddCircleLine />,
      edit: <RiEditLine />,
      delete: <RiDeleteBinLine />,
      refresh: <RiRefreshLine />,
      view: <RiEyeLine />,
    },
    customActionsColor: {
      edit: "!bg-yellow-500 hover:!bg-yellow-700",
      delete: "!bg-red-500 hover:!bg-red-700",
      view: "!bg-sky-500 hover:!bg-sky-700",
    },
  },
  showRefreshButton,
  hiddenActions = false,
  searchConfig = {
    searchableFields: [],
    customSearch: undefined,
  },
  backButton,
  widthActionsCol,
  bulkUpload,
  onBulkUpload
}: DynamicTableProps<T>): React.ReactNode => {
  const [searchTerm, setSearchTerm] = useState("");

  const dataWithKey = useMemo(
    () =>
      data.map((item, index) => ({
        ...(item as T),
        key: index,
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
      const typedItem = item as unknown as T;

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
    defaultPageSize: 10,
    showSizeChanger: true,
    showTotal: (total: number) =>
      `Total ${total} registros${searchTerm ? " filtrados" : ""}`,
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
          icon={<RiArrowGoBackLine />}
          className="bg-white hover:bg-gray-50 border border-gray-200 shadow-xs hover:shadow-sm transition-all duration-300 px-4 h-8 dark:!bg-gray-700 dark:!border-gray-600 dark:hover:!bg-gray-600 dark:text-white"
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
        filters: column.filters,
        onFilter: column.onFilter,
      }));

    const renderActions = (record: T) => (
      <div
        className={clsx(
          "flex items-center gap-3",
          widthActionsCol ? "flex-wrap" : "flex-nowrap" // Solo wrap cuando hay ancho limitado
        )}
        style={widthActionsCol ? {
          maxWidth: `${widthActionsCol}px`,
          width: '100%'
        } : undefined}
      >
        {/* More Actions */}
        {moreActions?.map((action) => {
          const isHidden =
            typeof action.hidden === "function" ? action.hidden(record) : false;

          return (
            !isHidden && (
              <Tooltip title={action.tooltip} key={action.key}>
                <Button
                  type="button"
                  loading={action.loading}
                  className={clsx(
                    "action-button transition-colors shadow-sm hover:shadow-sm duration-300 !text-white !border-none",
                    widthActionsCol ? "flex-shrink-0" : "flex-shrink-0", // Siempre flex-shrink-0 para mantener tamaño
                    action.className
                      ? action.className
                      : "!bg-slate-500 hover:!bg-slate-700 dark:!bg-slate-600 dark:hover:!bg-slate-800"
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
                        "action-button-edit transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center !text-white !border-none shadow-xs hover:!text-white hover:!border hover:!border-yellow-500 !bg-yellow-500 hover:!bg-yellow-700 dark:!bg-yellow-600 dark:hover:!bg-yellow-800 flex-shrink-0",
                      )}
                      icon={
                        actionConfig.customIcons?.edit || (
                          <RiEditLine className="text-white" />
                        )
                      }
                      onClick={() => handleEdit(record)}
                    />
                  </Tooltip>
                )
                : actionConfig.showEdit && (
                  <Tooltip title="Editar">
                    <Button
                      type="warning"
                      className={clsx(
                        "!text-white !border-none shadow-xs hover:!text-white hover:!border hover:!border-yellow-500 action-button-edit transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center !bg-yellow-500 hover:!bg-yellow-700 dark:!bg-yellow-600 dark:hover:!bg-yellow-800 flex-shrink-0"
                      )}
                      icon={
                        actionConfig.customIcons?.edit || (
                          <RiEditLine className="text-white" />
                        )
                      }
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
                        className={clsx(
                          "action-button-delete transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center !text-white !border-none shadow-xs hover:!text-white hover:!border hover:!border-red-500 !bg-red-500 hover:!bg-red-700 dark:!bg-red-600 dark:hover:!bg-red-800 flex-shrink-0"
                        )}
                        icon={
                          actionConfig.customIcons?.delete?.type ? (
                            React.createElement(
                              actionConfig.customIcons.delete.type
                            )
                          ) : (
                            <RiDeleteBinLine className="text-white" />
                          )
                        }
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
                        className={clsx(
                          "!text-white !border-none shadow-xs hover:!text-white hover:!border hover:!border-red-500",
                          "action-button-delete transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center !bg-red-500 hover:!bg-red-700 dark:!bg-red-600 dark:hover:!bg-red-800 flex-shrink-0"
                        )}
                        icon={
                          actionConfig.customIcons?.delete?.type ? (
                            React.createElement(
                              actionConfig.customIcons.delete.type
                            )
                          ) : (
                            <RiDeleteBinLine className="text-white" />
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
                        "action-button-view transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center !text-white !border-none shadow-xs hover:!text-sky-500 hover:!border hover:!border-sky-500 bg-sky-500 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-800 flex-shrink-0"
                      )}
                      icon={
                        actionConfig.customIcons?.view || (
                          <RiEyeLine className="text-white" />
                        )
                      }
                      onClick={() => handleView(record)}
                    />
                  </Tooltip>
                )
                : actionConfig.showView && (
                  <Tooltip title="Ver">
                    <Button
                      type="view"
                      className={clsx(
                        "action-button-view transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center !text-white !border-none shadow-xs hover:!text-sky-500 hover:!border hover:!border-sky-500 flex-shrink-0",
                        actionConfig.customActionsColor?.view ||
                        "bg-sky-500 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-800"
                      )}
                      icon={
                        actionConfig.customIcons?.view || (
                          <RiEyeLine className="text-white" />
                        )
                      }
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
      width: widthActionsCol || "auto", // "auto" para ajuste automático al contenido
      className: "py-4 px-6",
      render: (_: unknown, record: T) => renderActions(record),
    };

    if (
      actionConfig.showDefaultActions ||
      (moreActions && moreActions.length > 0) ||
      hiddenActions === false
    ) {
      return [...processedColumns, actionsColumn];
    }

    return processedColumns;
  };

  return (
    <div
      className={clsx("my-1", {
        "bg-white rounded-xl shadow-lg p-1 dark:bg-gray-800": !disableWrapper,
      })}
    >
      {/* Header: Title, description, icon, and back button */}
      <div className="mb-2 space-y-3 sm:space-y-3">
        {title && (
          <div className="mb-3 sm:mb-4 space-y-2">
            <div className="flex items-center gap-3">
              {renderBackButton && <div>{renderBackButton()}</div>}

              {Icon && (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-lightest hover:bg-primary-lightest/70 transition-colors dark:bg-primary-dark dark:hover:bg-primary-dark/70">
                  {React.isValidElement(Icon) ? React.cloneElement(Icon) : Icon}
                </div>
              )}

              <h1 className="text-xl font-semibold dark:text-white">{title}</h1>
            </div>

            {description && (
              <span className="text-gray-700 block pl-[3.25rem] sm:pl-[3.25rem] dark:text-gray-300">
                {description}
              </span>
            )}
          </div>
        )}

        {/* Search and Actions: Same row on desktop, 2 rows on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* First Row/Left Side: Search Bar */}
          {showSearchBar && (
            <div className="w-full sm:flex-1 sm:max-w-md lg:max-w-lg">
              <Search
                allowClear
                className="!w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="Buscar"
                onChange={(e) => handleSearch(e.target.value)}
                onSearch={handleSearch}
              />
            </div>
          )}

          {/* Second Row/Right Side: All Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:flex-shrink-0">
            {/* Export to Excel */}
            {exportToExcel && (
              <Button
                icon={<RiFileExcel2Line />}
                className={clsx(
                  "flex-1 xs:flex-initial bg-white hover:bg-gray-50 border border-gray-200 shadow-xs hover:shadow-sm transition-all duration-300 px-3 h-8 text-sm dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-white",
                  exportToExcel.buttonProps?.className
                )}
                style={exportToExcel.buttonProps?.style}
                onClick={onExportExcel}
              >
                <span className="hidden sm:inline">
                  {exportToExcel.buttonProps?.text || "Exportar a Excel"}
                </span>
                <span className="sm:hidden">Excel</span>
              </Button>
            )}

            {/* Custom Filters */}
            {customFilters && (
              <>
                {customFilters.map((filter) => (
                  <Button
                    key={filter.key}
                    type="default"
                    className={clsx(
                      "flex-1 xs:flex-initial bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-sm transition-all duration-300 px-3 h-8 text-sm dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-white",
                      filter.className
                    )}
                    icon={filter.icon}
                    onClick={() => filter.onClick({} as T)}
                  >
                    <span className="font-medium">{filter.label}</span>
                  </Button>
                ))}
              </>
            )}

            {/* Refresh Button */}
            {showRefreshButton && (
              <Button
                type="default"
                className="flex-1 xs:flex-initial bg-white hover:bg-gray-50 border border-gray-200 shadow-xs hover:shadow-sm transition-all duration-300 px-3 h-8 text-sm dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-white"
                icon={actionConfig.customIcons?.refresh || <RiRefreshLine />}
                onClick={handleRefresh}
              >
                <span className="font-medium hidden sm:inline">
                  {actionConfig.refreshButtonText || "Refrescar"}
                </span>
              </Button>
            )}

            {/* Bulk Upload */}
            {bulkUpload && bulkUpload.enabled !== false && (
              <Button
                type="default"
                className="flex-1 xs:flex-initial bg-white hover:bg-gray-50 border border-gray-200 shadow-xs hover:shadow-sm transition-all duration-300 px-3 h-8 text-sm dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-white"
                icon={<RiUploadLine />}
                onClick={onBulkUpload}
              >
                <span className="hidden sm:inline">{"Carga masiva"}</span>
                <span className="sm:hidden">Carga masiva</span>
              </Button>
            )}

            {/* Create Button */}
            {showCreateButton && (
              <Button
                type="primary"
                className="flex-1 xs:flex-initial flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-200 shadow-xs hover:shadow-md px-3 h-8 text-sm font-medium dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                icon={React.cloneElement(createButtonIcon) || <RiAddCircleLine />}
                onClick={onCreate}
              >
                <span>{createButtonText}</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table: Separated from header */}
      <div className="overflow-x-auto">
        <Table
          columns={processColumns(columns)}
          dataSource={filteredData}
          loading={loading}
          pagination={paginationConfig}
          className="dynamic-table !mt-4"
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};