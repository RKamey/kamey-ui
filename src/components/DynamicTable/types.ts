export interface ColumnsProps {
  title?: string;
  dataIndex: string;
  isPrimaryKey?: boolean;
  key: string | number;
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
}

export interface ActionConfig {
  showDefaultActions?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  customIcons?: ActionIcons;
  refreshButtonText?: string;
  customActionsColor?: {
    edit?: string;
    delete?: string;
  };
}

export interface SearchConfig {
  searchableFields?: string[];
  customSearch?: (item: unknown, term: string) => boolean;
}
export interface MoreActions {
  key: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactElement;
  onClick: (record: Record<string, unknown>) => void;
}

export interface DynamicTableProps {
  title?: string;
  description?: string;
  icon?: React.ReactElement;
  headerDirection?: "horizontal" | "vertical";
  columns: ColumnsProps[];
  data: unknown[];
  className?: string;
  loading?: boolean;
  showCreateButton?: boolean;
  showRefreshButton?: boolean;
  createButtonText?: string;
  createButtonIcon?: React.ReactElement;
  moreActions?: MoreActions[];
  onCreate?: () => void;
  onEdit?: (record: unknown) => void;
  onDelete?: (record: unknown) => void;
  onRefresh?: () => void;
  actionConfig?: ActionConfig;
  searchConfig?: SearchConfig;
  themeConfig?: ThemeConfig;
  customCols?: boolean;
}