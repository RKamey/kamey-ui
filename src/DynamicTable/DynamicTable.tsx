import { Typography, Button, Input, Table } from 'antd';
import { ColumnsProps, DynamicTableProps } from './types';

const { Title, Text } = Typography;
const { Search } = Input;

export const DynamicTable = ({
  title,
  icon: Icon,
  description,
  showCreateButton,
  onCreate,
  createButtonText,
  createButtonIcon,
  columns,
  data,
  loading,
}: DynamicTableProps) => {

  const processColumns = (columns: ColumnsProps[]) => {
    return columns.map((column) => ({
      ...column,
      title: column.icon ? (
        <div className="flex items-center space-x-2">
          {column.icon && <column.icon className="text-blue-600" />}
          <span>{column.title}</span>
        </div>
      ) : (
        column.title
      ),
      className: "py-4 px-6",
    }));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
            <Icon className="text-blue-600 text-lg" />
          </div>
        )}
        <Title level={4} className="!m-0">
          {title}
        </Title>
      </div>
      {/* Description and actions */}
      <div className="flex items-center gap-3 mb-4">
        {/* Description */}
        {description && (
          <Text className="text-gray-500">{description}</Text>
        )}
        {/* Search */}
        <div className="ml-auto">
          <Search
            allowClear
            placeholder="Buscar"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>

        {/* Actions */}
        {showCreateButton && (
          <div className="ml-auto">
            <Button type="primary" icon={createButtonIcon} onClick={onCreate}>
              {createButtonText}
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <Table
        columns={processColumns(columns)}
        dataSource={data}
        loading={loading}
      />
    </div>
  );
};