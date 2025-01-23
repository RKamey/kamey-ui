export interface ColumnsProps {
  title?: string;
  dataIndex: string;
  key: string | number;
  icon?: React.ElementType;
  render?: (value: unknown, record: unknown) => React.ReactNode;
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
  create?: React.ElementType;
  edit?: React.ElementType;
  delete?: React.ElementType;
  refresh?: React.ElementType;
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
  icon?: React.ReactElement;
  onClick: (record: unknown) => void;
}

export interface DynamicTableProps {
  title?: string;
  description?: string;
  icon?: React.ElementType;
  headerDirection?: "horizontal" | "vertical";
  columns: ColumnsProps[];
  data: unknown[];
  className?: string;
  loading?: boolean;
  showCreateButton?: boolean;
  showRefreshButton?: boolean;
  createButtonText?: string;
  createButtonIcon?: React.ElementType;
  moreActions?: MoreActions[];
  onCreate?: () => void;
  onEdit?: (record: unknown) => void;
  onDelete?: (record: unknown) => void;
  onRefresh?: () => void;
  actionConfig?: ActionConfig;
  searchConfig?: SearchConfig;
  themeConfig?: ThemeConfig;
}