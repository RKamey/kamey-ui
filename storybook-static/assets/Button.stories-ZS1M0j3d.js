import{j as e}from"./jsx-runtime-CLpGMVip.js";import{B as r}from"./Button-Dj7iUr2t.js";import{F as J,a as K,b as Q}from"./index-aS_-NmT-.js";import"./button-DkP0tecP.js";import"./index-CZMpeKRu.js";import"./UnstableContext-BvhCNf13.js";import"./index-DDGe2ivH.js";import"./index-D-TIQtLp.js";import"./iconBase-CunQ1dn9.js";const se={title:"Components/Btn",component:r,parameters:{layout:"centered",docs:{description:{component:"Componente de botón versátil con soporte para iconos, variantes personalizadas y presets predefinidos."}}},tags:["autodocs"],argTypes:{children:{control:"text",description:"Contenido del botón"},type:{control:"select",options:["primary","link","text","default","dashed"],description:"Tipo de botón de Ant Design"},size:{control:"select",options:["small","middle","large"],description:"Tamaño del botón"},variant:{control:"select",options:["default","success","danger","warning","info","dark"],description:"Variante de color"},preset:{control:"select",options:["save","delete","edit","add","download","upload","refresh","search","settings","profile","favorite","cart","mail","call","home","next"],description:"Botón predefinido con icono y texto"},iconPosition:{control:"select",options:["left","right"],description:"Posición del icono"},iconOnly:{control:"boolean",description:"Mostrar solo el icono sin texto"},loading:{control:"boolean",description:"Estado de carga"},disabled:{control:"boolean",description:"Estado deshabilitado"}}},n={args:{children:"Botón básico"}},a={render:()=>e.jsxs("div",{className:"flex gap-4 flex-wrap",children:[e.jsx(r,{variant:"default",children:"Default"}),e.jsx(r,{variant:"success",children:"Success"}),e.jsx(r,{variant:"danger",children:"Danger"}),e.jsx(r,{variant:"warning",children:"Warning"}),e.jsx(r,{variant:"info",children:"Info"}),e.jsx(r,{variant:"dark",children:"Dark"})]})},s={render:()=>e.jsxs("div",{className:"flex gap-4 items-center",children:[e.jsx(r,{size:"small",variant:"info",children:"Small"}),e.jsx(r,{size:"middle",variant:"info",children:"Middle"}),e.jsx(r,{size:"large",variant:"info",children:"Large"})]})},t={render:()=>e.jsxs("div",{className:"flex gap-4 flex-wrap",children:[e.jsx(r,{preset:"save"}),e.jsx(r,{preset:"delete"}),e.jsx(r,{preset:"edit"}),e.jsx(r,{preset:"add"}),e.jsx(r,{preset:"download"}),e.jsx(r,{preset:"upload"}),e.jsx(r,{preset:"refresh"}),e.jsx(r,{preset:"search"})]})},i={render:()=>e.jsxs("div",{className:"flex gap-4 flex-wrap",children:[e.jsx(r,{icon:e.jsx(J,{}),variant:"warning",children:"Con estrella"}),e.jsx(r,{icon:e.jsx(K,{}),variant:"danger",iconPosition:"right",children:"Me gusta"}),e.jsx(r,{icon:e.jsx(Q,{}),variant:"info",children:"Descargar"})]})},o={render:()=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx(r,{preset:"save",iconOnly:!0}),e.jsx(r,{preset:"delete",iconOnly:!0}),e.jsx(r,{preset:"edit",iconOnly:!0}),e.jsx(r,{preset:"settings",iconOnly:!0}),e.jsx(r,{preset:"favorite",iconOnly:!0})]})},d={render:()=>e.jsxs("div",{className:"flex gap-4 flex-wrap",children:[e.jsx(r,{variant:"info",children:"Normal"}),e.jsx(r,{variant:"info",loading:!0,children:"Loading"}),e.jsx(r,{variant:"info",disabled:!0,children:"Disabled"})]})},l={render:()=>e.jsxs("div",{className:"flex gap-4 flex-wrap",children:[e.jsx(r,{type:"primary",variant:"info",children:"Primary"}),e.jsx(r,{type:"default",variant:"info",children:"Default"}),e.jsx(r,{type:"dashed",variant:"info",children:"Dashed"}),e.jsx(r,{type:"text",variant:"info",children:"Text"}),e.jsx(r,{type:"link",variant:"info",children:"Link"})]})},c={render:()=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx(r,{preset:"save",iconPosition:"left",children:"Guardar izquierda"}),e.jsx(r,{preset:"next",iconPosition:"right",children:"Siguiente derecha"})]})},p={render:()=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx(r,{preset:"save",size:"large",children:"Guardar cambios"}),e.jsx(r,{type:"default",size:"large",children:"Cancelar"}),e.jsx(r,{preset:"delete",type:"text",size:"large",children:"Eliminar"})]})},m={args:{children:"Botón personalizable",type:"primary",size:"middle",variant:"default",iconPosition:"left",iconOnly:!1,loading:!1,disabled:!1}};var f,x,g;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    children: 'Botón básico'
  }
}`,...(g=(x=n.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var v,u,B;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4 flex-wrap">\r
      <Btn variant="default">Default</Btn>\r
      <Btn variant="success">Success</Btn>\r
      <Btn variant="danger">Danger</Btn>\r
      <Btn variant="warning">Warning</Btn>\r
      <Btn variant="info">Info</Btn>\r
      <Btn variant="dark">Dark</Btn>\r
    </div>
}`,...(B=(u=a.parameters)==null?void 0:u.docs)==null?void 0:B.source}}};var h,j,y;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4 items-center">\r
      <Btn size="small" variant="info">Small</Btn>\r
      <Btn size="middle" variant="info">Middle</Btn>\r
      <Btn size="large" variant="info">Large</Btn>\r
    </div>
}`,...(y=(j=s.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var S,b,z;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(z=(b=t.parameters)==null?void 0:b.docs)==null?void 0:z.source}}};var w,N,D;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4 flex-wrap">\r
      <Btn icon={<FiStar />} variant="warning">Con estrella</Btn>\r
      <Btn icon={<FiHeart />} variant="danger" iconPosition="right">Me gusta</Btn>\r
      <Btn icon={<FiDownload />} variant="info">Descargar</Btn>\r
    </div>
}`,...(D=(N=i.parameters)==null?void 0:N.docs)==null?void 0:D.source}}};var P,O,k;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4">\r
      <Btn preset="save" iconOnly />\r
      <Btn preset="delete" iconOnly />\r
      <Btn preset="edit" iconOnly />\r
      <Btn preset="settings" iconOnly />\r
      <Btn preset="favorite" iconOnly />\r
    </div>
}`,...(k=(O=o.parameters)==null?void 0:O.docs)==null?void 0:k.source}}};var C,F,E;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4 flex-wrap">\r
      <Btn variant="info">Normal</Btn>\r
      <Btn variant="info" loading>Loading</Btn>\r
      <Btn variant="info" disabled>Disabled</Btn>\r
    </div>
}`,...(E=(F=d.parameters)==null?void 0:F.docs)==null?void 0:E.source}}};var I,T,L;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4 flex-wrap">\r
      <Btn type="primary" variant="info">Primary</Btn>\r
      <Btn type="default" variant="info">Default</Btn>\r
      <Btn type="dashed" variant="info">Dashed</Btn>\r
      <Btn type="text" variant="info">Text</Btn>\r
      <Btn type="link" variant="info">Link</Btn>\r
    </div>
}`,...(L=(T=l.parameters)==null?void 0:T.docs)==null?void 0:L.source}}};var M,G,V;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4">\r
      <Btn preset="save" iconPosition="left">Guardar izquierda</Btn>\r
      <Btn preset="next" iconPosition="right">Siguiente derecha</Btn>\r
    </div>
}`,...(V=(G=c.parameters)==null?void 0:G.docs)==null?void 0:V.source}}};var q,H,W;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4">\r
      <Btn preset="save" size="large">Guardar cambios</Btn>\r
      <Btn type="default" size="large">Cancelar</Btn>\r
      <Btn preset="delete" type="text" size="large">Eliminar</Btn>\r
    </div>
}`,...(W=(H=p.parameters)==null?void 0:H.docs)==null?void 0:W.source}}};var _,A,R;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(R=(A=m.parameters)==null?void 0:A.docs)==null?void 0:R.source}}};const te=["Default","Variants","Sizes","Presets","CustomIcons","IconOnly","States","Types","IconPositions","FormExample","Playground"];export{i as CustomIcons,n as Default,p as FormExample,o as IconOnly,c as IconPositions,m as Playground,t as Presets,s as Sizes,d as States,l as Types,a as Variants,te as __namedExportsOrder,se as default};
