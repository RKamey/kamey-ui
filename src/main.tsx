import React from 'react'
import ReactDOM from 'react-dom/client'
import { DynamicCrud } from './components/DynamicCrud/DynamicCrud'
import { FormField } from './components/DynamicForm/types'

// Example columns configuration
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  }
]

// Example form fields
const fields: FormField[] = [
  {
    name: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
  }
]

// Example data
const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
]

const App: React.FC = () => {

  const handleCreate = () => {
    window.location.href = '/create'
  }

  const handleEdit = (record) => {
    console.log('Editing:', record)
  }

  const handleDelete = (record) => {
    console.log('Deleting:', record)
  }


  return (
    <DynamicCrud 
      title="User Management"
      columns={columns}
      data={data}
      fields={fields}
      onCreate={handleCreate}
      onEdit={handleEdit}
      onDelete={handleDelete}
      showCreateButton
      createButtonText="Add User"
      createRedirect
    />
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)