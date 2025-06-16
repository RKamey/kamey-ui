import { ReactElement } from "react";

export interface ColumnsProps<T = Record<string, unknown>> {
  title: string;
  dataIndex: string;
  isPrimaryKey?: boolean;
  isHidden?: boolean;
  key: string | number;
  width?: string | number;
  align?: "left" | "right" | "center";
  icon?: React.ReactElement;
  render?: (value: T[keyof T], record: T) => React.ReactNode;
  sorter?: boolean | ((a: T, b: T) => number);
}

export interface ThemeConfig {
  token?: {
    colorPrimary?: string;
    colorPrimaryHover?: string;
  };
  components?: {
    Table?: {
      headerBg?: string;
      colorTextHeading?: string;
      stickyScrollBar?: string;
      rowHoverBg?: string;
    };
  };
}

export interface ActionIcons {
  create?: React.ReactElement;
  edit?: React.ReactElement;
  delete?: React.ReactElement;
  refresh?: React.ReactElement;
  view?: React.ReactElement;
}

export interface ActionConfig<T = Record<string, unknown>> {
  showDefaultActions?: boolean;
  showEdit?: boolean | ((record: T) => boolean);
  showDelete?: boolean | ((record: T) => boolean);
  showView?: boolean | ((record: T) => boolean);
  customIcons?: ActionIcons;
  refreshButtonText?: string;
  customActionsColor?: {
    edit?: string;
    delete?: string;
    view?: string;
    moreActions?: string;
  };
}

export interface SearchConfig<T> {
  searchableFields?: string[];
  customSearch?: (item: T, term: string) => boolean;
}

export interface MoreActions<T = Record<string, unknown>> {
  key: string;
  label?: string;
  tooltip?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactElement;
  hidden?: (record: T) => boolean;
  onClick: (record: T) => void;
}

export interface CustomFilters<T = Record<string, unknown>> {
  key: string;
  label?: string | ReactElement;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactElement;
  onClick: (record: T) => void;
}

export interface ExcelConfigProps<T = Record<string, unknown>> {
  fileName: string;
  sheetName: string;
  data: T[];
  columns: ColumnsProps<T>[];
  buttonProps?: {
    className?: string;
    style?: React.CSSProperties;
    text?: string;
  }
}

export interface DynamicTableProps<T = Record<string, unknown>> {
  title?: string | ReactElement;
  description?: string | ReactElement;
  icon?: ReactElement;
  headerDirection?: "horizontal" | "vertical";
  columns: ColumnsProps<T>[];
  data: T[];
  className?: string;
  loading?: boolean;
  exportToExcel?: ExcelConfigProps<T>;
  showSearchBar?: boolean;
  showCreateButton?: boolean;
  showRefreshButton?: boolean;
  disableWrapper?: boolean;
  createButtonText?: string;
  createButtonIcon?: ReactElement;
  moreActions?: MoreActions<T>[];
  customFilters?: CustomFilters<T>[]
  onCreate?: () => void;
  onView?: (record: T) => void;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  onRefresh?: () => void;
  actionConfig?: ActionConfig;
  searchConfig?: SearchConfig<T>;
  themeConfig?: ThemeConfig;
  customCols?: boolean;
  backButton?: boolean | ReactElement;
}