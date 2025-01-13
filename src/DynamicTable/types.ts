export interface ColumnsProps {
  title?: string;
  dataIndex: string;
  key: string | number;
  icon?: React.ElementType;
  render?: (value: unknown, record: unknown) => React.ReactNode;
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
}