import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{F as fe,a as ve,b as xe,c as ge,d as he,e as se,f as Be,g as ye,h as je,i as be,j as we,k as oe,l as Pe,m as Ne,n as Se,o as ze,p as Fe}from"./index-G4stSFUw.js";import{B as S}from"./button-BcU_t4K8.js";import"./iconBase-BmVwZZOV.js";import"./index-BCtMShv3.js";import"./UnstableContext-wcpzFRMZ.js";import"./index-BB2o9Pgr.js";import"./index-D-fs5e6L.js";const a=({children:le,type:h="primary",size:B="middle",variant:y="default",preset:f,icon:de,iconPosition:ce="left",iconOnly:v=!1,loading:j=!1,disabled:b=!1,onClick:w})=>{const pe=()=>{switch(y){case"success":return"!bg-green-600 hover:!bg-green-700 !border-green-600 hover:!border-green-700 !text-white";case"danger":return"!bg-red-600 hover:!bg-red-700 !border-red-600 hover:!border-red-700 !text-white";case"warning":return"!bg-yellow-600 hover:!bg-yellow-700 !border-yellow-600 hover:!border-yellow-700 !text-white";case"info":return"!bg-blue-600 hover:!bg-blue-700 !border-blue-600 hover:!border-blue-700 !text-white";case"dark":return"!bg-gray-800 hover:!bg-gray-900 !border-gray-800 hover:!border-gray-900 !text-white";default:return""}},r=f?{save:{icon:e.jsx(ze,{}),text:"Guardar",variant:"success"},delete:{icon:e.jsx(Se,{}),text:"Eliminar",variant:"danger"},edit:{icon:e.jsx(Ne,{}),text:"Editar",variant:"info"},add:{icon:e.jsx(Pe,{}),text:"Agregar",variant:"success"},download:{icon:e.jsx(oe,{}),text:"Descargar",variant:"info"},upload:{icon:e.jsx(we,{}),text:"Subir",variant:"warning"},refresh:{icon:e.jsx(be,{}),text:"Actualizar",variant:"default"},search:{icon:e.jsx(je,{}),text:"Buscar",variant:"info"},settings:{icon:e.jsx(ye,{}),text:"Configurar",variant:"dark"},profile:{icon:e.jsx(Be,{}),text:"Perfil",variant:"default"},favorite:{icon:e.jsx(se,{}),text:"Favorito",variant:"danger"},cart:{icon:e.jsx(he,{}),text:"Carrito",variant:"warning"},mail:{icon:e.jsx(ge,{}),text:"Enviar",variant:"info"},call:{icon:e.jsx(xe,{}),text:"Llamar",variant:"success"},home:{icon:e.jsx(ve,{}),text:"Inicio",variant:"default"},next:{icon:e.jsx(fe,{}),text:"Siguiente",variant:"default",iconPosition:"right"}}[f]:null,x=de||(r==null?void 0:r.icon),ue=(r==null?void 0:r.variant)||y,g=r&&"iconPosition"in r?r.iconPosition:ce,me=le||(f&&!v?r==null?void 0:r.text:""),P=v?"!rounded-full !w-10 !h-10 !flex !items-center !justify-center !shadow-md !cursor-pointer !transition-all !duration-200":"!rounded-lg !shadow-md !cursor-pointer !transition-all !duration-200 !font-medium",N=ue!=="default"?pe():"";return v?e.jsx(S,{className:`${P} ${N}`,type:h,size:B,loading:j,disabled:b,onClick:w,children:x}):e.jsx(S,{className:`${P} ${N}`,type:h,size:B,loading:j,disabled:b,onClick:w,icon:g==="left"?x:void 0,children:e.jsxs("div",{className:`!flex !items-center !gap-2 ${g==="right"?"!flex-row-reverse":""}`,children:[g==="right"&&x,me]})})};a.__docgenInfo={description:`@alias Btn\r
@description Versatile button component with icon support, custom variants and presets\r
@param {BtnProps} props\r
@param {React.ReactNode} props.children - The content of the button\r
@param {'primary' | 'link' | 'text' | 'default' | 'dashed'} props.type - The Ant Design button type\r
@param {'small' | 'middle' | 'large'} props.size - The size of the button\r
@param {'default' | 'success' | 'danger' | 'warning' | 'info' | 'dark'} props.variant - Color variant\r
@param {'save' | 'delete' | 'edit' | 'add' | 'download' | 'upload' | 'refresh' | 'search' | 'settings' | 'profile' | 'favorite' | 'cart' | 'mail' | 'call' | 'home' | 'next'} props.preset - Predefined button with icon and text\r
@param {React.ReactNode} props.icon - Custom icon\r
@param {'left' | 'right'} props.iconPosition - Position of the icon\r
@param {boolean} props.iconOnly - Show only icon without text\r
@param {boolean} props.loading - Loading state\r
@param {boolean} props.disabled - Disabled state\r
@param {() => void} props.onClick - Click handler\r
@returns {React.ReactNode}\r
@example \r
<Btn preset="save" variant="success">Guardar</Btn>\r
<Btn icon={<FiCustomIcon />} variant="info">Custom</Btn>\r
<Btn preset="delete" iconOnly />`,methods:[],displayName:"Btn",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},type:{required:!1,tsType:{name:"union",raw:"'primary' | 'link' | 'text' | 'default' | 'dashed'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'link'"},{name:"literal",value:"'text'"},{name:"literal",value:"'default'"},{name:"literal",value:"'dashed'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'small' | 'middle' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'middle'"},{name:"literal",value:"'large'"}]},description:"",defaultValue:{value:"'middle'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'success' | 'danger' | 'warning' | 'info' | 'dark'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'success'"},{name:"literal",value:"'danger'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'info'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},preset:{required:!1,tsType:{name:"union",raw:"'save' | 'delete' | 'edit' | 'add' | 'download' | 'upload' | 'refresh' | 'search' | 'settings' | 'profile' | 'favorite' | 'cart' | 'mail' | 'call' | 'home' | 'next'",elements:[{name:"literal",value:"'save'"},{name:"literal",value:"'delete'"},{name:"literal",value:"'edit'"},{name:"literal",value:"'add'"},{name:"literal",value:"'download'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'search'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'favorite'"},{name:"literal",value:"'cart'"},{name:"literal",value:"'mail'"},{name:"literal",value:"'call'"},{name:"literal",value:"'home'"},{name:"literal",value:"'next'"}]},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},iconPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"",defaultValue:{value:"'left'",computed:!1}},iconOnly:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const Le={title:"Components/Btn",component:a,parameters:{layout:"centered",docs:{description:{component:"Componente de botón versátil con soporte para iconos, variantes personalizadas y presets predefinidos."}}},tags:["autodocs"],argTypes:{children:{control:"text",description:"Contenido del botón"},type:{control:"select",options:["primary","link","text","default","dashed"],description:"Tipo de botón de Ant Design"},size:{control:"select",options:["small","middle","large"],description:"Tamaño del botón"},variant:{control:"select",options:["default","success","danger","warning","info","dark"],description:"Variante de color"},preset:{control:"select",options:["save","delete","edit","add","download","upload","refresh","search","settings","profile","favorite","cart","mail","call","home","next"],description:"Botón predefinido con icono y texto"},iconPosition:{control:"select",options:["left","right"],description:"Posición del icono"},iconOnly:{control:"boolean",description:"Mostrar solo el icono sin texto"},loading:{control:"boolean",description:"Estado de carga"},disabled:{control:"boolean",description:"Estado deshabilitado"}}},n={args:{children:"Botón básico"}},t={render:()=>e.jsxs("div",{className:"flex gap-4 flex-wrap",children:[e.jsx(a,{variant:"default",children:"Default"}),e.jsx(a,{variant:"success",children:"Success"}),e.jsx(a,{variant:"danger",children:"Danger"}),e.jsx(a,{variant:"warning",children:"Warning"}),e.jsx(a,{variant:"info",children:"Info"}),e.jsx(a,{variant:"dark",children:"Dark"})]})},i={render:()=>e.jsxs("div",{className:"flex gap-4 items-center",children:[e.jsx(a,{size:"small",variant:"info",children:"Small"}),e.jsx(a,{size:"middle",variant:"info",children:"Middle"}),e.jsx(a,{size:"large",variant:"info",children:"Large"})]})},s={render:()=>e.jsxs("div",{className:"flex gap-4 flex-wrap",children:[e.jsx(a,{preset:"save"}),e.jsx(a,{preset:"delete"}),e.jsx(a,{preset:"edit"}),e.jsx(a,{preset:"add"}),e.jsx(a,{preset:"download"}),e.jsx(a,{preset:"upload"}),e.jsx(a,{preset:"refresh"}),e.jsx(a,{preset:"search"})]})},o={render:()=>e.jsxs("div",{className:"flex gap-4 flex-wrap",children:[e.jsx(a,{icon:e.jsx(Fe,{}),variant:"warning",children:"Con estrella"}),e.jsx(a,{icon:e.jsx(se,{}),variant:"danger",iconPosition:"right",children:"Me gusta"}),e.jsx(a,{icon:e.jsx(oe,{}),variant:"info",children:"Descargar"})]})},l={render:()=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx(a,{preset:"save",iconOnly:!0}),e.jsx(a,{preset:"delete",iconOnly:!0}),e.jsx(a,{preset:"edit",iconOnly:!0}),e.jsx(a,{preset:"settings",iconOnly:!0}),e.jsx(a,{preset:"favorite",iconOnly:!0})]})},d={render:()=>e.jsxs("div",{className:"flex gap-4 flex-wrap",children:[e.jsx(a,{variant:"info",children:"Normal"}),e.jsx(a,{variant:"info",loading:!0,children:"Loading"}),e.jsx(a,{variant:"info",disabled:!0,children:"Disabled"})]})},c={render:()=>e.jsxs("div",{className:"flex gap-4 flex-wrap",children:[e.jsx(a,{type:"primary",variant:"info",children:"Primary"}),e.jsx(a,{type:"default",variant:"info",children:"Default"}),e.jsx(a,{type:"dashed",variant:"info",children:"Dashed"}),e.jsx(a,{type:"text",variant:"info",children:"Text"}),e.jsx(a,{type:"link",variant:"info",children:"Link"})]})},p={render:()=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx(a,{preset:"save",iconPosition:"left",children:"Guardar izquierda"}),e.jsx(a,{preset:"next",iconPosition:"right",children:"Siguiente derecha"})]})},u={render:()=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx(a,{preset:"save",size:"large",children:"Guardar cambios"}),e.jsx(a,{type:"default",size:"large",children:"Cancelar"}),e.jsx(a,{preset:"delete",type:"text",size:"large",children:"Eliminar"})]})},m={args:{children:"Botón personalizable",type:"primary",size:"middle",variant:"default",iconPosition:"left",iconOnly:!1,loading:!1,disabled:!1}};var z,F,D;n.parameters={...n.parameters,docs:{...(z=n.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    children: 'Botón básico'
  }
}`,...(D=(F=n.parameters)==null?void 0:F.docs)==null?void 0:D.source}}};var T,k,C;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4 flex-wrap">\r
      <Btn variant="default">Default</Btn>\r
      <Btn variant="success">Success</Btn>\r
      <Btn variant="danger">Danger</Btn>\r
      <Btn variant="warning">Warning</Btn>\r
      <Btn variant="info">Info</Btn>\r
      <Btn variant="dark">Dark</Btn>\r
    </div>
}`,...(C=(k=t.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var O,R,q;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4 items-center">\r
      <Btn size="small" variant="info">Small</Btn>\r
      <Btn size="middle" variant="info">Middle</Btn>\r
      <Btn size="large" variant="info">Large</Btn>\r
    </div>
}`,...(q=(R=i.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};var I,V,E;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4 flex-wrap">\r
      <Btn preset="save" />\r
      <Btn preset="delete" />\r
      <Btn preset="edit" />\r
      <Btn preset="add" />\r
      <Btn preset="download" />\r
      <Btn preset="upload" />\r
      <Btn preset="refresh" />\r
      <Btn preset="search" />\r
    </div>
}`,...(E=(V=s.parameters)==null?void 0:V.docs)==null?void 0:E.source}}};var L,G,M;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4 flex-wrap">\r
      <Btn icon={<FiStar />} variant="warning">Con estrella</Btn>\r
      <Btn icon={<FiHeart />} variant="danger" iconPosition="right">Me gusta</Btn>\r
      <Btn icon={<FiDownload />} variant="info">Descargar</Btn>\r
    </div>
}`,...(M=(G=o.parameters)==null?void 0:G.docs)==null?void 0:M.source}}};var A,$,_;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4">\r
      <Btn preset="save" iconOnly />\r
      <Btn preset="delete" iconOnly />\r
      <Btn preset="edit" iconOnly />\r
      <Btn preset="settings" iconOnly />\r
      <Btn preset="favorite" iconOnly />\r
    </div>
}`,...(_=($=l.parameters)==null?void 0:$.docs)==null?void 0:_.source}}};var H,U,W;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4 flex-wrap">\r
      <Btn variant="info">Normal</Btn>\r
      <Btn variant="info" loading>Loading</Btn>\r
      <Btn variant="info" disabled>Disabled</Btn>\r
    </div>
}`,...(W=(U=d.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};var J,K,Q;c.parameters={...c.parameters,docs:{...(J=c.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4 flex-wrap">\r
      <Btn type="primary" variant="info">Primary</Btn>\r
      <Btn type="default" variant="info">Default</Btn>\r
      <Btn type="dashed" variant="info">Dashed</Btn>\r
      <Btn type="text" variant="info">Text</Btn>\r
      <Btn type="link" variant="info">Link</Btn>\r
    </div>
}`,...(Q=(K=c.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var X,Y,Z;p.parameters={...p.parameters,docs:{...(X=p.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4">\r
      <Btn preset="save" iconPosition="left">Guardar izquierda</Btn>\r
      <Btn preset="next" iconPosition="right">Siguiente derecha</Btn>\r
    </div>
}`,...(Z=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,ae,re;u.parameters={...u.parameters,docs:{...(ee=u.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4">\r
      <Btn preset="save" size="large">Guardar cambios</Btn>\r
      <Btn type="default" size="large">Cancelar</Btn>\r
      <Btn preset="delete" type="text" size="large">Eliminar</Btn>\r
    </div>
}`,...(re=(ae=u.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var ne,te,ie;m.parameters={...m.parameters,docs:{...(ne=m.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    children: 'Botón personalizable',
    type: 'primary',
    size: 'middle',
    variant: 'default',
    iconPosition: 'left',
    iconOnly: false,
    loading: false,
    disabled: false
  }
}`,...(ie=(te=m.parameters)==null?void 0:te.docs)==null?void 0:ie.source}}};const Ge=["Default","Variants","Sizes","Presets","CustomIcons","IconOnly","States","Types","IconPositions","FormExample","Playground"];export{o as CustomIcons,n as Default,u as FormExample,l as IconOnly,p as IconPositions,m as Playground,s as Presets,i as Sizes,d as States,c as Types,t as Variants,Ge as __namedExportsOrder,Le as default};
