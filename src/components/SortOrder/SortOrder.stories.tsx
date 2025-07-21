/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryFn } from '@storybook/react';
import { sortOrder } from './SortOrder';
import { Table, Button, Space, Typography } from 'antd';
import { useState } from 'react';

const { Title, Text } = Typography;

// Datos de ejemplo para demostrar diferentes tipos
type SampleDataItem = {
  key: string;
  name: string;
  age: number | null | undefined;
  date: Date | null;
  active: boolean;
  score: number;
  category: { type: string; level: number } | null;
};

const sampleData: SampleDataItem[] = [
  { 
    key: '1',
    name: 'Charlie Brown', 
    age: 35, 
    date: new Date('2022-03-15'), 
    active: true,
    score: 85.5,
    category: { type: 'premium', level: 3 }
  },
  { 
    key: '2',
    name: 'Alice Johnson', 
    age: 28, 
    date: new Date('2021-07-22'), 
    active: false,
    score: 92.3,
    category: { type: 'standard', level: 1 }
  },
  { 
    key: '3',
    name: 'Bob Smith', 
    age: 42, 
    date: new Date('2020-11-08'), 
    active: true,
    score: 78.9,
    category: { type: 'premium', level: 2 }
  },
  { 
    key: '4',
    name: 'Diana Prince', 
    age: null, 
    date: new Date('2023-01-10'), 
    active: false,
    score: 96.7,
    category: null
  },
  { 
    key: '5',
    name: '123Product', 
    age: 25, 
    date: null, 
    active: true,
    score: 73.2,
    category: { type: 'basic', level: 1 }
  },
  { 
    key: '6',
    name: '10Product', 
    age: undefined, 
    date: new Date('2019-05-30'), 
    active: false,
    score: 88.1,
    category: { type: 'premium', level: 1 }
  }
];

// Componente para demostrar sortOrder
const SortOrderDemo = ({ 
  data = sampleData, 
  initialSortKey 
}: { 
  data?: typeof sampleData; 
  initialSortKey?: string;
}) => {
  const [sortedData, setSortedData] = useState(data);
  const [currentSort, setCurrentSort] = useState<string>(initialSortKey || 'none');

  const handleSort = (key: keyof typeof sampleData[0]) => {
    const sorted = [...data].sort(sortOrder(key));
    setSortedData(sorted);
    setCurrentSort(key as string);
  };

  const resetData = () => {
    setSortedData(data);
    setCurrentSort('none');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => text || <Text type="secondary">null</Text>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (age: number | null | undefined) => 
        age !== null && age !== undefined ? age : <Text type="secondary">null/undefined</Text>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date | null) => 
        date ? date.toLocaleDateString() : <Text type="secondary">null</Text>,
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => active ? 'Yes' : 'No',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => score.toFixed(1),
    },
    {
      title: 'Category (Object)',
      dataIndex: 'category',
      key: 'category',
      render: (category: any) => 
        category ? JSON.stringify(category) : <Text type="secondary">null</Text>,
    },
  ];

  return (
    <div>
      <Title level={4}>Interactive SortOrder Demo</Title>
      
      <div style={{ marginBottom: 16 }}>
        <Text strong>Current sort: </Text>
        <Text code>{currentSort}</Text>
      </div>

      <Space wrap style={{ marginBottom: 16 }}>
        <Button onClick={() => handleSort('name')} type={currentSort === 'name' ? 'primary' : 'default'}>
          Sort by Name (String)
        </Button>
        <Button onClick={() => handleSort('age')} type={currentSort === 'age' ? 'primary' : 'default'}>
          Sort by Age (Number)
        </Button>
        <Button onClick={() => handleSort('date')} type={currentSort === 'date' ? 'primary' : 'default'}>
          Sort by Date
        </Button>
        <Button onClick={() => handleSort('active')} type={currentSort === 'active' ? 'primary' : 'default'}>
          Sort by Active (Boolean)
        </Button>
        <Button onClick={() => handleSort('score')} type={currentSort === 'score' ? 'primary' : 'default'}>
          Sort by Score (Number)
        </Button>
        <Button onClick={() => handleSort('category')} type={currentSort === 'category' ? 'primary' : 'default'}>
          Sort by Category (Object)
        </Button>
        <Button onClick={resetData} type="dashed">
          Reset
        </Button>
      </Space>
      
      <Table 
        dataSource={sortedData} 
        columns={columns} 
        pagination={false}
        size="small"
        scroll={{ x: 800 }}
      />
      
      <div style={{ marginTop: 16 }}>
        <Title level={5}>Code Example:</Title>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: 12, 
          fontSize: 12, 
          borderRadius: 4,
          overflow: 'auto'
        }}>
{`import { sortOrder } from 'kamey-ui';

const data = [
  { name: 'Charlie', age: 35, active: true },
  { name: 'Alice', age: 28, active: false },
  { name: 'Bob', age: null, active: true }
];

// Sort by different properties
const sortedByName = data.sort(sortOrder('name'));
const sortedByAge = data.sort(sortOrder('age'));  // nulls go first
const sortedByActive = data.sort(sortOrder('active')); // true before false
`}
        </pre>
      </div>
    </div>
  );
};

const meta: Meta<typeof SortOrderDemo> = {
  title: 'Utils/SortOrder',
  component: SortOrderDemo,
  parameters: {
    docs: {
      description: {
        component: `
**sortOrder** es una función utilitaria que crea funciones de comparación para ordenar arreglos de objetos por una propiedad específica.

### Características principales:

- **Manejo de tipos múltiples**: Strings, números, fechas, booleanos, objetos
- **Manejo de valores nulos**: \`null\` y \`undefined\` se colocan al inicio
- **Strings numéricos**: Detecta y ordena strings que contienen números
- **Fechas**: Ordena cronológicamente usando \`getTime()\`
- **Booleanos**: \`true\` se ordena antes que \`false\`
- **Objetos**: Compara usando \`JSON.stringify()\`

### Uso básico:
\`\`\`typescript
import { sortOrder } from 'kamey-ui';

const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];

const sortedByName = users.sort(sortOrder('name'));
const sortedByAge = users.sort(sortOrder('age'));
\`\`\`

### Tipo de retorno:
\`\`\`typescript
sortOrder<T extends object>(key: keyof T): SortFunction<T>
type SortFunction<T> = (a: T, b: T) => number
\`\`\`

### Casos especiales:

- **Valores null/undefined**: Se ordenan al principio
- **Strings con números**: "10" se ordena después de "2"
- **Fechas**: Se comparan por timestamp
- **Objetos**: Se serializan a JSON para comparación
        `
      }
    }
  },
  argTypes: {
    data: {
      description: 'Array de objetos a ordenar para la demostración',
      table: {
        type: { summary: 'Array<Object>' }
      }
    },
    initialSortKey: {
      description: 'Propiedad inicial por la que ordenar',
      control: { 
        type: 'select',
        options: ['none', 'name', 'age', 'date', 'active', 'score', 'category']
      },
      table: {
        type: { summary: 'keyof T' },
        defaultValue: { summary: 'none' }
      }
    }
  }
};

export default meta;

const Template: StoryFn<typeof SortOrderDemo> = (args) => <SortOrderDemo {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialSortKey: 'name'
};

export const StringSort = Template.bind({});
StringSort.args = {
  initialSortKey: 'name',
  data: [
    { key: '1', name: 'Product 1', age: 25, date: new Date(), active: true, score: 85, category: null },
    { key: '2', name: 'Product 10', age: 30, date: new Date(), active: false, score: 90, category: null },
    { key: '3', name: 'Product 2', age: 35, date: new Date(), active: true, score: 75, category: null },
    { key: '4', name: 'Product 20', age: 40, date: new Date(), active: false, score: 95, category: null },
  ]
};

export const NumericSort = Template.bind({});
NumericSort.args = {
  initialSortKey: 'age'
};

export const DateSort = Template.bind({});
DateSort.args = {
  initialSortKey: 'date'
};

export const BooleanSort = Template.bind({});
BooleanSort.args = {
  initialSortKey: 'active'
};

export const NullHandling = Template.bind({});
NullHandling.args = {
  initialSortKey: 'age',
  data: [
    { key: '1', name: 'Alice', age: 30, date: new Date('2021-01-01'), active: true, score: 85, category: { type: 'A', level: 1 } },
    { key: '3', name: 'Bob', age: undefined, date: new Date('2022-01-01'), active: true, score: 75, category: { type: 'B', level: 2 } },
    { key: '4', name: 'Charlie', age: 25, date: new Date('2020-01-01'), active: false, score: 95, category: { type: 'B', level: 1 } },
  ]
};