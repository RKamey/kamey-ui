import { Meta, StoryObj } from '@storybook/react';
import { ApiVersioning } from './ApiVersioning';
import { useState } from 'react';

const meta: Meta = {
  title: 'Utilities/ApiVersioning',
  component: () => null,
  parameters: {
    docs: {
      description: {
        component: 'Clase utilitaria para gestionar instancias de Axios con diferentes versiones de API'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Componente para demostrar el uso de ApiVersioning
const ApiVersioningDemo = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState('v1');
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Creamos una instancia de ApiVersioning (usando una API de ejemplo)
      const api = new ApiVersioning('https://jsonplaceholder.typicode.com');
      
      // Obtenemos una instancia específica para la versión seleccionada
      const apiVersioned = api.getInstance(selectedVersion);
      
      // Simulamos una petición a la API
      const result = await apiVersioned.get('/posts/1');
      setResponse(result.data);
    } catch (err) {
      setError('Error al realizar la petición: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2>Demostración de ApiVersioning</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="version-select">Seleccionar versión de API: </label>
        <select 
          id="version-select"
          value={selectedVersion}
          onChange={(e) => setSelectedVersion(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        >
          <option value="v1">Versión 1</option>
          <option value="v2">Versión 2</option>
          <option value="v3">Versión 3</option>
        </select>
        
        <button 
          onClick={handleFetchData}
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'wait' : 'pointer'
          }}
        >
          {loading ? 'Cargando...' : 'Realizar petición'}
        </button>
      </div>
      
      {error && (
        <div style={{ 
          backgroundColor: '#FFEBEE', 
          padding: '10px', 
          borderRadius: '4px',
          border: '1px solid #FFCDD2',
          color: '#B71C1C',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}
      
      <div>
        <h3>URL de la petición:</h3>
        <code style={{ 
          backgroundColor: '#f5f5f5',
          padding: '10px',
          borderRadius: '4px',
          display: 'block',
          marginBottom: '20px'
        }}>
          https://jsonplaceholder.typicode.com/{selectedVersion}/posts/1
        </code>
        
        <h3>Respuesta:</h3>
        <pre style={{ 
          backgroundColor: '#f5f5f5',
          padding: '10px',
          borderRadius: '4px',
          overflowX: 'auto'
        }}>
          {response ? JSON.stringify(response, null, 2) : 'No hay datos disponibles'}
        </pre>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h3>Código de ejemplo:</h3>
        <pre style={{ 
          backgroundColor: '#f5f5f5',
          padding: '10px',
          borderRadius: '4px',
          overflowX: 'auto'
        }}>
{`// Crear instancia base
const api = new ApiVersioning('https://api.ejemplo.com');

// Obtener instancia para una versión específica
const apiV${selectedVersion} = api.getInstance('${selectedVersion}');

// Realizar petición con la versión específica
apiV${selectedVersion}.get('/posts/1')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`}
        </pre>
      </div>
    </div>
  );
};

export const Básico: Story = {
  render: () => <ApiVersioningDemo />
};
