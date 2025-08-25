import{D as i}from"./DynamicForm-VtZY7O34.js";import"./jsx-runtime-CLpGMVip.js";import"./index-CZMpeKRu.js";import"./iconBase-CunQ1dn9.js";import"./TextArea-BGZcOdIA.js";import"./button-DkP0tecP.js";import"./UnstableContext-BvhCNf13.js";import"./index-DDGe2ivH.js";import"./index-D-TIQtLp.js";import"./useZIndex-C-aZEuvx.js";import"./context-CLIJG0-F.js";import"./ExclamationCircleFilled-D1lo1bWg.js";import"./index-crSnn98_.js";const x={title:"Components/DynamicForm",parameters:{docs:{description:{component:`**DynamicForm** permite generar un formulario dinámico basado en configuraciones de campos y datos.
          
`}}},component:i,argTypes:{title:{description:"Título del formulario.",table:{type:{summary:"string | React.ReactElement"},defaultValue:{summary:"Example DynamicForm"}}},description:{description:"Descripción del formulario.",table:{type:{summary:"string | React.ReactElement"}}},icon:{description:"Ícono del formulario.",table:{type:{summary:"React.ReactElement"}}},fields:{description:"Define los campos del formulario.",table:{type:{summary:"Array<{ name: string; label: string; type: string }>"}}},apiConfig:{description:"Configuración de la API.",table:{type:{summary:"ApiConfig"}}},initialData:{description:"Datos iniciales del formulario.",table:{type:{summary:"Record<string, unknown>"}}},mode:{description:"Modo del formulario.",table:{control:{type:"select"},options:["create","update","view"]}},layout:{description:"Distribución de los campos en el formulario.",table:{control:{type:"select"},options:["horizontal","vertical"],defaultValue:{summary:"horizontal"}}},cols:{description:"Número de columnas en el formulario.",table:{type:{summary:"number"}}},submitButtonText:{description:"Texto del botón de envío.",table:{type:{summary:"string"},defaultValue:{summary:"Enviar"}}},submitEditText:{description:"Texto del botón de edición.",table:{type:{summary:"string"},defaultValue:{summary:"Actualizar"}}},onSubmit:{description:"Función que se ejecuta al enviar el formulario.",table:{type:{summary:"(data: Record<string, unknown>) => void"}}},customCols:{description:"Número de columnas personalizadas en el formulario.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}}}},e={args:{title:"Example DynamicForm",description:"This is an example of DynamicForm",fields:[{name:"name",label:"Name",type:"text"},{name:"email",label:"Email",type:"email"},{name:"age",label:"Age",type:"number"},{name:"password",label:"Password",type:"password"},{name:"date",label:"Date",type:"datepicker",datepickerConfig:{format:"DD/MM/YYYY"}},{name:"upload",label:"Upload",type:"upload",uploadConfig:{accept:".jpg,.png,.jpeg"}},{name:"select",label:"Select",type:"select",selectConfig:{options:[{label:"Option 1",value:"1"},{label:"Option 2",value:"2"}]}}],apiConfig:{url:"http://localhost:3000/api",method:"POST"},initialData:{name:"John Doe",email:"j@doe.com",age:30},mode:"create",layout:"horizontal",cols:2,submitButtonText:"Submit",submitEditText:"Update",onSubmit:o=>console.log(o),customCols:!1}};var a,t,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    title: 'Example DynamicForm',
    description: 'This is an example of DynamicForm',
    fields: [{
      name: 'name',
      label: 'Name',
      type: 'text'
    }, {
      name: 'email',
      label: 'Email',
      type: 'email'
    }, {
      name: 'age',
      label: 'Age',
      type: 'number'
    }, {
      name: 'password',
      label: 'Password',
      type: 'password'
    }, {
      name: 'date',
      label: 'Date',
      type: 'datepicker',
      datepickerConfig: {
        format: 'DD/MM/YYYY'
      }
    }, {
      name: 'upload',
      label: 'Upload',
      type: 'upload',
      uploadConfig: {
        accept: '.jpg,.png,.jpeg'
      }
    }, {
      name: 'select',
      label: 'Select',
      type: 'select',
      selectConfig: {
        options: [{
          label: 'Option 1',
          value: '1'
        }, {
          label: 'Option 2',
          value: '2'
        }]
      }
    }],
    apiConfig: {
      url: 'http://localhost:3000/api',
      method: 'POST'
    },
    initialData: {
      name: 'John Doe',
      email: 'j@doe.com',
      age: 30
    },
    mode: 'create',
    layout: 'horizontal',
    cols: 2,
    submitButtonText: 'Submit',
    submitEditText: 'Update',
    onSubmit: data => console.log(data),
    customCols: false
  }
}`,...(n=(t=e.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};const C=["Default"];export{e as Default,C as __namedExportsOrder,x as default};
