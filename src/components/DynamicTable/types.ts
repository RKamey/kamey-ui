import { ReactElement } from "react";

export interface ColumnsProps {
  title: string;
  dataIndex: string;
  isPrimaryKey?: boolean;
  isHidden?: boolean;
  key: string | number;
  width?: string | number;
  align?: "left" | "right" | "center";
  icon?: React.ReactElement;
  render?: (value: unknown, record: unknown) => React.ReactNode;
  sorter?: boolean | ((a: unknown, b: unknown) => number);
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

export interface ActionConfig {
  showDefaultActions?: boolean;
  showEdit?: boolean | ((record: Record<string, unknown>) => boolean);
  showDelete?: boolean | ((record: Record<string, unknown>) => boolean);
  showView?: boolean | ((record: Record<string, unknown>) => boolean);
  customIcons?: ActionIcons;
  refreshButtonText?: string;
  customActionsColor?: {
    edit?: string;
    delete?: string;
    view?: string;
    moreActions?: string;
  };
}

export interface SearchConfig {
  searchableFields?: string[];
  customSearch?: (item: unknown, term: string) => boolean;
}
export interface MoreActions {
  key: string;
  label?: string;
  tooltip?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactElement;
  hidden?: (record: Record<string, unknown>) => boolean;
  onClick: (record: Record<string, unknown>) => void;
}

export interface CustomFilters {
  key: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactElement;
  onClick: (record: Record<string, unknown>) => void;
}

export interface ExcelConfigProps {
  fileName: string;
  sheetName: string;
  data: unknown[];
  columns: ColumnsProps[];
  buttonProps?: {
    className?: string;
    style?: React.CSSProperties;
    text?: string;
  }
}

export interface DynamicTableProps {
  title?: string | ReactElement;
  description?: string | ReactElement;
  icon?: ReactElement;
  headerDirection?: "horizontal" | "vertical";
  columns: ColumnsProps[];
  data: unknown[];
  className?: string;
  loading?: boolean;
  exportToExcel?: ExcelConfigProps;
  showSearchBar?: boolean;
  showCreateButton?: boolean;
  showRefreshButton?: boolean;
  disableWrapper?: boolean;
  createButtonText?: string;
  createButtonIcon?: ReactElement;
  moreActions?: MoreActions[];
  customFilters?: CustomFilters[];
  onCreate?: () => void;
  onView?: (record: unknown) => void;
  onEdit?: (record: unknown) => void;
  onDelete?: (record: unknown) => void;
  onRefresh?: () => void;
  actionConfig?: ActionConfig;
  searchConfig?: SearchConfig;
  themeConfig?: ThemeConfig;
  customCols?: boolean;
  backButton?: boolean | ReactElement;
}