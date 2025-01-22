// renderiza dynamictable
import React from 'react';
import ReactDOM from 'react-dom';
import { DynamicCrud } from './components/DynamicCrud/DynamicCrud';
import { ColumnsProps } from './components/DynamicTable/types';
import { FaBarcode, FaUser, FaFileAlt, FaEnvelope } from 'react-icons/fa';
import { FormField } from './components/DynamicForm/types';

export const columns: ColumnsProps[] = [
  {
    key: "id",
    title: "ID",
    dataIndex: "id",
    icon: FaBarcode
  },
  {
    key: "uuid",
    title: "UUID",
    dataIndex: "uuid",
    icon: FaBarcode
  },
  {
    key: "name",
    title: "Nombre",
    dataIndex: "name",
    icon: FaUser
  },
  {
    key: "rfc",
    title: "RFC",
    dataIndex: "rfc",
    icon: FaFileAlt
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
    icon: FaEnvelope
  },
];

export const fields: FormField[] = [
  {
    type: "text",
    name: "name",
    label: "Nombre",
  },
  {
    type: "text",
    name: "rfc",
    label: "RFC",
  },
  {
    type: "text",
    name: "email",
    label: "Email",
  },
  {
    type: "datepicker",
    name: "date",
    label: "Fecha",
    datepickerConfig: {
      format: "DD/MM/YYYY HH:mm",
      showTime: true,
    }
  }
];

export const data = [
  {
    id: 1,
    uuid: '1',
    name: 'Juan Perez',
    rfc: 'PEJU123456',
    email: 'juan@gmail.com',
  },
  {
    id: 2,
    uuid: '2',
    name: 'Maria Lopez',
    rfc: 'MOLP123456',
    email: 'maria@ucol.mx',
  },
];

ReactDOM.render(
  <DynamicCrud
    title='Clientes'
    columns={columns}
    fields={fields}
    data={data}
    showCreateButton
    createButtonText='Crear Cliente'
  />,
  document.getElementById('root')
);