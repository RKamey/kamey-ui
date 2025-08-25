/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from "react-icons/ri";
import { ColumnsProps, DynamicTableProps } from "./types";
import * as XLSX from "xlsx";
import clsx from "clsx";
import { sortOrder } from "../SortOrder/SortOrder";

const { Search } = Input;

interface ExportData {
  key: string;
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
          className="bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-4 h-8 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white"
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
          widthActionsCol ? "flex-wrap" : "flex-nowrap"
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
                  className={clsx(
                    "transition-colors shadow-sm hover:shadow-md duration-300 text-white border-none",
                    widthActionsCol ? "flex-shrink-0" : "flex-shrink-0",
                    action.className
                      ? action.className
                      : "bg-gray-500 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-800"
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
                        "transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center text-white border-none shadow-sm hover:shadow-md hover:text-white hover:border hover:border-yellow-500 bg-yellow-500 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-800 flex-shrink-0",
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
                        "text-white border-none shadow-sm hover:shadow-md hover:text-white hover:border hover:border-yellow-500 transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center bg-yellow-500 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-800 flex-shrink-0"
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
                          "transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center text-white border-none shadow-sm hover:shadow-md hover:text-white hover:border hover:border-red-500 bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800 flex-shrink-0"
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
                          "text-white border-none shadow-sm hover:shadow-md hover:text-white hover:border hover:border-red-500 transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800 flex-shrink-0"
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
                        "transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center text-white border-none shadow-sm hover:shadow-md hover:text-sky-500 hover:border hover:border-sky-500 bg-sky-500 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-800 flex-shrink-0"
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
                        "transition-all duration-300 rounded-lg h-8 w-8 flex items-center justify-center text-white border-none shadow-sm hover:shadow-md hover:text-sky-500 hover:border hover:border-sky-500 flex-shrink-0",
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
      width: widthActionsCol || "auto",
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
      className={clsx("my-1 w-full", {
        "bg-white rounded-xl shadow-lg p-4 dark:bg-gray-800": !disableWrapper,
      })}
    >
      {/* Header: Title, description, icon, and back button */}
      <div className="mb-4 space-y-4">
        {title && (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {renderBackButton()}
              {Icon && (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors dark:bg-blue-900 dark:hover:bg-blue-800">
                  {React.isValidElement(Icon) ? React.cloneElement(Icon) : Icon}
                </div>
              )}
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
            </div>
            {description && (
              <span className="block text-gray-600 pl-14 dark:text-gray-300">
                {description}
              </span>
            )}
          </div>
        )}

        {/* Search and Actions: Full-width layout */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
          {/* Search Bar: Takes remaining space */}
          {showSearchBar && (
            <div className="flex-grow min-w-0">
              <Search
                allowClear
                className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="Buscar"
                onChange={(e) => handleSearch(e.target.value)}
                onSearch={handleSearch}
              />
            </div>
          )}
          {/* Action Buttons: Shrink to content */}
          <div className="flex items-center gap-3 flex-shrink-0 flex-wrap sm:flex-nowrap">
            {/* Export to Excel */}
            {exportToExcel && (
              <Button
                icon={<RiFileExcel2Line />}
                className={clsx(
                  "bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-4 h-8 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white",
                  exportToExcel.buttonProps?.className
                )}
                style={exportToExcel.buttonProps?.style}
                onClick={onExportExcel}
              >
                {exportToExcel.buttonProps?.text || "Exportar a Excel"}
              </Button>
            )}
            {/* Custom Filters */}
            {customFilters && (
              <div className="flex flex-wrap gap-3">
                {customFilters.map((filter) => (
                  <Button
                    key={filter.key}
                    type="default"
                    className={clsx(
                      "bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-4 h-8 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white",
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
            {/* Refresh Button */}
            {showRefreshButton && (
              <Button
                type="default"
                className="bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-4 h-8 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white"
                icon={actionConfig.customIcons?.refresh || <RiRefreshLine />}
                onClick={handleRefresh}
              >
                <span className="font-medium">
                  {actionConfig.refreshButtonText || "Refrescar"}
                </span>
              </Button>
            )}
            {/* Create Button */}
            {showCreateButton && (
              <Button
                type="primary"
                className="flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                icon={React.cloneElement(createButtonIcon) || <RiAddCircleLine />}
                onClick={onCreate}
              >
                {createButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table: Full-width */}
      <div className="w-full overflow-x-auto">
        <Table
          columns={processColumns(columns)}
          dataSource={filteredData}
          loading={loading}
          pagination={paginationConfig}
          className="dynamic-table !mt-4 w-full"
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};