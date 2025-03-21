import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Hooks/useAsync',
  component: () => null,
  parameters: {
    docsOnly: true,
    docs: {
      description: {
        component: `
**useAsync** es un hook personalizado que facilita la gestión de operaciones asíncronas en componentes React.

### Uso:

\`\`\`typescript
// Hook básico con función asíncrona
const { data, error, loading } = useAsync(() => fetchData());

// Con dependencias (se ejecutará cuando cambie userId)
const { data, error, loading } = useAsync(() => fetchUserData(userId), [userId]);

// Manejo de estados
if (loading) return <Loading />;
if (error) return <Error message={error.message} />;
return <DataDisplay data={data} />;
\`\`\`

### Retorno:

El hook retorna un objeto con las siguientes propiedades:

- **data**: Los datos resultantes de la operación asíncrona, o \`undefined\` si aún no se han cargado.
- **error**: El error capturado durante la ejecución, o \`null\` si no hay errores.
- **loading**: Un booleano que indica si la operación asíncrona está en progreso.

### Características:

- Detecta y extrae automáticamente la propiedad \`.data\` de la respuesta si existe.
- Maneja correctamente los errores, convirtiéndolos en instancias de Error.
- Controla el estado de carga durante todo el ciclo de vida de la operación.
`
      }
    }
  },
  argTypes: {
    asyncFunction: {
      description: 'Función asíncrona a ejecutar que devuelve una promesa.',
      table: {
        type: { summary: '() => Promise<T>' }
      }
    },
    dependencies: {
      description: 'Array opcional de dependencias para el hook useEffect. Cuando cambian, se vuelve a ejecutar la función asíncrona.',
      table: {
        type: { summary: 'unknown[]' },
        defaultValue: { summary: '[]' }
      }
    },
    data: {
      description: 'Los datos resultantes de la operación asíncrona.',
      table: {
        type: { summary: 'T | undefined' }
      }
    },
    error: {
      description: 'Error capturado durante la ejecución de la función asíncrona.',
      table: {
        type: { summary: 'Error | null' },
        defaultValue: { summary: 'null' }
      }
    },
    loading: {
      description: 'Indica si la operación asíncrona está en progreso.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    }
  }
};

export default meta;

type Story = StoryObj;

export const Documentacion: Story = {};