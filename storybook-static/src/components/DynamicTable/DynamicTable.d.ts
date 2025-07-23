import { default as React } from '../../../node_modules/react';
import { DynamicTableProps } from './types';
export declare const DynamicTable: <T extends Record<string, unknown>>({ title, icon: Icon, description, showSearchBar, showCreateButton, onCreate, onEdit, onDelete, onView, onRefresh, exportToExcel, createButtonText, createButtonIcon, columns, data, loading, moreActions, customFilters, disableWrapper, actionConfig, showRefreshButton, hiddenActions, searchConfig, backButton, }: DynamicTableProps<T>) => React.ReactNode;
