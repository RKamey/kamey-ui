import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{s as G}from"./SortOrder-D51TdvAf.js";import{c as U,f as B,q as L,r as P,s as Y}from"./index-G4stSFUw.js";import"./iconBase-BmVwZZOV.js";import"./index-BCtMShv3.js";const A=a=>Object.values(a).map(r=>{var s,t;return{key:r.key,title:r.title,dataIndex:r.key,sorter:r.sorter?(p,R)=>G(r.key)(p,R):void 0,width:r.width,align:r.align,icon:r.icon,isHidden:r.isHidden,render:r.render,filters:r.filtrers,onFilter:r.onFilter,isPrimaryKey:((s=r.key)==null?void 0:s.toLowerCase())==="id"||((t=r.key)==null?void 0:t.toLowerCase())==="uuid"}}),H=a=>Object.entries(a).map(([r,s])=>({type:s.type||"text",name:r,label:s.label,placeholder:s.placeholder,validations:s.validations,datepickerConfig:s.datepickerConfig,min:s.min,max:s.max,step:s.step,width:s.width,readonly:s.readonly,hidden:s.hiddenInForm,checkboxConfig:s.checkboxConfig,selectConfig:s.selectConfig,dependsOn:s.dependsOn,options:s.options,onChange:s.onChange,uploadConfig:s.uploadConfig,radioConfig:s.radioConfig})),z=({fields:a,showColumns:r=!0,showFields:s=!0})=>{const t=A(a),p=H(a);return e.jsxs("div",{className:"space-y-6",children:[r&&e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-3",children:"Columnas generadas:"}),e.jsx("div",{className:"bg-gray-50 p-4 rounded-lg",children:e.jsx("pre",{className:"text-sm overflow-x-auto",children:JSON.stringify(t,null,2)})})]}),s&&e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-3",children:"Campos de formulario generados:"}),e.jsx("div",{className:"bg-gray-50 p-4 rounded-lg",children:e.jsx("pre",{className:"text-sm overflow-x-auto",children:JSON.stringify(p,null,2)})})]})]})},Z={title:"Utils/SharedFields",component:z,parameters:{layout:"padded",docs:{description:{component:"Funciones utilitarias para generar columnas de tabla y campos de formulario a partir de una configuración compartida."}}},tags:["autodocs"],argTypes:{showColumns:{control:"boolean",description:"Mostrar columnas generadas"},showFields:{control:"boolean",description:"Mostrar campos de formulario generados"}}},o={id:{key:"id",title:"ID",label:"Identificador",type:"number",width:80,sorter:!0,readonly:!0},name:{key:"name",title:"Nombre",label:"Nombre completo",type:"text",placeholder:"Ingrese el nombre",validations:[{required:{value:!0,message:"Nombre es requerido"}}],width:200,sorter:!0,icon:e.jsx(B,{})},email:{key:"email",title:"Email",label:"Correo electrónico",type:"email",placeholder:"ejemplo@correo.com",validations:[{required:{value:!0,message:"Email es requerido"}}],width:250,sorter:!0,icon:e.jsx(U,{})}},g={id:{key:"id",title:"ID",label:"ID",type:"number",width:60,sorter:!0,readonly:!0,hiddenInForm:!0},firstName:{key:"firstName",title:"Nombre",label:"Nombre",type:"text",placeholder:"Juan",validations:[{required:{value:!0,message:"Requerido"}}],width:150,sorter:!0},lastName:{key:"lastName",title:"Apellido",label:"Apellido",type:"text",placeholder:"Pérez",validations:[{required:{value:!0,message:"Requerido"}}],width:150,sorter:!0},birthDate:{key:"birthDate",title:"Fecha Nac.",label:"Fecha de nacimiento",type:"datepicker",width:120,sorter:!0,icon:e.jsx(Y,{}),datepickerConfig:{format:"DD/MM/YYYY",showTime:!1}},salary:{key:"salary",title:"Salario",label:"Salario mensual",type:"number",min:0,step:100,width:120,sorter:!0,icon:e.jsx(P,{}),align:"right"},department:{key:"department",title:"Departamento",label:"Departamento",type:"select",width:150,selectConfig:{options:[{value:"it",label:"Tecnología"},{value:"hr",label:"Recursos Humanos"},{value:"finance",label:"Finanzas"},{value:"marketing",label:"Marketing"}],apiConfig:{url:"/api/departments",method:"GET",valueKey:"id",labelKey:"name",responseDataPath:"data.departments"},onChange:a=>{console.log("Departamento seleccionado:",a)}},filtrers:[{text:"Tecnología",value:"it"},{text:"RRHH",value:"hr"},{text:"Finanzas",value:"finance"},{text:"Marketing",value:"marketing"}]},isActive:{key:"isActive",title:"Activo",label:"Usuario activo",type:"checkbox",width:80,align:"center",icon:e.jsx(L,{}),checkboxConfig:{onChange:a=>console.log("Estado activo cambiado:",typeof a=="boolean"?a:a==="true"||a===1)}}},K={uuid:{key:"uuid",title:"UUID",label:"Identificador único",type:"text",readonly:!0,hiddenInForm:!0,width:200},profileImage:{key:"profileImage",title:"Foto",label:"Foto de perfil",type:"upload",width:100,uploadConfig:{accept:"image/*",maxCount:1,listType:"picture-card"}},gender:{key:"gender",title:"Género",label:"Género",type:"radio",width:120,radioConfig:{onChange:a=>{console.log("Género seleccionado:",a)},radioWidth:100,cols:3},options:[{value:"M",label:"Masculino"},{value:"F",label:"Femenino"},{value:"O",label:"Otro"}]},skills:{key:"skills",title:"Habilidades",label:"Habilidades técnicas",type:"select",width:200,options:[{value:"react",label:"React"},{value:"typescript",label:"TypeScript"},{value:"nodejs",label:"Node.js"},{value:"python",label:"Python"},{value:"sql",label:"SQL"}]},experience:{key:"experience",title:"Experiencia",label:"Años de experiencia",type:"slider",min:0,max:20,step:1,width:150},notes:{key:"notes",title:"Notas",label:"Notas adicionales",type:"textarea",placeholder:"Ingrese observaciones...",width:300}},n={args:{fields:o,showColumns:!0,showFields:!0}},l={args:{fields:g,showColumns:!0,showFields:!0}},i={args:{fields:K,showColumns:!0,showFields:!0}},d={args:{fields:g,showColumns:!0,showFields:!1}},c={args:{fields:g,showColumns:!1,showFields:!0}},m={render:()=>{const a=A(o),r=H(o);return e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-3",children:"Configuración de entrada:"}),e.jsx("div",{className:"bg-blue-50 p-4 rounded-lg",children:e.jsx("pre",{className:"text-sm overflow-x-auto",children:JSON.stringify(o,null,2)})})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-3",children:"Columnas generadas:"}),e.jsx("div",{className:"bg-green-50 p-4 rounded-lg",children:e.jsx("pre",{className:"text-sm overflow-x-auto",children:JSON.stringify(a,null,2)})}),e.jsx("h3",{className:"text-lg font-semibold mb-3 mt-6",children:"Campos generados:"}),e.jsx("div",{className:"bg-yellow-50 p-4 rounded-lg",children:e.jsx("pre",{className:"text-sm overflow-x-auto",children:JSON.stringify(r,null,2)})})]})]})}},u={args:{fields:o,showColumns:!0,showFields:!0},argTypes:{fields:{control:"object",description:"Configuración de campos compartida"}}};var h,b,x;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    fields: basicFields,
    showColumns: true,
    showFields: true
  }
}`,...(x=(b=n.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var y,v,f;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    fields: advancedFields,
    showColumns: true,
    showFields: true
  }
}`,...(f=(v=l.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var w,F,C;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    fields: complexFields,
    showColumns: true,
    showFields: true
  }
}`,...(C=(F=i.parameters)==null?void 0:F.docs)==null?void 0:C.source}}};var N,k,j;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    fields: advancedFields,
    showColumns: true,
    showFields: false
  }
}`,...(j=(k=d.parameters)==null?void 0:k.docs)==null?void 0:j.source}}};var S,O,I;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    fields: advancedFields,
    showColumns: false,
    showFields: true
  }
}`,...(I=(O=c.parameters)==null?void 0:O.docs)==null?void 0:I.source}}};var D,E,q;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => {
    const columns = generateColumns(basicFields);
    const formFields = generateFields(basicFields);
    return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">\r
        <div>\r
          <h3 className="text-lg font-semibold mb-3">Configuración de entrada:</h3>\r
          <div className="bg-blue-50 p-4 rounded-lg">\r
            <pre className="text-sm overflow-x-auto">\r
              {JSON.stringify(basicFields, null, 2)}\r
            </pre>\r
          </div>\r
        </div>\r
        \r
        <div>\r
          <h3 className="text-lg font-semibold mb-3">Columnas generadas:</h3>\r
          <div className="bg-green-50 p-4 rounded-lg">\r
            <pre className="text-sm overflow-x-auto">\r
              {JSON.stringify(columns, null, 2)}\r
            </pre>\r
          </div>\r
          \r
          <h3 className="text-lg font-semibold mb-3 mt-6">Campos generados:</h3>\r
          <div className="bg-yellow-50 p-4 rounded-lg">\r
            <pre className="text-sm overflow-x-auto">\r
              {JSON.stringify(formFields, null, 2)}\r
            </pre>\r
          </div>\r
        </div>\r
      </div>;
  }
}`,...(q=(E=m.parameters)==null?void 0:E.docs)==null?void 0:q.source}}};var T,J,M;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(M=(J=u.parameters)==null?void 0:J.docs)==null?void 0:M.source}}};const $=["BasicExample","AdvancedExample","ComplexFieldsExample","ColumnsOnly","FormFieldsOnly","SideBySideComparison","Interactive"];export{l as AdvancedExample,n as BasicExample,d as ColumnsOnly,i as ComplexFieldsExample,c as FormFieldsOnly,u as Interactive,m as SideBySideComparison,$ as __namedExportsOrder,Z as default};
