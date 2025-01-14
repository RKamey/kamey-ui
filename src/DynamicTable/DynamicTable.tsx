import { Typography, Button, Input, Table, Popconfirm } from 'antd';
import { ColumnsProps, DynamicTableProps } from './types';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useMemo, useState } from 'react';

const { Title, Text } = Typography;
const { Search } = Input;

/**
 * @description 
 * The DynamicTable component is a table that allows you to display and manage data.  
 * It includes a search bar, a create button, and action buttons for each row.
 * @param {DynamicTableProps} props
 * @param {string} props.title - The title of the table
 * @param {React.ElementType} props.icon - The icon of the table
 * @param {string} props.description - The description of the table
 * @param {boolean} props.showCreateButton - Whether to show the create button
 * @param {() => void} props.onCreate - The function to be called when the create button is clicked
 * @param {() => void} props.onEdit - The function to be called when the edit button is clicked
 * @param {() => void} props.onDelete - The function to be called when the delete button is clicked
 * @param {string} props.createButtonText - The text of the create button
 * @param {React.ReactElement} props.createButtonIcon - The icon of the create button
 * @param {ColumnsProps[]} props.columns - The columns of the table
 * @param {unknown[]} props.data - The data of the table
 * @param {boolean} props.loading - Whether the table is loading
 * @param {ActionConfig} props.actionConfig - The action configuration of the table
 * @param {SearchConfig} props.searchConfig - The search configuration of the table
 * @returns {React.ReactNode}
 */
export const DynamicTable = ({
  title,
  icon: Icon,
  description,
  showCreateButton,
  onCreate,
  onEdit,
  onDelete,
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
}: DynamicTableProps): React.ReactNode => {
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

  const handleEdit = (record: Record<string, unknown>) => {
    console.log('Editando registro:', record);
    onEdit?.(record);
  };

  const handleDelete = (record: Record<string, unknown>) => {
    console.log('Eliminando registro:', record);
    onDelete?.(record);
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
                onClick={() => handleEdit(record as Record<string, unknown>)}
              />
            )}
            {actionConfig.showDelete && (
              <Popconfirm
                title="¿Estás seguro de que deseas eliminar este registro?"
                onConfirm={() => handleDelete(record as Record<string, unknown>)}
                okText="Eliminar"
                cancelText="Cancelar"
              >
                <Button
                  type="text"
                  className="action-button hover:bg-red-50 transition-colors"
                  icon={actionConfig.customIcons?.delete || <FaTrash className="text-red-600 text-lg" />}
                />
              </Popconfirm>
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

