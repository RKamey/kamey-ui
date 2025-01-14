export interface ColumnsProps {
  title?: string;
  dataIndex: string;
  key: string | number;
  icon?: React.ElementType;
  render?: (value: unknown, record: unknown) => React.ReactNode;
}

interface ActionIcons {
  create?: React.ReactElement;
  edit?: React.ReactElement;
  delete?: React.ReactElement;
}

interface ActionConfig {
  showDefaultActions?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  customIcons?: ActionIcons;
}

interface SearchConfig {
  searchableFields?: string[];
  customSearch?: (item: unknown, term: string) => boolean;
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
  actionConfig?: ActionConfig;
  searchConfig?: SearchConfig;
}