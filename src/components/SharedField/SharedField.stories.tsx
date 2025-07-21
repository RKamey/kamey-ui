import type { Meta, StoryObj } from '@storybook/react';
import { generateColumns, generateFields } from './SharedField';
import { SharedFieldConfig } from './types';
import { FiUser, FiMail, FiCalendar, FiDollarSign, FiToggleLeft } from 'react-icons/fi';

// Componente wrapper para mostrar los resultados
const FieldGeneratorDemo = ({ 
  fields, 
  showColumns = true, 
  showFields = true 
}: { 
  fields: Record<string, SharedFieldConfig>;
  showColumns?: boolean;
  showFields?: boolean;
}) => {
  const columns = generateColumns(fields);
  const formFields = generateFields(fields);

  return (
    <div className="space-y-6">
      {showColumns && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Columnas generadas:</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(columns, null, 2)}
            </pre>
          </div>
        </div>
      )}
      
      {showFields && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Campos de formulario generados:</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(formFields, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

const meta: Meta<typeof FieldGeneratorDemo> = {
  title: 'Utils/SharedFields',
  component: FieldGeneratorDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Funciones utilitarias para generar columnas de tabla y campos de formulario a partir de una configuración compartida.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    showColumns: {
      control: 'boolean',
      description: 'Mostrar columnas generadas'
    },
    showFields: {
      control: 'boolean',
      description: 'Mostrar campos de formulario generados'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Configuración básica de campos
const basicFields: Record<string, SharedFieldConfig> = {
  id: {
    key: 'id',
    title: 'ID',
    label: 'Identificador',
    type: 'number',
    width: 80,
    sorter: true,
    readonly: true
  },
  name: {
    key: 'name',
    title: 'Nombre',
    label: 'Nombre completo',
    type: 'text',
    placeholder: 'Ingrese el nombre',
    validations: [{ required: {
      value: true,
      message: 'Nombre es requerido'
    }}],
    width: 200,
    sorter: true,
    icon: <FiUser />
  },
  email: {
    key: 'email',
    title: 'Email',
    label: 'Correo electrónico',
    type: 'email',
    placeholder: 'ejemplo@correo.com',
    validations: [
      { required: { value: true, message: 'Email es requerido' } },
    ],
    width: 250,
    sorter: true,
    icon: <FiMail />
  }
};

// Configuración avanzada con diferentes tipos de campos
const advancedFields: Record<string, SharedFieldConfig> = {
  id: {
    key: 'id',
    title: 'ID',
    label: 'ID',
    type: 'number',
    width: 60,
    sorter: true,
    readonly: true,
    hiddenInForm: true
  },
  firstName: {
    key: 'firstName',
    title: 'Nombre',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Juan',
    validations: [{ required: { value: true, message: 'Requerido' } }],
    width: 150,
    sorter: true
  },
  lastName: {
    key: 'lastName',
    title: 'Apellido',
    label: 'Apellido',
    type: 'text',
    placeholder: 'Pérez',
    validations: [{ required: { value: true, message: 'Requerido' } }],
    width: 150,
    sorter: true
  },
  birthDate: {
    key: 'birthDate',
    title: 'Fecha Nac.',
    label: 'Fecha de nacimiento',
    type: 'datepicker',
    width: 120,
    sorter: true,
    icon: <FiCalendar />,
    datepickerConfig: {
      format: 'DD/MM/YYYY',
      showTime: false
    }
  },
  salary: {
    key: 'salary',
    title: 'Salario',
    label: 'Salario mensual',
    type: 'number',
    min: 0,
    step: 100,
    width: 120,
    sorter: true,
    icon: <FiDollarSign />,
    align: 'right'
  },
  department: {
    key: 'department',
    title: 'Departamento',
    label: 'Departamento',
    type: 'select',
    width: 150,
    selectConfig: {
      options: [
        { value: 'it', label: 'Tecnología' },
        { value: 'hr', label: 'Recursos Humanos' },
        { value: 'finance', label: 'Finanzas' },
        { value: 'marketing', label: 'Marketing' }
      ],
      apiConfig: {
        url: '/api/departments',
        method: 'GET',
        valueKey: 'id',
        labelKey: 'name',
        responseDataPath: 'data.departments'
      },
      onChange: (value: string | number) => {
        console.log('Departamento seleccionado:', value);
      }
    },
    filtrers: [
      { text: 'Tecnología', value: 'it' },
      { text: 'RRHH', value: 'hr' },
      { text: 'Finanzas', value: 'finance' },
      { text: 'Marketing', value: 'marketing' }
    ]
  },
  isActive: {
    key: 'isActive',
    title: 'Activo',
    label: 'Usuario activo',
    type: 'checkbox',
    width: 80,
    align: 'center',
    icon: <FiToggleLeft />,
    checkboxConfig: {
      onChange: (value: string | number) => {
        // Convert value to boolean if needed
        const boolValue = typeof value === 'boolean' ? value : value === 'true' || value === 1;
        return console.log('Estado activo cambiado:', boolValue);
      }
    }
  }
};

// Configuración con campos complejos
const complexFields: Record<string, SharedFieldConfig> = {
  uuid: {
    key: 'uuid',
    title: 'UUID',
    label: 'Identificador único',
    type: 'text',
    readonly: true,
    hiddenInForm: true,
    width: 200
  },
  profileImage: {
    key: 'profileImage',
    title: 'Foto',
    label: 'Foto de perfil',
    type: 'upload',
    width: 100,
    uploadConfig: {
      accept: 'image/*',
      maxCount: 1,
      listType: 'picture-card'
    }
  },
  gender: {
    key: 'gender',
    title: 'Género',
    label: 'Género',
    type: 'radio',
    width: 120,
    radioConfig: {
      onChange: (value: string | number) => {
        console.log('Género seleccionado:', value);
      },
      radioWidth: 100,
      cols: 3
    },
    options: [
      { value: 'M', label: 'Masculino' },
      { value: 'F', label: 'Femenino' },
      { value: 'O', label: 'Otro' }
    ]
  },
  skills: {
    key: 'skills',
    title: 'Habilidades',
    label: 'Habilidades técnicas',
    type: 'select',
    width: 200,
    options: [
      { value: 'react', label: 'React' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'nodejs', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'sql', label: 'SQL' }
    ]
  },
  experience: {
    key: 'experience',
    title: 'Experiencia',
    label: 'Años de experiencia',
    type: 'slider',
    min: 0,
    max: 20,
    step: 1,
    width: 150
  },
  notes: {
    key: 'notes',
    title: 'Notas',
    label: 'Notas adicionales',
    type: 'textarea',
    placeholder: 'Ingrese observaciones...',
    width: 300
  }
};

export const BasicExample: Story = {
  args: {
    fields: basicFields,
    showColumns: true,
    showFields: true
  }
};

export const AdvancedExample: Story = {
  args: {
    fields: advancedFields,
    showColumns: true,
    showFields: true
  }
};

export const ComplexFieldsExample: Story = {
  args: {
    fields: complexFields,
    showColumns: true,
    showFields: true
  }
};

export const ColumnsOnly: Story = {
  args: {
    fields: advancedFields,
    showColumns: true,
    showFields: false
  }
};

export const FormFieldsOnly: Story = {
  args: {
    fields: advancedFields,
    showColumns: false,
    showFields: true
  }
};

// Story que muestra comparación lado a lado
export const SideBySideComparison: Story = {
  render: () => {
    const columns = generateColumns(basicFields);
    const formFields = generateFields(basicFields);
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Configuración de entrada:</h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(basicFields, null, 2)}
            </pre>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Columnas generadas:</h3>
          <div className="bg-green-50 p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(columns, null, 2)}
            </pre>
          </div>
          
          <h3 className="text-lg font-semibold mb-3 mt-6">Campos generados:</h3>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(formFields, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }
};

// Story interactiva
export const Interactive: Story = {
  args: {
    fields: basicFields,
    showColumns: true,
    showFields: true
  },
  argTypes: {
    fields: {
      control: 'object',
      description: 'Configuración de campos compartida'
    }
  }
};