export interface ColumnsProps {
  title?: string;
  dataIndex: string;
  key: string | number;
  icon?: React.ElementType;
  render?: (value: unknown, record: unknown) => React.ReactNode;
}

export interface ActionIcons {
  create?: React.ReactElement;
  edit?: React.ReactElement;
  delete?: React.ReactElement;
}

export interface ActionConfig {
  showDefaultActions?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  customIcons?: ActionIcons;
  customActionsColor?: {
    edit?: string;
    delete?: string;
  };
}

export interface SearchConfig {
  searchableFields?: string[];
  customSearch?: (item: unknown, term: string) => boolean;
}

export interface StyleConfig {
  wrapper?: string;
  header?: {
    container?: string;
    iconContainer?: string;
    icon?: string;
    title?: string;
    description?: string;
  };
  table?: {
    container?: string;
    row?: string;
    cell?: string;
    actionButtons?: {
      edit?: string;
      delete?: string;
    };
  };
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
  createButtonText?: string;
  createButtonIcon?: React.ReactElement;
  onCreate?: () => void;
  onEdit?: (record: unknown) => void;
  onDelete?: (record: unknown) => void;
  actionConfig?: ActionConfig;
  searchConfig?: SearchConfig;
  styleConfig?: StyleConfig;
}