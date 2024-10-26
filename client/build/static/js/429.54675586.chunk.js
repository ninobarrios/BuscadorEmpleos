"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[429,757,357],{1669:(e,a,i)=>{i.d(a,{A:()=>s});var n=i(5043),r=i(6213),o=(i(2845),i(579));const s=function(e){let{onBuscar:a,onSugerencias:i}=e;const[s,l]=(0,n.useState)(""),[c,t]=(0,n.useState)([]),[d,u]=(0,n.useState)(!1),m=(0,n.useRef)(null),g=(0,n.useRef)(null),b=e=>{m.current&&!m.current.contains(e.target)&&g.current&&!g.current.contains(e.target)&&u(!1)};return(0,n.useEffect)((()=>(document.addEventListener("mousedown",b),()=>{document.removeEventListener("mousedown",b)})),[]),(0,o.jsxs)("div",{className:"buscador",children:[(0,o.jsxs)("h3",{children:["Buscar Oferta ",(0,o.jsx)("span",{style:{color:"#47b72f"},children:"Laboral"})]}),(0,o.jsxs)("div",{className:"elementos_buscador",children:[(0,o.jsxs)("div",{ref:m,children:[(0,o.jsx)("input",{className:"input_cajainiciobox",type:"text",value:s,onChange:e=>{const a=e.target.value;l(a),(async e=>{if(e.length>2)try{const a=(await r.A.get("https://buscadorempleos.onrender.com/sugerencias",{params:{palabra:e}})).data;t(a),u(a.length>0),i&&i(a)}catch(a){console.error("Error fetching suggestions:",a),t([]),u(!1)}else t([]),u(!1)})(a)},onKeyPress:e=>{"Enter"===e.key&&a(s)},placeholder:"Ingrese palabra clave"}),d&&(0,o.jsx)("ul",{className:"sugerencias",ref:g,children:c.map(((e,i)=>(0,o.jsx)("li",{onClick:()=>(e=>{console.log("Sugerencia seleccionada:",e),l(e),u(!1),a&&a(e)})(e),children:e},i)))})]}),(0,o.jsx)("button",{className:"btn_cajainiciobox",onClick:()=>a(s),children:"Buscar"})]})]})}},7357:(e,a,i)=>{i.r(a),i.d(a,{default:()=>r});i(5043),i(2845);var n=i(579);const r=function(){return(0,n.jsx)("div",{className:"footer",children:"\xa9 Practicas Universitarias - Peru 2024"})}},3592:(e,a,i)=>{i.d(a,{A:()=>s});var n=i(5043),r=i(6213),o=(i(2845),i(579));const s=function(){const[e,a]=(0,n.useState)(0),[i,s]=(0,n.useState)(0),[l,c]=(0,n.useState)(0),[t,d]=(0,n.useState)(!0),[u,m]=(0,n.useState)(null);return(0,n.useEffect)((()=>{(async()=>{d(!0);try{const[e,i,n]=await Promise.all([r.A.get("https://buscadorempleos.onrender.com/contarObservacionesDiaAnterior"),r.A.get("https://buscadorempleos.onrender.com/contarObservacionesSemana"),r.A.get("https://buscadorempleos.onrender.com/contarObservacionesTotal")]);a(e.data.count||0),s(i.data.count||0),c(n.data.count||0)}catch(e){console.error("Error al obtener los conteos:",e),m("Error al obtener los conteos. Intenta de nuevo m\xe1s tarde.")}finally{d(!1)}})()}),[]),t?(0,o.jsx)("div",{className:"loading",style:{margin:"50px"},children:(0,o.jsx)("div",{className:"spinner"})}):u?(0,o.jsx)("p",{children:u}):(0,o.jsx)("div",{className:"total_observaciones",children:(0,o.jsxs)("div",{className:"inserciones",children:[(0,o.jsxs)("div",{className:"dia",children:[(0,o.jsx)("p",{children:e.toLocaleString("es-PE")}),(0,o.jsx)("h5",{children:"Ofertas laborales hoy"})]}),(0,o.jsxs)("div",{className:"semana",children:[(0,o.jsx)("p",{children:i.toLocaleString("es-PE")}),(0,o.jsx)("h5",{children:"Ofertas laborales \xfaltimos 7 d\xedas"})]}),(0,o.jsxs)("div",{className:"total",children:[(0,o.jsx)("p",{children:l.toLocaleString("es-PE")}),(0,o.jsx)("h5",{children:"Total ofertas menores a 20 d\xedas"})]})]})})}},1757:(e,a,i)=>{i.r(a),i.d(a,{default:()=>o});var n=i(5043),r=(i(2845),i(579));const o=function(e){let{paginaActual:a,totalPaginas:i,onCambiarPagina:o}=e;const[s,l]=(0,n.useState)(5);return(0,n.useEffect)((()=>{const e=()=>{window.innerWidth<=768?l(3):l(9)};return e(),window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]),(0,r.jsxs)("div",{className:"paginacion",children:[(0,r.jsx)("button",{onClick:()=>o(a-1),disabled:1===a,children:"Anterior"}),(0,r.jsx)("div",{className:"numero-pagina",children:(()=>{let e=[];const n=Math.max(1,a-Math.floor(s/2)),r=Math.min(n+s-1,i);for(let a=n;a<=r;a++)e.push(a);return e})().map(((e,i)=>"..."===e?(0,r.jsx)("span",{className:"puntos-suspensivos",children:"..."},i):(0,r.jsx)("button",{className:e===a?"active":"",onClick:()=>o(e),children:e},i)))}),(0,r.jsx)("button",{onClick:()=>o(a+1),disabled:a===i,children:"Siguiente"})]})}},6439:(e,a,i)=>{i.d(a,{A:()=>o});i(5043);var n=i(7065),r=(i(2845),i(579));const o=function(e){let{onSelectLugar:a,onSelectEmpresa:i,empresas:o,lugar:s,empresa:l,departamentos:c}=e;const t={value:"",label:"Seleccionar Departamento"},d={value:"",label:"Seleccionar Empresas"},u=[t,...c.map((e=>({value:e,label:e})))],m=[d,...o.filter((e=>e&&""!==e.trim())).map((e=>({value:e,label:e})))],g={control:(e,a)=>({...e,borderColor:a.isFocused?"#47b72f":"#d0d0d0",boxShadow:a.isFocused?"0 0 0 1px #47b72f":null,"&:hover":{borderColor:"#47b72f"}}),menu:e=>({...e,zIndex:9999}),option:(e,a)=>({...e,backgroundColor:a.isSelected?"#47b72f":a.isFocused?"#e0f7e9":e.backgroundColor,color:a.isSelected?"white":e.color,"&:hover":{backgroundColor:"#e0f7e9"}})};return(0,r.jsxs)("div",{className:"selectores",children:[(0,r.jsx)(n.Ay,{id:"select-lugar",className:"select-lugar",styles:g,options:u,value:u.find((e=>e.value===s))||t,onChange:e=>a(e.value),placeholder:"Selecciona un lugar","aria-label":"Selecciona un lugar"}),(0,r.jsx)(n.Ay,{id:"select-empresa",className:"select-lugar",styles:g,options:m,value:m.find((e=>e.value===l))||d,onChange:e=>i(e.value),placeholder:"Selecciona una empresa","aria-label":"Selecciona una empresa"})]})}},9429:(e,a,i)=>{i.r(a),i.d(a,{default:()=>b});var n=i(5043),r=i(6213),o=i(7065),s=(i(2845),i(6149)),l=i(8839),c=i(1669),t=i(1757),d=i(3592),u=i(6439),m=i(7357),g=i(579);const b=function(){const[e,a]=(0,n.useState)([]),[i,b]=(0,n.useState)([]),[v,p]=(0,n.useState)(!1),[h,f]=(0,n.useState)(null),[_,C]=(0,n.useState)(1),[x,I]=(0,n.useState)(0),[j,S]=(0,n.useState)(14),[A,E]=(0,n.useState)({palabraClave:"",lugar:"",empresa:"",carrera:""}),y=(0,n.useMemo)((()=>["Arequipa","Lima","Cusco","Puno","Apurimac","Amazonas","Ancash","Ayacucho","Cajamarca","Callao","Huancavelica","Huanuco","Ica","Junin","La Libertad","Lambayeque","Loreto","Madre de Dios","Moquegua","Pasco","Piura","San Martin","Tacna","Tumbes","Ucayali","Peru"]),[]),N=[{value:"",label:"Seleccionar Carrera"},{value:"Administraci\xf3n",label:"Administraci\xf3n"},{value:"Arquitectura",label:"Arquitectura"},{value:"Biolog\xeda",label:"Biolog\xeda"},{value:"Ciencia_de_la_Computaci\xf3n",label:"Ciencia de la Computaci\xf3n"},{value:"Ciencia_Pol\xedtica",label:"Ciencia Pol\xedtica"},{value:"Ciencias_de_la_Comunicaci\xf3n",label:"Ciencias de la Comunicaci\xf3n"},{value:"Contabilidad",label:"Contabilidad"},{value:"Derecho",label:"Derecho"},{value:"Dise\xf1ador_Grafico",label:"Dise\xf1o Gr\xe1fico"},{value:"Econom\xeda",label:"Econom\xeda"},{value:"Educaci\xf3n",label:"Educaci\xf3n"},{value:"Enfermer\xeda",label:"Enfermer\xeda"},{value:"Estad\xedstica",label:"Estad\xedstica"},{value:"Farmacia_y_Bioqu\xedmica",label:"Farmacia y Bioqu\xedmica"},{value:"Gastronom\xeda",label:"Gastronom\xeda"},{value:"Historia",label:"Historia"},{value:"Hoteler\xeda_y_Turismo",label:"Hoteler\xeda y Turismo"},{value:"Ingenier\xeda_Agr\xedcola",label:"Ingenier\xeda Agron\xf3mica y Agr\xedcola"},{value:"Ingenier\xeda_Ambiental",label:"Ingenier\xeda Ambiental"},{value:"Ingenier\xeda_Civil",label:"Ingenier\xeda Civil"},{value:"Ingenier\xeda_de_Industrias_alimentarias",label:"Ingenier\xeda de Industria Alimentaria"},{value:"Ingenier\xeda_de_Minas",label:"Ingenier\xeda de Minas"},{value:"Ingenier\xeda_de_Sistemas",label:"Ingenier\xeda de Sistemas"},{value:"Ingenier\xeda_El\xe9ctrica",label:"Ingenier\xeda El\xe9ctrica"},{value:"Ingenier\xeda_Industrial",label:"Ingenier\xeda Industrial"},{value:"Ingenier\xeda_Mec\xe1nica",label:"Ingenier\xeda Mec\xe1nica"},{value:"Ingenier\xeda_Mecatr\xf3nica",label:"Ingenier\xeda Mecatr\xf3nica"},{value:"Ingenier\xeda_Qu\xedmica",label:"Ingenier\xeda Qu\xedmica"},{value:"Marketing",label:"Marketing"},{value:"Medicina",label:"Medicina"},{value:"Medicina_Veterinaria",label:"Medicina Veterinaria"},{value:"Negocios_Internacionales",label:"Negocios Internacionales"},{value:"Nutrici\xf3n",label:"Nutrici\xf3n"},{value:"Odontolog\xeda",label:"Odontolog\xeda"},{value:"Psicolog\xeda",label:"Psicolog\xeda"},{value:"Publicidad_y_multimedia",label:"Publicidad y Multimedia"},{value:"Recursos_Humanos",label:"Recursos Humanos"},{value:"Ventas",label:"Ventas"},{value:"Almac\xe9n",label:"Almac\xe9n"}],M=(0,n.useMemo)((()=>[...new Set(i.map((e=>y.find((a=>e.lugar.includes(a))))))].filter(Boolean).sort(((e,a)=>e.localeCompare(a)))),[i,y]);(0,n.useEffect)((()=>{const e=()=>{S(window.innerWidth<=768?10:20)};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]),(0,n.useEffect)((()=>{(async()=>{p(!0);try{const e=await r.A.get("https://buscadorempleos.onrender.com/Ofertas-Laborales-hoy");a(e.data),b(e.data),I(e.data.length),C(1)}catch(h){console.error("Error fetching data:",h),f(h)}finally{p(!1)}})()}),[]);const w=(0,n.useMemo)((()=>[...new Set(i.map((e=>e.nom_empresa)))]),[i]);(0,n.useEffect)((()=>{(()=>{const{palabraClave:a,lugar:i,empresa:n,carrera:r}=A;let o=e;a&&(o=o.filter((e=>e.nom_oferta.toLowerCase().includes(a.toLowerCase())))),i&&(o=o.filter((e=>e.lugar.toLowerCase().includes(i.toLowerCase())))),n&&(o=o.filter((e=>e.nom_empresa.toLowerCase().includes(n.toLowerCase()))));const s={"Administraci\xf3n":["administracion","Administrador","logistica","nominas","creditos y cobranzas","comercial","costos","planeamiento","trade"],Arquitectura:["Arquitectura"],"Biolog\xeda":["Biologia","Microbiologia"],"Ciencia_de_la_Computaci\xf3n":["Ciencia de la Computacion","programacion","base de datos","Ciberseguridad","cloud","programador","estructuras de datos"],"Ciencia_Pol\xedtica":["Politica"],"Ciencias_de_la_Comunicaci\xf3n":["comunicacion","Periodismo","Audiovisuales","relaciones publicas","comunicador social","redes sociales","comunicador","periodista"],Contabilidad:["Contabilidad","impuestos","contable","costos","creditos y cobranzas"],Derecho:["Derecho","abogado","litigio","legal","abogada"],"Econom\xeda":["Economia","finanzas","mercado","inversion","nominas","creditos y cobranzas","comercial"],"Educaci\xf3n":["Educacion","docente","profesor","profesora"],"Enfermer\xeda":["Enfermeria","enfermera"],"Estad\xedstica":["Estadistica"],"Farmacia_y_Bioqu\xedmica":["farmacia","bioquimica","laboratorio"],"Gastronom\xeda":["Gastronomia","gastronomica","gastronomico","cocinero","cocinera","cocina"],"Hoteler\xeda_y_Turismo":["Hoteleria","turismo","turistico"],"Ingenier\xeda_Agr\xedcola":["Ingenieria Agricola","Ingeniero Agronomo","agronomia","agronomo","agronomia","agroindustrial","Ingenieria Agronoma"],"Ingenier\xeda_Ambiental":["Ingenieria Ambiental","ambiental","SHEQ"],"Ingenier\xeda_de_Industrias_alimentarias":["alimentaria"],"Ingenier\xeda_Civil":["Ingenieria Civil","civil","urbano","urbana"],"Ingenier\xeda_de_Minas":["Ingenier\xeda de Minas","mina","mineria","minero","SHEQ"],"Ingenier\xeda_de_Sistemas":["Ingenier\xeda de Sistemas","Ingeniero de sistemas","Ing Sistemas","Ing. sistemas","react","programaci\xf3n","angular","sql","data","devops"," ti ","php","soporte tecnico","Seguridad de la Informacion","Analisis De Datos","cloud","Data Analytics","Mysql"],"Ingenier\xeda_El\xe9ctrica":["electrica","electricista","Transformadores","electronica","electronico","ING. ELECTRICA"],"Ingenier\xeda_Industrial":["Ingenieria Industrial","Industrial","Ing industrial","Ing. Industrial","logistica","nominas","creditos y cobranzas","comercial","costos","planeamiento","trade"],"Ingenier\xeda_Mec\xe1nica":["mecanica","mecanico"],"Ingenier\xeda_Mecatr\xf3nica":["mecatronica","mecatronica"],"Ingenier\xeda_Qu\xedmica":["quimica","quimico"],Marketing:["Marketing","Publicidad"," marca ","Branding","trade"],Medicina:["Medicina"],Medicina_Veterinaria:["Veterinaria","veterinario","zootecnia"],Negocios_Internacionales:["Negocios Internacionales","comercio","exportacion","comercial","aduanas","logistica"],"Nutrici\xf3n":["Nutricion"],"Odontolog\xeda":["Odontologia","dental"],"Psicolog\xeda":["Psicologia","psicologo","psicologa","seleccion"],Publicidad_y_multimedia:["publicidad","multimedia"],Recursos_Humanos:["Recursos humanos","seleccion"],Ventas:["Ventas"],"Almac\xe9n":["almacen","inventarios","carga"],"Dise\xf1ador_Grafico":["dise\xf1ador grafico","grafico","dise\xf1o gr\xe1fico"]};r&&(o=o.filter((e=>{var a;return null===(a=s[r])||void 0===a?void 0:a.some((a=>e.nom_oferta.toLowerCase().includes(a.toLowerCase())))}))),b(o),I(o.length),C(1)})()}),[e,A]);const L=(0,n.useCallback)((e=>C(e)),[]),P=(0,n.useCallback)((e=>console.log("Link seleccionado:",e)),[]),k=(0,n.useCallback)(((e,a)=>{E((i=>({...i,[e]:a})))}),[]),q=(0,n.useMemo)((()=>Math.ceil(x/j)),[x,j]),z=_*j,D=z-j,H=(0,n.useMemo)((()=>i.slice(D,z)),[i,D,z]);return(0,g.jsxs)("div",{className:"pagina-inicio",children:[(0,g.jsxs)("div",{className:"portada",children:[(0,g.jsx)("img",{src:s,alt:"Portada",loading:"lazy"}),(0,g.jsxs)("div",{className:"contentform",children:[(0,g.jsxs)("h1",{children:["Oportunidades ",(0,g.jsx)("span",{style:{color:"white"},children:"Laborales"})," "]}),(0,g.jsxs)("h3",{children:["Descubre oportunidades laborales para estudiantes y reci\xe9n egresados",(0,g.jsx)("br",{})," en diversas carreras t\xe9cnicas y profesionales."]})]})]}),(0,g.jsx)(d.A,{}),(0,g.jsx)(c.A,{onBuscar:e=>k("palabraClave",e)}),(0,g.jsx)("div",{className:"selectores",children:(0,g.jsx)(o.Ay,{className:"select-lugar",styles:{control:(e,a)=>({...e,borderColor:a.isFocused?"#47b72f":"#d0d0d0",boxShadow:a.isFocused?"0 0 0 1px #47b72f":null,"&:hover":{borderColor:"#47b72f"}}),menu:e=>({...e,zIndex:9999}),option:(e,a)=>({...e,backgroundColor:a.isSelected?"#47b72f":a.isFocused?"#e0f7e9":e.backgroundColor,color:a.isSelected?"white":e.color,"&:hover":{backgroundColor:"#e0f7e9"}})},options:N,onChange:e=>k("carrera",e.value),value:N.find((e=>e.value===A.carrera)),placeholder:"Selecciona una carrera","aria-label":"Selecciona una carrera"})}),(0,g.jsx)(u.A,{onSelectLugar:e=>k("lugar",e),onSelectEmpresa:e=>k("empresa",e),empresas:w,lugar:A.lugar,empresa:A.empresa,departamentos:M}),(0,g.jsxs)("div",{className:"totalofertas",children:[x.toLocaleString("es-PE")," Empleos Hoy"]}),(0,g.jsx)("div",{className:"contenidoprincipal",children:(0,g.jsx)("div",{className:"contenedordecajas",children:H.length>0?H.map(((e,a)=>(0,g.jsx)(l.default,{oferta_laboral:e,navigateToLink:P},a))):(0,g.jsxs)("div",{children:[v&&(0,g.jsx)("div",{className:"loading",children:(0,g.jsx)("div",{className:"spinner"})}),h&&(0,g.jsxs)("div",{children:["Error: ",h.message]})]})})}),(0,g.jsx)(t.default,{paginaActual:_,totalPaginas:q,onCambiarPagina:L}),(0,g.jsx)(m.default,{})]})}},6149:(e,a,i)=>{e.exports=i.p+"static/media/portada.9fd919ebc37718e4bde4.avif"}}]);
//# sourceMappingURL=429.54675586.chunk.js.map