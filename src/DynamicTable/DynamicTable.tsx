import { Typography, Button, Input, Table } from 'antd';
import { ColumnsProps, DynamicTableProps } from './types';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useMemo, useState } from 'react';

const { Title, Text } = Typography;
const { Search } = Input;

export const DynamicTable = ({
  title,
  icon: Icon,
  description,
  showCreateButton,
  onCreate,
  createButtonText = 'Create',
  createButtonIcon = <FaPlus />,
  columns,
  data,
  loading,
  actionConfig = {
    showDefaultActions: true,
    showEdit: true,
    showDelete: true,
    customIcons: {
      create: <FaPlus />,
      edit: <FaEdit />,
      delete: <FaTrash />,
    }
  },
  searchConfig = {
    searchableFields: [],
    customSearch: undefined,
  },
}: DynamicTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // ==== [ Handlers ] ====
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const searchInObject = (obj: any, term: string): boolean => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.values(obj).some((value: any) => {
      if (value === null || value === undefined) return false;
      
      if (typeof value === 'object') {
        return searchInObject(value, term);
      }
      
      return value.toString().toLowerCase().includes(term.toLowerCase());
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const searchByFields = (item: any, term: string, fields: string[]) => {
    return fields.some(field => {
      const value = item[field];
      if (value === null || value === undefined) return false;
      return value.toString().toLowerCase().includes(term.toLowerCase());
    });
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter(item => {
      if (searchConfig.customSearch) {
        return searchConfig.customSearch(item, searchTerm);
      }

      if (searchConfig.searchableFields && searchConfig.searchableFields.length > 0) {
        return searchByFields(item, searchTerm, searchConfig.searchableFields);
      }

      return searchInObject(item, searchTerm);
    });
    // eslint-disable-next-line
  }, [data, searchTerm, searchConfig]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  
  const paginationConfig = {
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total: number) => `Total ${total} registros`,
    className: 'custom-pagination',
  };

  const handleEdit = (record: unknown) => {
    console.log('Editando registro:', record);
  };

  const handleDelete = (record: unknown) => {
    console.log('Eliminando registro:', record);
  };

  const processColumns = (columns: ColumnsProps[]) => {
    const processedColumns = columns.map((column) => ({
      ...column,
      title: column.icon ? (
        <div className="flex items-center gap-2">
          {column.icon && <column.icon className="text-primary-600" />}
          <span className="font-medium">{column.title}</span>
        </div>
      ) : (
        <span className="font-medium">{column.title}</span>
      ),
      className: "py-4 px-6 bg-white",
    }));

    if (actionConfig.showDefaultActions) {
      const actionsColumn = {
        title: <span className="font-medium">Acciones</span>,
        key: 'actions',
        width: 120,
        className: "py-4 px-6 bg-white",
        render: (_: unknown, record: unknown) => (
          <div className="flex items-center gap-3">
            {actionConfig.showEdit && (
              <Button
                type="text"
                className="action-button hover:bg-gray-50 transition-colors"
                icon={actionConfig.customIcons?.edit || <FaEdit className="text-primary-600 text-lg" />}
                onClick={() => handleEdit(record)}
              />
            )}
            {actionConfig.showDelete && (
              <Button
                type="text"
                className="action-button hover:bg-red-50 transition-colors"
                icon={actionConfig.customIcons?.delete || <FaTrash className="text-red-600 text-lg" />}
                onClick={() => handleDelete(record)}
              />
            )}
          </div>
        ),
      };
      return [...processedColumns, actionsColumn];
    }

    return processedColumns;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors">
              <Icon className="text-primary-600 text-xl" />
            </div>
          )}
          <Title level={4} className="!m-0 !text-gray-900">
            {title}
          </Title>
        </div>

        <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
          {/* Description */}
          {description && (
            <Text className="text-gray-500 flex-grow">{description}</Text>
          )}
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <Search
              allowClear
              className="min-w-[240px]"
              placeholder="Buscar"
              onChange={(e) => handleSearch(e.target.value)}
              onSearch={handleSearch}
            />

            {/* Create Button */}
            {showCreateButton && (
              <Button 
                type="primary"
                className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                icon={actionConfig.customIcons?.create || createButtonIcon}
                onClick={onCreate}
              >
                {createButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={processColumns(columns)}
        dataSource={filteredData}
        loading={loading}
        pagination={{
          ...paginationConfig,
          total: filteredData.length,
          showTotal: (total) => `Total ${total} registros${searchTerm ? ' filtrados' : ''}`,
        }}
        className="dynamic-table"
      />
    </div>
  );
};

